// Certification F — WonderCam couleur et nombres.
// A : mode couleur. B : mode nombres.
let modeCouleur = true

msmInternal.initialiserCarte()
msmInternal.initialiserCamera()
msmSmartTools.activerReconnaissanceCouleurs()
basic.showString("C")

input.onButtonPressed(Button.A, function () {
    modeCouleur = true
    msmSmartTools.activerReconnaissanceCouleurs()
    basic.showString("C")
})

input.onButtonPressed(Button.B, function () {
    modeCouleur = false
    msmSmartTools.activerReconnaissanceChiffres()
    basic.showString("N")
})

basic.forever(function () {
    msmSmartTools.mettreAJourCamera()

    if (modeCouleur) {
        let id = 0
        for (let candidat = 1; candidat <= 4; candidat++) {
            if (id == 0 && msmSmartTools.cubeDetecte(candidat)) id = candidat
        }

        basic.clearScreen()
        if (id > 0) {
            const x = msmInternal.positionCouleur(msmInternal.PositionCouleur.X, id)
            const y = msmSmartTools.yCube(id)
            led.plot(id - 1, 2)
            serial.writeLine("COLOR;" + id + ";X=" + x + ";Y=" + y)
        } else {
            serial.writeLine("COLOR;NONE")
        }
    } else {
        const nombre = msmSmartTools.nombreReconnu()
        const confiance = msmSmartTools.confianceNombre()
        basic.showNumber(nombre, 100)
        serial.writeLine("NUMBER;" + nombre + ";CONF=" + confiance)
    }

    basic.pause(200)
})
