function HandSpammer () {
    let mainSDKInstance = this;
    if (HandSpammer.interval) {
        clearInterval(HandSpammer.interval);
        HandSpammer.interval = undefined;
    } else {
        HandSpammer.interval = setInterval(function () {
            mainSDKInstance.actions.toggleHand();

            if (window.bots) {
                if (bot?.loaded) {
                    window.bots.forEach((bot) => { 
                        bot.actions.toggleHand();
                    })
                }
            }

        }, 10);
    }
}

export default HandSpammer;