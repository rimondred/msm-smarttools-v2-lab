# Matrice des dix projets Hiwonder

Les sources sous `projects/` n'emploient que `msmSmartTools.*` et les primitives MakeCode usuelles (`basic`, `Math`). Les commandes fournisseur sont interdites et vérifiées automatiquement.

| Projet | Intention Hiwonder reconstruite | Primitives MSM principales | Calibration matérielle |
|---|---|---|---|
| P1 AI Greeter | Saluer lorsqu'un visage est vu | vision visage, actionneur 360, feedback | Sens/vitesse/canal 1 à valider |
| P2 AI Wing | Régler l'aile selon les chiffres 1, 2, 3 | vision nombre, stabilité, actionneur 360 | Vitesses 30/60/90 à valider |
| P3 AI Fan | Suivre horizontalement un visage et ventiler | visage/X, actionneur 270 + 360 | Course de base et sens ventilateur à valider |
| P4 AI Color Sorter | Trier quatre couleurs avec deux mécanismes | couleur stable, actionneur 270, LEDs | Angles de trappe à valider |
| P5 AI Robot Arm | Saisir et déplacer avec trois axes | profil trois axes, poses configurables | Toutes les poses d'exemple sont à valider |
| P6 AI Catapult | Se déplacer vers un landmark et lancer | profil P6, landmark, actionneur 270 canal 6 | Topologie et catapulte à valider |
| P7 AI Waste Sorter | Trier d'après la classification IA | classification, bras trois axes | Classes et angles de bacs à valider |
| P8 AI Multi-legged Robot | Choisir un mouvement par landmark | profil P8 deux actionneurs, landmarks 1/2/3/5 | Sens des deux actionneurs à valider |
| P9 AI Transporter | Suivre la ligne puis vider un bac | nombre, ligne, profil quatre roues, canal 6 | Ligne, seuil et bac à valider |
| P10 AI Handler | Préserver la mission historique complète | `initialiserRobot`, `cycleMission` | Déjà testée partiellement; mission complète à revalider |

La compilation de chaque source est enregistrée dans `verification/results/compile-matrix.json`. Une compilation valide la forme logicielle; elle ne certifie ni les sens moteurs, ni les seuils, ni les angles.

## Scénarios futurs

Les trois sources de `future-scenarios/` utilisent le noyau inchangé : porte automatique par visage, parcours orienté par landmark et mécanisme de tri par classification. Elles démontrent la composition de primitives générales sans bloc mission supplémentaire.
