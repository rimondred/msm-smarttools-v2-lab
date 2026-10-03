# Certification logicielle MSM SmartTools V2 Lot 2

La certification logicielle du Lot 2 est terminée. Les deux dépendances sont verrouillées sur les SHA acceptés, leur contenu téléchargé correspond aux commits certifiés, et toute la matrice du Lot 1 compile. La certification matérielle reste séparée et porte encore le statut `NON TESTÉ`.

## Dépendances résolues

PXT a annoncé les téléchargements suivants lors d'une installation propre :

```text
hiwonderk12/DaDabit/19c8fa3889e228484d721fb7f3a88ef2734ac9bc
Hiwonder/WonderCam/817bb6f32e0a5189a834618fe3718b28d3e531e7
```

Une comparaison fichier par fichier des sources installées avec les clones Git certifiés ne montre aucune différence pour les fichiers compilés de DaDabit et WonderCam.

## Matrice de compilation

Outillage : cible PXT micro:bit `v9.1.1`, PXT Core `v13.0.1`.

| Cible | Résultat |
|---|---:|
| Extension V2 Lot 2 verrouillée | PASS |
| Consommateur des 65 API publiques | PASS |
| Scénario P10 via MSM | PASS |
| Programme historique L1 | PASS |
| Programme historique L2 | PASS |
| Programme historique L3 | PASS |
| Programme historique L4 | PASS |
| Programme historique L5 | PASS |
| Programme historique L6 | PASS |
| Programme historique L7 | PASS |
| Programme historique L8 | PASS |
| Programme historique L9 | PASS |
| Programme historique L10 | PASS |
| Certification 01 initialisation | PASS |
| Certification 02 servos 360 degrés | PASS |
| Certification 03 bras pince P10 | PASS |
| Certification 04 bras 3 axes optionnel | PASS |
| Certification 05 capteurs de ligne | PASS |
| Certification 06 LEDs | PASS |
| Certification 07 WonderCam | PASS |
| Certification 08 fonctions P10 guidées | PASS |

Dans ce tableau, `PASS` signifie uniquement que la compilation PXT a réussi. Il ne constitue pas un résultat matériel.

## Compatibilité de l'API publique

Le contrôle automatique compare le namespace, les fonctions, les signatures, les annotations de chaque bloc et les annotations du namespace.

```json
{
  "namespace": "msmSmartTools",
  "baselineFunctions": 65,
  "currentFunctions": 65,
  "missing": [],
  "added": [],
  "signatureChanges": [],
  "annotationChanges": [],
  "namespaceAnnotationChanges": [],
  "compatible": true
}
```

Les douze fichiers TypeScript de l'extension sont identiques à ceux du Lot 1. Seules les deux valeurs de dépendance du manifeste ont changé.

## Intégrité des références

- La source scolaire conserve ses empreintes du Lot 1.
- Le manifeste du Lot 1 conserve l'empreinte `92127e2eb4a33a44e06db38109fdb7d3a95ee5055a75adadba54856d558322b9`.
- Le manifeste verrouillé du Lot 2 porte l'empreinte `1fbb22293283af7a619bee795459e47e0fc643e0bd0c63a96c534202a9e3ab78`.
- Aucun push, aucune branche GitHub et aucune publication n'ont été réalisés.
