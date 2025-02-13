let hiding = false;

function HideNotifications () {
    hiding = !hiding;

    if (hiding) {
        this.scope.document.getElementById("notificationManager").style.opacity = "0";
    } else {
        this.scope.document.getElementById("notificationManager").style.opacity = "1";
    }

}

export default HideNotifications;