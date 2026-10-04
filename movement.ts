namespace msmInternal {
    function commanderQuatre(v1: number, v2: number, v3: number, v4: number): void {
        commanderServo360(1, v1)
        commanderServo360(2, v2)
        commanderServo360(3, v3)
        commanderServo360(4, v4)
    }

    export function appliquerPropulsion(commande: CommandePropulsion, vitesse: number): void {
        vitesse = borner(Math.abs(vitesse), 0, 100)

        if (commande == CommandePropulsion.Arret) {
            if (profilPropulsion == msmSmartTools.ProfilPropulsion.DeuxActionneursP8) {
                commanderServo360(1, 0)
                commanderServo360(2, 0)
            } else {
                commanderQuatre(0, 0, 0, 0)
            }
            return
        }

        if (profilPropulsion == msmSmartTools.ProfilPropulsion.DeuxActionneursP8) {
            if (commande == CommandePropulsion.Avancer) {
                commanderServo360(1, vitesse)
                commanderServo360(2, -vitesse)
            } else if (commande == CommandePropulsion.Reculer) {
                commanderServo360(1, -vitesse)
                commanderServo360(2, vitesse)
            } else if (commande == CommandePropulsion.Gauche) {
                commanderServo360(1, -vitesse)
                commanderServo360(2, -vitesse)
            } else {
                commanderServo360(1, vitesse)
                commanderServo360(2, vitesse)
            }
            return
        }

        // P6 emploie quatre servos montés avec la même orientation physique.
        // Cette table reste à confirmer sur le robot réel, mais elle est
        // volontairement distincte du montage miroir des roues P9/P10.
        if (profilPropulsion == msmSmartTools.ProfilPropulsion.QuatreServosSynchronesP6) {
            if (commande == CommandePropulsion.Avancer) {
                commanderQuatre(vitesse, vitesse, vitesse, vitesse)
            } else if (commande == CommandePropulsion.Reculer) {
                commanderQuatre(-vitesse, -vitesse, -vitesse, -vitesse)
            } else if (commande == CommandePropulsion.Gauche) {
                commanderQuatre(-vitesse, vitesse, -vitesse, vitesse)
            } else {
                commanderQuatre(vitesse, -vitesse, vitesse, -vitesse)
            }
            return
        }

        if (commande == CommandePropulsion.Avancer) {
            commanderQuatre(vitesse, -vitesse, vitesse, -vitesse)
        } else if (commande == CommandePropulsion.Reculer) {
            commanderQuatre(-vitesse, vitesse, -vitesse, vitesse)
        } else if (commande == CommandePropulsion.Gauche) {
            commanderQuatre(-vitesse, -vitesse, -vitesse, -vitesse)
        } else {
            commanderQuatre(vitesse, vitesse, vitesse, vitesse)
        }
    }
}

namespace msmSmartTools {
    //% block="avancer à vitesse %v"
    //% v.min=0 v.max=100 v.defl=55
    //% group="Mouvement" weight=100
    export function avancer(v: number): void {
        msmInternal.appliquerPropulsion(msmInternal.CommandePropulsion.Avancer, v)
    }

    //% block="reculer à vitesse %v"
    //% v.min=0 v.max=100 v.defl=55
    //% group="Mouvement" weight=95
    export function reculer(v: number): void {
        msmInternal.appliquerPropulsion(msmInternal.CommandePropulsion.Reculer, v)
    }

    //% block="arrêter le robot"
    //% group="Mouvement" weight=90
    export function arreterRobot(): void {
        msmInternal.appliquerPropulsion(msmInternal.CommandePropulsion.Arret, 0)
    }

    //% block="tourner à gauche à vitesse %v"
    //% v.min=0 v.max=100 v.defl=44
    //% group="Mouvement" weight=80
    export function tournerAGauche(v: number): void {
        msmInternal.appliquerPropulsion(msmInternal.CommandePropulsion.Gauche, v)
    }

    //% block="tourner à droite à vitesse %v"
    //% v.min=0 v.max=100 v.defl=44
    //% group="Mouvement" weight=75
    export function tournerADroite(v: number): void {
        msmInternal.appliquerPropulsion(msmInternal.CommandePropulsion.Droite, v)
    }

    //% block="corriger à gauche (vitesse %v)"
    //% group="Avancé" advanced=true blockHidden=true subcategory="Avancé"
    export function corrigerAGauche(v: number): void {
        tournerAGauche(v)
    }

    //% block="corriger à droite (vitesse %v)"
    //% group="Avancé" advanced=true blockHidden=true subcategory="Avancé"
    export function corrigerADroite(v: number): void {
        tournerADroite(v)
    }

    //% block="avancer à vitesse %v pendant %duree ms"
    //% v.min=0 v.max=100 v.defl=55
    //% duree.min=0 duree.max=60000 duree.defl=1000
    //% group="Mouvement" advanced=true subcategory="Avancé" weight=100
    export function avancerPendant(v: number, duree: number): void {
        avancer(v)
        basic.pause(msmInternal.borner(Math.round(duree), 0, 60000))
        arreterRobot()
    }

    //% block="reculer à vitesse %v pendant %duree ms"
    //% v.min=0 v.max=100 v.defl=55
    //% duree.min=0 duree.max=60000 duree.defl=1000
    //% group="Mouvement" advanced=true subcategory="Avancé" weight=95
    export function reculerPendant(v: number, duree: number): void {
        reculer(v)
        basic.pause(msmInternal.borner(Math.round(duree), 0, 60000))
        arreterRobot()
    }

    //% block="tourner %direction à vitesse %v pendant %duree ms"
    //% v.min=0 v.max=100 v.defl=44
    //% duree.min=0 duree.max=60000 duree.defl=1000
    //% group="Mouvement" advanced=true subcategory="Avancé" weight=90
    export function tournerPendant(direction: Direction, v: number, duree: number): void {
        if (direction == Direction.Gauche) tournerAGauche(v)
        else tournerADroite(v)
        basic.pause(msmInternal.borner(Math.round(duree), 0, 60000))
        arreterRobot()
    }
}
