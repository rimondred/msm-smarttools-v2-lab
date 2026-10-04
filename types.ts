/**
 * Types réservés à l'implémentation MSM.
 *
 * Ce namespace ne porte aucune annotation de bloc : il ne crée donc
 * aucune nouvelle primitive dans la palette élève.
 */
namespace msmInternal {
    export enum ModeVision {
        Couleurs,
        Chiffres,
        Visages,
        Landmarks,
        Classification
    }

    export enum PositionCouleur {
        X,
        Y
    }

    export enum MasqueLigne {
        S1 = 1,
        S2 = 2,
        S3 = 4,
        S4 = 8
    }

    export enum CommandePropulsion {
        Avancer,
        Reculer,
        Gauche,
        Droite,
        Arret
    }

    export enum FamilleStabilite {
        Aucune,
        Couleur,
        Nombre,
        Visage,
        Landmark,
        Classification
    }
}

namespace msmSmartTools {
    export enum ProfilPropulsion {
        //% block="4 roues P9 / P10"
        QuatreRouesP9P10,
        //% block="2 actionneurs P8"
        DeuxActionneursP8,
        //% block="4 servos synchrones P6"
        QuatreServosSynchronesP6
    }

    export enum Direction {
        //% block="gauche"
        Gauche,
        //% block="droite"
        Droite
    }

    export enum CapteurLigne {
        //% block="S1"
        S1 = 1,
        //% block="S2"
        S2 = 2,
        //% block="S3"
        S3 = 4,
        //% block="S4"
        S4 = 8
    }

    export enum AxeVision {
        //% block="X"
        X,
        //% block="Y"
        Y
    }

    export enum ModeVision {
        //% block="couleur"
        Couleur,
        //% block="nombre"
        Nombre,
        //% block="visage"
        Visage,
        //% block="landmark"
        Landmark,
        //% block="classification"
        Classification
    }

    export enum CouleurLED {
        //% block="rouge"
        Rouge = 1,
        //% block="orange"
        Orange = 2,
        //% block="jaune"
        Jaune = 3,
        //% block="vert"
        Vert = 4,
        //% block="bleu"
        Bleu = 5,
        //% block="indigo"
        Indigo = 6,
        //% block="violet"
        Violet = 7,
        //% block="pourpre"
        Pourpre = 8,
        //% block="blanc"
        Blanc = 9
    }

    export enum PoseBras3Axes {
        //% block="repos"
        Repos,
        //% block="saisie"
        Saisie,
        //% block="destination 1"
        Destination1,
        //% block="destination 2"
        Destination2,
        //% block="destination 3"
        Destination3,
        //% block="destination 4"
        Destination4
    }

    export enum EtatAffiche {
        //% block="prêt"
        Pret,
        //% block="succès"
        Succes,
        //% block="attention"
        Attention,
        //% block="erreur"
        Erreur
    }
}
