"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startClient = void 0;
// const { app, BrowserWindow } = require("electron/main");
const electron_1 = require("electron");
const path = require("node:path");
let win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.loadFile("app/index.html");
    startClient(HOSTNAME);
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        console.log("window created");
    }
});
electron_1.app.on("window-all-closed", () => {
    // This code would make us not exit when all windows are closed, as is
    // customary for MacOS applications. However, this program should exit when
    // All of it
    // if (process.platform !== "darwin") {
    electron_1.app.quit();
    // }
});
// Network tables
// const ntClient = require("wpilib-nt-client");
let ntClient = null;
let publisher = null;
let liveActive = false;
let liveConnected = false;
const client = new ntClient.Client();
client.setReconnectDelay(1000);
const HOSTNAME = "127.0.0.1";
function startClient(hostname) {
    if (client.isConnected()) {
        client.stop();
    }
    client.start((isConnected, err, is2_0) => {
        console.log("startClient callback:", { isConnected, err });
        win.webContents.send("clientStarted", { isConnected, err });
    }, hostname);
}
exports.startClient = startClient;
function parsePose2DBuffer(buf) {
    const x = buf.readDoubleLE(0);
    const y = buf.readDoubleLE(8);
    const rotation = buf.readDoubleLE(16);
    return {
        x,
        y,
        rotation,
    };
}
// Passing data between main thread and render thread
// SEE preload.js TO VIEW/UPDATE LIST OF ALLOWED WEBCONTENTS CHANNELS
// Add listener for network tables which then sends the data to the renderer
// client.addListener((key, val, type, id) => {
client.addListener((key, val, valueType, type, id, flags) => {
    console.log("Network tables data recieved:");
    console.log({ key, val, type, id });
    switch (key) {
        case "/CopperConsole/robotPose":
            console.log("Pose data recieved:");
            console.log({ key, val, type, id });
            // const x = val.readDoubleLE(0);
            // const y = val.readDoubleLE(8);
            // const rotation = val.readDoubleLE(16);
            // const pose = parsePose2DBuffer(val);
            // console.log(pose);
            win.webContents.send("x", val[0]);
            win.webContents.send("y", val[1]);
            win.webContents.send("rotation", val[2]);
        //case
        // "/SmartDashboard/x":
        // win.webContents.send("x", val);
        //  break;
        //case "/SmartDashboard/y":
        // win.webContents.send("y", val);
        // break;
        default:
            return;
    }
});
// Allow renderer to send "startClient" message to restart the NT client.
electron_1.ipcMain.handle("startClient", (event, hostname) => {
    try {
        startClient(hostname);
    }
    catch (e) {
        // Catch TypeErrors that happen when 'startClient' is called after window destruction
        if (!(e instanceof TypeError)) {
            throw e;
        }
        else {
            console.log("startClient based TypeError caught");
        }
    }
});
//# sourceMappingURL=main%20copy.js.map