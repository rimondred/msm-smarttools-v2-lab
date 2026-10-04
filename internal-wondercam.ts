/** Adaptateur double WonderCam / simulation. */
namespace msmInternal {
    export function initialiserCamera(): void {
        if (!msmSimTransport.estSimulation(false)) {
            wondercam.wondercam_init(wondercam.DEV_ADDR.x32)
        }
        cameraInitialisee = true
    }

    export function assurerCameraInitialisee(): void {
        if (!cameraInitialisee) initialiserCamera()
    }

    export function activerModeVision(mode: ModeVision): void {
        assurerCameraInitialisee()
        if (mode == ModeVision.Couleurs) {
            if (!msmSimTransport.estSimulation(false)) wondercam.ChangeFunc(wondercam.Functions.ColorDetect)
            msmSimTransport.envoyerModeVision("color")
        } else if (mode == ModeVision.Chiffres) {
            if (!msmSimTransport.estSimulation(false)) wondercam.ChangeFunc(wondercam.Functions.NumberRecognition)
            msmSimTransport.envoyerModeVision("number")
        } else if (mode == ModeVision.Visages) {
            if (!msmSimTransport.estSimulation(false)) wondercam.ChangeFunc(wondercam.Functions.FaceDetect)
            msmSimTransport.envoyerModeVision("face")
        } else if (mode == ModeVision.Landmarks) {
            if (!msmSimTransport.estSimulation(false)) wondercam.ChangeFunc(wondercam.Functions.LandmarkRecognition)
            msmSimTransport.envoyerModeVision("landmark")
        } else {
            if (!msmSimTransport.estSimulation(false)) wondercam.ChangeFunc(wondercam.Functions.Classification)
            msmSimTransport.envoyerModeVision("classification")
        }
        resetStabiliteGenerique()
    }

    export function actualiserCamera(): void {
        assurerCameraInitialisee()
        if (!msmSimTransport.estSimulation(false)) wondercam.UpdateResult()
    }

    export function couleurDetectee(id: number): boolean {
        let materiel = false
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.isDetectedColorId(id)
        return msmSimTransport.visionDetecteeOuMateriel(materiel)
            && msmSimTransport.identifiantOuMateriel(id) == id
    }

    export function positionCouleur(position: PositionCouleur, id: number): number {
        if (position == PositionCouleur.X) {
            let materielX = 0
            if (!msmSimTransport.estSimulation(false)) materielX = wondercam.XOfColorId(wondercam.Options.Pos_X, id)
            return msmSimTransport.positionXOuMateriel(materielX)
        }
        let materielY = 0
        if (!msmSimTransport.estSimulation(false)) materielY = wondercam.XOfColorId(wondercam.Options.Pos_Y, id)
        return msmSimTransport.positionYOuMateriel(materielY)
    }

    export function nombreReconnu(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.NumberWithMaxConfidence()
        return msmSimTransport.identifiantOuMateriel(materiel)
    }

    export function confianceNombre(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.MaxConfidenceOfNumber()
        return msmSimTransport.confianceOuMateriel(materiel)
    }

    export function visageDetecte(): boolean {
        let materiel = false
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.IsDetectFace()
        return msmSimTransport.visionDetecteeOuMateriel(materiel)
    }

    export function xVisage(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) {
            materiel = wondercam.getUnlearnedFaceX(wondercam.Options.Pos_X, 1)
        }
        return msmSimTransport.positionXOuMateriel(materiel)
    }

    export function landmarkReconnu(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.LandmarkWithMaxConfidence()
        return msmSimTransport.identifiantOuMateriel(materiel)
    }

    export function confianceLandmark(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.MaxConfidenceOfLandmark()
        return msmSimTransport.confianceOuMateriel(materiel)
    }

    export function classeReconnue(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.MaxConfidenceID()
        return msmSimTransport.identifiantOuMateriel(materiel)
    }

    export function confianceClassification(): number {
        let materiel = 0
        if (!msmSimTransport.estSimulation(false)) materiel = wondercam.MaxConfidence()
        return msmSimTransport.confianceOuMateriel(materiel)
    }
}
