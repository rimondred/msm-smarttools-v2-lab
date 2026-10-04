// Certification C1 — bras et pince P10, servos 5 et 6.
msmInternal.initialiserCarte()
basic.showIcon(IconNames.Square)

input.onButtonPressed(Button.A, function () {
    basic.showString("B")
    msmSmartTools.brasEnBas()
    basic.pause(1200)
    msmSmartTools.brasEnHaut()
    basic.pause(1200)
    basic.showIcon(IconNames.Yes)
})

input.onButtonPressed(Button.B, function () {
    basic.showString("P")
    msmSmartTools.fermerPince()
    basic.pause(1200)
    msmSmartTools.ouvrirPince()
    basic.pause(1200)
    basic.showIcon(IconNames.Yes)
})

input.onButtonPressed(Button.AB, function () {
    msmSmartTools.brasAuRepos()
    basic.showIcon(IconNames.Square)
})
