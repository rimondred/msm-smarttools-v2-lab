/** Adaptateur double DaDa:bit / simulation. */
namespace msmInternal {
    export function initialiserCarte(): void {
        if (!msmSimTransport.estSimulation(false)) {
            dadabit.dadabit_init()
        }
        msmSimTransport.envoyerInitialisation()
    }

    /**
     * Convention interne : vitesse positive = sens Counterclockwise,
     * vitesse négative = sens Clockwise. La valeur n'est pas bornée afin
     * de conserver exactement la sémantique historique de l'API publique.
     */
    export function commanderServo360(index: number, vitesseSignee: number): void {
        if (!msmSimTransport.estSimulation(false)) {
            if (vitesseSignee > 0) {
                dadabit.setLego360Servo(index, dadabit.Oriention.Counterclockwise, vitesseSignee)
            } else {
                dadabit.setLego360Servo(index, dadabit.Oriention.Clockwise, -vitesseSignee)
            }
        }
        msmSimTransport.envoyerServo360(index, vitesseSignee)
    }

    export function positionnerServo270(index: number, angle: number, duree: number): void {
        if (!msmSimTransport.estSimulation(false)) {
            dadabit.setLego270Servo(index, angle, duree)
        }
        msmSimTransport.envoyerServo270(index, angle, duree)
    }

    /** Lit S1 à S4, dans le même ordre que l'implémentation historique. */
    export function lireQuatreCapteursLigne(): number {
        let masqueMateriel = 0
        if (!msmSimTransport.estSimulation(false)) {
            if (dadabit.line_followers(dadabit.LineFollowerSensors.S1, dadabit.LineColor.Black)) masqueMateriel |= MasqueLigne.S1
            if (dadabit.line_followers(dadabit.LineFollowerSensors.S2, dadabit.LineColor.Black)) masqueMateriel |= MasqueLigne.S2
            if (dadabit.line_followers(dadabit.LineFollowerSensors.S3, dadabit.LineColor.Black)) masqueMateriel |= MasqueLigne.S3
            if (dadabit.line_followers(dadabit.LineFollowerSensors.S4, dadabit.LineColor.Black)) masqueMateriel |= MasqueLigne.S4
        }
        return msmSimTransport.masqueLigneOuMateriel(masqueMateriel)
    }

    export function reglerLedsCarte(couleur: number): void {
        if (!msmSimTransport.estSimulation(false)) {
            dadabit.setBoardPixelRGB(dadabit.Lights.All, couleur as RGBColors)
        }
        msmSimTransport.envoyerLeds(couleur, false)
    }

    export function afficherLedsCarte(): void {
        if (!msmSimTransport.estSimulation(false)) {
            dadabit.showBoardLight()
        }
        msmSimTransport.envoyerLeds(msmSimTransport.derniereCouleurLed(), true)
    }

    export function eteindreLedsCarte(): void {
        if (!msmSimTransport.estSimulation(false)) {
            dadabit.clearBoardLight()
        }
        msmSimTransport.envoyerLeds(0, false)
    }
}
