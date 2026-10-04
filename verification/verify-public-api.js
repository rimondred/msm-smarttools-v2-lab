#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const baselinePath = process.argv[2]
const extensionPath = process.argv[3]

if (!baselinePath || !extensionPath) {
    console.error("Usage: node verify-public-api.js <baseline-main.ts> <extension-directory>")
    process.exit(2)
}

function braceDelta(line) {
    let delta = 0
    for (const character of line) {
        if (character === "{") delta++
        else if (character === "}") delta--
    }
    return delta
}

function parsePublicApi(filePath) {
    const source = fs.readFileSync(filePath, "utf8")
    const lines = source.split(/\r?\n/)
    const functions = new Map()
    let depth = 0
    let namespaceName = ""
    let namespaceDepth = -1
    let annotations = []

    for (const line of lines) {
        const trimmed = line.trim()
        const namespaceMatch = /^namespace\s+([A-Za-z0-9_.]+)\s*\{/.exec(trimmed)

        if (namespaceMatch) {
            namespaceName = namespaceMatch[1]
            namespaceDepth = depth + 1
            annotations = []
        } else if (namespaceName === "msmSmartTools") {
            if (trimmed.startsWith("//%")) {
                annotations.push(trimmed)
            } else {
                const functionMatch = /^export function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*:\s*([^\{]+)\s*\{/.exec(trimmed)
                if (functionMatch) {
                    const name = functionMatch[1]
                    const parameters = functionMatch[2].replace(/\s+/g, " ").trim()
                    const returnType = functionMatch[3].replace(/\s+/g, " ").trim()
                    if (functions.has(name)) throw new Error(`Fonction publique dupliquée: ${name}`)
                    functions.set(name, {
                        signature: `${name}(${parameters}): ${returnType}`,
                        annotations: annotations.slice()
                    })
                    annotations = []
                } else if (trimmed !== "") {
                    annotations = []
                }
            }
        }

        depth += braceDelta(line)
        if (namespaceDepth >= 0 && depth < namespaceDepth) {
            namespaceName = ""
            namespaceDepth = -1
            annotations = []
        }
    }

    // Les signatures ajoutées au Lot 3 peuvent être réparties sur plusieurs
    // lignes. Le parseur historique ci-dessus couvre les 65 API de référence;
    // ce second passage ajoute uniquement les fonctions publiques annotées.
    const multiline = /export function\s+([A-Za-z0-9_]+)\s*\(([\s\S]*?)\)\s*:\s*([^\{]+)\s*\{/g
    let match
    while ((match = multiline.exec(source)) !== null) {
        const name = match[1]
        if (functions.has(name) || !match[0].includes("\n")) continue
        const before = source.slice(0, match.index).split(/\r?\n/)
        const functionAnnotations = []
        for (let i = before.length - 1; i >= 0; i--) {
            const trimmed = before[i].trim()
            if (trimmed.startsWith("//%")) functionAnnotations.unshift(trimmed)
            else if (trimmed === "") continue
            else break
        }
        if (!functionAnnotations.some(annotation => annotation.startsWith("//% block="))) continue
        const parameters = match[2].replace(/\s+/g, " ").trim()
        const returnType = match[3].replace(/\s+/g, " ").trim()
        functions.set(name, {
            signature: `${name}(${parameters}): ${returnType}`,
            annotations: functionAnnotations
        })
    }

    return functions
}

function mergePublicApi(files) {
    const merged = new Map()
    for (const file of files) {
        for (const [name, value] of parsePublicApi(file)) {
            if (merged.has(name)) throw new Error(`Fonction publique dupliquée entre fichiers: ${name}`)
            merged.set(name, value)
        }
    }
    return merged
}

function namespaceAnnotations(files) {
    const declarations = []
    for (const file of files) {
        const lines = fs.readFileSync(file, "utf8").split(/\r?\n/)
        let pending = []
        for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith("//%")) {
                pending.push(trimmed)
            } else if (/^namespace\s+msmSmartTools\s*\{/.test(trimmed)) {
                if (pending.length > 0) declarations.push(pending.slice())
                pending = []
            } else if (trimmed !== "") {
                pending = []
            }
        }
    }
    return declarations
}

const baseline = parsePublicApi(baselinePath)
const extensionFiles = fs.readdirSync(extensionPath)
    .filter(name => name.endsWith(".ts"))
    .map(name => path.join(extensionPath, name))
    .sort()
const current = mergePublicApi(extensionFiles)
const baselineNamespaceAnnotations = namespaceAnnotations([baselinePath])
const currentNamespaceAnnotations = namespaceAnnotations(extensionFiles)

const allowedUxAttributes = new Set([
    "advanced", "blockHidden", "group", "subcategory", "weight"
])
const allowedNamespaceUxAttributes = new Set([
    "groups", "groupIcons", "groupHelp", "subcategories"
])

function annotationAttribute(annotation) {
    const match = /^\/\/%\s+([\w.-]+)(?:=|\s|$)/.exec(annotation)
    return match ? match[1] : ""
}

function annotationsWithout(annotations, allowed) {
    return annotations.filter(annotation => {
        const attribute = annotationAttribute(annotation)
        const isParameterPresentation = /\.(?:min|max|defl)$/.test(attribute)
        return !allowed.has(attribute) && !isParameterPresentation
    })
}

function effectiveBlockId(name, annotations) {
    for (const annotation of annotations) {
        const match = /^\/\/%\s+blockId=(?:"([^"]+)"|'([^']+)'|([^\s]+))/.exec(annotation)
        if (match) return match[1] || match[2] || match[3]
    }
    return `msmSmartTools_${name}`
}

const missing = [...baseline.keys()].filter(name => !current.has(name)).sort()
const added = [...current.keys()].filter(name => !baseline.has(name)).sort()
const signatureChanges = []
const annotationChanges = []
const uxAnnotationChanges = []
const blockIdChanges = []
const baselineNamespaceCore = baselineNamespaceAnnotations.map(annotations => annotationsWithout(annotations, allowedNamespaceUxAttributes))
const currentNamespaceCore = currentNamespaceAnnotations.map(annotations => annotationsWithout(annotations, allowedNamespaceUxAttributes))
const namespaceAnnotationChanges = JSON.stringify(baselineNamespaceCore) === JSON.stringify(currentNamespaceCore)
    ? []
    : [{ expected: baselineNamespaceCore, actual: currentNamespaceCore }]
const namespaceUxAnnotationChanges = JSON.stringify(baselineNamespaceAnnotations) === JSON.stringify(currentNamespaceAnnotations)
    ? []
    : [{ expected: baselineNamespaceAnnotations, actual: currentNamespaceAnnotations }]

for (const [name, expected] of baseline) {
    const actual = current.get(name)
    if (!actual) continue
    if (expected.signature !== actual.signature) {
        signatureChanges.push({ name, expected: expected.signature, actual: actual.signature })
    }
    const expectedCore = annotationsWithout(expected.annotations, allowedUxAttributes)
    const actualCore = annotationsWithout(actual.annotations, allowedUxAttributes)
    if (JSON.stringify(expectedCore) !== JSON.stringify(actualCore)) {
        annotationChanges.push({ name, expected: expectedCore, actual: actualCore })
    }
    if (JSON.stringify(expected.annotations) !== JSON.stringify(actual.annotations)) {
        uxAnnotationChanges.push({ name, expected: expected.annotations, actual: actual.annotations })
    }
    const expectedBlockId = effectiveBlockId(name, expected.annotations)
    const actualBlockId = effectiveBlockId(name, actual.annotations)
    if (expectedBlockId !== actualBlockId) {
        blockIdChanges.push({ name, expected: expectedBlockId, actual: actualBlockId })
    }
}

const result = {
    namespace: "msmSmartTools",
    baselineFunctions: baseline.size,
    currentFunctions: current.size,
    missing,
    added,
    signatureChanges,
    annotationChanges,
    uxAnnotationChanges,
    blockIdChanges,
    namespaceAnnotationChanges,
    namespaceUxAnnotationChanges,
    compatible: missing.length === 0 && signatureChanges.length === 0 && annotationChanges.length === 0 && blockIdChanges.length === 0 && namespaceAnnotationChanges.length === 0
}

console.log(JSON.stringify(result, null, 2))
process.exitCode = result.compatible ? 0 : 1
