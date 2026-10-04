# MSM SmartTools V2 — Lot 3 : finalisation fonctionnelle

Date de clôture locale : 4 octobre 2026
Copie de travail : `MSM-SmartTools-V2-Lot3/`
Base LAB vérifiée avant copie : commit `bae77e4abfa241b58b4d7978e8f73c66ea6eef03`
Statut : **RÉUSSITE LOGICIELLE ET SIMULATEUR — VALIDATION MATÉRIELLE EN ATTENTE**

Aucun push, commit distant, tag, release ou changement du dépôt école n'a été effectué.

## 1. Architecture finale du Lot 3

```text
Hiwonder DaDa:bit / WonderCam
            ↓
internal-dadabit.ts / internal-wondercam.ts
            ↓
primitives MSM : mouvement, actionneurs, ligne, vision, feedback
            ↓
compositions : attentes bornées, approche, saisie, dépôt
            ↓
projets P1–P10 / scénarios futurs / legacy P10

MSM SmartTools ←→ sim-transport.ts ←→ simx local
```

La recherche statique certifie que seuls les deux adaptateurs contiennent `dadabit.*` ou `wondercam.*`. Le reste du noyau dépend de concepts MSM. `legacy.ts` conserve les missions historiques sans servir de modèle aux nouvelles API.

## 2. Catalogue complet des blocs

La surface compte **111 blocs publics** : **65 historiques + 46 nouveaux**. Le catalogue exhaustif, groupé et classé Essentiel / Capacité / Avancé / Compatibilité, se trouve dans `docs/BLOCK-CATALOG.md`.

Chaque nouveau bloc a un libellé français, un groupe PXT et des paramètres compatibles Blocs. Les menus publics sont des enums annotées : profil de propulsion, direction, capteur de ligne, axe/mode vision, couleur LED, pose de bras et état affiché.

## 3. Nouvelles API

### Fondation, mouvement et profils

`initialiserDaDabit`, `configurerPropulsion`, `tournerAGauche`, `tournerADroite`, `avancerPendant`, `reculerPendant`, `tournerPendant`.

### Actionneurs et manipulation

`faireTournerActionneur`, `arreterActionneur`, `positionnerActionneur`, `actionnerPuisRevenir`, `configurerCanauxBrasPince`, `saisirObjet`, `deposerObjet`, `configurerBras3Axes`, `configurerPoseBras3Axes`, `deplacerBras3Axes`, `allerPoseBras3Axes`.

### Ligne

`lireEtatLigne`, `lireEtatLigneFiltre`, `capteurSurNoir`, `intersectionDetectee`, `lignePerdue`, `suivreLigne`, `suivreJusquaIntersection`, `quitterIntersection`.

### Vision unifiée

`activerVision`, `reglerConfianceMiniVision`, `couleurDetectee`, `positionCouleur`, `couleurStable`, `visageDetecte`, `xVisage`, `visageStable`, `landmarkReconnu`, `confianceLandmark`, `landmarkDetecte`, `landmarkStable`, `classeReconnue`, `confianceClassification`, `classeDetectee`, `classeStable`, `attendreDetectionStable`, `approcherCouleur`.

### Feedback

`allumerLEDs`, `afficherEtat`.

## 4. Wrappers et comportements historiques conservés

- `initialiserRobot` conserve l'initialisation P10 avec vision couleur et bras au repos; la nouvelle initialisation neutre est séparée.
- `corrigerAGauche` et `corrigerADroite` délèguent aux rotations générales.
- `activerReconnaissanceCouleurs` et `activerReconnaissanceChiffres` délèguent à l'activation unifiée.
- `cubeDetecte` et `yCube` délèguent à la couleur générale.
- `rougeStable`, `vertStable`, `bleuStable`, `jauneStable` et `cubeDetecteStable` restent disponibles.
- `attraperCube` et `deposerCube` utilisent les compositions objet tout en conservant l'état de mission.
- `mettreAJourCapteursLigne`, `arriveeDetectee` et `suiviDeLigne` gardent leur sémantique historique de cache.
- `attendreNombreStable` et `attendreUnOuDeuxStable` conservent leur comportement historique; les nouveaux projets doivent préférer l'attente bornée.
- `cycleMission`, `destination`, `traiterCubeRouge/Vert/Bleu/Jaune`, les quatre positions fixes et les autres helpers P10/P5 restent inchangés dans leur API.

