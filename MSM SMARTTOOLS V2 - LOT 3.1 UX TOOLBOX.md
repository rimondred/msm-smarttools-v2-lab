# MSM SmartTools V2 — Lot 3.1 — Audit UX Toolbox

Date de l'audit local : 4 octobre 2026
Statut : **LAB 0.1.0 préparée localement — aucun push, aucun tag, aucune release**

> **NE PAS UTILISER EN PRODUCTION ÉCOLE.**

## Conclusion

L'audit est satisfaisant pour préparer la version LAB `0.1.0`. La surface publique reste de 111 API, mais un débutant n'en voit plus que 46 dans la catégorie principale. Les doublons historiques restent compilables sans encombrer la toolbox. Aucun corps de fonction métier, aucune signature historique et aucun ancien identifiant de bloc n'ont été modifiés.

La certification est **logicielle et simulateur uniquement**. Aucun essai matériel n'a été exécuté ni déclaré PASS pendant ce lot.

## Livrables demandés

### 1. Nombre total d'API

**111 API publiques** : 65 historiques + 46 nouvelles.

Classification exhaustive : A = 14, B = 32, C = 15, D = 11, E = 31, F = 8. Le détail fonction par fonction est dans [`docs/BLOCK-CATALOG.md`](docs/BLOCK-CATALOG.md) et la preuve machine dans [`verification/results/ux-toolbox.json`](verification/results/ux-toolbox.json).

### 2. Nombre de blocs visibles immédiatement

**46 blocs** dans `MSM Smart Tools`, répartis ainsi :

| Groupe principal | Blocs |
|---|---:|
| Initialisation | 1 |
| Mouvement | 5 |
| Ligne | 6 |
| Vision | 16 |
| Manipulation | 9 |
| Feedback | 5 |
| Actionneurs | 4 |

Les commandes demandées sont directement repérables : initialiser, avancer, reculer, tourner, arrêter, suivre la ligne, couleur, nombre, visage, landmark, classification, bras et pince.

### 3. Nombre de blocs Avancé

**15 blocs Avancé**, accessibles par `MSM Smart Tools plus` : `initialiserDaDabit`, les mouvements temporisés, le filtrage et les parcours de ligne bornés, les confiances et attentes vision, l'approche couleur et le bras trois axes détaillé.

### 4. Nombre de blocs Compatibilité

**8 blocs Compatibilité visibles** dans le niveau `plus` : `resetMission`, `nePortePasCube`, `destination`, `cycleMission` et les quatre blocs `traiterCube…`.

La classe E contient 31 API historiques au total : 8 restent visibles car elles n'ont pas d'équivalent direct simple; 23 wrappers redondants sont masqués de la palette tout en restant disponibles en TypeScript et dans les anciens projets.

### 5. Catégories finales

- Niveau principal : Initialisation, Mouvement, Ligne, Vision, Manipulation, Feedback, Actionneurs.
- Niveau secondaire MakeCode : `MSM Smart Tools plus`.
- Dans ce niveau secondaire : Avancé (15), Réglages (11), Compatibilité (8).

La progression conceptuelle est : Niveau 1 Essentiel, Niveau 2 Capacités, Niveau 3 Avancé / enseignant. PXT 13.0.1 rend proprement `advanced` et `subcategory` sous une entrée `plus`; il ne matérialise pas trois extensions distinctes.

### 6. Blocs masqués ou dépriorisés

**31 blocs sont masqués de la toolbox**, mais aucune API n'est supprimée :

`activerReconnaissanceChiffres`, `activerReconnaissanceCouleurs`, `approcherBleu`, `approcherJaune`, `approcherRouge`, `approcherVert`, `attendreUnOuDeuxStable`, `attraperCube`, `bleuStable`, `cubeDetecte`, `cubeDetecteStable`, `deposerCube`, `jauneStable`, `position1Bras3Axes`, `position2Bras3Axes`, `position3Bras3Axes`, `position4Bras3Axes`, `retourPositionInitialeBras3Axes`, `rougeStable`, `saisirPieceBras3Axes`, `suiviDeLigne`, `vertStable`, `yCube`, `confianceMiniNombre_get`, `corrigerADroite`, `corrigerAGauche`, `ID_CUBE_get`, `mettreAJourCamera`, `mettreAJourCapteursLigne`, `SEUIL_VALIDATION_get`, `Y_APPROCHE_get`.

Les 15 blocs Avancé, 11 Réglages et 8 Compatibilité visibles sont également dépriorisés puisqu'ils n'apparaissent pas dans la catégorie principale.

### 7. Compatibilité des 65 anciennes API

