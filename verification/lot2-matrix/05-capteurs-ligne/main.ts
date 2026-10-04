// Certification D — vérité matérielle noir/blanc pour S1 à S4.
// Ligne du haut : réponse de l'API demandant Black.
// Ligne du bas  : réponse de l'API demandant White.
// Colonnes 0 à 3 : S1 à S4.
function afficherCapteur(x: number, noir: boolean, blanc: boolean): void {
    if (noir) led.plot(x, 0)
    else led.unplot(x, 0)

    if (blanc) led.plot(x, 4)
    else led.unplot(x, 4)
}

function bit(valeur: boolean): number {
    if (valeur) return 1
    return 0
}

msmInternal.initialiserCarte()

basic.forever(function () {
    const s1Noir = dadabit.line_followers(dadabit.LineFollowerSensors.S1, dadabit.LineColor.Black)
    const s2Noir = dadabit.line_followers(dadabit.LineFollowerSensors.S2, dadabit.LineColor.Black)
    const s3Noir = dadabit.line_followers(dadabit.LineFollowerSensors.S3, dadabit.LineColor.Black)
    const s4Noir = dadabit.line_followers(dadabit.LineFollowerSensors.S4, dadabit.LineColor.Black)

    const s1Blanc = dadabit.line_followers(dadabit.LineFollowerSensors.S1, dadabit.LineColor.White)
    const s2Blanc = dadabit.line_followers(dadabit.LineFollowerSensors.S2, dadabit.LineColor.White)
    const s3Blanc = dadabit.line_followers(dadabit.LineFollowerSensors.S3, dadabit.LineColor.White)
    const s4Blanc = dadabit.line_followers(dadabit.LineFollowerSensors.S4, dadabit.LineColor.White)

    afficherCapteur(0, s1Noir, s1Blanc)
    afficherCapteur(1, s2Noir, s2Blanc)
    afficherCapteur(2, s3Noir, s3Blanc)
    afficherCapteur(3, s4Noir, s4Blanc)

    serial.writeLine("BLACK;" + bit(s1Noir) + ";" + bit(s2Noir) + ";" + bit(s3Noir) + ";" + bit(s4Noir))
    serial.writeLine("WHITE;" + bit(s1Blanc) + ";" + bit(s2Blanc) + ";" + bit(s3Blanc) + ";" + bit(s4Blanc))
    basic.pause(250)
})
