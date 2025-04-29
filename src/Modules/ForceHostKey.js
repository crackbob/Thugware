let packetHandler = null;

function ForceHostKey () {
    let mainSDKInstance = this;

    function tryHostKey (key) {
        mainSDKInstance.hooks.sendSocketMessage({
            "evt": mainSDKInstance.hooks.packets.WS_CONF_HOST_KEY_REQ,
            "body": {
                "hostKey": key
            }
        });
    }

    if (!mainSDKInstance.packetHandler.initialized) {
        mainSDKInstance.packetHandler.init();
    }

    if (packetHandler !== null) {
        mainSDKInstance.packetHandler.packetHandlers.splice(packetHandler);
        packetHandler = null;
        return;
    }

    alert("This will probably take a LONG time, but you will be alerted with the code");

    let hostKey = 0;
    packetHandler = mainSDKInstance.packetHandler.onPacket(function (packet, ctx) {
        if (packet?.body?.bresult) {
            if (packet.body.bresult == 3036) {
                hostKey++;
                tryHostKey(hostKey.toString().padStart(6, '0'));
                console.log("Trying: " + hostKey.toString().padStart(6, '0'));
            } else {
                alert("Found: " + hostKey.toString().padStart(6, '0'));
            }
        }
    });

    tryHostKey(hostKey.toString().padStart(6, '0'));
}

export default ForceHostKey;