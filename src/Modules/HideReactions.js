let hiding = false;
let packetInterceptor = null;

function HideReactions () {
    let mainSDKInstance = this;
    hiding = !hiding;

    let meetingStyleSheet = Object.values(mainSDKInstance.scope.document.styleSheets).find(styleSheet => styleSheet.ownerNode?.href?.includes("wc_meeting"));
    let reactionPopup = Object.values(meetingStyleSheet.rules).find(rule => rule.selectorText?.includes("reaction-pop-up-container"));
    let reactionLauncher = mainSDKInstance.scope.document.getElementsByClassName("meeting-reaction-emoji-launcher")[0];
    // hide the actual hands and reactions

    if (hiding) {
        reactionPopup.style.opacity = "0";
        reactionLauncher.style.opacity = "0";
    } else {
        reactionPopup.style.opacity = "1";
        reactionLauncher.style.opacity = "1";
    }

    // stop moving other peoples screens
    if (!mainSDKInstance.packetHandler.initialized) {
        mainSDKInstance.packetHandler.init();
    }

    if (!packetInterceptor) {
        packetInterceptor = mainSDKInstance.packetHandler.onPacket((packet, ctx) => {
            if (!!packet?.body?.update?.[0]?.bRaiseHand && hiding) {
                // i dont know why but webpack breaks it so i gotta check twice
                if (packet?.body?.update?.[0]) {
                    packet.body.update[0].bRaiseHand = false;
                }
            }
        });
    }
}

export default HideReactions;
