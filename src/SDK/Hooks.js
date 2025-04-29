export default function (scope) {
    let cache = {};

    return {
        get wpRequire() {
            if (!scope?.webpackChunkwebclient.find(arr => arr[2])) {
                cache.wpRequire = scope.webpackChunkwebclient?.push([
                    [Symbol()], {},
                    r => r
                ]);
            }
            
            return cache.wpRequire;
        },

        get meetingSocket() {
            return Object.values(scope.WCSockets.instance)[0];
        },

        get store() {
            return Object.values(scope.document.getElementById("root"))[0].memoizedState.element.props.store;
        },

        get state () {
            return this.store.getState();
        },

        findModule(code) {
            return this.wpRequire(Object.keys(this.wpRequire.m)[Object.values(this.wpRequire.m).findIndex(m => m.toString().includes(code))]);
        },

        findModuleFn(code) {
            return Object.values(this.findModule(code)).find(m => m.toString().includes(code));
        },

        getPacketName(id) {
            let packetIndex = Object.values(this.packets).findIndex(packet => packet == id);
            return Object.keys(this.packets)[packetIndex];
        },

        get sendSocketMessage() {
            return cache.sendSocketMessage ??= this.meetingSocket.send.bind(this.meetingSocket);
        },

        get sendChatMessage() {
            return cache.sendChatMessage ??= this.findModuleFn("mention,localXmppMsgId");
        },

        get packets() {
            return cache.packets ??= this.findModule("WS_CONF_RENAME_REQ");
        },

        get actionPackets() {
            return cache.actionPackets ??= this.findModule("USER_NODE_AUDIO_STATUS_LIST:()");
        },

        get showToast() {
            return cache.showToast ??= Object.values(this.findModule("AliveToast.uniqueToast"))[0].toast;
        },

        get easyStore() {
            return cache.easyStore ??= Object.values(this.findModule(`easyStore=`)).find(prop => prop?.easyGet);
        }
    };
}