function chatSpammer () {
    let mainSDKInstance = this;
    if (chatSpammer.interval) {
        clearInterval(chatSpammer.interval);
        chatSpammer.interval = undefined;
    } else {
        let message = prompt("Message?");
        chatSpammer.interval = setInterval(function () {
            mainSDKInstance.actions.sendMessage(message);

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.sendMessage(message);
                    }
                })
            }
        }, window.spammerSpeed);
    }
}

export default chatSpammer;