// Certification G — tests P10 guidés et temporisés.
// A : suivi de ligne, maximum 5 secondes.
// B : approche du cube rouge, maximum 3 secondes.
// A+B : demi-tour, maximum 5 secondes.
function conditionDemiTour(): boolean {
    return msmInternal.capteur1 || msmInternal.capteur2 || !(msmInternal.capteur3 && msmInternal.capteur4)
}

function suiviLigneTemporise(): void {
    const debut = input.runningTime()
    let arrivee = false

    while (input.runningTime() - debut < 5000 && !arrivee) {
        msmSmartTools.mettreAJourCapteursLigne()
        arrivee = msmSmartTools.arriveeDetectee()
        if (!arrivee) msmSmartTools.suiviDeLigne()
        basic.pause(20)
    }

    msmSmartTools.arreterRobot()
    if (arrivee) basic.showIcon(IconNames.Yes)
    else basic.showIcon(IconNames.Square)
}

function approcheTemporisee(): void {
    const debut = input.runningTime()
    let cibleAtteinte = false

    while (input.runningTime() - debut < 3000 && msmSmartTools.cubeDetecte(1) && !cibleAtteinte) {
        msmSmartTools.mettreAJourCamera()
        cibleAtteinte = msmSmartTools.yCube(1) >= msmSmartTools.Y_APPROCHE_get()
        if (!cibleAtteinte) {
            msmSmartTools.mettreAJourCapteursLigne()
            msmSmartTools.suiviDeLigne()
        }
        basic.pause(20)
    }

    msmSmartTools.arreterRobot()
    if (cibleAtteinte) basic.showIcon(IconNames.Yes)
    else basic.showIcon(IconNames.No)
}

function demiTourTemporise(): void {
    msmSmartTools.mettreAJourCapteursLigne()
    msmInternal.commanderServo360(1, -msmInternal.vitesseCorrection)
    msmInternal.commanderServo360(2, msmInternal.vitesseCorrection)
    msmInternal.commanderServo360(3, -msmInternal.vitesseCorrection)
    msmInternal.commanderServo360(4, msmInternal.vitesseCorrection)
    basic.pause(500)

    const debut = input.runningTime()
    while (conditionDemiTour() && input.runningTime() - debut < 5000) {
        msmSmartTools.corrigerADroite(msmInternal.vitesseCorrection)
        msmSmartTools.mettreAJourCapteursLigne()
        basic.pause(20)
    }

    msmSmartTools.arreterRobot()
    if (!conditionDemiTour()) basic.showIcon(IconNames.Yes)
    else basic.showIcon(IconNames.No)
}

msmSmartTools.initialiserRobot()
msmSmartTools.reglerVitesses(55, 44, 33)
msmSmartTools.reglerVision(1, 80, 240, 237, 8)
msmSmartTools.resetMission()
basic.showIcon(IconNames.Square)

input.onButtonPressed(Button.A, function () {
    suiviLigneTemporise()
})

input.onButtonPressed(Button.B, function () {
    approcheTemporisee()
})

input.onButtonPressed(Button.AB, function () {
    demiTourTemporise()
})
