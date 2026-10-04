// P7 — La classification choisit une pose de tri du bras.
msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerBras3Axes(1, 2, 4, 1200)
msmSmartTools.activerVision(msmSmartTools.ModeVision.Classification)
basic.forever(function () {
    const classe = msmSmartTools.classeReconnue()
    if (msmSmartTools.classeStable(classe, 6)) {
        if (classe == 1) msmSmartTools.deplacerBras3Axes(-45, 70, -90, 1200)
        else if (classe == 2) msmSmartTools.deplacerBras3Axes(45, 70, -90, 1200)
        msmSmartTools.positionnerActionneur(5, 40, 500)
    }
    basic.pause(50)
})
