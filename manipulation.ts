namespace msmSmartTools {
    //% block="bras en haut"
    //% group="Bras & Pince"
    export function brasEnHaut(): void {
        msmInternal.positionnerServo270(5, msmInternal.BRAS_HAUT, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="bras en bas"
    //% group="Bras & Pince"
    export function brasEnBas(): void {
        msmInternal.positionnerServo270(5, msmInternal.BRAS_BAS, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="ouvrir la pince"
    //% group="Bras & Pince"
    export function ouvrirPince(): void {
        msmInternal.positionnerServo270(6, msmInternal.PINCE_OUVERTE, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="fermer la pince"
    //% group="Bras & Pince"
    export function fermerPince(): void {
        msmInternal.positionnerServo270(6, msmInternal.PINCE_FERMEE, msmInternal.TEMPS_MOUVEMENT)
    }

    //% block="servo 1 angle %a1 | servo 2 angle %a2 | servo 3 angle %a3"
    //% group="Bras & Pince"
    export function allerPositionBras3Axes(a1: number, a2: number, a3: number): void {
        msmInternal.positionnerServo270(1, a1, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(2, a2, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(3, a3, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
    }

    //% block="aller à la position 1"
    //% group="Bras & Pince"
    export function position1Bras3Axes(): void {
        allerPositionBras3Axes(0, 90, -135)
    }

    //% block="aller à la position 2"
    //% group="Bras & Pince"
    export function position2Bras3Axes(): void {
        allerPositionBras3Axes(-45, 90, -135)
    }

    //% block="aller à la position 3"
    //% group="Bras & Pince"
    export function position3Bras3Axes(): void {
        allerPositionBras3Axes(-135, 90, -135)
    }

    //% block="aller à la position 4"
    //% group="Bras & Pince"
    export function position4Bras3Axes(): void {
        allerPositionBras3Axes(45, 90, -135)
    }

    //% block="revenir à la position initiale du bras"
    //% group="Bras & Pince"
    export function retourPositionInitialeBras3Axes(): void {
        msmInternal.positionnerServo270(2, 45, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(1, -90, msmInternal.BRAS3_DUREE)
        basic.pause(1400)
        msmInternal.positionnerServo270(3, -135, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        basic.clearScreen()
    }

    //% block="saisir la pièce avec le bras"
    //% group="Bras & Pince"
    export function saisirPieceBras3Axes(): void {
        msmInternal.positionnerServo270(2, 110, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(3, -70, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
        msmInternal.positionnerServo270(2, 45, msmInternal.BRAS3_DUREE)
        basic.pause(1000)
    }
}
