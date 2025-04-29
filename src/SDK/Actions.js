export default function (hooks) {
    return {
        changeUsername (username) {
            hooks.sendSocketMessage({
                "evt": hooks.packets.WS_CONF_RENAME_REQ,
                "body": {
                    id: hooks.state.meeting.currentUser.userId,
                    dn2: btoa(username),
                    olddn2: btoa(hooks.state.meeting.currentUser.displayName)
                }
            });
        },
        
        toggleMute (enabled) {

            if (enabled == undefined) {
                enabled = !hooks.state.meeting.currentUser.muted;
            }

            hooks.sendSocketMessage({
                "evt": hooks.actionPackets.USER_NODE_AUDIO_STATUS_LIST,
                "body": {
                    "add": null,
                    "remove": null,
                    "update": [{
                        "id": hooks.state.meeting.currentUser.userId,
                        "muted": enabled
                    }]
                }
            });
            
            hooks.sendSocketMessage({
                "evt": hooks.packets.WS_AUDIO_MUTE_REQ,
                "body": {
                    "id": hooks.state.meeting.currentUser.userId,
                    "bMute": enabled
                }
            });
        },

        toggleHand (enabled) {

            if (enabled == undefined) {
                enabled = !hooks.state.meeting.currentUser.bRaiseHand;
            }

            hooks.sendSocketMessage({
                "evt": hooks.packets.WS_CONF_RAISE_LOWER_HAND_REQ,
                "body": {
                    "id": hooks.state.meeting.currentUser.userId,
                    "bOn": enabled
                }
            });
        },
        
        toggleVideo (enabled) {

            if (enabled == undefined) {
                enabled = !hooks.state.meeting.currentUser.bVideoOn;
            }

            if (enabled) {
                hooks.findModuleFn("user start capture video")()(Thugware.hooks.store.dispatch, Thugware.hooks.store.getState);
            } else {
                hooks.sendSocketMessage({
                    evt: hooks.packets.WS_VIDEO_MUTE_VIDEO_REQ,
                    body: {
                        id: hooks.state.meeting.currentUser.userId,
                        bOn: !enabled // i don't know why but it has to be the opposite
                    }
                });
            }
        },

        sendReaction (emoji) {
            hooks.sendSocketMessage({
                evt: hooks.packets.WS_CONF_SEND_REACTION_REQ,
                body: {
                    uNodeID: hooks.state.meeting.currentUser.userId,
                    strEmojiContent: emoji
                }
            });
        },

        requestAI () {
            hooks.sendSocketMessage({
                "evt": hooks.packets.WS_CONF_QUERY_OP_REQ,
                "body": {
                    "type": "reqAICStart"
                }
            });
        },

        requestScreenshare (uid) {
            hooks.sendSocketMessage({
                "evt": hooks.packets.WS_SHARING_REMOTE_CONTROL_REQ,
                "body": {
                    "id": uid,
                    "bOn": true
                }
            });
        },

        sendMessage (text, mention = [], styleItems = [], target) {
            hooks.sendChatMessage({
                "text": text,
                "styleItems": styleItems,
                "mention": mention
            }, target)(hooks.store.dispatch, hooks.store.getState);
        }
    }
}