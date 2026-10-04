// P6 — Quatre servos synchrones puis catapulte sur le canal 6.
msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerPropulsion(msmSmartTools.ProfilPropulsion.QuatreServosSynchronesP6)
msmSmartTools.activerVision(msmSmartTools.ModeVision.Landmark)
basic.forever(function () {
    if (msmSmartTools.landmarkStable(1, 6)) {
        msmSmartTools.avancerPendant(50, 500)
        msmSmartTools.actionnerPuisRevenir(6, 90, 0, 500)
    }
    basic.pause(50)
})
