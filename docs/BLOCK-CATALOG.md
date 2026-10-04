# Catalogue complet des blocs — LAB 0.1.0

Ce catalogue est généré depuis les annotations PXT de la copie Lot 3.1. Il contient **111 API/blocs publics** : 65 historiques et 46 généraux. La toolbox expose **46 blocs immédiatement** et masque **31 doublons ou API techniques**; les autres blocs restent accessibles dans les sous-catégories Réglages, Avancé et Compatibilité.

## Classification UX

- **A — ESSENTIEL ÉLÈVE** : 14 API.
- **B — CAPACITÉ ÉLÈVE** : 32 API.
- **C — AVANCÉ** : 15 API.
- **D — RÉGLAGE ENSEIGNANT** : 11 API.
- **E — COMPATIBILITÉ HISTORIQUE** : 31 API.
- **F — API TECHNIQUE À NE PAS METTRE EN AVANT** : 8 API.

## Initialisation

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| A — ESSENTIEL ÉLÈVE | `initialiserRobot` | initialiser le robot | Initialisation | `compositions.ts` |

## Mouvement

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| A — ESSENTIEL ÉLÈVE | `avancer` | avancer à vitesse %v | Mouvement | `movement.ts` |
| A — ESSENTIEL ÉLÈVE | `reculer` | reculer à vitesse %v | Mouvement | `movement.ts` |
| A — ESSENTIEL ÉLÈVE | `arreterRobot` | arrêter le robot | Mouvement | `movement.ts` |
| A — ESSENTIEL ÉLÈVE | `tournerAGauche` | tourner à gauche à vitesse %v | Mouvement | `movement.ts` |
| A — ESSENTIEL ÉLÈVE | `tournerADroite` | tourner à droite à vitesse %v | Mouvement | `movement.ts` |

## Ligne

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| A — ESSENTIEL ÉLÈVE | `lireEtatLigne` | lire l'état S1-S4 de la ligne | Ligne | `line.ts` |
| A — ESSENTIEL ÉLÈVE | `capteurSurNoir` | capteur %capteur sur noir ? | Ligne | `line.ts` |
| A — ESSENTIEL ÉLÈVE | `intersectionDetectee` | intersection détectée ? | Ligne | `line.ts` |
| A — ESSENTIEL ÉLÈVE | `lignePerdue` | ligne perdue ? | Ligne | `line.ts` |
| B — CAPACITÉ ÉLÈVE | `arriveeDetectee` | arrivée détectée ? (S1 S2 S3 S4 sur noir) | Ligne | `line.ts` |
| A — ESSENTIEL ÉLÈVE | `suivreLigne` | suivre la ligne à vitesse %vitesse (une étape) | Ligne | `line.ts` |

## Vision

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| B — CAPACITÉ ÉLÈVE | `activerVision` | activer la vision %mode | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `couleurDetectee` | couleur ID %id détectée ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `positionCouleur` | position de la couleur ID %id sur l'axe %axe | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `couleurStable` | couleur ID %id stable sur %confirmations confirmations ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `nombreReconnu` | nombre reconnu | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `nombreDetecte` | nombre %n détecté ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `nombreStable` | nombre %n détecté de façon stable ? seuil %seuil | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `visageDetecte` | visage détecté ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `xVisage` | position X du visage | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `visageStable` | visage stable sur %confirmations confirmations ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `landmarkReconnu` | landmark reconnu | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `landmarkDetecte` | landmark %id détecté ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `landmarkStable` | landmark %id stable sur %confirmations confirmations ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `classeReconnue` | classe reconnue | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `classeDetectee` | classe %id détectée ? | Vision | `vision.ts` |
| B — CAPACITÉ ÉLÈVE | `classeStable` | classe %id stable sur %confirmations confirmations ? | Vision | `vision.ts` |

## Manipulation

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| B — CAPACITÉ ÉLÈVE | `approcherCube` | approcher le cube (jusqu'à Y d'approche) | Manipulation | `compositions.ts` |
| B — CAPACITÉ ÉLÈVE | `brasAuRepos` | bras au repos (bras haut + pince ouverte) | Manipulation | `compositions.ts` |
| B — CAPACITÉ ÉLÈVE | `saisirObjet` | saisir l'objet | Manipulation | `compositions.ts` |
| B — CAPACITÉ ÉLÈVE | `deposerObjet` | déposer l'objet | Manipulation | `compositions.ts` |
| B — CAPACITÉ ÉLÈVE | `brasEnHaut` | bras en haut | Manipulation | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `brasEnBas` | bras en bas | Manipulation | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `ouvrirPince` | ouvrir la pince | Manipulation | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `fermerPince` | fermer la pince | Manipulation | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `allerPoseBras3Axes` | aller à la pose du bras 3 axes %pose | Manipulation | `manipulation.ts` |

