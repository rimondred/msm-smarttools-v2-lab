// P10 — Reconstruction historique par les wrappers MSM conservés.
msmSmartTools.initialiserRobot()
basic.forever(function () {
    msmSmartTools.cycleMission()
    basic.pause(20)
})
