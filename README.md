# MSM SmartTools V2 LAB

MSM SmartTools V2 LAB est la version expérimentale utilisée pour les tests MakeCode, la certification fonctionnelle, la préparation du futur simulateur MSM et les essais sur le vrai DaDa:bit. Elle ne remplace pas encore l'extension MSM officielle et ne doit pas être utilisée en production dans les écoles. Sa compatibilité matérielle est toujours en cours de certification.

## Avertissement important

**Ne jamais ajouter l'extension officielle et l'extension LAB dans le même projet MakeCode.**

Les deux extensions utilisent le namespace `msmSmartTools`. Les charger ensemble créerait un conflit et ne constitue pas une configuration de test valide.

- Dépôt officiel école : [MSM-Dev-Pro/dadabit](https://github.com/MSM-Dev-Pro/dadabit)
- Dépôt LAB : [rimondred/msm-smarttools-v2-lab](https://github.com/rimondred/msm-smarttools-v2-lab)

## Import dans MakeCode

1. Créer un projet micro:bit neuf.
2. Ouvrir **Extensions**.
3. Coller uniquement cette URL :

```text
https://github.com/rimondred/msm-smarttools-v2-lab
```

4. Vérifier que la catégorie **MSM Smart Tools** apparaît.
5. Ne pas ajouter `https://github.com/MSM-Dev-Pro/dadabit` à ce projet.

Pour une campagne de certification reproductible, utiliser le lien figé sur le SHA du commit testé plutôt que la branche `main`.

## État de cette version

- API publique : 65 fonctions conservées.
- Namespace : `msmSmartTools`.
- Compatibilité de compilation : validée sur la matrice du Lot 2.
- Certification matérielle : en cours.
- Publication : dépôt de laboratoire uniquement, sans release ni tag.

Le détail des contrôles logiciels est disponible dans [la certification logicielle du Lot 2](docs/CERTIFICATION-LOGICIELLE-LOT2.md).

## Dépendances verrouillées

```text
github:hiwonderk12/DaDabit#19c8fa3889e228484d721fb7f3a88ef2734ac9bc
github:Hiwonder/WonderCam#817bb6f32e0a5189a834618fe3718b28d3e531e7
```

Ces références ne doivent pas être remplacées par des branches flottantes pendant la certification.
