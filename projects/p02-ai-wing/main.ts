// P2 — Le chiffre reconnu règle trois vitesses de l'aile.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Nombre)
basic.forever(function () {
    const n = msmSmartTools.nombreReconnu()
    if (msmSmartTools.nombreStable(n, 5) && n >= 1 && n <= 3) {
        msmSmartTools.faireTournerActionneur(1, n * 30)
    }
    basic.pause(50)
})
