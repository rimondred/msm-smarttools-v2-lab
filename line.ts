namespace msmInternal {
    export function appliquerMasqueLigne(masque: number): void {
        dernierMasqueLigne = masque
        capteur1 = (masque & MasqueLigne.S1) != 0
        capteur2 = (masque & MasqueLigne.S2) != 0
        capteur3 = (masque & MasqueLigne.S3) != 0
        capteur4 = (masque & MasqueLigne.S4) != 0
    }

    export function suivreMasque(masque: number, vitesse: number, securise: boolean): void {
        vitesse = borner(Math.abs(vitesse), 0, 100)
        let correction = Math.round(vitesse * 0.8)
        let petite = Math.round(vitesse * 0.6)

        if (securise && (masque == 0 || masque == 15)) {
            msmSmartTools.arreterRobot()
        } else if ((masque & MasqueLigne.S2) != 0 && (masque & MasqueLigne.S3) != 0) {
            msmSmartTools.avancer(vitesse)
        } else if (masque == (MasqueLigne.S1 | MasqueLigne.S2)) {
            msmSmartTools.tournerAGauche(correction)
        } else if (masque == (MasqueLigne.S3 | MasqueLigne.S4)) {
            msmSmartTools.tournerADroite(correction)
        } else if (masque == MasqueLigne.S2) {
            commanderServo360(1, correction)
            commanderServo360(2, -petite)
            if (profilPropulsion != msmSmartTools.ProfilPropulsion.DeuxActionneursP8) {
                commanderServo360(3, correction)
                commanderServo360(4, -petite)
            }
        } else if (masque == MasqueLigne.S3) {
            commanderServo360(1, petite)
            commanderServo360(2, -correction)
            if (profilPropulsion != msmSmartTools.ProfilPropulsion.DeuxActionneursP8) {
                commanderServo360(3, petite)
                commanderServo360(4, -correction)
            }
        } else if (masque == MasqueLigne.S1) {
            msmSmartTools.tournerAGauche(vitesse)
        } else if (masque == MasqueLigne.S4) {
            msmSmartTools.tournerADroite(vitesse)
        } else if (securise) {
            msmSmartTools.arreterRobot()
        } else {
            msmSmartTools.avancer(petite)
        }
    }
}

namespace msmSmartTools {
    //% block="lire l'état S1-S4 de la ligne"
    //% group="Ligne" weight=80
    export function lireEtatLigne(): number {
        const masque = msmInternal.lireQuatreCapteursLigne()
        msmInternal.appliquerMasqueLigne(masque)
        return masque
    }

    //% block="lire l'état filtré de la ligne sur %confirmations lectures"
    //% confirmations.min=1 confirmations.max=25 confirmations.defl=5
    //% group="Ligne" advanced=true subcategory="Avancé" weight=100
    export function lireEtatLigneFiltre(confirmations: number): number {
        confirmations = msmInternal.confirmationsValides(confirmations)
        let c1 = 0
        let c2 = 0
        let c3 = 0
        let c4 = 0
        for (let i = 0; i < confirmations; i++) {
            let masque = msmInternal.lireQuatreCapteursLigne()
            if ((masque & msmInternal.MasqueLigne.S1) != 0) c1 += 1
            if ((masque & msmInternal.MasqueLigne.S2) != 0) c2 += 1
            if ((masque & msmInternal.MasqueLigne.S3) != 0) c3 += 1
            if ((masque & msmInternal.MasqueLigne.S4) != 0) c4 += 1
            if (i + 1 < confirmations) basic.pause(5)
        }
        let majorite = Math.idiv(confirmations, 2) + 1
        let resultat = 0
        if (c1 >= majorite) resultat |= msmInternal.MasqueLigne.S1
        if (c2 >= majorite) resultat |= msmInternal.MasqueLigne.S2
        if (c3 >= majorite) resultat |= msmInternal.MasqueLigne.S3
        if (c4 >= majorite) resultat |= msmInternal.MasqueLigne.S4
        msmInternal.appliquerMasqueLigne(resultat)
        return resultat
    }

    //% block="capteur %capteur sur noir ?"
    //% group="Ligne" weight=95
    export function capteurSurNoir(capteur: CapteurLigne): boolean {
        return (lireEtatLigne() & (capteur as number)) != 0
    }

    //% block="intersection détectée ?"
    //% group="Ligne" weight=90
    export function intersectionDetectee(): boolean {
        return lireEtatLigne() == 15
    }

    //% block="ligne perdue ?"
    //% group="Ligne" weight=85
    export function lignePerdue(): boolean {
        return lireEtatLigne() == 0
    }

