import config from "../config";

function NameSpammer () {
    let mainSDKInstance = this;
    if (NameSpammer.interval) {
        clearInterval(NameSpammer.interval);
        NameSpammer.interval = undefined;
    } else {
        let currentNameIndex = 0;
        NameSpammer.interval = setInterval(() => {
            if (currentNameIndex == (config.namesList.length - 1)) {
                currentNameIndex = 0;
            } else {
                currentNameIndex++;
            }

            mainSDKInstance.actions.changeUsername(config.namesList[currentNameIndex]);
            currentNameIndex++;

            if (window.bots) {
                window.bots.forEach((bot) => {
                    if (bot?.loaded) {
                        if (currentNameIndex == (config.namesList.length - 1)) {
                            currentNameIndex = 0;
                        } else {
                            currentNameIndex++;
                        }
                        bot.actions.changeUsername(config.namesList[currentNameIndex]);
                    }
                })
            }

        }, 10);
    }
}

export default NameSpammer;