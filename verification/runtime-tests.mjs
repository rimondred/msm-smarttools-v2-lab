#!/usr/bin/env node
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"
import ts from "../node_modules/pxt-core/built/web/typescript.js"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const pxt = JSON.parse(fs.readFileSync(path.join(root, "pxt.json"), "utf8"))
const source = pxt.files.filter(name => name.endsWith(".ts"))
    .map(name => fs.readFileSync(path.join(root, name), "utf8"))
    .join("\n")
const js = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.None }
}).outputText

let now = 0
let receiver
let sent = []
let displays = []
let sounds = 0
class PxtBuffer {
    constructor(text) { this.text = text }
    toString() { return this.text }
    static fromUTF8(text) { return new PxtBuffer(text) }
}
const math = Object.create(Math)
math.idiv = (a, b) => Math.trunc(a / b)
math.map = (v, a, b, c, d) => c + (v - a) * (d - c) / (b - a)
const context = vm.createContext({
    console,
    JSON,
    Math: math,
    Buffer: PxtBuffer,
    control: { simmessages: {
        send: (_channel, buffer) => sent.push(JSON.parse(buffer.toString())),
        onReceived: (_channel, callback) => { receiver = callback }
    } },
    basic: {
        pause: ms => { now += Math.max(0, ms) },
        showString: value => displays.push(String(value)),
        clearScreen: () => displays.push("clear")
    },
    input: { runningTime: () => now },
    music: {
        PlaybackMode: { UntilDone: 0 },
        tonePlayable: (frequency, duration) => ({ frequency, duration }),
        beat: () => 500,
        play: () => { sounds++ }
    },
    BeatFraction: { Whole: 0 },
    dadabit: {}, wondercam: {}, RGBColors: {}
})
vm.runInContext(js, context, { filename: "lot3-runtime.js" })
const api = context.msmSmartTools
const tests = []
function test(name, fn) {
    sent = []
    try {
        fn()
        tests.push({ name, ok: true })
        console.log(`PASS  ${name}`)
    } catch (error) {
        tests.push({ name, ok: false, error: error.message })
        console.error(`FAIL  ${name}: ${error.message}`)
    }
}
function sensor(lineMask, detected = false, id = 0, x = 0, y = 0, confidence = 0) {
    receiver(new PxtBuffer(JSON.stringify({
        type: "sensorFrame", line: { mask: lineMask },
        vision: { detected, id, x, y, confidence }
    })))
}
function messages(type) { return sent.filter(message => message.type === type) }