Le contrôle automatique ne détecte aucune suppression, modification de signature ou modification d'annotation parmi les 65 fonctions de référence.

## 5. Catégories MakeCode

Ordre final : Init, Mouvements, Actionneurs, Capteurs ligne, Suivi de ligne, Vision, Vision (couleur), Vision (chiffres), Bras & Pince, Feedback, Réglages, Avancé, Mission.

Les anciens noms de groupe (`Bras & Pince`, `Mission`, sous-groupes couleur/chiffres) sont maintenus pour préserver exactement les annotations historiques. Les nouvelles primitives générales utilisent les groupes courts; les réglages bas niveau et opérations bornées complexes sont repoussés vers Avancé.

## 6. Matrice des dix projets

| Projet | Mode / matériel clé | Reconstruction MSM |
|---|---|---|
| P1 AI Greeter | visage + servo 360 canal 1 | PASS compilation |
| P2 AI Wing | nombre + vitesses 30/60/90 | PASS compilation |
| P3 AI Fan | visage/X + 270 canal 1 + 360 canal 2 | PASS compilation |
| P4 AI Color Sorter | couleur + deux 270 | PASS compilation |
| P5 AI Robot Arm | couleur + bras trois axes | PASS compilation |
| P6 AI Catapult | landmark + quatre servos synchrones + 270 canal 6 | PASS compilation |
| P7 AI Waste Sorter | classification + bras | PASS compilation |
| P8 AI Multi-legged Robot | landmarks + deux actionneurs | PASS compilation |
| P9 AI Transporter | nombre + ligne + bac canal 6 | PASS compilation |
| P10 AI Handler | mission historique complète | PASS compilation |

Les intentions, primitives et réserves de calibration sont détaillées dans `docs/PROJECT-MATRIX.md`.

## 7. Preuve 10/10 MSM-only

Les dix sources sont sous `projects/`. Le vérificateur impose la présence de `msmSmartTools.*`, interdit `dadabit.*` et `wondercam.*`, puis le compilateur PXT les construit successivement contre la copie Lot 3. Résultat : **10/10 PASS**.

La matrice exacte des huit projets logiciels du Lot 2 est également conservée sous `verification/lot2-matrix/` et recompilée : **8/8 PASS**. Les preuves détaillées sont dans `verification/results/compile-matrix.json`.

## 8. Trois scénarios futurs

1. Porte automatique activée par visage, avec attente stable bornée et actionneur 270°.
2. Parcours orienté par landmark, avec rotation temporisée et arrêt automatique.
3. Mécanisme de tri piloté par classification, avec actionneur 270° et feedback LED.

Les trois sources sous `future-scenarios/` compilent sans nouvelle primitive de noyau : **3/3 PASS**.

## 9. Tests et preuves

| Suite | Résultat |
|---|---|
| Build complet PXT micro:bit V2 / HEX | PASS |
| API historique | 65/65, 0 manque, 0 signature changée, 0 annotation changée |
| Surface publique | 111 blocs, 46 ajouts |
| Vérifications statiques Lot 3 | PASS intégral |
| Tests runtime du code réel transpilé | 20/20 PASS |
| Matrice Lot 2 | 8/8 PASS |
| Projets P1–P10 | 10/10 PASS |
| Scénarios futurs | 3/3 PASS |
| Surface API Lot 3 | PASS |
| Blocs représentatifs | 3/3 PASS |
| simx | 18/18 tests et build PASS |

Les tests runtime couvrent bornes 360/270, trois profils, ligne fraîche, perte, intersection, cinq visions, stabilité, timeout/arrêt, feedback, manipulation et wrappers historiques. Les résultats machine sont sous `verification/results/`.

## 10. Résultat simx

Le candidat local accepte les commandes génériques `servo360`, `servo270`, `visionMode` et `leds`. Il renvoie masque de ligne, réflectances, cible vision, confiance et état de pince. Les cinq modes `color`, `number`, `face`, `landmark`, `classification` sont reconnus.

