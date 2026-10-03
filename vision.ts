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
        if (confianceNombre() >= confianceMinNombre) {
            let lu = nombreReconnu()

            if (lu == n) {
                if (dernierNombre == n) {
                    compteurNombreStable += 1
                } else {
                    dernierNombre = n
                    compteurNombreStable = 1
                }

                if (compteurNombreStable >= seuil) {
                    resetNombres()
                    return true
                }
            } else {
                resetNombres()
            }
        } else {
            resetNombres()
        }

        return false
    }
}

namespace msmSmartTools {
    //% block="activer la reconnaissance des couleurs"
    //% group="Init"
    export function activerReconnaissanceCouleurs(): void {
        msmInternal.activerModeVision(msmInternal.ModeVision.Couleurs)
        msmInternal.resetStabilites()
    }

    //% block="activer la reconnaissance des chiffres"
    //% group="Init"
    export function activerReconnaissanceChiffres(): void {
        msmInternal.activerModeVision(msmInternal.ModeVision.Chiffres)
        msmInternal.resetNombres()
    }

    //% block="mettre à jour la caméra"
    //% group="Vision (couleur)"
    export function mettreAJourCamera(): void {
        msmInternal.actualiserCamera()
    }

    //% block="couleur ID %id détectée ?"
    //% group="Vision (couleur)"
    export function cubeDetecte(id: number): boolean {
        return msmInternal.couleurDetectee(id)
    }

    //% block="position Y de la couleur ID %id"
    //% group="Vision (couleur)"
    export function yCube(id: number): number {
        return msmInternal.positionCouleur(msmInternal.PositionCouleur.Y, id)
    }

    //% block="rouge stable ? seuil %seuil"
    //% group="Vision (couleur)"
    export function rougeStable(seuil: number): boolean {
        return msmInternal.detectionStableId(1, seuil)
    }

    //% block="vert stable ? seuil %seuil"
    //% group="Vision (couleur)"
    export function vertStable(seuil: number): boolean {
        return msmInternal.detectionStableId(2, seuil)
    }

    //% block="bleu stable ? seuil %seuil"
    //% group="Vision (couleur)"
    export function bleuStable(seuil: number): boolean {
        return msmInternal.detectionStableId(3, seuil)
    }

    //% block="jaune stable ? seuil %seuil"
    //% group="Vision (couleur)"
    export function jauneStable(seuil: number): boolean {
        return msmInternal.detectionStableId(4, seuil)
    }

    //% block="cube détecté de façon stable ?"
    //% group="Vision (couleur)"
    export function cubeDetecteStable(): boolean {
        return msmInternal.detectionStableId(msmInternal.ID_CUBE, msmInternal.SEUIL_VALIDATION)
    }

    //% block="nombre reconnu"
    //% group="Vision (chiffres)"
    export function nombreReconnu(): number {
        return msmInternal.nombreReconnu()
    }

    //% block="confiance du nombre"
    //% group="Vision (chiffres)"
    export function confianceNombre(): number {
        return msmInternal.confianceNombre()
    }

    //% block="nombre %n détecté ?"
    //% group="Vision (chiffres)"
    export function nombreDetecte(n: number): boolean {
        return confianceNombre() >= msmInternal.confianceMinNombre && nombreReconnu() == n
    }

    //% block="nombre %n détecté de façon stable ? seuil %seuil"
    //% group="Vision (chiffres)"
    export function nombreStable(n: number, seuil: number): boolean {
        return msmInternal.nombreValideEtStableInterne(n, seuil)
    }

    //% block="attendre le nombre %n stable seuil %seuil"
    //% group="Vision (chiffres)"
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
    //% group="Vision (chiffres)"
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
