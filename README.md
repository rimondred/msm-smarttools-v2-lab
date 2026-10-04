# MSM SmartTools V2 LAB — 0.1.0

> **NE PAS UTILISER EN PRODUCTION DANS LES ÉCOLES.**
>
> **NE JAMAIS CHARGER SIMULTANÉMENT `MSM-Dev-Pro/dadabit` ET `rimondred/msm-smarttools-v2-lab` DANS LE MÊME PROJET MAKECODE.**

Cette version est la première V2 générale et fonctionnelle de la boîte à outils pédagogique DaDa:bit publiée sur le dépôt LAB personnel. Elle part du commit LAB `bae77e4abfa241b58b4d7978e8f73c66ea6eef03`, n'est pas certifiée matériellement et ne remplace pas le dépôt officiel utilisé par les écoles.

## Import dans MakeCode

1. Créer un projet micro:bit neuf.
2. Ouvrir **Extensions**.
3. Ajouter uniquement `https://github.com/rimondred/msm-smarttools-v2-lab` ou, pour une campagne reproductible, la référence figée sur le SHA testé.
4. Vérifier que la catégorie **MSM Smart Tools** apparaît.
5. Ne jamais ajouter `https://github.com/MSM-Dev-Pro/dadabit` dans ce même projet.

## Ce que couvre LAB 0.1.0

- 65 API historiques conservées, avec signatures et block IDs inchangés;
- 46 nouvelles API générales, soit 111 blocs publics au total;
- 46 blocs élève immédiatement visibles dans 7 groupes pédagogiques;
- 15 blocs dans la sous-catégorie Avancé, 11 réglages enseignant et 8 blocs Compatibilité;
- 31 doublons historiques ou API techniques masqués de la toolbox, mais toujours disponibles en TypeScript;
- initialisation neutre sans mouvement ni mode WonderCam imposé;
- actionneurs 360° et 270° génériques;
- profils P9/P10 quatre roues, P8 deux actionneurs et P6 quatre servos;
- ligne S1–S4 avec lecture fraîche, filtrage booléen, perte, intersection et attentes bornées;
- vision couleur, nombre, visage, landmark et classification;
- manipulation d'objet et bras trois axes configurable;
- feedback sonore, LEDs et état;
- pont local simx et télémétrie des cinq modes vision;
- 10/10 projets Hiwonder reconstruits en MSM-only et 3/3 scénarios futurs compilés.

## Progression dans MakeCode

- **Niveau 1 — Essentiel** : Initialisation, Mouvement, Ligne et Feedback;
- **Niveau 2 — Capacités** : Vision, Manipulation et Actionneurs;
- **Niveau 3 — Avancé / enseignant** : sous-catégories Réglages, Avancé et Compatibilité.

Les API historiques restent présentes. Les doublons tels que `cubeDetecte` / `couleurDetectee` ne sont plus affichés ensemble dans la palette principale : le bloc générique est privilégié, tandis que l'ancien bloc continue de reconstruire les projets existants.

L'architecture reste : fournisseur → adaptateurs internes → primitives → compositions → exemples. Seuls `internal-dadabit.ts` et `internal-wondercam.ts` appellent directement les API Hiwonder.

## Dépendances immuables du lot

```text
github:hiwonderk12/DaDabit#19c8fa3889e228484d721fb7f3a88ef2734ac9bc
github:Hiwonder/WonderCam#817bb6f32e0a5189a834618fe3718b28d3e531e7
```

## Vérification locale

```bash
npm install
npx pxt install
npm run build:pxt
npm run docs:catalog
npm test
npm run test:ux
npm run test:matrix
```

Les preuves JSON sont écrites sous `verification/results/`. Les programmes de validation se trouvent sous `projects/`, les scénarios futurs sous `future-scenarios/` et les couples TypeScript/Blockly sous `blocks/`.

Le candidat simx est validé séparément contre cette extension : 18/18 tests et build PASS. Son code n'est pas publié dans ce dépôt.

## Documentation

- `docs/BLOCK-CATALOG.md` : classification A–F des 111 API et exposition dans la toolbox;
- `docs/PROJECT-MATRIX.md` : intentions et primitives des dix projets;
- `docs/MIGRATION.md` : passage progressif depuis le Lot 2;
- `docs/HARDWARE-VALIDATION.md` : liste explicite des essais physiques restants;
- `docs/BLOCKS-ROUNDTRIP.md` : preuve représentative Blocs ↔ JavaScript;
- `MSM SMARTTOOLS V2 - LOT 3 FINALISATION FONCTIONNELLE.md` : rapport fonctionnel Lot 3;
- `MSM SMARTTOOLS V2 - LOT 3.1 UX TOOLBOX.md` : audit UX et préparation LAB 0.1.0.

## Statut

La certification de cette version est **logicielle et simulateur uniquement**. Le runtime, les blocs, les projets, les scénarios futurs, simx et le build PXT/HEX sont couverts par la matrice locale. Les sens moteurs, topologies de propulsion, capteurs de ligne, seuils WonderCam, angles, pince, bras P5 et missions complètes restent **À VALIDER SUR ROBOT RÉEL**.

Aucun tag ni aucune release école n'est inclus. La version `0.1.0` reste **LAB** tant que la validation matérielle n'est pas terminée.
