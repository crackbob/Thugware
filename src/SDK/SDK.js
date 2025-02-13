import Actions from "./Actions";
import Hooks from "./Hooks";

export default class {
    constructor(scope) {
        this.scope = scope;
        this.hooks = Hooks(scope);
        this.actions = Actions(this.hooks);
    }
}