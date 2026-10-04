msmSmartTools.initialiserDaDabit()
msmSmartTools.activerVision(msmSmartTools.ModeVision.Landmark)
if (msmSmartTools.landmarkStable(2, 5)) {
    msmSmartTools.allumerLEDs(msmSmartTools.CouleurLED.Vert)
} else {
    msmSmartTools.eteindreLEDs()
}
