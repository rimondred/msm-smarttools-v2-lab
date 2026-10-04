msmSmartTools.initialiserDaDabit()
msmSmartTools.configurerPropulsion(msmSmartTools.ProfilPropulsion.QuatreRouesP9P10)
if (msmSmartTools.intersectionDetectee()) {
    msmSmartTools.arreterRobot()
} else {
    msmSmartTools.suivreLigne(55)
}
