#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const testFile = path.join(root, "test.ts")
const original = fs.readFileSync(testFile, "utf8")
const projects = fs.readdirSync(path.join(root, "projects"))
    .sort()
    .map(name => ({ name, file: path.join(root, "projects", name, "main.ts"), kind: "projet" }))
const futures = fs.readdirSync(path.join(root, "future-scenarios"))
    .filter(name => name.endsWith(".ts"))
    .sort()
    .map(name => ({ name: name.replace(/\.ts$/, ""), file: path.join(root, "future-scenarios", name), kind: "futur" }))
const lot2 = fs.readdirSync(path.join(root, "verification", "lot2-matrix"))
    .sort()
    .map(name => ({ name, file: path.join(root, "verification", "lot2-matrix", name, "main.ts"), kind: "lot2" }))
const cases = [
    { name: "api-historique-65", file: path.join(root, "verification", "baseline", "api-smoke-main.ts"), kind: "compatibilite" },
    { name: "api-lot3", source: original, kind: "surface" },
    ...lot2,
    ...projects,
    ...futures
]
const results = []

try {
    for (const item of cases) {
        const source = item.source ?? fs.readFileSync(item.file, "utf8")
        fs.writeFileSync(testFile, source)
        const run = spawnSync(path.join(root, "node_modules", ".bin", "pxt"), ["build"], {
            cwd: root,
            encoding: "utf8",
            env: { ...process.env, PXT_COMPILE_SWITCHES: "csv---mbcodal" },
            timeout: 180000
        })
        const ok = run.status === 0
        results.push({ name: item.name, kind: item.kind, ok })
        console.log(`${ok ? "PASS" : "FAIL"}  ${item.kind.padEnd(13)} ${item.name}`)
        if (!ok) {
            console.error((run.stdout + "\n" + run.stderr).slice(-8000))
            break
        }
    }
} finally {
    fs.writeFileSync(testFile, original)
}

const expected = cases.length
const passed = results.filter(result => result.ok).length
const report = {
    generatedAt: new Date().toISOString(),
    expected,
    passed,
    projectsPassed: results.filter(r => r.kind === "projet" && r.ok).length,
    lot2MatrixPassed: results.filter(r => r.kind === "lot2" && r.ok).length,
    futureScenariosPassed: results.filter(r => r.kind === "futur" && r.ok).length,
    results
}
fs.mkdirSync(path.join(root, "verification", "results"), { recursive: true })
fs.writeFileSync(path.join(root, "verification", "results", "compile-matrix.json"), JSON.stringify(report, null, 2) + "\n")
if (passed !== expected) process.exit(1)
