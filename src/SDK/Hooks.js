export default function (scope) {
    let cache = {};
    return {
        get wpRequire() {
            if (!cache.wpRequire) {
                cache.wpRequire = scope.webpackChunkwebclient?.push([
                    [Symbol()], {},
                    r => r
                ]);
            }
            return cache.wpRequire;
        },

        get meetingSocket() {
            if (!cache.meetingSocket) {
                const wcs = Object.values(scope.WCSockets.instance)[0];
                cache.meetingSocket = wcs?.socket;
            }
            return cache.meetingSocket;
        },

        get store() {
            if (!cache.store) {
                const rootElement = scope.document.getElementById("root");
                cache.store = Object.values(rootElement)[0].memoizedState.element.props.store;
            }
            return cache.store;
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

        get sendSocketMessage() {
            return this.findModuleFn("case a.WS_AUDIO_DIALOUT_REQ");
        },

        get sendChatMessage() {
            return this.findModuleFn("mention,localXmppMsgId");
        },

        get packets() {
            return this.findModule("WS_CONF_RENAME_REQ");
        },

        get actionPackets() {
            return this.findModule("USER_NODE_AUDIO_STATUS_LIST:()");
        },

        get showToast () {
            return Object.values(this.findModule("AliveToast.uniqueToast"))[0].toast;
        },

        get easyStore () {
            return Object.values(this.findModule(`easyStore=`)).find(prop => prop?.easyGet);
        }
    };
}