// Certification C2 optionnelle — uniquement avec le montage bras 3 axes.
// Ne pas charger ce programme sur le châssis P10 à quatre roues.
let position = 1
msmInternal.initialiserCarte()
basic.showNumber(position)

input.onButtonPressed(Button.A, function () {
    if (position == 1) msmSmartTools.position1Bras3Axes()
    else if (position == 2) msmSmartTools.position2Bras3Axes()
    else if (position == 3) msmSmartTools.position3Bras3Axes()
    else msmSmartTools.position4Bras3Axes()

    position += 1
    if (position > 4) position = 1
    basic.showNumber(position)
})

input.onButtonPressed(Button.B, function () {
    msmSmartTools.retourPositionInitialeBras3Axes()
    basic.showIcon(IconNames.Square)
})

input.onButtonPressed(Button.AB, function () {
    msmSmartTools.saisirPieceBras3Axes()
    basic.showIcon(IconNames.Yes)
})
