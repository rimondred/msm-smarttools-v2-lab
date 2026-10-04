// Scénario futur 2 — parcours qui tourne au landmark 3.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Landmark)
if (msmSmartTools.attendreDetectionStable(msmSmartTools.ModeVision.Landmark, 3, 6, 5000)) {
    msmSmartTools.tournerPendant(msmSmartTools.Direction.Droite, 45, 700)
}