    //% block="mettre à jour les capteurs de ligne"
    //% group="Avancé" advanced=true blockHidden=true subcategory="Avancé"
    export function mettreAJourCapteursLigne(): void {
        lireEtatLigne()
    }

    //% block="arrivée détectée ? (S1 S2 S3 S4 sur noir)"
    //% group="Ligne" weight=75
    export function arriveeDetectee(): boolean {
        return msmInternal.capteur1 && msmInternal.capteur2 && msmInternal.capteur3 && msmInternal.capteur4
    }

    //% block="suivre la ligne"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function suiviDeLigne(): void {
        if (msmInternal.capteur2 && msmInternal.capteur3) {
            avancer(msmInternal.vitesseToutDroit)
        } else if (msmInternal.capteur1 && msmInternal.capteur2 && (!msmInternal.capteur3 && !msmInternal.capteur4)) {
            corrigerAGauche(msmInternal.vitesseCorrection)
        } else if (msmInternal.capteur3 && msmInternal.capteur4 && (!msmInternal.capteur1 && !msmInternal.capteur2)) {
            corrigerADroite(msmInternal.vitesseCorrection)
        } else if (msmInternal.capteur2 && !msmInternal.capteur1 && (!msmInternal.capteur3 && !msmInternal.capteur4)) {
            msmInternal.commanderServo360(1, msmInternal.vitesseCorrection)
            msmInternal.commanderServo360(2, -msmInternal.petiteVitesse)
            msmInternal.commanderServo360(3, msmInternal.vitesseCorrection)
            msmInternal.commanderServo360(4, -msmInternal.petiteVitesse)
        } else if (msmInternal.capteur3 && !msmInternal.capteur1 && (!msmInternal.capteur2 && !msmInternal.capteur4)) {
            msmInternal.commanderServo360(1, msmInternal.petiteVitesse)
            msmInternal.commanderServo360(2, -msmInternal.vitesseCorrection)
            msmInternal.commanderServo360(3, msmInternal.petiteVitesse)
            msmInternal.commanderServo360(4, -msmInternal.vitesseCorrection)
        } else if (msmInternal.capteur1 && !msmInternal.capteur2 && (!msmInternal.capteur3 && !msmInternal.capteur4)) {
            corrigerAGauche(msmInternal.vitesseToutDroit)
        } else if (msmInternal.capteur4 && !msmInternal.capteur1 && (!msmInternal.capteur2 && !msmInternal.capteur3)) {
            corrigerADroite(msmInternal.vitesseToutDroit)
        } else {
            avancer(msmInternal.petiteVitesse)
        }
    }

    //% block="suivre la ligne à vitesse %vitesse (une étape)"
    //% vitesse.min=0 vitesse.max=100 vitesse.defl=55
    //% group="Ligne" weight=100
    export function suivreLigne(vitesse: number): void {
        let masque = lireEtatLigne()
        msmInternal.suivreMasque(masque, vitesse, true)
    }

    //% block="suivre la ligne à vitesse %vitesse jusqu'à intersection | timeout %timeoutMs ms"
    //% vitesse.min=0 vitesse.max=100 vitesse.defl=55
    //% timeoutMs.min=1 timeoutMs.max=60000 timeoutMs.defl=5000
    //% group="Ligne" advanced=true subcategory="Avancé" weight=95
    export function suivreJusquaIntersection(vitesse: number, timeoutMs: number): boolean {
        let duree = msmInternal.borner(Math.round(timeoutMs), 1, 60000)
        let debut = input.runningTime()
        while (input.runningTime() - debut < duree) {
            let masque = lireEtatLigne()
            if (masque == 15) {
                arreterRobot()
                return true
            }
            msmInternal.suivreMasque(masque, vitesse, true)
            if (masque == 0) {
                arreterRobot()
                return false
            }
            basic.pause(20)
        }
        arreterRobot()
        return false
    }

    //% block="quitter l'intersection vers %direction à vitesse %vitesse | timeout %timeoutMs ms"
    //% vitesse.min=0 vitesse.max=100 vitesse.defl=44
    //% timeoutMs.min=1 timeoutMs.max=60000 timeoutMs.defl=3000
    //% group="Ligne" advanced=true subcategory="Avancé" weight=90
    export function quitterIntersection(direction: Direction, vitesse: number, timeoutMs: number): boolean {
        let duree = msmInternal.borner(Math.round(timeoutMs), 1, 60000)
        let debut = input.runningTime()
        while (input.runningTime() - debut < duree) {
            if (lireEtatLigne() != 15) {
                arreterRobot()
                return true
            }
            if (direction == Direction.Gauche) tournerAGauche(vitesse)
            else tournerADroite(vitesse)
            basic.pause(20)
        }
        arreterRobot()
        return false
    }
}
