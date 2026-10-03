namespace msmInternal {
    // État des capteurs de ligne
    export let capteur1 = false
    export let capteur2 = false
    export let capteur3 = false
    export let capteur4 = false

    // Vitesses
    export let vitesseToutDroit = 55
    export let vitesseCorrection = 44
    export let petiteVitesse = 33

    // Vision couleur
    export let ID_CUBE = 1
    export let X_MIN = 80
    export let X_MAX = 240
    export let Y_APPROCHE = 237
    export let SEUIL_VALIDATION = 8

    // Compteurs de stabilité, un par couleur
    export let compteurStableR = 0
    export let compteurStableV = 0
    export let compteurStableB = 0
    export let compteurStableJ = 0

    // Vision chiffres
    export let confianceMinNombre = 0.4
    export let dernierNombre = 0
    export let compteurNombreStable = 0

    // Bras/pince classique (servos 5 et 6)
    export let BRAS_HAUT = -60
    export let BRAS_BAS = -5
    export let PINCE_OUVERTE = 15
    export let PINCE_FERMEE = -25
    export let TEMPS_MOUVEMENT = 500
    export let TEMPS_ATTENTE = 800

    // Bras 3 axes pédagogique (servos 1, 2, 3)
    export let BRAS3_DUREE = 1500

    // Mission historique : 0 = recherche, 1 = transport
    export let modeMission = 0

    export function resetStabilites(): void {
        compteurStableR = 0
        compteurStableV = 0
        compteurStableB = 0
        compteurStableJ = 0
    }

    export function resetNombres(): void {
        dernierNombre = 0
        compteurNombreStable = 0
    }
}

namespace msmSmartTools {
    //% block="régler vitesses | tout droit %vTD | correction %vC | petite %vP"
    //% group="Réglages"
    export function reglerVitesses(vTD: number, vC: number, vP: number): void {
        msmInternal.vitesseToutDroit = vTD
        msmInternal.vitesseCorrection = vC
        msmInternal.petiteVitesse = vP
    }

    //% block="régler vision | couleur ID %id | X min %xmin | X max %xmax | Y approche %y | validations %seuil"
    //% group="Réglages"
    export function reglerVision(id: number, xmin: number, xmax: number, y: number, seuil: number): void {
        msmInternal.ID_CUBE = id
        msmInternal.X_MIN = xmin
        msmInternal.X_MAX = xmax
        msmInternal.Y_APPROCHE = y
        msmInternal.SEUIL_VALIDATION = seuil
        msmInternal.resetStabilites()
    }

    //% block="régler confiance mini du nombre à %c"
    //% group="Réglages"
    export function reglerConfianceMiniNombre(c: number): void {
        msmInternal.confianceMinNombre = c
    }

    //% block="régler bras/pince | bras haut %bh | bras bas %bb | pince ouverte %po | pince fermée %pf"
    //% group="Réglages"
    export function reglerBrasPince(bh: number, bb: number, po: number, pf: number): void {
        msmInternal.BRAS_HAUT = bh
        msmInternal.BRAS_BAS = bb
        msmInternal.PINCE_OUVERTE = po
        msmInternal.PINCE_FERMEE = pf
    }

    //% block="régler durée | mouvement (ms) %tm | attente (ms) %ta"
    //% group="Réglages"
    export function reglerTemps(tm: number, ta: number): void {
        msmInternal.TEMPS_MOUVEMENT = tm
        msmInternal.TEMPS_ATTENTE = ta
    }

    //% block="régler durée du bras 3 axes à %d ms"
    //% group="Réglages"
    export function reglerDureeBras3Axes(d: number): void {
        msmInternal.BRAS3_DUREE = d
    }

    //% block="initialiser la mission (ne porte rien)"
    //% group="Réglages"
    export function resetMission(): void {
        msmInternal.modeMission = 0
        msmInternal.resetStabilites()
        msmInternal.resetNombres()
    }

    //% block="ID du cube"
    //% group="Réglages"
    export function ID_CUBE_get(): number { return msmInternal.ID_CUBE }

    //% block="Y d'approche"
    //% group="Réglages"
    export function Y_APPROCHE_get(): number { return msmInternal.Y_APPROCHE }

    //% block="seuil de validation"
    //% group="Réglages"
    export function SEUIL_VALIDATION_get(): number { return msmInternal.SEUIL_VALIDATION }

    //% block="confiance mini nombre"
    //% group="Réglages"
    export function confianceMiniNombre_get(): number { return msmInternal.confianceMinNombre }
}
