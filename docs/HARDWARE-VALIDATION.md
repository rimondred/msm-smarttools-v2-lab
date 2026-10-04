# Validation matérielle requise

Statut global : **À VALIDER SUR ROBOT RÉEL**. La compilation, les tests Node et simx ne constituent pas une certification physique.

| Zone | Mesure attendue sur DaDa:bit | Statut |
|---|---|---|
| Servos 360 | Sens positif/négatif, arrêt, saturation ±100, canaux 1–6 | À VALIDER SUR ROBOT RÉEL |
| Profils P9/P10, P8, P6 | Correspondance canal/roue et sens de chaque mouvement | À VALIDER SUR ROBOT RÉEL |
| Ligne S1–S4 | Convention bit/noir, intersection 15, perte 0, filtrage temporel | À VALIDER SUR ROBOT RÉEL |
| WonderCam | Modes, IDs, confiance minimale et nombre de confirmations | À VALIDER SUR ROBOT RÉEL |
| Bras/pince P10 | Angles haut/bas, ouvert/fermé, durées et absence de collision | À VALIDER SUR ROBOT RÉEL |
| Bras P5 trois axes | Canaux, toutes les poses, trajectoires et charges | À VALIDER SUR ROBOT RÉEL |
| P1–P10 | Mission complète dans l'environnement physique visé | À VALIDER SUR ROBOT RÉEL |

Le capteur de ligne fournisseur expose ici uniquement une décision noir/blanc. L'extension ne fabrique aucune valeur analogique. L'adaptateur reste l'emplacement prévu pour une future chaîne valeur brute → calibration → normalisation → hystérésis → booléen, si Hiwonder fournit une mesure réelle vérifiée.

Tables logicielles proposées : P9/P10 utilise les paires miroir `(+,-,+,-)` pour avancer; P8 utilise `(+,-)`; P6 utilise quatre vitesses identiques `(+,+,+,+)`. Les pivots inversent les côtés logiques. Ces conventions sont explicites mais restent **À VALIDER SUR ROBOT RÉEL** avant toute certification de profil.

Pour chaque essai, commencer robot sur cales, vérifier un canal à la fois, conserver un arrêt d'urgence accessible et n'enregistrer une calibration qu'après répétition réussie.
