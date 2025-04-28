import Actions from "./Actions";
import Hooks from "./Hooks";
import PacketHandler from "./PacketHandler";

export default class {
    constructor(scope) {
        this._scope = scope;
        this.hooks = Hooks(this.scope);
        this.actions = Actions(this.hooks);
        this.packetHandler = PacketHandler(this.hooks);
    }

    get scope() {
        return this._scope || (document.getElementById("webclient")?.contentWindow || window);
    }
}