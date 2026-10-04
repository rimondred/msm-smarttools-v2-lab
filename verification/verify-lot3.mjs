#!/usr/bin/env node
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sourceFiles = fs.readdirSync(root).filter(name => name.endsWith(".ts")).sort()
const sources = Object.fromEntries(sourceFiles.map(name => [name, fs.readFileSync(path.join(root, name), "utf8")]))
const checks = []
function check(name, fn) {
    try {
        fn()
        checks.push({ name, ok: true })
        console.log(`PASS  ${name}`)
    } catch (error) {
        checks.push({ name, ok: false, error: error.message })
        console.error(`FAIL  ${name}: ${error.message}`)
    }
}

let apiResult
check("API historique 65/65, signatures et block IDs inchangés", () => {
    const run = spawnSync(process.execPath, [
        path.join(root, "verification", "verify-public-api.js"),
        path.join(root, "verification", "baseline", "main.ts"), root
    ], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 })
    if (run.error) throw run.error
    assert.equal(run.status, 0, (run.stderr || run.stdout || "verify-public-api sans sortie").slice(-4000))
    assert.ok(run.stdout.trim(), "verify-public-api sans sortie JSON")
    try {
        apiResult = JSON.parse(run.stdout)
    } catch (error) {
        throw new Error(`JSON API invalide (${run.stdout.length} caractères): ${run.stdout.slice(-300)}`)
    }
    assert.equal(apiResult.baselineFunctions, 65)
    assert.equal(apiResult.missing.length, 0)
    assert.equal(apiResult.signatureChanges.length, 0)
    assert.equal(apiResult.annotationChanges.length, 0)
    assert.equal(apiResult.blockIdChanges.length, 0)
    assert.equal(apiResult.currentFunctions, 111)
    assert.equal(apiResult.added.length, 46)
    assert.equal(apiResult.compatible, true)
})

check("dépendances fournisseur verrouillées", () => {
    const pxt = JSON.parse(fs.readFileSync(path.join(root, "pxt.json"), "utf8"))
    assert.equal(pxt.dependencies.dadabit, "github:hiwonderk12/DaDabit#19c8fa3889e228484d721fb7f3a88ef2734ac9bc")
    assert.equal(pxt.dependencies.WonderCam, "github:Hiwonder/WonderCam#817bb6f32e0a5189a834618fe3718b28d3e531e7")
    assert.equal(pxt.public, false)
})

check("API fournisseur confinée aux deux adaptateurs", () => {
    const allowed = new Set(["internal-dadabit.ts", "internal-wondercam.ts"])
    const leaks = []
    for (const [name, source] of Object.entries(sources)) {
        if (!allowed.has(name) && /\b(?:dadabit|wondercam)\./.test(source)) leaks.push(name)
    }
    assert.deepEqual(leaks, [])
    assert.match(sources["internal-dadabit.ts"], /dadabit\./)
    assert.match(sources["internal-wondercam.ts"], /wondercam\./)
})

const expectedNew = [
    "initialiserDaDabit", "faireTournerActionneur", "arreterActionneur", "positionnerActionneur",
    "actionnerPuisRevenir", "configurerPropulsion", "tournerAGauche", "tournerADroite",
    "avancerPendant", "reculerPendant", "tournerPendant", "lireEtatLigne", "lireEtatLigneFiltre",
    "capteurSurNoir", "intersectionDetectee", "lignePerdue", "suivreLigne", "suivreJusquaIntersection",
    "quitterIntersection", "activerVision", "couleurDetectee", "positionCouleur", "couleurStable",
    "visageDetecte", "xVisage", "visageStable", "landmarkReconnu", "confianceLandmark",
    "landmarkDetecte", "landmarkStable", "classeReconnue", "confianceClassification",
    "classeDetectee", "classeStable", "attendreDetectionStable", "saisirObjet", "deposerObjet",
    "configurerBras3Axes", "configurerPoseBras3Axes", "deplacerBras3Axes", "allerPoseBras3Axes",
    "allumerLEDs", "afficherEtat"
]
check("surface générale Lot 3 présente", () => {
    const all = Object.values(sources).join("\n")
    for (const name of expectedNew) assert.match(all, new RegExp(`export function\\s+${name}\\s*\\(`), name)
})

