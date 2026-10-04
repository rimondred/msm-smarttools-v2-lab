// P3 — Le visage oriente la base 270° et active le ventilateur.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Visage)
basic.forever(function () {
    if (msmSmartTools.visageDetecte()) {
        const angle = Math.map(msmSmartTools.xVisage(), 0, 320, -90, 90)
        msmSmartTools.positionnerActionneur(1, angle, 500)
        msmSmartTools.faireTournerActionneur(2, 70)
    } else {
        msmSmartTools.arreterActionneur(2)
    }
    basic.pause(50)
})
