namespace msmInternal {
    export function xDansFenetre(id: number): boolean {
        const x = positionCouleur(PositionCouleur.X, id)
        return x >= X_MIN && x <= X_MAX
    }

    export function detectionStableId(id: number, seuil: number): boolean {
        let compteur = 0

        if (id == 1) compteur = compteurStableR
        else if (id == 2) compteur = compteurStableV
        else if (id == 3) compteur = compteurStableB
        else if (id == 4) compteur = compteurStableJ
        else compteur = 0

        if (couleurDetectee(id) && xDansFenetre(id)) {
            compteur += 1
        } else {
            compteur = 0
        }

        let ok = false
        if (compteur > seuil) {
            compteur = 0
            ok = true
        }

        if (id == 1) compteurStableR = compteur
        else if (id == 2) compteurStableV = compteur
        else if (id == 3) compteurStableB = compteur
        else if (id == 4) compteurStableJ = compteur

        return ok
    }

    export function nombreValideEtStableInterne(n: number, seuil: number): boolean {
        return confirmerDetection(FamilleStabilite.Nombre, nombreReconnu(), n,
            confianceNombre(), confianceMinNombre, seuil)
    }
}

namespace msmSmartTools {
    //% block="activer la vision %mode"
    //% group="Vision" weight=100
    export function activerVision(mode: ModeVision): void {
        if (mode == ModeVision.Couleur) {
            msmInternal.activerModeVision(msmInternal.ModeVision.Couleurs)
            msmInternal.resetStabilites()
        } else if (mode == ModeVision.Nombre) {
            msmInternal.activerModeVision(msmInternal.ModeVision.Chiffres)
            msmInternal.resetNombres()
        } else if (mode == ModeVision.Visage) {
            msmInternal.activerModeVision(msmInternal.ModeVision.Visages)
        } else if (mode == ModeVision.Landmark) {
            msmInternal.activerModeVision(msmInternal.ModeVision.Landmarks)
        } else {
            msmInternal.activerModeVision(msmInternal.ModeVision.Classification)
        }
    }

