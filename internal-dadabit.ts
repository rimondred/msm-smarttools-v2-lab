/**
 * Adaptateur matériel DaDa:bit.
 * Seul ce fichier appelle directement l'API Hiwonder `dadabit`.
 */
namespace msmInternal {
    export function initialiserCarte(): void {
        dadabit.dadabit_init()
    }

    /**
     * Convention interne : vitesse positive = sens Counterclockwise,
     * vitesse négative = sens Clockwise. La valeur n'est pas bornée afin
     * de conserver exactement la sémantique historique de l'API publique.
     */
    export function commanderServo360(index: number, vitesseSignee: number): void {
        if (vitesseSignee > 0) {
            dadabit.setLego360Servo(index, dadabit.Oriention.Counterclockwise, vitesseSignee)
        } else {
            dadabit.setLego360Servo(index, dadabit.Oriention.Clockwise, -vitesseSignee)
        }
    }

    export function positionnerServo270(index: number, angle: number, duree: number): void {
        dadabit.setLego270Servo(index, angle, duree)
    }

    /** Lit S1 à S4, dans le même ordre que l'implémentation historique. */
    export function lireQuatreCapteursLigne(): number {
        let masque = 0
        if (dadabit.line_followers(dadabit.LineFollowerSensors.S1, dadabit.LineColor.Black)) masque |= MasqueLigne.S1
        if (dadabit.line_followers(dadabit.LineFollowerSensors.S2, dadabit.LineColor.Black)) masque |= MasqueLigne.S2
        if (dadabit.line_followers(dadabit.LineFollowerSensors.S3, dadabit.LineColor.Black)) masque |= MasqueLigne.S3
        if (dadabit.line_followers(dadabit.LineFollowerSensors.S4, dadabit.LineColor.Black)) masque |= MasqueLigne.S4
        return masque
    }

    export function reglerLedsCarte(couleur: RGBColors): void {
        dadabit.setBoardPixelRGB(dadabit.Lights.All, couleur)
    }

    export function afficherLedsCarte(): void {
        dadabit.showBoardLight()
    }

    export function eteindreLedsCarte(): void {
        dadabit.clearBoardLight()
    }
}