Résultat : **18 tests PASS, TypeScript PASS, build Vite PASS**. Aucun travail 3D premium n'a été entrepris. La télémétrie de validation est déterministe et ne prétend pas reproduire la précision physique WonderCam.

## 11. API ancienne conservée

La baseline est le `main.ts` historique du Lot 2. Analyse : **65 fonctions attendues, 65 présentes, aucune suppression, aucun changement de signature, aucune modification d'annotation de fonction**. Le seul changement d'annotation de namespace est l'extension volontaire de l'ordre des groupes de toolbox.

`initialiserRobot()` et le profil par défaut restent P10. Les attentes infinies historiques restent cantonnées à la compatibilité; elles ne sont pas utilisées comme nouvelles primitives générales.

## 12. Fichiers et lignes de code

Mesure locale hors `node_modules/`, `pxt_modules/`, `built/` et `simx/dist/` :

- 13 fichiers préexistants de l'extension modifiés; `legacy.ts` et la certification Lot 2 restent inchangés;
- 14 fichiers TypeScript à la racine, **1 856 lignes** avec smoke test et transport simx;
- projets, futurs scénarios et sources Blocs : **157 lignes TypeScript**;
- code et tests simx : **1 478 lignes TypeScript**;
- scripts de vérification : **719 lignes** avant le rapport final;
- 110 fichiers utiles dans la copie, hors dépendances et builds générés.

Les ajouts principaux sont les dossiers `projects/`, `future-scenarios/`, `blocks/`, `verification/`, les documents Lot 3 et l'adaptation locale de `simx/`.

## 13. À valider sur matériel réel

**À VALIDER SUR ROBOT RÉEL** : sens moteurs, bornes utiles, profils P9/P10–P8–P6, topologie des canaux, capteurs et convention noir/blanc, calibration ligne, seuils et confirmations WonderCam, angles bras/pince, absence de collision, bras P5 trois axes, mécanismes P1–P9 et missions complètes.

Le profil P6 propose quatre vitesses synchrones pour avancer; P8 propose une paire miroir; P9/P10 conserve deux paires miroir. Ces tables sont logiquement et logiciellement testées mais restent physiquement non certifiées.

Le fournisseur expose actuellement la ligne en noir/blanc. Aucun pseudo-analogique n'est inventé. Le filtrage temporel est un vote majoritaire sur lectures binaires.

## 14. Proposition de version LAB

Proposition : **`0.1.0`**, sans l'appliquer ni la publier dans ce lot.

Justification SemVer pré-1.0 : la surface passe d'une façade surtout P10 à une boîte à outils générale avec 46 API rétrocompatibles, cinq visions, trois profils et simx étendu. C'est une évolution fonctionnelle mineure significative, pas un correctif `0.0.x`. La compatibilité matérielle incomplète interdit encore `1.0.0`.

Le manifeste local reste à `0.0.15` tant que Badr n'a pas accepté la version et la campagne matérielle.

## 15. Plan de migration

1. Garder les projets historiques inchangés et vérifier leur compilation.
2. Choisir `initialiserDaDabit()` pour tout nouveau robot qui ne doit pas bouger au démarrage.
3. Déclarer le profil matériel avant le premier mouvement hors P10.
4. Migrer les noms spécialisés cube/correction vers couleur/rotation dans les nouveaux cours.
5. Remplacer les attentes historiques sans limite par les compositions avec timeout.
6. Calibrer les canaux, poses et seuils sur le robot réel, projet par projet.
7. Ne publier qu'après validation matérielle et revue des trois profils.

Le guide détaillé se trouve dans `docs/MIGRATION.md`.

## 16. Décisions demandées à Badr

1. Autoriser la campagne de tests matériels Lot 3, en commençant par les profils de propulsion sur cales.
2. Valider ou ajuster les conventions de canaux/angles pour P3 à P9, surtout P5 et P6.
3. Accepter ou refuser la proposition de version LAB `0.1.0`.
4. Après réussite matérielle seulement, autoriser séparément commit/push vers `rimondred/msm-smarttools-v2-lab` et publication de test.
5. Décider ultérieurement du lancement de la Phase 2 premium/3D du simulateur; elle n'est pas incluse ici.

Le dépôt officiel école `MSM-Dev-Pro/dadabit` n'a pas été modifié.

STOP.
