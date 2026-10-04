#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const modules = path.join(root, "node_modules")
if (!fs.existsSync(modules)) process.exit(0)

fs.writeFileSync(path.join(modules, "pxtcli.json"), JSON.stringify({ targetdir: "pxt-microbit" }, null, 2) + "\n")

// pxt-core 13.0.1 publié sur npm omet ces deux fichiers utilisés uniquement
// par la commande de décompilation de snippets. Le target fournit déjà les
// types réels; des placeholders rendent la commande locale reproductible.
const common = path.join(modules, "pxt-core", "libs", "pxt-common")
fs.mkdirSync(common, { recursive: true })
for (const name of ["pxt-core.d.ts", "pxt-helpers.ts"]) {
    const target = path.join(common, name)
    if (!fs.existsSync(target)) fs.writeFileSync(target, "// npm CLI compatibility placeholder\n")
}
console.log("PXT local configuré pour le target micro:bit")
