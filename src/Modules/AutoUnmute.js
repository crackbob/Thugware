function AutoUnmute () {
    let mainSDKInstance = this;
    if (AutoUnmute.interval) {
        clearInterval(AutoUnmute.interval);
        AutoUnmute.interval = undefined;
    } else {
        AutoUnmute.interval = setInterval(function () {
            if (mainSDKInstance.hooks.state.meeting.currentUser.muted) {
                mainSDKInstance.actions.toggleMute(false);
            }

            if (!mainSDKInstance.hooks.state.meeting.currentUser.bVideoOn) {
                mainSDKInstance.actions.toggleVideo(true);
            }

            if (window.bots) {
                window.bots.forEach((bot) => {
                    if (bot?.loaded) { 
                        if (bot.hooks.state.meeting.currentUser.muted) {
                            bot.actions.toggleMute(false);
                        }
                
                        if (!bot.hooks.state.meeting.currentUser.bVideoOn) {
                            bot.actions.toggleVideo(true);
                        }
                    }
                })
            }

        }, window.spammerSpeed);
    }
}

export default AutoUnmute;