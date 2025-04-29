function SpamSSControl () {
    let mainSDKInstance = this;

    let targetUser = mainSDKInstance.hooks.state.attendeesList.attendeesList.find(attendee => attendee?.sharerOn).userId;

    if (SpamSSControl.interval) {
        clearInterval(SpamSSControl.interval);
        SpamSSControl.interval = undefined;
    } else {
        SpamSSControl.interval = setInterval(function () {
            mainSDKInstance.actions.requestScreenshare(targetUser);

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.requestScreenshare(targetUser);
                    }
                })
            }

        }, window.spammerSpeed);
    }
}

export default SpamSSControl;