import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn, exec, execSync, ChildProcess } from "child_process";
import net from "net";

let mainWindow: BrowserWindow | null;
let reactProcess: ChildProcess | null = null;

const isPortInUse = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        resolve(true);
      } else {
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


const killPort = (port: number) => {
  try {
    if (process.platform === "win32") {

      execSync(`for /f "tokens=5" %a in ('netstat -aon ^| find ":${port}"') do taskkill /PID %a /F`);
    } 
    console.log(`Port ${port} freed.`);
  } catch (error) {
    console.log(`No process was using port ${port}.`);
  }
};

app.whenReady().then(async () => {
  const portInUse = await isPortInUse(3000);

  if (!portInUse) {
    console.log("Starting React development server...");
    reactProcess = spawn("npm", ["start"], {
      cwd: path.join(__dirname, "../"), // Run from project root
      stdio: "inherit", // Show output in terminal
      shell: true, // Ensure it works on Windows
    });

    reactProcess.on("close", (code) => {
      console.log(`React server process exited with code ${code}`);
    });
  } else {
    console.log("React development server is already running.");
  }

  mainWindow = new BrowserWindow({
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
