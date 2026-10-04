// Certification B — châssis P10.
// Soulever le robot avant le premier essai.
msmInternal.initialiserCarte()
msmSmartTools.arreterRobot()
basic.showIcon(IconNames.Square)

input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    msmSmartTools.avancer(35)
    basic.pause(1000)
    msmSmartTools.arreterRobot()
    basic.showIcon(IconNames.Square)
})

input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    msmSmartTools.reculer(35)
    basic.pause(1000)
    msmSmartTools.arreterRobot()
    basic.showIcon(IconNames.Square)
})

input.onButtonPressed(Button.AB, function () {
    msmSmartTools.arreterRobot()
    basic.showIcon(IconNames.Square)
})
