namespace msmInternal {
    // État des capteurs de ligne
    export let capteur1 = false
    export let capteur2 = false
    export let capteur3 = false
    export let capteur4 = false
    export let dernierMasqueLigne = 0

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
    export let confianceMinVision = 0.4
    export let dernierNombre = 0
    export let compteurNombreStable = 0

    // Stabilisation commune aux nouvelles familles de vision.
    export let familleStabilite = FamilleStabilite.Aucune
    export let dernierIdentifiantStable = -1
    export let compteurStableGenerique = 0

    // Le profil P9/P10 reste la valeur par défaut pour compatibilité.
    export let profilPropulsion = msmSmartTools.ProfilPropulsion.QuatreRouesP9P10

    // État d'initialisation WonderCam : l'initialisation neutre ne le modifie pas.
    export let cameraInitialisee = false

    // Bras/pince classique (servos 5 et 6)
    export let BRAS_HAUT = -60
    export let BRAS_BAS = -5
    export let PINCE_OUVERTE = 15
    export let PINCE_FERMEE = -25
    export let TEMPS_MOUVEMENT = 500
    export let TEMPS_ATTENTE = 800
    export let CANAL_BRAS = 5
    export let CANAL_PINCE = 6

    // Bras 3 axes pédagogique (servos 1, 2, 3)
    export let BRAS3_DUREE = 1500
    export let BRAS3_CANAL_1 = 1
    export let BRAS3_CANAL_2 = 2
    export let BRAS3_CANAL_3 = 3
    export let bras3Repos = [-90, 45, -135]
    export let bras3Saisie = [-90, 110, -70]
    export let bras3Destination1 = [0, 90, -135]
    export let bras3Destination2 = [-45, 90, -135]
    export let bras3Destination3 = [-135, 90, -135]
    export let bras3Destination4 = [45, 90, -135]

    // Mission historique : 0 = recherche, 1 = transport
    export let modeMission = 0

    export function resetStabilites(): void {
        compteurStableR = 0
        compteurStableV = 0
        compteurStableB = 0
        compteurStableJ = 0
        resetStabiliteGenerique()
    }

    export function resetNombres(): void {
        dernierNombre = 0
        compteurNombreStable = 0
    }

    export function borner(valeur: number, minimum: number, maximum: number): number {
        if (valeur < minimum) return minimum
        if (valeur > maximum) return maximum
        return valeur
    }

    export function confirmationsValides(confirmations: number): number {
        confirmations = Math.round(confirmations)
        return borner(confirmations, 1, 100)
    }

    export function canalValide(canal: number): boolean {
        return canal >= 1 && canal <= 6 && Math.round(canal) == canal
    }

    export function resetStabiliteGenerique(): void {
        familleStabilite = FamilleStabilite.Aucune
        dernierIdentifiantStable = -1
        compteurStableGenerique = 0
    }

    export function confirmerDetection(famille: FamilleStabilite, identifiantLu: number,
        identifiantAttendu: number, confiance: number, confianceMinimum: number,
        confirmations: number): boolean {
        confirmations = confirmationsValides(confirmations)

        if (familleStabilite != famille || dernierIdentifiantStable != identifiantAttendu) {
            familleStabilite = famille
            dernierIdentifiantStable = identifiantAttendu
            compteurStableGenerique = 0
        }

        if (identifiantLu == identifiantAttendu && confiance >= confianceMinimum) {
            compteurStableGenerique += 1
        } else {
            compteurStableGenerique = 0
        }

        if (compteurStableGenerique >= confirmations) {
            resetStabiliteGenerique()
            return true
        }
        return false
    }

    export function poseBras3Axes(pose: msmSmartTools.PoseBras3Axes): number[] {
        if (pose == msmSmartTools.PoseBras3Axes.Saisie) return bras3Saisie
        if (pose == msmSmartTools.PoseBras3Axes.Destination1) return bras3Destination1
        if (pose == msmSmartTools.PoseBras3Axes.Destination2) return bras3Destination2
        if (pose == msmSmartTools.PoseBras3Axes.Destination3) return bras3Destination3
        if (pose == msmSmartTools.PoseBras3Axes.Destination4) return bras3Destination4
        return bras3Repos
    }
}

