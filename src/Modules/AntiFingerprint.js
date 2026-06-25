import utils from "../utils";

function clearFingerprint () {
    utils.deleteCookie("_zm_fingerprint");
}

function AntiFingerprint () {
    let mainSDKInstance = this;

    if (AntiFingerprint.interval) {
        clearInterval(clearFingerprint.interval);
        AntiFingerprint.interval = undefined;
    } else {
        AntiFingerprint.interval = setInterval(clearFingerprint, 1000);
        clearFingerprint();
    }
}

export default AntiFingerprint;