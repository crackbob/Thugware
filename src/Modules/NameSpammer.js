import config from "../config";

function NameSpammer() {
    let mainSDKInstance = this;

    if (NameSpammer.interval) {
        clearInterval(NameSpammer.interval);
        NameSpammer.interval = undefined;
        return;
    }

    let currentNameIndex = 0;

    NameSpammer.interval = setInterval(() => {
        currentNameIndex = (currentNameIndex + 1) % config.namesList.length;
        mainSDKInstance.actions.changeUsername(config.namesList[currentNameIndex]);

        if (window.bots) {
            window.bots.forEach((bot) => {
                if (bot?.loaded) {
                    currentNameIndex = (currentNameIndex + 1) % config.namesList.length;
                    bot.actions.changeUsername(config.namesList[currentNameIndex]);
                }
            });
        }
    }, 10);
}

export default NameSpammer;