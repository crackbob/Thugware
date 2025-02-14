import config from "../config";

function ReactionSpammer () {
    let mainSDKInstance = this;
    if (ReactionSpammer.interval) {
        clearInterval(ReactionSpammer.interval);
        ReactionSpammer.interval = undefined;
    } else {
        let currentReactionIndex = 0;
        ReactionSpammer.interval = setInterval(() => {
            currentReactionIndex = (currentReactionIndex + 1) % window.namesList.length;
            mainSDKInstance.actions.sendReaction(window.reactionList[currentReactionIndex]);

            if (window.bots) {
                window.bots.forEach((bot) => {
                    if (bot?.loaded) {
                        currentReactionIndex = (currentReactionIndex + 1) % window.namesList.length;
                        bot.actions.sendReaction(window.reactionList[currentReactionIndex]);
                    }
                })
            }
        }, window.spammerSpeed);
    }
}

export default ReactionSpammer;