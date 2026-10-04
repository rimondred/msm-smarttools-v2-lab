// P9 — Nombre, suivi de ligne sécurisé et bac 270° sur canal 6.
msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerPropulsion(msmSmartTools.ProfilPropulsion.QuatreRouesP9P10)
msmSmartTools.activerVision(msmSmartTools.ModeVision.Nombre)
basic.forever(function () {
    if (msmSmartTools.nombreStable(1, 5)) {
        if (msmSmartTools.suivreJusquaIntersection(55, 8000)) {
            msmSmartTools.actionnerPuisRevenir(6, 75, 0, 800)
        }
    }
    basic.pause(50)
})