check("10 projets MSM-only", () => {
    const dirs = fs.readdirSync(path.join(root, "projects")).sort()
    assert.equal(dirs.length, 10)
    for (const dir of dirs) {
        const source = fs.readFileSync(path.join(root, "projects", dir, "main.ts"), "utf8")
        assert.match(source, /msmSmartTools\./)
        assert.doesNotMatch(source, /\b(?:dadabit|wondercam)\./)
    }
})

check("matrice Lot 2 conservée", () => {
    const dirs = fs.readdirSync(path.join(root, "verification", "lot2-matrix")).sort()
    assert.equal(dirs.length, 8)
    for (const dir of dirs) assert.ok(fs.existsSync(path.join(root, "verification", "lot2-matrix", dir, "main.ts")))
})

check("3 scénarios futurs sans nouvelle primitive", () => {
    const files = fs.readdirSync(path.join(root, "future-scenarios")).filter(name => name.endsWith(".ts"))
    assert.equal(files.length, 3)
    for (const name of files) {
        const source = fs.readFileSync(path.join(root, "future-scenarios", name), "utf8")
        assert.match(source, /msmSmartTools\./)
        assert.doesNotMatch(source, /\b(?:dadabit|wondercam)\./)
        assert.doesNotMatch(source, /export function/)
    }
})

check("cinq familles WonderCam raccordées", () => {
    const adapter = sources["internal-wondercam.ts"]
    for (const token of ["ColorDetect", "NumberRecognition", "FaceDetect", "LandmarkRecognition", "Classification"]) {
        assert.match(adapter, new RegExp(`wondercam\\.Functions\\.${token}`))
    }
})

check("nouvelles attentes bornées et arrêt sûr", () => {
    for (const [file, functionName] of [
        ["vision.ts", "attendreDetectionStable"],
        ["line.ts", "suivreJusquaIntersection"],
        ["line.ts", "quitterIntersection"],
        ["compositions.ts", "approcherCouleur"]
    ]) {
        const source = sources[file]
        const start = source.indexOf(`export function ${functionName}`)
        assert.ok(start >= 0)
        const body = source.slice(start, start + 1800)
        assert.match(body, /timeoutMs/)
        assert.match(body, /arreterRobot\(\)/)
    }
})

check("blocs publics nouveaux annotés en français et types représentables", () => {
    const all = Object.values(sources).join("\n")
    for (const name of expectedNew) {
        const declaration = new RegExp(`export function\\s+${name}\\s*\\(`, "g")
        const positions = [...all.matchAll(declaration)].map(match => match.index)
        assert.ok(positions.length > 0)
        const annotated = positions.some(pos => {
            const prefix = all.slice(Math.max(0, pos - 700), pos)
            return /\/\/% block=/.test(prefix) && /\/\/% group=/.test(prefix)
        })
        assert.ok(annotated, name)
    }
    assert.doesNotMatch(all, /export function[^\n]*:\s*(?:any|object|Promise|\{)/)
})

check("preuves Blocs et documentation présentes", () => {
    const blocks = fs.readdirSync(path.join(root, "blocks")).filter(name => name.endsWith(".blocks"))
    assert.ok(blocks.length >= 3)
    for (const name of ["BLOCK-CATALOG.md", "PROJECT-MATRIX.md", "MIGRATION.md", "HARDWARE-VALIDATION.md", "BLOCKS-ROUNDTRIP.md"]) {
        assert.ok(fs.existsSync(path.join(root, "docs", name)), name)
    }
})

const report = {
    generatedAt: new Date().toISOString(),
    passed: checks.filter(c => c.ok).length,
    expected: checks.length,
    api: apiResult ? {
        baselineFunctions: apiResult.baselineFunctions,
        currentFunctions: apiResult.currentFunctions,
        addedFunctions: apiResult.added.length,
        missing: apiResult.missing,
        signatureChanges: apiResult.signatureChanges,
        annotationChanges: apiResult.annotationChanges,
        uxAnnotationChanges: apiResult.uxAnnotationChanges.length,
        blockIdChanges: apiResult.blockIdChanges
    } : null,
    checks
}
fs.mkdirSync(path.join(root, "verification", "results"), { recursive: true })
fs.writeFileSync(path.join(root, "verification", "results", "static-verification.json"), JSON.stringify(report, null, 2) + "\n")
if (report.passed !== report.expected) process.exit(1)
