/**
 * Transport privé MSM SmartTools ↔ MSM Robot Simulator.
 *
 * Le corps TypeScript des fonctions TD_NOOP / TD_ID est exécuté dans le
 * simulateur JavaScript. Lors de la compilation native, TD_NOOP supprime le
 * transport et TD_ID conserve la première valeur, calculée par le matériel.
 */
namespace msmSimTransport {
    // Identifiant local. Il devra être remplacé, avec la clé approvedRepoLib,
    // par le slug GitHub final validé par Badr avant toute soumission.
    const CANAL = "local-msm/msm-smarttools-simx-candidate"

    let ligne = 0
    let led = 0
    let detectee = false
    let identifiant = 0
    let positionX = 0
    let positionY = 0
    let confiance = 0

    //% shim=TD_NOOP
    function envoyer(message: any): void {
        control.simmessages.send(CANAL, Buffer.fromUTF8(JSON.stringify(message)), false)
    }

    export function envoyerInitialisation(): void {
        envoyer({ type: "init" })
    }

    export function envoyerServo360(channel: number, speed: number): void {
        envoyer({ type: "servo360", channel: channel, speed: speed })
    }

    export function envoyerServo270(channel: number, angle: number, duration: number): void {
        envoyer({ type: "servo270", channel: channel, angle: angle, duration: duration })
    }

    export function envoyerModeVision(mode: string): void {
        envoyer({ type: "visionMode", mode: mode })
    }

    export function envoyerLeds(couleur: number, afficher: boolean): void {
        led = couleur
        envoyer({ type: "leds", color: couleur, show: afficher })
    }

    export function derniereCouleurLed(): number {
        return led
    }

    // Le corps TypeScript n'est exécuté que par le simulateur. Dans le HEX,
    // TD_ID renvoie l'argument false : le chemin matériel reste donc actif.
    //% shim=TD_ID
    export function estSimulation(valeurMaterielle: boolean): boolean {
        return true
    }

    // En natif, TD_ID renvoie le premier argument : la valeur matérielle.
    // Dans le simulateur, le corps renvoie la dernière télémétrie simx.
    //% shim=TD_ID
    export function masqueLigneOuMateriel(masqueMateriel: number): number {
        return ligne
    }

    //% shim=TD_ID
    export function couleurDetecteeOuMateriel(valeurMaterielle: boolean): boolean {
        return detectee
    }

    //% shim=TD_ID
    export function visionDetecteeOuMateriel(valeurMaterielle: boolean): boolean {
        return detectee
    }

    //% shim=TD_ID
    export function identifiantOuMateriel(valeurMaterielle: number): number {
        return identifiant
    }

    //% shim=TD_ID
    export function positionXOuMateriel(valeurMaterielle: number): number {
        return positionX
    }

    //% shim=TD_ID
    export function positionYOuMateriel(valeurMaterielle: number): number {
        return positionY
    }

    //% shim=TD_ID
    export function confianceOuMateriel(valeurMaterielle: number): number {
        return confiance
    }

    function recevoir(buffer: Buffer): void {
        const message = JSON.parse(buffer.toString())
        if (!message.type || message.type != "sensorFrame") return
        ligne = message.line.mask
        detectee = message.vision.detected
        identifiant = message.vision.id
        positionX = message.vision.x
        positionY = message.vision.y
        confiance = message.vision.confidence
    }

    //% shim=TD_NOOP
    function enregistrerCanal(): void {
        control.simmessages.onReceived(CANAL, recevoir)
        envoyerInitialisation()
    }

    enregistrerCanal()
}
