let hiding = false;

function HideReactions () {
    let mainSDKInstance = this;
    hiding = !hiding;

    let meetingStyleSheet = Object.values(mainSDKInstance.scope.document.styleSheets).find(styleSheet => styleSheet.ownerNode?.href?.includes("wc_meeting"));
    let reactionPopup = Object.values(meetingStyleSheet.rules).find(rule => rule.selectorText?.includes("reaction-pop-up-container"));


    if (hiding) {
        reactionPopup.style.opacity = "0";
    } else {
        reactionPopup.style.opacity = "1";
    }
}

export default HideReactions;
