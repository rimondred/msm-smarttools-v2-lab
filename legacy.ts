/**
 * Compositions de mission historiques, conservées sans modification de
 * contrat pour rouvrir et reconstruire notamment le projet P10.
 */
namespace msmSmartTools {
    //% block="ne porte pas de cube ?"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=95
    export function nePortePasCube(): boolean {
        return msmInternal.modeMission == 0
    }

    //% block="gérer la destination (stop, déposer si besoin, demi-tour)"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=90
    export function destination(): void {
        arreterRobot()
        basic.pause(500)

        if (msmInternal.modeMission == 1) {
            deposerCube()
        }

        mettreAJourCapteursLigne()

        msmInternal.commanderServo360(1, -msmInternal.vitesseCorrection)
        msmInternal.commanderServo360(2, msmInternal.vitesseCorrection)
        msmInternal.commanderServo360(3, -msmInternal.vitesseCorrection)
        msmInternal.commanderServo360(4, msmInternal.vitesseCorrection)
        basic.pause(500)

        while (msmInternal.capteur1 || msmInternal.capteur2 || !(msmInternal.capteur3 && msmInternal.capteur4)) {
            corrigerADroite(msmInternal.vitesseCorrection)
            mettreAJourCapteursLigne()
        }
    }

    //% block="cycle mission (1 étape)"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=85
    export function cycleMission(): void {
        mettreAJourCamera()
        mettreAJourCapteursLigne()

        if (msmInternal.modeMission == 0 && cubeDetecteStable()) {
            jouerBip()
            approcherCube()
            attraperCube()
        }

        if (arriveeDetectee()) {
            destination()
        } else {
            suiviDeLigne()
        }
    }

    //% block="traiter le cube rouge"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=80
    export function traiterCubeRouge(): void {
        jouerBip()
        basic.pause(200)
        afficherCouleurDetectee(1)
        basic.pause(1000)
        saisirPieceBras3Axes()
        position1Bras3Axes()
        retourPositionInitialeBras3Axes()
        eteindreLEDs()
    }

    //% block="traiter le cube vert"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=75
    export function traiterCubeVert(): void {
        jouerBip()
        basic.pause(200)
        afficherCouleurDetectee(2)
        basic.pause(1000)
        saisirPieceBras3Axes()
        position2Bras3Axes()
        retourPositionInitialeBras3Axes()
        eteindreLEDs()
    }

    //% block="traiter le cube bleu"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=70
    export function traiterCubeBleu(): void {
        jouerBip()
        basic.pause(200)
        afficherCouleurDetectee(3)
        basic.pause(1000)
        saisirPieceBras3Axes()
        position3Bras3Axes()
        retourPositionInitialeBras3Axes()
        eteindreLEDs()
    }

    //% block="traiter le cube jaune"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=65
    export function traiterCubeJaune(): void {
        jouerBip()
        basic.pause(200)
        afficherCouleurDetectee(4)
        basic.pause(1000)
        saisirPieceBras3Axes()
        position4Bras3Axes()
        retourPositionInitialeBras3Axes()
        eteindreLEDs()
    }
}