**PASS 65/65** : aucune API absente, aucune signature modifiée, aucun attribut métier modifié et aucun ancien `blockId` effectif modifié. Les différences d'annotations historiques sont exclusivement de présentation : groupe, poids, sous-catégorie, visibilité, statut avancé et valeurs par défaut de champs.

Une comparaison des neuf fichiers TypeScript modifiés après retrait des lignes d'annotations `//%` ne trouve **aucune différence de code exécutable**.

Le mécanisme `deprecated` n'a pas été utilisé : la source locale PXT montre qu'il retire aussi les symboles des suggestions de complétion. `blockHidden`, `advanced`, `subcategory`, `group`, `weight` et les métadonnées de paramètres sont supportés et ont été retenus.

### 8. Résultat des 10 projets

**PASS 10/10 projets MSM-only**. La matrice complète obtient **23/23** : surface historique, surface Lot 3, 8 cas Lot 2, 10 projets et 3 scénarios futurs.

Autres contrôles : vérification statique 11/11, runtime 20/20 et aller-retour Blocs 3/3.

### 9. Résultat simx

**PASS 18/18**, sur 2 fichiers de test. `tsc --noEmit` et le build Vite sont également PASS.

### 10. Proposition de version PXT 0.1.0

`pxt.json` est préparé localement avec `version: 0.1.0`. Cette version signifie première V2 générale fonctionnelle, toujours LAB, non certifiée matériellement et non destinée à une release école.

Le build PXT/HEX local est **PASS**.

### 11. Diff exact préparé pour publication LAB

Le diff publiable couvre :

- annotations UX dans `main.ts`, `movement.ts`, `line.ts`, `vision.ts`, `manipulation.ts`, `feedback.ts`, `compositions.ts`, `legacy.ts` et `config.ts`;
- version et documentation dans `pxt.json`, `README.md` et `docs/BLOCK-CATALOG.md`;
- garde-fous dans `package.json`, `verification/verify-public-api.js`, `verification/verify-lot3.mjs`, `verification/generate-block-catalog.mjs`, `verification/ux-taxonomy.mjs` et `verification/ux-audit.mjs`;
- le présent rapport.

Le patch unifié exact et son manifeste SHA-256 ont servi de références locales avant publication. Ils ne sont pas embarqués dans le dépôt LAB, au même titre que les sorties `built/`, `pxt_modules/`, `node_modules/` et le projet d'inspection local.

### 12. Captures et description de la toolbox

La capture avant est conservée dans l'archive d'audit locale non publiée. Elle montre notamment l'initialisation générique et l'initialisation historique exposées l'une à côté de l'autre dans une longue palette.

Inspection après, effectuée dans le vrai éditeur MakeCode local en mode Blocs :

Le relevé post-audit est conservé avec le projet d'inspection local non publié.

| Étape | Observation | État |
|---:|---|---|
| 1 | Ouverture du projet Blocs local, programme représentatif affiché | Sain |
| 2 | Catégorie principale : 46 blocs, 7 groupes, ordre pédagogique | Sain |
| 3 | Niveau `plus` : 15 Avancé, 11 Réglages, 8 Compatibilité | Sain |
| 4 | Doublons historiques et API techniques absents de la palette | Sain |
| 5 | Valeurs vérifiées : vitesses 55/44, nombre 1, seuil 8, confiance 0,4, durées et calibrations cohérentes | Sain |

Une correction UX de métadonnées a été appliquée après inspection : `avancer` et `reculer` proposent 55 au lieu de 0; le bloc de position couleur affiche désormais « ID … sur l'axe … » dans l'ordre des paramètres; les réglages enseignants proposent les calibrations locales existantes. La reconstruction et l'inspection visuelle finales confirment ces valeurs.

### 13. Décisions éventuelles à demander à Badr

Aucune décision ne bloque la préparation locale. Avant toute publication, Badr doit seulement décider d'autoriser le push LAB **après** la campagne de validation sur robot réel. Tant que cette validation n'est pas réalisée, aucun tag ni release école ne doit être créé.

## Résultat final

| Contrôle | Résultat |
|---|---:|
| API historiques | 65/65 PASS |
| API totales / nouvelles | 111 / 46 |
| Vérification statique | 11/11 PASS |
| Runtime | 20/20 PASS |
| Blocs représentatifs | 3/3 PASS |
| Matrice compilée | 23/23 PASS |
| Projets MSM-only | 10/10 PASS |
| Scénarios futurs | 3/3 PASS |
| simx | 18/18 + build PASS |
| PXT/HEX | PASS |
| Tests matériels de ce lot | **NON EXÉCUTÉS** |

**STOP — aucun push, aucun tag, aucune release.**
