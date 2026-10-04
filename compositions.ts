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
    //% block="initialiser DaDa:bit (sans mouvement)"
    //% group="Initialisation" advanced=true subcategory="Avancé" weight=100
    export function initialiserDaDabit(): void {
        msmInternal.initialiserCarte()
        msmInternal.resetStabilites()
        msmInternal.resetNombres()
        msmInternal.modeMission = 0
    }

    //% block="initialiser le robot"
    //% group="Initialisation" weight=100
    export function initialiserRobot(): void {
        initialiserDaDabit()
        msmInternal.initialiserCamera()
        msmInternal.activerModeVision(msmInternal.ModeVision.Couleurs)
        brasAuRepos()
        basic.pause(500)
        msmInternal.resetStabilites()
        msmInternal.resetNombres()
        msmInternal.modeMission = 0
    }

    //% block="approcher le cube rouge"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function approcherRouge(): void {
        msmInternal.approcherId(1)
    }

    //% block="approcher le cube vert"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function approcherVert(): void {
        msmInternal.approcherId(2)
    }

    //% block="approcher le cube bleu"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function approcherBleu(): void {
        msmInternal.approcherId(3)
    }

    //% block="approcher le cube jaune"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function approcherJaune(): void {
        msmInternal.approcherId(4)
    }

    //% block="approcher le cube (jusqu'à Y d'approche)"
    //% group="Manipulation" weight=85
    export function approcherCube(): void {
        msmInternal.approcherId(msmInternal.ID_CUBE)
    }

    //% block="approcher la couleur ID %id jusqu'à Y %yCible | timeout %timeoutMs ms"
    //% id.min=1 id.max=20 id.defl=1
    //% yCible.min=0 yCible.max=240 yCible.defl=237
    //% timeoutMs.min=1 timeoutMs.max=60000 timeoutMs.defl=5000
    //% group="Manipulation" advanced=true subcategory="Avancé" weight=85
    export function approcherCouleur(id: number, yCible: number, timeoutMs: number): boolean {
        activerVision(ModeVision.Couleur)
        let duree = msmInternal.borner(Math.round(timeoutMs), 1, 60000)
        let cible = msmInternal.borner(Math.round(yCible), 0, 240)
        let debut = input.runningTime()
        while (input.runningTime() - debut < duree) {
            mettreAJourCamera()
            if (!couleurDetectee(id)) {
                arreterRobot()
                return false
            }
            if (positionCouleur(id, AxeVision.Y) >= cible) {
                arreterRobot()
                return true
            }
            suivreLigne(msmInternal.vitesseToutDroit)
            basic.pause(20)
        }
        arreterRobot()
        return false
    }

    //% block="bras au repos (bras haut + pince ouverte)"
    //% group="Manipulation" weight=100
    export function brasAuRepos(): void {
        brasEnHaut()
        basic.pause(300)
        ouvrirPince()
        basic.pause(300)
    }

    //% block="saisir l'objet"
    //% group="Manipulation" weight=95
    export function saisirObjet(): void {
        arreterRobot()
        basic.pause(500)
        brasEnBas()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        fermerPince()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        brasEnHaut()
        basic.pause(msmInternal.TEMPS_ATTENTE)
    }

    //% block="déposer l'objet"
    //% group="Manipulation" weight=90
    export function deposerObjet(): void {
        brasEnBas()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        ouvrirPince()
        basic.pause(msmInternal.TEMPS_ATTENTE)
        brasEnHaut()
        basic.pause(msmInternal.TEMPS_ATTENTE)
    }

    //% block="attraper le cube"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function attraperCube(): void {
        saisirObjet()
        msmInternal.modeMission = 1
    }

    //% block="déposer le cube"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function deposerCube(): void {
        deposerObjet()
        msmInternal.modeMission = 0
    }
}