## Feedback

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| A — ESSENTIEL ÉLÈVE | `allumerLEDs` | allumer les LEDs en %couleur | Feedback | `feedback.ts` |
| A — ESSENTIEL ÉLÈVE | `afficherEtat` | afficher l'état %etat | Feedback | `feedback.ts` |
| B — CAPACITÉ ÉLÈVE | `afficherCouleurDetectee` | afficher la couleur LED pour ID %id | Feedback | `feedback.ts` |
| A — ESSENTIEL ÉLÈVE | `eteindreLEDs` | éteindre les LEDs | Feedback | `feedback.ts` |
| B — CAPACITÉ ÉLÈVE | `jouerBip` | bip (signal sonore) | Feedback | `feedback.ts` |

## Actionneurs

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| B — CAPACITÉ ÉLÈVE | `faireTournerActionneur` | faire tourner l'actionneur %numero à vitesse signée %vitesseSignee | Actionneurs | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `arreterActionneur` | arrêter l'actionneur %numero | Actionneurs | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `positionnerActionneur` | positionner l'actionneur %numero à %angle ° en %duree ms | Actionneurs | `manipulation.ts` |
| B — CAPACITÉ ÉLÈVE | `actionnerPuisRevenir` | actionner %numero à %angleAction ° puis revenir à %angleRepos ° après %attente ms | Actionneurs | `manipulation.ts` |

## Réglages — sous-catégorie enseignant

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| D — RÉGLAGE ENSEIGNANT | `configurerPropulsion` | choisir le profil de propulsion %profil | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerVitesses` | régler vitesses  /  tout droit %vTD  /  correction %vC  /  petite %vP | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerVision` | régler vision  /  couleur ID %id  /  X min %xmin  /  X max %xmax  /  Y approche %y  /  validations %seuil | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerConfianceMiniNombre` | régler confiance mini du nombre à %c | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerConfianceMiniVision` | régler confiance mini de la vision à %c | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerBrasPince` | régler bras/pince  /  bras haut %bh  /  bras bas %bb  /  pince ouverte %po  /  pince fermée %pf | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerTemps` | régler durée  /  mouvement (ms) %tm  /  attente (ms) %ta | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `reglerDureeBras3Axes` | régler durée du bras 3 axes à %d ms | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `configurerCanauxBrasPince` | configurer canaux  /  bras %canalBras  /  pince %canalPince | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `configurerBras3Axes` | configurer bras 3 axes  /  canal 1 %canal1  /  canal 2 %canal2  /  canal 3 %canal3  /  durée %duree ms | Réglages | `config.ts` |
| D — RÉGLAGE ENSEIGNANT | `configurerPoseBras3Axes` | configurer pose %pose  /  angle 1 %a1  /  angle 2 %a2  /  angle 3 %a3 | Réglages | `config.ts` |

## Avancé — sous-catégorie

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| C — AVANCÉ | `initialiserDaDabit` | initialiser DaDa:bit (sans mouvement) | Initialisation | `compositions.ts` |
| C — AVANCÉ | `approcherCouleur` | approcher la couleur ID %id jusqu'à Y %yCible  /  timeout %timeoutMs ms | Manipulation | `compositions.ts` |
| C — AVANCÉ | `lireEtatLigneFiltre` | lire l'état filtré de la ligne sur %confirmations lectures | Ligne | `line.ts` |
| C — AVANCÉ | `suivreJusquaIntersection` | suivre la ligne à vitesse %vitesse jusqu'à intersection  /  timeout %timeoutMs ms | Ligne | `line.ts` |
| C — AVANCÉ | `quitterIntersection` | quitter l'intersection vers %direction à vitesse %vitesse  /  timeout %timeoutMs ms | Ligne | `line.ts` |
| C — AVANCÉ | `deplacerBras3Axes` | déplacer le bras 3 axes  /  angle 1 %a1  /  angle 2 %a2  /  angle 3 %a3  /  durée %duree ms | Manipulation | `manipulation.ts` |
| C — AVANCÉ | `allerPositionBras3Axes` | servo 1 angle %a1  /  servo 2 angle %a2  /  servo 3 angle %a3 | Manipulation | `manipulation.ts` |
| C — AVANCÉ | `avancerPendant` | avancer à vitesse %v pendant %duree ms | Mouvement | `movement.ts` |
| C — AVANCÉ | `reculerPendant` | reculer à vitesse %v pendant %duree ms | Mouvement | `movement.ts` |
| C — AVANCÉ | `tournerPendant` | tourner %direction à vitesse %v pendant %duree ms | Mouvement | `movement.ts` |
| C — AVANCÉ | `confianceNombre` | confiance du nombre | Vision | `vision.ts` |
| C — AVANCÉ | `confianceLandmark` | confiance du landmark | Vision | `vision.ts` |
| C — AVANCÉ | `confianceClassification` | confiance de la classification | Vision | `vision.ts` |
| C — AVANCÉ | `attendreDetectionStable` | attendre vision %mode  /  cible %id  /  confirmations %confirmations  /  timeout %timeoutMs ms | Vision | `vision.ts` |
| C — AVANCÉ | `attendreNombreStable` | attendre le nombre %n stable seuil %seuil | Vision | `vision.ts` |

