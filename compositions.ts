namespace msmInternal {
    export function approcherId(id: number): void {
        while (positionCouleur(PositionCouleur.Y, id) < Y_APPROCHE
            && couleurDetectee(id)) {
            msmSmartTools.mettreAJourCamera()
            msmSmartTools.mettreAJourCapteursLigne()
            msmSmartTools.suiviDeLigne()
        }
    }
}

namespace msmSmartTools {
    //% block="initialiser le robot"
    //% group="Init"
    export function initialiserRobot(): void {
        msmInternal.initialiserCarte()
        msmInternal.initialiserCamera()
        msmInternal.activerModeVision(msmInternal.ModeVision.Couleurs)
        brasAuRepos()
        basic.pause(500)
        msmInternal.resetStabilites()
        msmInternal.resetNombres()
        msmInternal.modeMission = 0
    }

    //% block="approcher le cube rouge"
    //% group="Vision (couleur)"
    export function approcherRouge(): void {
        msmInternal.approcherId(1)
    }

    //% block="approcher le cube vert"
    //% group="Vision (couleur)"
    export function approcherVert(): void {
        msmInternal.approcherId(2)
    }

    //% block="approcher le cube bleu"
    //% group="Vision (couleur)"
    export function approcherBleu(): void {
        msmInternal.approcherId(3)
    }

    //% block="approcher le cube jaune"
    //% group="Vision (couleur)"
    export function approcherJaune(): void {
        msmInternal.approcherId(4)
    }

    //% block="approcher le cube (jusqu'à Y d'approche)"
    //% group="Vision (couleur)"
    export function approcherCube(): void {
        msmInternal.approcherId(msmInternal.ID_CUBE)
    }

    //% block="bras au repos (bras haut + pince ouverte)"
    //% group="Bras & Pince"
    export function brasAuRepos(): void {
        brasEnHaut()
        basic.pause(300)
        ouvrirPince()
        basic.pause(300)
    }

    //% block="attraper le cube"
    //% group="Bras & Pince"
    export function attraperCube(): void {
        arreterRobot()
        basic.pause(500)
        brasEnBas()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        fermerPince()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        brasEnHaut()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        msmInternal.modeMission = 1
    }

    //% block="déposer le cube"
    //% group="Bras & Pince"
    export function deposerCube(): void {
        brasEnBas()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        ouvrirPince()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        brasEnHaut()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        msmInternal.modeMission = 0
    }
}
