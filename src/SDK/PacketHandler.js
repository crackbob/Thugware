export default function (hooks) {
    let ts = {
        initialized: false
    };

    ts.packetHandlers = [];

    ts.onPacket = function (handler) {
        ts.packetHandlers.push(handler);
        return ts.packetHandlers.length - 1;
    }

    ts.init = function () {
        ts.initialized = true;
        const originalOnMessage = hooks.meetingSocket.handlers.onMessage;

        hooks.meetingSocket.handlers.onMessage = function(event) {
            let packetData;

            try {
                packetData = JSON.parse(event.data);
            } catch (e) {
                return originalOnMessage.apply(this, arguments);
            }

            let canceled = false;
            const context = {
                cancel: () => { canceled = true; }
            };

            for (const handler of ts.packetHandlers) {
                handler(packetData, context);
                if (canceled) return;
            }

            const modifiedEvent = new MessageEvent("message", {
                data: JSON.stringify(packetData),
                origin: event.origin,
                lastEventId: event.lastEventId,
                source: event.source,
                ports: event.ports
            });

            return originalOnMessage.call(this, modifiedEvent);
        };
    }

    return ts;
}

