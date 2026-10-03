/**
 * Types réservés à l'implémentation MSM.
 *
 * Ce namespace ne porte aucune annotation de bloc : il ne crée donc
 * aucune nouvelle primitive dans la palette élève.
 */
namespace msmInternal {
    export enum ModeVision {
        Couleurs,
        Chiffres
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
}
