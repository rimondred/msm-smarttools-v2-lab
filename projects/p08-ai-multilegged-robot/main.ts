// P8 — Deux actionneurs: le landmark choisit le mouvement.
msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerPropulsion(msmSmartTools.ProfilPropulsion.DeuxActionneursP8)
msmSmartTools.activerVision(msmSmartTools.ModeVision.Landmark)
basic.forever(function () {
    const id = msmSmartTools.landmarkReconnu()
    if (msmSmartTools.landmarkStable(id, 5)) {
        if (id == 1) msmSmartTools.avancer(45)
        else if (id == 2) msmSmartTools.reculer(45)
        else if (id == 3) msmSmartTools.tournerAGauche(40)
        else if (id == 5) msmSmartTools.tournerADroite(40)
        else msmSmartTools.arreterRobot()
    }
    basic.pause(50)
})
