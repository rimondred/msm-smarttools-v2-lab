// Scénario futur 1 — porte automatique selon présence d'un visage.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Visage)
if (msmSmartTools.attendreDetectionStable(msmSmartTools.ModeVision.Visage, 0, 5, 5000)) {
    msmSmartTools.actionnerPuisRevenir(1, 60, 0, 1200)
}
