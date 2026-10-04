// Certification E — LEDs de la carte.
let couleur = 1
msmInternal.initialiserCarte()
msmSmartTools.eteindreLEDs()
basic.showNumber(couleur)

input.onButtonPressed(Button.A, function () {
    msmSmartTools.afficherCouleurDetectee(couleur)
    basic.showNumber(couleur)
    couleur += 1
    if (couleur > 4) couleur = 1
})

input.onButtonPressed(Button.B, function () {
    msmSmartTools.eteindreLEDs()
    basic.showIcon(IconNames.Square)
})

input.onButtonPressed(Button.AB, function () {
    msmSmartTools.afficherCouleurDetectee(1)
    basic.pause(500)
    msmSmartTools.afficherCouleurDetectee(2)
    basic.pause(500)
    msmSmartTools.afficherCouleurDetectee(3)
    basic.pause(500)
    msmSmartTools.afficherCouleurDetectee(4)
    basic.pause(500)
    msmSmartTools.eteindreLEDs()
    basic.showIcon(IconNames.Yes)
})