namespace msmSmartTools {
    //% block="choisir le profil de propulsion %profil"
    //% group="Réglages" advanced=true subcategory="Réglages" weight=100
    export function configurerPropulsion(profil: ProfilPropulsion): void {
        arreterRobot()
        msmInternal.profilPropulsion = profil
    }

    //% block="régler vitesses | tout droit %vTD | correction %vC | petite %vP"
    //% vTD.min=0 vTD.max=100 vTD.defl=55
    //% vC.min=0 vC.max=100 vC.defl=44
    //% vP.min=0 vP.max=100 vP.defl=33
    //% group="Réglages" advanced=true subcategory="Réglages" weight=95
    export function reglerVitesses(vTD: number, vC: number, vP: number): void {
        msmInternal.vitesseToutDroit = vTD
        msmInternal.vitesseCorrection = vC
        msmInternal.petiteVitesse = vP
    }

    //% block="régler vision | couleur ID %id | X min %xmin | X max %xmax | Y approche %y | validations %seuil"
    //% id.min=1 id.max=20 id.defl=1
    //% xmin.min=0 xmin.max=320 xmin.defl=80
    //% xmax.min=0 xmax.max=320 xmax.defl=240
    //% y.min=0 y.max=240 y.defl=237
    //% seuil.min=1 seuil.max=100 seuil.defl=8
    //% group="Réglages" advanced=true subcategory="Réglages" weight=90
    export function reglerVision(id: number, xmin: number, xmax: number, y: number, seuil: number): void {
        msmInternal.ID_CUBE = id
        msmInternal.X_MIN = xmin
        msmInternal.X_MAX = xmax
        msmInternal.Y_APPROCHE = y
        msmInternal.SEUIL_VALIDATION = seuil
        msmInternal.resetStabilites()
    }

    //% block="régler confiance mini du nombre à %c"
    //% c.min=0 c.max=1 c.defl=0.4
    //% group="Réglages" advanced=true subcategory="Réglages" weight=85
    export function reglerConfianceMiniNombre(c: number): void {
        msmInternal.confianceMinNombre = msmInternal.borner(c, 0, 1)
    }

    //% block="régler confiance mini de la vision à %c"
    //% c.min=0 c.max=1 c.defl=0.4
    //% group="Réglages" advanced=true subcategory="Réglages" weight=80
    export function reglerConfianceMiniVision(c: number): void {
        msmInternal.confianceMinVision = msmInternal.borner(c, 0, 1)
        msmInternal.resetStabiliteGenerique()
    }

    //% block="régler bras/pince | bras haut %bh | bras bas %bb | pince ouverte %po | pince fermée %pf"
    //% bh.min=-135 bh.max=135 bh.defl=-60
    //% bb.min=-135 bb.max=135 bb.defl=-5
    //% po.min=-135 po.max=135 po.defl=15
    //% pf.min=-135 pf.max=135 pf.defl=-25
    //% group="Réglages" advanced=true subcategory="Réglages" weight=75
    export function reglerBrasPince(bh: number, bb: number, po: number, pf: number): void {
        msmInternal.BRAS_HAUT = bh
        msmInternal.BRAS_BAS = bb
        msmInternal.PINCE_OUVERTE = po
        msmInternal.PINCE_FERMEE = pf
    }

    //% block="régler durée | mouvement (ms) %tm | attente (ms) %ta"
    //% tm.min=0 tm.max=65535 tm.defl=500
    //% ta.min=0 ta.max=60000 ta.defl=800
    //% group="Réglages" advanced=true subcategory="Réglages" weight=70
    export function reglerTemps(tm: number, ta: number): void {
        msmInternal.TEMPS_MOUVEMENT = msmInternal.borner(Math.round(tm), 0, 65535)
        msmInternal.TEMPS_ATTENTE = msmInternal.borner(Math.round(ta), 0, 60000)
    }

    //% block="régler durée du bras 3 axes à %d ms"
    //% d.min=0 d.max=65535 d.defl=1500
    //% group="Réglages" advanced=true subcategory="Réglages" weight=65
    export function reglerDureeBras3Axes(d: number): void {
        msmInternal.BRAS3_DUREE = msmInternal.borner(Math.round(d), 0, 65535)
    }

