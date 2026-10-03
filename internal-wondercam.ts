/**
 * Adaptateur matériel WonderCam.
 * Seul ce fichier appelle directement l'API Hiwonder `wondercam`.
 */
namespace msmInternal {
    export function initialiserCamera(): void {
        wondercam.wondercam_init(wondercam.DEV_ADDR.x32)
    }

    export function activerModeVision(mode: ModeVision): void {
        if (mode == ModeVision.Couleurs) {
            wondercam.ChangeFunc(wondercam.Functions.ColorDetect)
        } else {
            wondercam.ChangeFunc(wondercam.Functions.NumberRecognition)
        }
    }

    export function actualiserCamera(): void {
        wondercam.UpdateResult()
    }

    export function couleurDetectee(id: number): boolean {
        return wondercam.isDetectedColorId(id)
    }

    export function positionCouleur(position: PositionCouleur, id: number): number {
        if (position == PositionCouleur.X) {
            return wondercam.XOfColorId(wondercam.Options.Pos_X, id)
        }
        return wondercam.XOfColorId(wondercam.Options.Pos_Y, id)
    }

    export function nombreReconnu(): number {
        return wondercam.NumberWithMaxConfidence()
    }

    export function confianceNombre(): number {
        return wondercam.MaxConfidenceOfNumber()
    }
}
