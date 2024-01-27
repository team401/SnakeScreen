const { WPILibWebSocketClient, WPILibWSMessages } = require("node-wpilib-ws");

const wsc = new WPILibWebSocketClient({
    hostname: "127.0.0.1",
    port: 5810,
    verbose: true,
});
wsc.start();

wsc.on("ready", () => {
    console.log("Ready!");
});

wsc.on("dioEvent", (channel, payload) => {
    console.log("Got DIO event for channel ", channel, " with payload: ", payload)
});