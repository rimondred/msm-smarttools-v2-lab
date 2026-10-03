namespace msmSmartTools {
    //% block="afficher la couleur LED pour ID %id"
    //% group="Vision (couleur)"
    export function afficherCouleurDetectee(id: number): void {
        if (id == 1) {
            msmInternal.reglerLedsCarte(RGBColors.Red)
        } else if (id == 2) {
            msmInternal.reglerLedsCarte(RGBColors.Green)
        } else if (id == 3) {
            msmInternal.reglerLedsCarte(RGBColors.Blue)
        } else if (id == 4) {
            msmInternal.reglerLedsCarte(RGBColors.Yellow)
        }
        msmInternal.afficherLedsCarte()
    }

    //% block="éteindre les LEDs"
    //% group="Vision (couleur)"
    export function eteindreLEDs(): void {
        msmInternal.eteindreLedsCarte()
    }

    //% block="bip (signal sonore)"
    //% group="Mission"
    export function jouerBip(): void {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
}
