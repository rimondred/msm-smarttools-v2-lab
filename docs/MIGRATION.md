# Migration depuis MSM SmartTools V2 Lot 2

Les 65 fonctions historiques gardent leur nom, leur signature et leurs annotations de bloc. Un ancien projet peut donc rester inchangé. Le profil par défaut reste le montage quatre roues P9/P10 et `initialiserRobot()` conserve l'initialisation WonderCam couleur ainsi que le retour du bras au repos.

Pour un nouveau projet, préférer :

- `initialiserDaDabit()` à l'initialisation P10, car elle ne déplace aucun mécanisme et n'impose aucun mode vision ;
- `couleurDetectee`, `positionCouleur` et `couleurStable` aux noms historiques centrés sur le cube ;
- `tournerAGauche` / `tournerADroite` aux wrappers `corrigerAGauche` / `corrigerADroite` ;
- `saisirObjet` / `deposerObjet` à `attraperCube` / `deposerCube` ;
- `attendreDetectionStable(..., timeout)` aux attentes historiques sans limite ;
- les profils de propulsion avant `avancer`, `reculer` et `tourner` pour P6 ou P8.

Les fonctions historiques potentiellement bloquantes ne sont pas modifiées silencieusement. Elles restent disponibles pour compatibilité, mais les nouvelles compositions bornées doivent être utilisées dans les nouveaux cours.

Ordre conseillé : ouvrir l'ancien programme, vérifier qu'il compile, remplacer l'initialisation si un démarrage neutre est souhaité, migrer une famille de blocs à la fois, puis refaire les tests sur le robot réel.
