# Vérification Blocs ↔ JavaScript

Trois programmes représentatifs sont maintenus sous `blocks/` avec leur source TypeScript et leur fichier `.blocks` décompilé par le compilateur PXT micro:bit 9.1.1 :

| Cas | Concepts couverts |
|---|---|
| `essentiel` | initialisation neutre, mouvement borné, actionneur 360, état |
| `vision` | enum de mode, landmark stable, enum de couleur LED, condition |
| `ligne` | enum de profil, intersection, suivi une étape, arrêt |

Procédure de preuve : compiler le TypeScript avec l'extension locale comme dépendance, le décompiler avec `pxt decompile`, valider le XML Blockly, puis recompilier la source représentée. Le script `verification/blocks-roundtrip.mjs` automatise la génération/validation et enregistre `verification/results/blocks-roundtrip.json`.

Les types publics sont limités à `number`, `boolean`, `void` et aux enums annotées. Chaque nouvelle fonction exposée possède un libellé français, un groupe et des valeurs par défaut pour les paramètres numériques lorsque cela est utile.
