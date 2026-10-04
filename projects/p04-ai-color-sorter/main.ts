// P4 — Une couleur stable commande deux mécanismes 270°.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Couleur)
basic.forever(function () {
    for (let id = 1; id <= 4; id++) {
        if (msmSmartTools.couleurStable(id, 6)) {
            msmSmartTools.positionnerActionneur(1, (id - 1) * 45 - 90, 600)
            msmSmartTools.actionnerPuisRevenir(2, 70, 0, 600)
            msmSmartTools.afficherCouleurDetectee(id)
        }
    }
    basic.pause(40)
})
