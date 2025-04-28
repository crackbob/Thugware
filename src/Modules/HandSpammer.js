function HandSpammer () {
    let mainSDKInstance = this;
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
            mainSDKInstance.actions.toggleHand();

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.toggleHand();
                    }
                })
            }

        }, window.spammerSpeed);
    }
}

export default HandSpammer;