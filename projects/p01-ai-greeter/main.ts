// P1 — Un visage déclenche le salut par l'actionneur continu 1.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Visage)
basic.forever(function () {
    if (msmSmartTools.visageStable(5)) {
        msmSmartTools.faireTournerActionneur(1, 55)
        basic.pause(800)
        msmSmartTools.arreterActionneur(1)
        msmSmartTools.afficherEtat(msmSmartTools.EtatAffiche.Succes)
    }
    basic.pause(50)
})
