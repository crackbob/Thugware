function HandSpammer () {
    let mainSDKInstance = this;

    let raisedHand = mainSDKInstance.hooks.state.meeting.currentUser.bRaiseHand;

    if (HandSpammer.interval) {
        clearInterval(HandSpammer.interval);
        HandSpammer.interval = undefined;
        

        // lower all hands
        mainSDKInstance.actions.toggleHand(false);
        if (window.bots) {
            window.bots.forEach((bot) => { 
                if (bot?.loaded) {
                    bot.actions.toggleHand(false);
                }
            })
        }

    } else {
        HandSpammer.interval = setInterval(function () {
            raisedHand = !raisedHand;
            mainSDKInstance.actions.toggleHand(raisedHand);

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.toggleHand(raisedHand);
                    }
                })
            }

        }, 50 + window.spammerSpeed);
    }
}

export default HandSpammer;