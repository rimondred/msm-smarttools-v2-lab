#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { classLabels, taxonomy } from "./ux-taxonomy.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const files = fs.readdirSync(root).filter(name => name.endsWith(".ts")).sort()
const entries = []
const classification = new Map()
for (const [letter, names] of Object.entries(taxonomy)) {
    for (const name of names) classification.set(name, letter)
}

function annotationValue(annotations, name) {
    const pattern = new RegExp(`(?:^|\\s)${name}=(?:"([^"]*)"|'([^']*)'|([^\\s]+))`)
    for (const annotation of annotations) {
        const match = pattern.exec(annotation)
        if (match) return match[1] ?? match[2] ?? match[3]
    }
    return undefined
}

for (const file of files) {
    const lines = fs.readFileSync(path.join(root, file), "utf8").split(/\r?\n/)
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
            if (trimmed.startsWith("//%")) annotations.push(trimmed.slice(3).trim())
            else {
                const fn = /^export function\s+(\w+)\s*\(/.exec(trimmed)
                if (fn && annotations.some(a => a.startsWith("block="))) {
                    const block = annotationValue(annotations, "block") ?? fn[1]
                    const group = annotationValue(annotations, "group") ?? "Sans groupe"
                    const subcategory = annotationValue(annotations, "subcategory") ?? "Principale"
                    const hidden = annotationValue(annotations, "blockHidden") === "true"
                    const letter = classification.get(fn[1])
                    entries.push({ file, name: fn[1], block, group, subcategory, hidden, letter })
                    annotations = []
                } else if (trimmed && !/^export function/.test(trimmed)) annotations = []
            }
        }
        depth += [...line].reduce((n, char) => n + (char === "{" ? 1 : char === "}" ? -1 : 0), 0)
        if (namespaceDepth >= 0 && depth < namespaceDepth) {
            namespace = ""
            namespaceDepth = -1
            annotations = []
        }
    }
}

const zones = [
    ...["Initialisation", "Mouvement", "Ligne", "Vision", "Manipulation", "Feedback", "Actionneurs"]
        .map(group => ({ title: group, filter: entry => !entry.hidden && entry.subcategory === "Principale" && entry.group === group })),
    { title: "Réglages — sous-catégorie enseignant", filter: entry => !entry.hidden && entry.subcategory === "Réglages" },
    { title: "Avancé — sous-catégorie", filter: entry => !entry.hidden && entry.subcategory === "Avancé" },
    { title: "Compatibilité — sous-catégorie", filter: entry => !entry.hidden && entry.subcategory === "Compatibilité" },
    { title: "Masqués de la toolbox", filter: entry => entry.hidden }
]
const immediate = entries.filter(entry => !entry.hidden && entry.subcategory === "Principale").length
const hidden = entries.filter(entry => entry.hidden).length
let out = `# Catalogue complet des blocs — LAB 0.1.0\n\nCe catalogue est généré depuis les annotations PXT de la copie Lot 3.1. Il contient **${entries.length} API/blocs publics** : 65 historiques et 46 généraux. La toolbox expose **${immediate} blocs immédiatement** et masque **${hidden} doublons ou API techniques**; les autres blocs restent accessibles dans les sous-catégories Réglages, Avancé et Compatibilité.\n\n## Classification UX\n\n`
for (const [letter, label] of Object.entries(classLabels)) {
    out += `- **${letter} — ${label}** : ${entries.filter(entry => entry.letter === letter).length} API.\n`
}
out += "\n"
for (const zone of zones) {
    const grouped = entries.filter(zone.filter)
    if (!grouped.length) continue
    out += `## ${zone.title}\n\n| Classe | API | Intention du bloc | Groupe | Source |\n|---|---|---|---|---|\n`
    for (const entry of grouped) {
        out += `| ${entry.letter} — ${classLabels[entry.letter]} | \`${entry.name}\` | ${entry.block.replace(/\|/g, " / ")} | ${entry.group} | \`${entry.file}\` |\n`
    }
    out += "\n"
}
out += `## Enums pédagogiques\n\nLes menus déroulants visibles sont \`ProfilPropulsion\`, \`Direction\`, \`CapteurLigne\`, \`AxeVision\`, \`ModeVision\`, \`CouleurLED\`, \`PoseBras3Axes\` et \`EtatAffiche\`. Leurs valeurs sont toutes annotées et représentables dans l'éditeur Blocs.\n\n## Différence avec Hiwonder\n\nLes blocs MSM expriment une intention pédagogique stable (avancer, détecter, saisir, signaler). Les appels \`dadabit.*\` et \`wondercam.*\`, leurs orientations et leurs fonctions versionnées restent confinés aux deux adaptateurs internes.\n`
fs.writeFileSync(path.join(root, "docs", "BLOCK-CATALOG.md"), out)
console.log(`Catalogue généré : ${entries.length} blocs`)
