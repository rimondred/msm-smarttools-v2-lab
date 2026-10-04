// P5 — Profil trois axes explicite; angles d'exemple à valider sur matériel.
msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerBras3Axes(1, 2, 3, 1500)
msmSmartTools.configurerPoseBras3Axes(msmSmartTools.PoseBras3Axes.Repos, -90, 45, -135)
msmSmartTools.configurerPoseBras3Axes(msmSmartTools.PoseBras3Axes.Saisie, 0, 110, -70)
msmSmartTools.activerVision(msmSmartTools.ModeVision.Couleur)
basic.forever(function () {
    if (msmSmartTools.couleurStable(1, 6)) {
        msmSmartTools.allerPoseBras3Axes(msmSmartTools.PoseBras3Axes.Saisie)
        msmSmartTools.allerPoseBras3Axes(msmSmartTools.PoseBras3Axes.Repos)
    }
    basic.pause(50)
})
