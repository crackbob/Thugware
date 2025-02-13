import config from "../config";

function ReactionSpammer () {
    let mainSDKInstance = this;
    if (ReactionSpammer.interval) {
        clearInterval(ReactionSpammer.interval);
        ReactionSpammer.interval = undefined;
    } else {
        let currentReactionIndex = 0;
        ReactionSpammer.interval = setInterval(() => {
            currentReactionIndex = (currentReactionIndex + 1) % config.namesList.length;
            mainSDKInstance.actions.sendReaction(config.reactionList[currentReactionIndex]);

            if (window.bots) {
                window.bots.forEach((bot) => {
                    if (bot?.loaded) {
                        currentReactionIndex = (currentReactionIndex + 1) % config.namesList.length;
                        bot.actions.sendReaction(config.reactionList[currentReactionIndex]);
                    }
                })
            }
        }, 10);
    }
}

export default ReactionSpammer;