import SDK from "../SDK/SDK";

let offset = 0;

function createBot (container) {
    let frame = document.createElement('iframe');
    frame.src = meetingURL;
    frame.style.resize = "both";
    frame.style.border = "none";
    frame.style.margin = "5px";
    container.appendChild(frame);

    let botSDK = new SDK(frame.contentWindow);

    frame.contentWindow.thugbot = true;

    frame.onload = function () {
        Object.values(botSDK.hooks.findModule("webClient_meetingUqiueId:")).find(prop => prop?.webClient_meetingUqiueId).webClient_meetingUqiueId = Math.random().toString(36).substring(2,7);
        botSDK.loaded = true;
    }

    window.bots.push(botSDK);

    return { botSDK }
}


function BotMeeting () {
    window.bots = window.bots || [];
    let mainSDKInstance = this;
    let amount = prompt("how many bots?");

    localStorage.clear();
    window.meetingURL = mainSDKInstance.scope.location.href;
    let botWindow = window.open("about:blank", "Bot Panel - " + offset, "width=500, height=400, left=100, top=100");

    offset++;

    botWindow.document.title = "Bot Panel";
    botWindow.document.body.style.backgroundColor = "black";

    let container = document.createElement("div");
    container.style.display = "column wrap";
    botWindow.document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {
        createBot(container);
    }
}

export default BotMeeting;