// see https://github.com/electron/electron/issues/9920#issuecomment-575839738
import { contextBridge, ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld("api", {
  receive: (channel: string, func: (...args: any[]) => void) => {
    const validChannels: string[] = [];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      throw new Error(`Attempted to send data in unknown channel ${channel}`);
    }
  },
  startClient: (hostname: string) => {
    ipcRenderer.invoke("startClient", hostname);
  },
});
