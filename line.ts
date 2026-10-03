namespace msmSmartTools {
    //% block="mettre à jour les capteurs de ligne"
    //% group="Capteurs ligne"
    export function mettreAJourCapteursLigne(): void {
        const masque = msmInternal.lireQuatreCapteursLigne()
        msmInternal.capteur1 = (masque & msmInternal.MasqueLigne.S1) != 0
        msmInternal.capteur2 = (masque & msmInternal.MasqueLigne.S2) != 0
        msmInternal.capteur3 = (masque & msmInternal.MasqueLigne.S3) != 0
        msmInternal.capteur4 = (masque & msmInternal.MasqueLigne.S4) != 0
    }

    //% block="arrivée détectée ? (S1 S2 S3 S4 sur noir)"
    //% group="Capteurs ligne"
    export function arriveeDetectee(): boolean {
        return msmInternal.capteur1 && msmInternal.capteur2 && msmInternal.capteur3 && msmInternal.capteur4
    }

    //% block="suivre la ligne"
    //% group="Suivi de ligne"
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
}
