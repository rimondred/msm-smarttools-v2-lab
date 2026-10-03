namespace msmSmartTools {
    //% block="avancer à vitesse %v"
    //% group="Mouvements"
    export function avancer(v: number): void {
        msmInternal.commanderServo360(1, v)
        msmInternal.commanderServo360(2, -v)
        msmInternal.commanderServo360(3, v)
        msmInternal.commanderServo360(4, -v)
    }

    //% block="reculer à vitesse %v"
    //% group="Mouvements"
    export function reculer(v: number): void {
        msmInternal.commanderServo360(1, -v)
        msmInternal.commanderServo360(2, v)
        msmInternal.commanderServo360(3, -v)
        msmInternal.commanderServo360(4, v)
    }

    //% block="arrêter le robot"
    //% group="Mouvements"
    export function arreterRobot(): void {
        msmInternal.commanderServo360(1, 0)
        msmInternal.commanderServo360(2, 0)
        msmInternal.commanderServo360(3, 0)
        msmInternal.commanderServo360(4, 0)
    }

    //% block="corriger à gauche (vitesse %v)"
    //% group="Mouvements"
    export function corrigerAGauche(v: number): void {
        msmInternal.commanderServo360(1, -v)
        msmInternal.commanderServo360(2, -v)
        msmInternal.commanderServo360(3, -v)
        msmInternal.commanderServo360(4, -v)
    }

    //% block="corriger à droite (vitesse %v)"
    //% group="Mouvements"
    export function corrigerADroite(v: number): void {
        msmInternal.commanderServo360(1, v)
        msmInternal.commanderServo360(2, v)
        msmInternal.commanderServo360(3, v)
        msmInternal.commanderServo360(4, v)
    }
}
