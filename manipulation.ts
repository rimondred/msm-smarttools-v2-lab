namespace msmSmartTools {
    //% block="faire tourner l'actionneur %numero à vitesse signée %vitesseSignee"
    //% numero.min=1 numero.max=6 numero.defl=1
    //% vitesseSignee.min=-100 vitesseSignee.max=100 vitesseSignee.defl=50
    //% group="Actionneurs" weight=90
    export function faireTournerActionneur(numero: number, vitesseSignee: number): void {
        if (!msmInternal.canalValide(numero)) return
        msmInternal.commanderServo360(numero,
            msmInternal.borner(Math.round(vitesseSignee), -100, 100))
    }

    //% block="arrêter l'actionneur %numero"
    //% numero.min=1 numero.max=6 numero.defl=1
    //% group="Actionneurs" weight=85
    export function arreterActionneur(numero: number): void {
        if (!msmInternal.canalValide(numero)) return
        msmInternal.commanderServo360(numero, 0)
    }

    //% block="positionner l'actionneur %numero à %angle ° en %duree ms"
    //% numero.min=1 numero.max=6 numero.defl=1
    //% angle.min=-135 angle.max=135 angle.defl=0
    //% duree.min=0 duree.max=65535 duree.defl=500
    //% group="Actionneurs" weight=100
    export function positionnerActionneur(numero: number, angle: number, duree: number): void {
        if (!msmInternal.canalValide(numero)) return
        msmInternal.positionnerServo270(numero,
            msmInternal.borner(angle, -135, 135),
            msmInternal.borner(Math.round(duree), 0, 65535))
    }

    //% block="actionner %numero à %angleAction ° puis revenir à %angleRepos ° après %attente ms"
    //% numero.min=1 numero.max=6 numero.defl=1
    //% angleAction.min=-135 angleAction.max=135 angleAction.defl=20
    //% angleRepos.min=-135 angleRepos.max=135 angleRepos.defl=0
    //% attente.min=0 attente.max=60000 attente.defl=1000
    //% group="Actionneurs" weight=95
    export function actionnerPuisRevenir(numero: number, angleAction: number,
        angleRepos: number, attente: number): void {
        if (!msmInternal.canalValide(numero)) return
        positionnerActionneur(numero, angleAction, msmInternal.TEMPS_MOUVEMENT)
        basic.pause(msmInternal.borner(Math.round(attente), 0, 60000))
        positionnerActionneur(numero, angleRepos, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="bras en haut"
    //% group="Manipulation" weight=80
    export function brasEnHaut(): void {
        msmInternal.positionnerServo270(msmInternal.CANAL_BRAS, msmInternal.BRAS_HAUT, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="bras en bas"
    //% group="Manipulation" weight=75
    export function brasEnBas(): void {
        msmInternal.positionnerServo270(msmInternal.CANAL_BRAS, msmInternal.BRAS_BAS, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="ouvrir la pince"
    //% group="Manipulation" weight=70
    export function ouvrirPince(): void {
        msmInternal.positionnerServo270(msmInternal.CANAL_PINCE, msmInternal.PINCE_OUVERTE, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="fermer la pince"
    //% group="Manipulation" weight=65
    export function fermerPince(): void {
        msmInternal.positionnerServo270(msmInternal.CANAL_PINCE, msmInternal.PINCE_FERMEE, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="déplacer le bras 3 axes | angle 1 %a1 | angle 2 %a2 | angle 3 %a3 | durée %duree ms"
    //% a1.min=-135 a1.max=135 a1.defl=0
    //% a2.min=-135 a2.max=135 a2.defl=90
    //% a3.min=-135 a3.max=135 a3.defl=-135
    //% duree.min=0 duree.max=65535 duree.defl=1500
    //% group="Manipulation" advanced=true subcategory="Avancé" weight=80
    export function deplacerBras3Axes(a1: number, a2: number, a3: number, duree: number): void {
        let d = msmInternal.borner(Math.round(duree), 0, 65535)
        positionnerActionneur(msmInternal.BRAS3_CANAL_1, a1, d)
        positionnerActionneur(msmInternal.BRAS3_CANAL_2, a2, d)
        positionnerActionneur(msmInternal.BRAS3_CANAL_3, a3, d)
        basic.pause(d)
    }

    //% block="aller à la pose du bras 3 axes %pose"
    //% group="Manipulation" weight=60
    export function allerPoseBras3Axes(pose: PoseBras3Axes): void {
        let angles = msmInternal.poseBras3Axes(pose)
        deplacerBras3Axes(angles[0], angles[1], angles[2], msmInternal.BRAS3_DUREE)
    }

    //% block="servo 1 angle %a1 | servo 2 angle %a2 | servo 3 angle %a3"
    //% group="Manipulation" advanced=true subcategory="Avancé" weight=75
    export function allerPositionBras3Axes(a1: number, a2: number, a3: number): void {
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_1, a1, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_2, a2, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_3, a3, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
    }

    //% block="aller à la position 1"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function position1Bras3Axes(): void {
        allerPositionBras3Axes(0, 90, -135)
    }

    //% block="aller à la position 2"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function position2Bras3Axes(): void {
        allerPositionBras3Axes(-45, 90, -135)
    }

    //% block="aller à la position 3"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function position3Bras3Axes(): void {
        allerPositionBras3Axes(-135, 90, -135)
    }

    //% block="aller à la position 4"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function position4Bras3Axes(): void {
        allerPositionBras3Axes(45, 90, -135)
    }

    //% block="revenir à la position initiale du bras"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function retourPositionInitialeBras3Axes(): void {
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_2, 45, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_1, -90, msmInternal.BRAS3_DUREE)
        basic.pause(1400)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_3, -135, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        basic.clearScreen()
    }

    //% block="saisir la pièce avec le bras"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function saisirPieceBras3Axes(): void {
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_2, 110, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_3, -70, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(msmInternal.BRAS3_CANAL_2, 45, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
    }
}
