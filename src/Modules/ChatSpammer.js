function chatSpammer () {
    let mainSDKInstance = this;
    if (chatSpammer.interval) {
        clearInterval(chatSpammer.interval);
        chatSpammer.interval = undefined;
    } else {
        let message = prompt("Message?");
        let memberName = prompt("Member name? (leave blank to send to everyone)");

        let members = mainSDKInstance.hooks.state.attendeesList.attendeesList
        let targetUID = Object.values(members).find(member => member?.displayName == memberName)?.userId || 0;

        chatSpammer.interval = setInterval(function () {
            mainSDKInstance.actions.sendMessage(message, null, null, targetUID);

            if (window.bots) {
                window.bots.forEach((bot) => { 
                    if (bot?.loaded) {
                        bot.actions.sendMessage(message, null, null, targetUID);
                    }
                })
            }
        }, window.spammerSpeed);
    }
}

export default chatSpammer;