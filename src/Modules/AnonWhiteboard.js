let _publishCursor = null;
let _sendViewport = null;
let enabled = false;

function AnonWhiteboard () {
    enabled = !enabled;
    let whiteboard = Object.values(this.scope.document.getElementById("ui-components"))[0].child.pendingProps.children.props.wb;
    let followPlugin = whiteboard.plugins.get("followPlugin");

    if (_publishCursor == null) {
        _publishCursor = whiteboard.publishCursor;

        whiteboard.publishCursor = () => {
            if (!enabled) {
                return _publishCursor.apply(whiteboard, arguments);
            }
        };
    }

    if (_sendViewport == null) {
        _sendViewport = followPlugin.sendViewport;

        followPlugin.sendViewport = () => {
            if (!enabled) {
                return _sendViewport.apply(whiteboard, arguments);
            }
        };
    }
}

export default AnonWhiteboard;