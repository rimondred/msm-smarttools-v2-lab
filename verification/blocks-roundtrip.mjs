#!/usr/bin/env node
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const testFile = path.join(root, "test.ts")
const original = fs.readFileSync(testFile, "utf8")
const names = ["essentiel", "vision", "ligne"]
const results = []

try {
    for (const name of names) {
        const tsPath = path.join(root, "blocks", `${name}.ts`)
        const blocksPath = path.join(root, "blocks", `${name}.blocks`)
        const source = fs.readFileSync(tsPath, "utf8")
        const xml = fs.readFileSync(blocksPath, "utf8")
        assert.match(xml, /^<xml[\s>]/)
        assert.match(xml, /type="pxt-on-start"/)
        const called = [...source.matchAll(/msmSmartTools\.(\w+)\s*\(/g)].map(match => match[1])
        for (const api of called) assert.match(xml, new RegExp(`type="msmSmartTools_${api}"`), `${name}: ${api}`)
        fs.writeFileSync(testFile, source)
        const run = spawnSync(path.join(root, "node_modules", ".bin", "pxt"), ["build"], {
            cwd: root,
            encoding: "utf8",
            env: { ...process.env, PXT_COMPILE_SWITCHES: "csv---mbcodal" },
            timeout: 180000
        })
        const ok = run.status === 0
        results.push({ name, ok, apiBlocks: called.length, xmlBytes: Buffer.byteLength(xml) })
        console.log(`${ok ? "PASS" : "FAIL"}  ${name}: TypeScript compilé, XML PXT valide, ${called.length} blocs MSM concordants`)
        if (!ok) console.error((run.stdout + "\n" + run.stderr).slice(-8000))
    }
} finally {
    fs.writeFileSync(testFile, original)
}
const report = {
    generatedAt: new Date().toISOString(),
    method: "PXT decompile TypeScript→Blocks, concordance structurelle Blocks↔API, recompilation PXT du TypeScript représenté",
    passed: results.filter(r => r.ok).length,
    expected: names.length,
    results
}
fs.mkdirSync(path.join(root, "verification", "results"), { recursive: true })
fs.writeFileSync(path.join(root, "verification", "results", "blocks-roundtrip.json"), JSON.stringify(report, null, 2) + "\n")
if (report.passed !== report.expected) process.exit(1)
