import config from "../config";

function ReactionSpammer () {
    let mainSDKInstance = this;
    if (ReactionSpammer.interval) {
        clearInterval(ReactionSpammer.interval);
        ReactionSpammer.interval = undefined;
    } else {
        let currentReactionIndex = 0;
        ReactionSpammer.interval = setInterval(() => {
            if (currentReactionIndex == (config.reactionList.length - 1)) {
                currentReactionIndex = 0;
            } else {
                currentReactionIndex++;
            }

            mainSDKInstance.actions.sendReaction(config.reactionList[currentReactionIndex]);
            currentReactionIndex++;

            if (window.bots) {
                window.bots.forEach((bot) => {
                    if (bot?.loaded) {
                        if (currentReactionIndex == (config.reactionList.length - 1)) {
                            currentReactionIndex = 0;
                        } else {
                            currentReactionIndex++;
                        }
                        bot.actions.sendReaction(config.reactionList[currentReactionIndex]);
                    }
                })
            }
        }, 10);
    }
}

export default ReactionSpammer;