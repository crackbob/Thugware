let packetHandler = null;

function tryHostKey (key) {
    Thugware.hooks.sendSocketMessage({
        "evt": Thugware.hooks.packets.WS_CONF_HOST_KEY_REQ,
        "body": {
            "hostKey": key
        }
    })();
}

function ForceHostKey () {
    let mainSDKInstance = this;

    if (!mainSDKInstance.packetHandler.initialized) {
        mainSDKInstance.packetHandler.init();
    }

    if (packetHandler !== null) {
        mainSDKInstance.packetHandler.packetHandlers.splice(packetHandler);
        packetHandler = null;
        return;
    }

    let hostKey = 0;
    packetHandler = Thugware.packetHandler.onPacket(function (packet, ctx) {
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