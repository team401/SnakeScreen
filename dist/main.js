"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const net_1 = __importDefault(require("net"));
let mainWindow;
let reactProcess = null;
const isPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = net_1.default.createServer();
        server.once("error", (err) => {
            if (err.code === "EADDRINUSE") {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
        server.once("listening", () => {
            server.close();
            resolve(false);
        });
        server.listen(port);
    });
};
const killPort = (port) => {
    try {
        if (process.platform === "win32") {
            (0, child_process_1.execSync)(`for /f "tokens=5" %a in ('netstat -aon ^| find ":${port}"') do taskkill /PID %a /F`);
        }
        console.log(`Port ${port} freed.`);
    }
    catch (error) {
        console.log(`No process was using port ${port}.`);
    }
};
electron_1.app.whenReady().then(async () => {
    const portInUse = await isPortInUse(3000);
    if (!portInUse) {
        console.log("Starting React development server...");
        reactProcess = (0, child_process_1.spawn)("npm", ["start"], {
            cwd: path_1.default.join(__dirname, "../"), // Run from project root
            stdio: "inherit", // Show output in terminal
            shell: true, // Ensure it works on Windows
        });
        reactProcess.on("close", (code) => {
            console.log(`React server process exited with code ${code}`);
        });
    }
    else {
        console.log("React development server is already running.");
    }
    mainWindow = new electron_1.BrowserWindow({
        width: 1440,
        height: 2560,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    const startUrl = "http://localhost:3000";
    mainWindow.loadURL(startUrl);
    mainWindow.on("closed", () => {
        console.log("Closing React process and freeing port 3000...");
        killPort(3000); // Forcefully kill any process on port 3000
        mainWindow = null;
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map