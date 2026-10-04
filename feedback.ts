namespace msmSmartTools {
    //% block="allumer les LEDs en %couleur"
    //% group="Feedback" weight=90
    export function allumerLEDs(couleur: CouleurLED): void {
        msmInternal.reglerLedsCarte(couleur as number)
        msmInternal.afficherLedsCarte()
    }

    //% block="afficher l'état %etat"
    //% group="Feedback" weight=100
    export function afficherEtat(etat: EtatAffiche): void {
        if (etat == EtatAffiche.Succes) basic.showString("OK")
        else if (etat == EtatAffiche.Attention) basic.showString("!")
        else if (etat == EtatAffiche.Erreur) basic.showString("E")
        else basic.showString("R")
    }

    //% block="afficher la couleur LED pour ID %id"
    //% id.min=1 id.max=4 id.defl=1
    //% group="Feedback" weight=85
    export function afficherCouleurDetectee(id: number): void {
        if (id == 1) {
            allumerLEDs(CouleurLED.Rouge)
        } else if (id == 2) {
            allumerLEDs(CouleurLED.Vert)
        } else if (id == 3) {
            allumerLEDs(CouleurLED.Bleu)
        } else if (id == 4) {
            allumerLEDs(CouleurLED.Jaune)
        } else {
            eteindreLEDs()
        }
    }

    //% block="éteindre les LEDs"
    //% group="Feedback" weight=80
    export function eteindreLEDs(): void {
        msmInternal.eteindreLedsCarte()
    }

    //% block="bip (signal sonore)"
    //% group="Feedback" weight=70
    export function jouerBip(): void {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
}
