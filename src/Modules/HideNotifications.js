let hiding = false;

function HideNotifications () {
    hiding = !hiding;

    const scopedNotification = this.scope.document.getElementById("notificationManager");
    const topNotification = top.document.getElementById("notificationManager");

    if (hiding) {
        if (scopedNotification) scopedNotification.style.opacity = "0";
        if (topNotification) topNotification.style.opacity = "1";
    } else {
        if (scopedNotification) scopedNotification.style.opacity = "1";
        if (topNotification) topNotification.style.opacity = "1";
    }
}

export default HideNotifications;
