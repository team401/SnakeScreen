// const { app, BrowserWindow } = require("electron/main");
import { app, BrowserWindow, ipcMain } from "electron";
// import { WPILibWebSocketClient, WPILibWSMessages } from "node-wpilib-ws";
// import { NT4Client, NT4Topic } from "./NT4";
// import NT4Source from "./nt4/NT4Source";
// import { NT4Client, NT4Topic } from "./nt4/NT4";
// import { NT4Publisher } from "./nt4/NT4Publisher";
// import { SIM_ADDRESS } from "./IPAddresses";

const path = require("node:path");

const createWindow = () => {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // load index.html of the app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

app.on("ready", createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    console.log("window created");
  }
});

app.on("window-all-closed", () => {
  // This code would make us not exit when all windows are closed, as is
  // customary for MacOS applications. However, this program should exit when
  // All of it
  // if (process.platform !== "darwin") {
  app.quit();
  // }
});

// Passing data between main thread and render thread
// We don't do any of this right now, but if we did, it would go here

// SEE preload.js TO VIEW/UPDATE LIST OF ALLOWED WEBCONTENTS CHANNELS
