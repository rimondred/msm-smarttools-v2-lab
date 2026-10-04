export const classLabels = {
    A: "ESSENTIEL ÉLÈVE",
    B: "CAPACITÉ ÉLÈVE",
    C: "AVANCÉ",
    D: "RÉGLAGE ENSEIGNANT",
    E: "COMPATIBILITÉ HISTORIQUE",
    F: "API TECHNIQUE À NE PAS METTRE EN AVANT"
}

export const taxonomy = {
    A: [
        "initialiserRobot",
        "avancer", "reculer", "arreterRobot", "tournerAGauche", "tournerADroite",
        "lireEtatLigne", "capteurSurNoir", "intersectionDetectee", "lignePerdue", "suivreLigne",
        "allumerLEDs", "afficherEtat", "eteindreLEDs"
    ],
    B: [
        "faireTournerActionneur", "arreterActionneur", "positionnerActionneur", "actionnerPuisRevenir",
        "arriveeDetectee",
        "activerVision", "couleurDetectee", "positionCouleur", "couleurStable",
        "nombreReconnu", "nombreDetecte", "nombreStable",
        "visageDetecte", "xVisage", "visageStable",
        "landmarkReconnu", "landmarkDetecte", "landmarkStable",
        "classeReconnue", "classeDetectee", "classeStable",
        "approcherCube", "brasAuRepos", "saisirObjet", "deposerObjet",
        "brasEnHaut", "brasEnBas", "ouvrirPince", "fermerPince", "allerPoseBras3Axes",
        "afficherCouleurDetectee", "jouerBip"
    ],
    C: [
        "initialiserDaDabit",
        "avancerPendant", "reculerPendant", "tournerPendant",
        "lireEtatLigneFiltre", "suivreJusquaIntersection", "quitterIntersection",
        "confianceNombre", "confianceLandmark", "confianceClassification",
        "attendreDetectionStable", "attendreNombreStable", "approcherCouleur",
        "deplacerBras3Axes", "allerPositionBras3Axes"
    ],
    D: [
        "configurerPropulsion", "reglerVitesses", "reglerVision",
        "reglerConfianceMiniNombre", "reglerConfianceMiniVision",
        "reglerBrasPince", "reglerTemps", "reglerDureeBras3Axes",
        "configurerCanauxBrasPince", "configurerBras3Axes", "configurerPoseBras3Axes"
    ],
    E: [
        "activerReconnaissanceCouleurs", "activerReconnaissanceChiffres", "suiviDeLigne",
        "cubeDetecte", "yCube", "rougeStable", "vertStable", "bleuStable", "jauneStable",
        "cubeDetecteStable", "attendreUnOuDeuxStable",
        "approcherRouge", "approcherVert", "approcherBleu", "approcherJaune",
        "attraperCube", "deposerCube",
        "position1Bras3Axes", "position2Bras3Axes", "position3Bras3Axes", "position4Bras3Axes",
        "retourPositionInitialeBras3Axes", "saisirPieceBras3Axes",
        "resetMission", "nePortePasCube", "destination", "cycleMission",
        "traiterCubeRouge", "traiterCubeVert", "traiterCubeBleu", "traiterCubeJaune"
    ],
    F: [
        "corrigerAGauche", "corrigerADroite", "mettreAJourCapteursLigne", "mettreAJourCamera",
        "ID_CUBE_get", "Y_APPROCHE_get", "SEUIL_VALIDATION_get", "confianceMiniNombre_get"
    ]
}

export const visibleCompatibility = [
    "resetMission", "nePortePasCube", "destination", "cycleMission",
    "traiterCubeRouge", "traiterCubeVert", "traiterCubeBleu", "traiterCubeJaune"
]

export const topLevelGroups = [
    "Initialisation", "Mouvement", "Ligne", "Vision", "Manipulation", "Feedback", "Actionneurs"
]

export const requiredImmediateApis = [
    "initialiserRobot", "avancer", "reculer", "tournerAGauche", "tournerADroite", "arreterRobot",
    "suivreLigne", "couleurDetectee", "nombreDetecte", "visageDetecte", "landmarkDetecte",
    "classeDetectee", "brasEnHaut", "brasEnBas", "ouvrirPince", "fermerPince"
]
