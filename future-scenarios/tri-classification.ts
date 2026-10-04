// Scénario futur 3 — mécanisme de tri commandé par classification.
msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Classification)
if (msmSmartTools.attendreDetectionStable(msmSmartTools.ModeVision.Classification, 2, 6, 5000)) {
    msmSmartTools.positionnerActionneur(4, 65, 700)
    msmSmartTools.allumerLEDs(msmSmartTools.CouleurLED.Vert)
}
