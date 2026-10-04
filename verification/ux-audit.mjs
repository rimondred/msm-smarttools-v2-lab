#!/usr/bin/env node
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
    classLabels,
    requiredImmediateApis,
    taxonomy,
    topLevelGroups,
    visibleCompatibility
} from "./ux-taxonomy.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sourceFiles = fs.readdirSync(root).filter(name => name.endsWith(".ts")).sort()

function parseAttrs(lines) {
    const attrs = {}
    for (const line of lines) {
        const source = line.replace(/^\/\/%\s*/, "")
        const pattern = /([\w.-]+)=(?:"([^"]*)"|'([^']*)'|([^\s]+))/g
        let match
        while ((match = pattern.exec(source)) !== null) {
            attrs[match[1]] = match[2] ?? match[3] ?? match[4]
        }
    }
    return attrs
}

function parsePublicBlocks(file) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/)
    const entries = []
    let namespace = ""
    let depth = 0
    let namespaceDepth = -1
    let annotations = []

    for (const line of lines) {
        const trimmed = line.trim()
        const ns = /^namespace\s+(\w+)\s*\{/.exec(trimmed)
        if (ns) {
            namespace = ns[1]
            namespaceDepth = depth + 1
            annotations = []
        } else if (namespace === "msmSmartTools") {
            if (trimmed.startsWith("//%")) {
                annotations.push(trimmed)
            } else {
                const fn = /^export function\s+(\w+)\s*\(/.exec(trimmed)
                if (fn && annotations.some(annotation => /\/\/%\s+block=/.test(annotation))) {
                    entries.push({
                        file: path.basename(file),
                        name: fn[1],
                        attrs: parseAttrs(annotations)
                    })
                    annotations = []
                } else if (trimmed && !/^export function/.test(trimmed)) {
                    annotations = []
                }
            }
        }

        for (const char of line) {
            if (char === "{") depth++
            else if (char === "}") depth--
        }
        if (namespaceDepth >= 0 && depth < namespaceDepth) {
            namespace = ""
            namespaceDepth = -1
            annotations = []
        }
    }
    return entries
}

const entries = sourceFiles.flatMap(name => parsePublicBlocks(path.join(root, name)))
const byName = new Map(entries.map(entry => [entry.name, entry]))
assert.equal(byName.size, entries.length, "Chaque API publique doit être unique")

const classification = new Map()
for (const [letter, names] of Object.entries(taxonomy)) {
    for (const name of names) {
        assert.ok(!classification.has(name), `Classification dupliquée: ${name}`)
        classification.set(name, letter)
    }
}

assert.equal(entries.length, 111, "La surface publique doit contenir 111 blocs")
assert.equal(classification.size, 111, "Les 111 blocs doivent être classés")
assert.deepEqual([...byName.keys()].filter(name => !classification.has(name)), [], "API non classée")
assert.deepEqual([...classification.keys()].filter(name => !byName.has(name)), [], "Classification sans API")

const visibleCompatibilitySet = new Set(visibleCompatibility)
const topLevelGroupSet = new Set(topLevelGroups)

for (const entry of entries) {
    const letter = classification.get(entry.name)
    const hidden = entry.attrs.blockHidden === "true"
    const advanced = entry.attrs.advanced === "true"
    const subcategory = entry.attrs.subcategory

    if (letter === "A" || letter === "B") {
        assert.equal(hidden, false, `${entry.name}: bloc élève masqué`)
        assert.equal(advanced, false, `${entry.name}: bloc élève marqué advanced`)
        assert.equal(subcategory, undefined, `${entry.name}: bloc élève sorti du niveau principal`)
        assert.ok(topLevelGroupSet.has(entry.attrs.group), `${entry.name}: groupe principal inattendu`)
    } else if (letter === "C") {
        assert.equal(hidden, false, `${entry.name}: bloc avancé masqué`)
        assert.equal(advanced, true, `${entry.name}: advanced attendu`)
        assert.equal(subcategory, "Avancé", `${entry.name}: sous-catégorie Avancé attendue`)
    } else if (letter === "D") {
        assert.equal(hidden, false, `${entry.name}: réglage enseignant masqué`)
        assert.equal(advanced, true, `${entry.name}: advanced attendu`)
        assert.equal(subcategory, "Réglages", `${entry.name}: sous-catégorie Réglages attendue`)
    } else if (letter === "E") {
        assert.equal(advanced, true, `${entry.name}: compatibilité non dépriorisée`)
        assert.equal(subcategory, "Compatibilité", `${entry.name}: sous-catégorie Compatibilité attendue`)
        assert.equal(hidden, !visibleCompatibilitySet.has(entry.name), `${entry.name}: visibilité historique inattendue`)
    } else {
        assert.equal(hidden, true, `${entry.name}: API technique encore visible`)
        assert.equal(advanced, true, `${entry.name}: API technique non dépriorisée`)
    }
}

for (const name of requiredImmediateApis) {
    const entry = byName.get(name)
    assert.ok(entry, `${name}: API de repérage absente`)
    assert.equal(entry.attrs.blockHidden, undefined, `${name}: API de repérage masquée`)
    assert.equal(entry.attrs.subcategory, undefined, `${name}: API de repérage non immédiate`)
}

const rows = entries
    .map(entry => ({
        api: entry.name,
        class: classification.get(entry.name),
        classLabel: classLabels[classification.get(entry.name)],
        source: entry.file,
        group: entry.attrs.group,
        subcategory: entry.attrs.subcategory ?? "Principale",
        hidden: entry.attrs.blockHidden === "true",
        advanced: entry.attrs.advanced === "true",
        effectiveBlockId: entry.attrs.blockId ?? `msmSmartTools_${entry.name}`
    }))
    .sort((a, b) => a.class.localeCompare(b.class) || a.api.localeCompare(b.api))

const countsByClass = Object.fromEntries(Object.keys(taxonomy).map(letter => [letter, rows.filter(row => row.class === letter).length]))
const summary = {
    totalPublicApis: rows.length,
    immediateStudentBlocks: rows.filter(row => (row.class === "A" || row.class === "B") && !row.hidden).length,
    advancedBlocks: rows.filter(row => row.class === "C" && !row.hidden).length,
    teacherSettingBlocks: rows.filter(row => row.class === "D" && !row.hidden).length,
    compatibilityBlocksVisible: rows.filter(row => row.class === "E" && !row.hidden).length,
    hiddenBlocks: rows.filter(row => row.hidden).length,
    totalVisibleBlocks: rows.filter(row => !row.hidden).length,
    countsByClass
}

assert.deepEqual(summary, {
    totalPublicApis: 111,
    immediateStudentBlocks: 46,
    advancedBlocks: 15,
    teacherSettingBlocks: 11,
    compatibilityBlocksVisible: 8,
    hiddenBlocks: 31,
    totalVisibleBlocks: 80,
    countsByClass: { A: 14, B: 32, C: 15, D: 11, E: 31, F: 8 }
})

const report = {
    generatedAt: new Date().toISOString(),
    summary,
    topLevelGroups,
    subcategories: ["Réglages", "Avancé", "Compatibilité"],
    visibleCompatibility,
    rows
}
fs.mkdirSync(path.join(root, "verification", "results"), { recursive: true })
fs.writeFileSync(path.join(root, "verification", "results", "ux-toolbox.json"), JSON.stringify(report, null, 2) + "\n")
console.log(`PASS  UX toolbox: ${summary.immediateStudentBlocks} immédiats, ${summary.advancedBlocks} avancés, ${summary.teacherSettingBlocks} réglages, ${summary.compatibilityBlocksVisible} compatibilité, ${summary.hiddenBlocks} masqués`)