    //% block="activer la reconnaissance des couleurs"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function activerReconnaissanceCouleurs(): void {
        activerVision(ModeVision.Couleur)
    }

    //% block="activer la reconnaissance des chiffres"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function activerReconnaissanceChiffres(): void {
        activerVision(ModeVision.Nombre)
    }

    //% block="mettre à jour la caméra"
    //% group="Avancé" advanced=true blockHidden=true subcategory="Avancé"
    export function mettreAJourCamera(): void {
        msmInternal.actualiserCamera()
    }

    //% block="couleur ID %id détectée ?"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function cubeDetecte(id: number): boolean {
        return couleurDetectee(id)
    }

    //% block="position Y de la couleur ID %id"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function yCube(id: number): number {
        return positionCouleur(id, AxeVision.Y)
    }

    //% block="couleur ID %id détectée ?"
    //% id.min=1 id.max=20 id.defl=1
    //% group="Vision" weight=95
    export function couleurDetectee(id: number): boolean {
        return msmInternal.couleurDetectee(id)
    }

    //% block="position de la couleur ID %id sur l'axe %axe"
    //% id.min=1 id.max=20 id.defl=1
    //% group="Vision" weight=85
    export function positionCouleur(id: number, axe: AxeVision): number {
        if (axe == AxeVision.X) return msmInternal.positionCouleur(msmInternal.PositionCouleur.X, id)
        return msmInternal.positionCouleur(msmInternal.PositionCouleur.Y, id)
    }

    //% block="couleur ID %id stable sur %confirmations confirmations ?"
    //% id.min=1 id.max=20 id.defl=1
    //% confirmations.min=1 confirmations.max=100 confirmations.defl=8
    //% group="Vision" weight=90
    export function couleurStable(id: number, confirmations: number): boolean {
        let lu = msmInternal.couleurDetectee(id) ? id : -1
        return msmInternal.confirmerDetection(msmInternal.FamilleStabilite.Couleur,
            lu, id, 1, 0, confirmations)
    }

    //% block="rouge stable ? seuil %seuil"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function rougeStable(seuil: number): boolean {
        return msmInternal.detectionStableId(1, seuil)
    }

    //% block="vert stable ? seuil %seuil"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function vertStable(seuil: number): boolean {
        return msmInternal.detectionStableId(2, seuil)
    }

    //% block="bleu stable ? seuil %seuil"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function bleuStable(seuil: number): boolean {
        return msmInternal.detectionStableId(3, seuil)
    }

    //% block="jaune stable ? seuil %seuil"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function jauneStable(seuil: number): boolean {
        return msmInternal.detectionStableId(4, seuil)
    }

    //% block="cube détecté de façon stable ?"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function cubeDetecteStable(): boolean {
        return msmInternal.detectionStableId(msmInternal.ID_CUBE, msmInternal.SEUIL_VALIDATION)
    }

    //% block="nombre reconnu"
    //% group="Vision" weight=70
    export function nombreReconnu(): number {
        return msmInternal.nombreReconnu()
    }

    //% block="confiance du nombre"
    //% group="Vision" advanced=true subcategory="Avancé" weight=85
    export function confianceNombre(): number {
        return msmInternal.confianceNombre()
    }

    //% block="nombre %n détecté ?"
    //% n.min=0 n.max=9 n.defl=1
    //% group="Vision" weight=80
    export function nombreDetecte(n: number): boolean {
        return confianceNombre() >= msmInternal.confianceMinNombre && nombreReconnu() == n
    }

    //% block="nombre %n détecté de façon stable ? seuil %seuil"
    //% n.min=0 n.max=9 n.defl=1
    //% seuil.min=1 seuil.max=100 seuil.defl=8
    //% group="Vision" weight=75
    export function nombreStable(n: number, seuil: number): boolean {
        return msmInternal.nombreValideEtStableInterne(n, seuil)
    }

    //% block="visage détecté ?"
    //% group="Vision" weight=65
    export function visageDetecte(): boolean {
        return msmInternal.visageDetecte()
    }

    //% block="position X du visage"
    //% group="Vision" weight=55
    export function xVisage(): number {
        return msmInternal.xVisage()
    }

    //% block="visage stable sur %confirmations confirmations ?"
    //% confirmations.min=1 confirmations.max=100 confirmations.defl=5
    //% group="Vision" weight=60
    export function visageStable(confirmations: number): boolean {
        let lu = msmInternal.visageDetecte() ? 1 : -1
        return msmInternal.confirmerDetection(msmInternal.FamilleStabilite.Visage,
            lu, 1, 1, 0, confirmations)
    }

    //% block="landmark reconnu"
    //% group="Vision" weight=40
    export function landmarkReconnu(): number {
        return msmInternal.landmarkReconnu()
    }

    //% block="confiance du landmark"
    //% group="Vision" advanced=true subcategory="Avancé" weight=80
    export function confianceLandmark(): number {
        return msmInternal.confianceLandmark()
    }

    //% block="landmark %id détecté ?"
    //% id.min=1 id.max=5 id.defl=1
    //% group="Vision" weight=50
    export function landmarkDetecte(id: number): boolean {
        return confianceLandmark() >= msmInternal.confianceMinVision && landmarkReconnu() == id
    }

    //% block="landmark %id stable sur %confirmations confirmations ?"
    //% id.min=1 id.max=5 id.defl=1
    //% confirmations.min=1 confirmations.max=100 confirmations.defl=8
    //% group="Vision" weight=45
    export function landmarkStable(id: number, confirmations: number): boolean {
        return msmInternal.confirmerDetection(msmInternal.FamilleStabilite.Landmark,
            landmarkReconnu(), id, confianceLandmark(), msmInternal.confianceMinVision,
            confirmations)
    }

    //% block="classe reconnue"
    //% group="Vision" weight=25
    export function classeReconnue(): number {
        return msmInternal.classeReconnue()
    }

    //% block="confiance de la classification"
    //% group="Vision" advanced=true subcategory="Avancé" weight=75
    export function confianceClassification(): number {
        return msmInternal.confianceClassification()
    }

    //% block="classe %id détectée ?"
    //% id.min=1 id.max=20 id.defl=1
    //% group="Vision" weight=35
    export function classeDetectee(id: number): boolean {
        return confianceClassification() >= msmInternal.confianceMinVision && classeReconnue() == id
    }

    //% block="classe %id stable sur %confirmations confirmations ?"
    //% id.min=1 id.max=20 id.defl=1
    //% confirmations.min=1 confirmations.max=100 confirmations.defl=8
    //% group="Vision" weight=30
    export function classeStable(id: number, confirmations: number): boolean {
        return msmInternal.confirmerDetection(msmInternal.FamilleStabilite.Classification,
            classeReconnue(), id, confianceClassification(), msmInternal.confianceMinVision,
            confirmations)
    }

    //% block="attendre vision %mode | cible %id | confirmations %confirmations | timeout %timeoutMs ms"
    //% id.min=0 id.max=20 id.defl=1
    //% confirmations.min=1 confirmations.max=100 confirmations.defl=8
    //% timeoutMs.min=1 timeoutMs.max=60000 timeoutMs.defl=5000
    //% group="Vision" advanced=true subcategory="Avancé" weight=100
    export function attendreDetectionStable(mode: ModeVision, id: number,
        confirmations: number, timeoutMs: number): boolean {
        activerVision(mode)
        let duree = msmInternal.borner(Math.round(timeoutMs), 1, 60000)
        let debut = input.runningTime()
        while (input.runningTime() - debut < duree) {
            mettreAJourCamera()
            let ok = false
            if (mode == ModeVision.Couleur) ok = couleurStable(id, confirmations)
            else if (mode == ModeVision.Nombre) ok = nombreStable(id, confirmations)
            else if (mode == ModeVision.Visage) ok = visageStable(confirmations)
            else if (mode == ModeVision.Landmark) ok = landmarkStable(id, confirmations)
            else ok = classeStable(id, confirmations)
            if (ok) return true
            basic.pause(50)
        }
        arreterRobot()
        return false
    }

    //% block="attendre le nombre %n stable seuil %seuil"
    //% n.min=0 n.max=9 n.defl=1
    //% seuil.min=1 seuil.max=100 seuil.defl=8
    //% group="Vision" advanced=true subcategory="Avancé" weight=90
    export function attendreNombreStable(n: number, seuil: number): void {
        msmInternal.resetNombres()
        while (true) {
            mettreAJourCamera()
            if (msmInternal.nombreValideEtStableInterne(n, seuil)) {
                break
            }
            basic.pause(50)
        }
    }

    //% block="attendre le chiffre 1 ou 2 stable seuil %seuil"
    //% group="Compatibilité" advanced=true blockHidden=true subcategory="Compatibilité"
    export function attendreUnOuDeuxStable(seuil: number): number {
        msmInternal.resetNombres()
        while (true) {
            mettreAJourCamera()

            if (confianceNombre() >= msmInternal.confianceMinNombre) {
                let n = nombreReconnu()

                if (n == 1 || n == 2) {
                    if (n == msmInternal.dernierNombre) {
                        msmInternal.compteurNombreStable += 1
                    } else {
                        msmInternal.dernierNombre = n
                        msmInternal.compteurNombreStable = 1
                    }

                    if (msmInternal.compteurNombreStable >= seuil) {
                        let resultat = n
                        msmInternal.resetNombres()
                        return resultat
                    }
                } else {
                    msmInternal.resetNombres()
                }
            } else {
                msmInternal.resetNombres()
            }

            basic.pause(50)
        }
        return 0
    }
}