    //% block="configurer canaux | bras %canalBras | pince %canalPince"
    //% canalBras.min=1 canalBras.max=6 canalBras.defl=5
    //% canalPince.min=1 canalPince.max=6 canalPince.defl=6
    //% group="Réglages" advanced=true subcategory="Réglages" weight=60
    export function configurerCanauxBrasPince(canalBras: number, canalPince: number): void {
        if (msmInternal.canalValide(canalBras)) msmInternal.CANAL_BRAS = canalBras
        if (msmInternal.canalValide(canalPince)) msmInternal.CANAL_PINCE = canalPince
    }

    //% block="configurer bras 3 axes | canal 1 %canal1 | canal 2 %canal2 | canal 3 %canal3 | durée %duree ms"
    //% canal1.min=1 canal1.max=6 canal1.defl=1
    //% canal2.min=1 canal2.max=6 canal2.defl=2
    //% canal3.min=1 canal3.max=6 canal3.defl=3
    //% duree.min=0 duree.max=65535 duree.defl=1500
    //% group="Réglages" advanced=true subcategory="Réglages" weight=55
    export function configurerBras3Axes(canal1: number, canal2: number, canal3: number, duree: number): void {
        if (msmInternal.canalValide(canal1)) msmInternal.BRAS3_CANAL_1 = canal1
        if (msmInternal.canalValide(canal2)) msmInternal.BRAS3_CANAL_2 = canal2
        if (msmInternal.canalValide(canal3)) msmInternal.BRAS3_CANAL_3 = canal3
        msmInternal.BRAS3_DUREE = msmInternal.borner(Math.round(duree), 0, 65535)
    }

    //% block="configurer pose %pose | angle 1 %a1 | angle 2 %a2 | angle 3 %a3"
    //% a1.min=-135 a1.max=135 a1.defl=0
    //% a2.min=-135 a2.max=135 a2.defl=90
    //% a3.min=-135 a3.max=135 a3.defl=-135
    //% group="Réglages" advanced=true subcategory="Réglages" weight=50
    export function configurerPoseBras3Axes(pose: PoseBras3Axes, a1: number, a2: number, a3: number): void {
        let valeurs = [
            msmInternal.borner(a1, -135, 135),
            msmInternal.borner(a2, -135, 135),
            msmInternal.borner(a3, -135, 135)
        ]
        if (pose == PoseBras3Axes.Saisie) msmInternal.bras3Saisie = valeurs
        else if (pose == PoseBras3Axes.Destination1) msmInternal.bras3Destination1 = valeurs
        else if (pose == PoseBras3Axes.Destination2) msmInternal.bras3Destination2 = valeurs
        else if (pose == PoseBras3Axes.Destination3) msmInternal.bras3Destination3 = valeurs
        else if (pose == PoseBras3Axes.Destination4) msmInternal.bras3Destination4 = valeurs
        else msmInternal.bras3Repos = valeurs
    }

    //% block="initialiser la mission (ne porte rien)"
    //% group="Compatibilité" advanced=true subcategory="Compatibilité" weight=100
    export function resetMission(): void {
        msmInternal.modeMission = 0
        msmInternal.resetStabilites()
        msmInternal.resetNombres()
    }

    //% block="ID du cube"
    //% group="Réglages" advanced=true blockHidden=true subcategory="Réglages"
    export function ID_CUBE_get(): number { return msmInternal.ID_CUBE }

    //% block="Y d'approche"
    //% group="Réglages" advanced=true blockHidden=true subcategory="Réglages"
    export function Y_APPROCHE_get(): number { return msmInternal.Y_APPROCHE }

    //% block="seuil de validation"
    //% group="Réglages" advanced=true blockHidden=true subcategory="Réglages"
    export function SEUIL_VALIDATION_get(): number { return msmInternal.SEUIL_VALIDATION }

    //% block="confiance mini nombre"
    //% group="Réglages" advanced=true blockHidden=true subcategory="Réglages"
    export function confianceMiniNombre_get(): number { return msmInternal.confianceMinNombre }
}
