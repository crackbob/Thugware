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
        currentNameIndex = (currentNameIndex + 1) % window.namesList.length;
        mainSDKInstance.actions.changeUsername(window.namesList[currentNameIndex]);

        if (window.bots) {
            window.bots.forEach((bot) => {
                if (bot?.loaded) {
                    currentNameIndex = (currentNameIndex + 1) % conwindowfig.namesList.length;
                    bot.actions.changeUsername(window.namesList[currentNameIndex]);
                }
            });
        }
    }, window.spammerSpeed);
}

export default NameSpammer;