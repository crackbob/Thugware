function AutoUnmute () {
    let mainSDKInstance = this;
    if (AutoUnmute.interval) {
        clearInterval(AutoUnmute.interval);
        AutoUnmute.interval = undefined;
    } else {
        AutoUnmute.interval = setInterval(function () {
            if (mainSDKInstance.hooks.state.meeting.currentUser.muted) {
                mainSDKInstance.actions.unmute();
            }

            if (window.bots) {
                if (bot?.loaded) {
                    window.bots.forEach((bot) => { 
                        if (bot.hooks.state.meeting.currentUser.muted) {
                            bot.actions.unmute();
                        }
                    })
                }
            }

        }, 10);
    }
}

export default AutoUnmute;