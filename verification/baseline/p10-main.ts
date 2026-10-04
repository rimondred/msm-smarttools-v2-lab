// Reconstruction de compilation du flux historique P10 avec la façade MSM.
msmSmartTools.initialiserRobot()
msmSmartTools.reglerVitesses(55, 44, 33)
msmSmartTools.reglerVision(1, 80, 240, 237, 8)
msmSmartTools.resetMission()

basic.forever(function () {
    msmSmartTools.cycleMission()
})
