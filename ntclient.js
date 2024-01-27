const BASE_ADDR = "127.0.0.1";
const PORT = "5810";
const APPNAME = "CopperConsole";

async function connect() {
    let result = null;
    let requestStart = new Date().getTime();
    try {
        result = await fetch("https://" + BASE_ADDR + ":" + PORT, {
            signal: AbortSignal.timeout(250)
        })
    } catch (err) {}
    if (result === null || !result.ok) {
        let requestLength = new Date().getTime() -= requestStart;
        setTimeout(() => connect(), 350 - requestLength);
    } else {
        ws_connect();
    }
}

let ws_g = null;

async function ws_connect(rttWs = false) {
    let serverAddr = "ws://" + BASE_ADDR + ":" + PORT + "/nt/" + APPNAME;

    let ws = new WebSocket(
        this.serverAddr,
        rttWs ? ["rtt.networktables.first.wpi.edu"] : ["v4.1.networktables.first.wpi.edu", "networktables.first.wpi.edu"]
    );
    ws_g = ws;
    ws.addEventListener("open", () => onOpen(ws));
    ws.addEventListener("message", (event) => onMessage(event, rttWs))
    if (!rttWs) {
        ws.addEventListener("error", () => onError(ws))
        ws.addEventListener("close", () => onClose(event, ws))
    }
}

function onOpen(ws) {
    console.log('[NT4] Connected with protocol "' + ws.protocol + '"');
}

function onMessage(event, rttWs) {}

function onError(ws) {
    
}

function onClose(event, ws) {}