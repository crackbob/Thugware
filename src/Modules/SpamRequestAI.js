function SpamRequestAI () {
    let mainSDKInstance = this;
    if (SpamRequestAI.interval) {
        clearInterval(SpamRequestAI.interval);
        SpamRequestAI.interval = undefined;
    } else {
        SpamRequestAI.interval = setInterval(function () {
            mainSDKInstance.actions.requestAI();

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.requestAI();
                    }
                })
            }

        }, window.spammerSpeed);
    }
}

export default SpamRequestAI;