## Compatibilité — sous-catégorie

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| E — COMPATIBILITÉ HISTORIQUE | `resetMission` | initialiser la mission (ne porte rien) | Compatibilité | `config.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `nePortePasCube` | ne porte pas de cube ? | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `destination` | gérer la destination (stop, déposer si besoin, demi-tour) | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `cycleMission` | cycle mission (1 étape) | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `traiterCubeRouge` | traiter le cube rouge | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `traiterCubeVert` | traiter le cube vert | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `traiterCubeBleu` | traiter le cube bleu | Compatibilité | `legacy.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `traiterCubeJaune` | traiter le cube jaune | Compatibilité | `legacy.ts` |

## Masqués de la toolbox

| Classe | API | Intention du bloc | Groupe | Source |
|---|---|---|---|---|
| E — COMPATIBILITÉ HISTORIQUE | `approcherRouge` | approcher le cube rouge | Compatibilité | `compositions.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `approcherVert` | approcher le cube vert | Compatibilité | `compositions.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `approcherBleu` | approcher le cube bleu | Compatibilité | `compositions.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `approcherJaune` | approcher le cube jaune | Compatibilité | `compositions.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `attraperCube` | attraper le cube | Compatibilité | `compositions.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `deposerCube` | déposer le cube | Compatibilité | `compositions.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `ID_CUBE_get` | ID du cube | Réglages | `config.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `Y_APPROCHE_get` | Y d'approche | Réglages | `config.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `SEUIL_VALIDATION_get` | seuil de validation | Réglages | `config.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `confianceMiniNombre_get` | confiance mini nombre | Réglages | `config.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `mettreAJourCapteursLigne` | mettre à jour les capteurs de ligne | Avancé | `line.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `suiviDeLigne` | suivre la ligne | Compatibilité | `line.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `position1Bras3Axes` | aller à la position 1 | Compatibilité | `manipulation.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `position2Bras3Axes` | aller à la position 2 | Compatibilité | `manipulation.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `position3Bras3Axes` | aller à la position 3 | Compatibilité | `manipulation.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `position4Bras3Axes` | aller à la position 4 | Compatibilité | `manipulation.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `retourPositionInitialeBras3Axes` | revenir à la position initiale du bras | Compatibilité | `manipulation.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `saisirPieceBras3Axes` | saisir la pièce avec le bras | Compatibilité | `manipulation.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `corrigerAGauche` | corriger à gauche (vitesse %v) | Avancé | `movement.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `corrigerADroite` | corriger à droite (vitesse %v) | Avancé | `movement.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `activerReconnaissanceCouleurs` | activer la reconnaissance des couleurs | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `activerReconnaissanceChiffres` | activer la reconnaissance des chiffres | Compatibilité | `vision.ts` |
| F — API TECHNIQUE À NE PAS METTRE EN AVANT | `mettreAJourCamera` | mettre à jour la caméra | Avancé | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `cubeDetecte` | couleur ID %id détectée ? | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `yCube` | position Y de la couleur ID %id | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `rougeStable` | rouge stable ? seuil %seuil | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `vertStable` | vert stable ? seuil %seuil | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `bleuStable` | bleu stable ? seuil %seuil | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `jauneStable` | jaune stable ? seuil %seuil | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `cubeDetecteStable` | cube détecté de façon stable ? | Compatibilité | `vision.ts` |
| E — COMPATIBILITÉ HISTORIQUE | `attendreUnOuDeuxStable` | attendre le chiffre 1 ou 2 stable seuil %seuil | Compatibilité | `vision.ts` |

## Enums pédagogiques

Les menus déroulants visibles sont `ProfilPropulsion`, `Direction`, `CapteurLigne`, `AxeVision`, `ModeVision`, `CouleurLED`, `PoseBras3Axes` et `EtatAffiche`. Leurs valeurs sont toutes annotées et représentables dans l'éditeur Blocs.

## Différence avec Hiwonder

Les blocs MSM expriment une intention pédagogique stable (avancer, détecter, saisir, signaler). Les appels `dadabit.*` et `wondercam.*`, leurs orientations et leurs fonctions versionnées restent confinés aux deux adaptateurs internes.
