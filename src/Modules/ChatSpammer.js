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
                if (bot?.loaded) {
                    window.bots.forEach((bot) => { 
                        bot.actions.sendMessage(message);
                    })
                }
            }
        }, 10);
    }
}

export default chatSpammer;