test("initialisation neutre sans mouvement ni mode vision", () => {
    api.initialiserDaDabit()
    assert.equal(messages("init").length, 1)
    assert.equal(messages("servo360").length + messages("servo270").length, 0)
    assert.equal(messages("visionMode").length, 0)
})
test("servo 360: vitesse bornée et canal invalide ignoré", () => {
    api.faireTournerActionneur(1, 140)
    api.faireTournerActionneur(7, 50)
    assert.deepEqual(messages("servo360"), [{ type: "servo360", channel: 1, speed: 100 }])
})
test("servo 360: arrêt ciblé", () => {
    api.arreterActionneur(3)
    assert.equal(messages("servo360")[0].speed, 0)
})
test("servo 270: angle et durée bornés", () => {
    api.positionnerActionneur(2, 200, 99999)
    assert.deepEqual(messages("servo270")[0], { type: "servo270", channel: 2, angle: 135, duration: 65535 })
})
test("profil P9/P10: quatre roues", () => {
    api.configurerPropulsion(api.ProfilPropulsion.QuatreRouesP9P10)
    sent = []
    api.avancer(60)
    assert.deepEqual(messages("servo360").map(x => x.speed), [60, -60, 60, -60])
})
test("profil P8: deux actionneurs", () => {
    api.configurerPropulsion(api.ProfilPropulsion.DeuxActionneursP8)
    sent = []
    api.avancer(60)
    assert.deepEqual(messages("servo360").map(x => x.speed), [60, -60])
})
test("profil P6: quatre servos synchrones", () => {
    api.configurerPropulsion(api.ProfilPropulsion.QuatreServosSynchronesP6)
    sent = []
    api.avancer(40)
    assert.deepEqual(messages("servo360").map(x => x.speed), [40, 40, 40, 40])
})
test("ligne: lecture fraîche et capteur", () => {
    sensor(6)
    assert.equal(api.lireEtatLigne(), 6)
    assert.equal(api.capteurSurNoir(api.CapteurLigne.S2), true)
})
test("ligne: perte et intersection", () => {
    sensor(0)
    assert.equal(api.lignePerdue(), true)
    sensor(15)
    assert.equal(api.intersectionDetectee(), true)
})
test("suivi sécurisé: perte provoque arrêt", () => {
    sensor(0)
    api.suivreLigne(55)
    assert.ok(messages("servo360").every(x => x.speed === 0))
})
test("vision: cinq modes envoyés au simulateur", () => {
    for (const mode of [api.ModeVision.Couleur, api.ModeVision.Nombre, api.ModeVision.Visage, api.ModeVision.Landmark, api.ModeVision.Classification]) api.activerVision(mode)
    assert.deepEqual(messages("visionMode").map(x => x.mode), ["color", "number", "face", "landmark", "classification"])
})
test("vision couleur: détection et positions", () => {
    sensor(0, true, 3, 120, 210, 0.9)
    assert.equal(api.couleurDetectee(3), true)
    assert.equal(api.positionCouleur(3, api.AxeVision.X), 120)
    assert.equal(api.positionCouleur(3, api.AxeVision.Y), 210)
})
test("vision nombre: identifiant et confiance", () => {
    sensor(0, true, 2, 0, 0, 0.8)
    assert.equal(api.nombreReconnu(), 2)
    assert.equal(api.confianceNombre(), 0.8)
    assert.equal(api.nombreDetecte(2), true)
})
test("vision visage", () => {
    sensor(0, true, 0, 177, 0, 1)
    assert.equal(api.visageDetecte(), true)
    assert.equal(api.xVisage(), 177)
})
test("vision landmark", () => {
    sensor(0, true, 4, 0, 0, 0.85)
    assert.equal(api.landmarkReconnu(), 4)
    assert.equal(api.landmarkDetecte(4), true)
})
test("vision classification", () => {
    sensor(0, true, 2, 0, 0, 0.91)
    assert.equal(api.classeReconnue(), 2)
    assert.equal(api.classeDetectee(2), true)
})
test("stabilisation générique N confirmations", () => {
    sensor(0, true, 3, 0, 0, 0.9)
    assert.equal(api.classeStable(3, 3), false)
    assert.equal(api.classeStable(3, 3), false)
    assert.equal(api.classeStable(3, 3), true)
})
test("timeout vision: résultat faux et arrêt sûr", () => {
    sensor(0, false, 0, 0, 0, 0)
    assert.equal(api.attendreDetectionStable(api.ModeVision.Couleur, 1, 2, 100), false)
    assert.ok(messages("servo360").slice(-4).every(x => x.speed === 0))
})
test("feedback: LEDs, état et bip", () => {
    displays = []; sounds = 0
    api.allumerLEDs(api.CouleurLED.Bleu)
    api.afficherEtat(api.EtatAffiche.Succes)
    api.jouerBip()
    assert.equal(messages("leds").at(-1).color, api.CouleurLED.Bleu)
    assert.deepEqual(displays, ["OK"])
    assert.equal(sounds, 1)
})
test("manipulation et wrappers historiques", () => {
    api.configurerCanauxBrasPince(5, 6)
    api.attraperCube()
    assert.equal(api.nePortePasCube(), false)
    api.deposerCube()
    assert.equal(api.nePortePasCube(), true)
    assert.ok(messages("servo270").length >= 6)
})

const report = { generatedAt: new Date().toISOString(), passed: tests.filter(t => t.ok).length, expected: tests.length, tests }
fs.mkdirSync(path.join(root, "verification", "results"), { recursive: true })
fs.writeFileSync(path.join(root, "verification", "results", "runtime-tests.json"), JSON.stringify(report, null, 2) + "\n")
if (report.passed !== report.expected) process.exit(1)
