// see https://github.com/electron/electron/issues/9920#issuecomment-575839738
const { contextBridge, ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (const type of ["chrome", "node", "electron"]) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});
contextBridge.exposeInMainWorld("api", {
    receive: (channel, func) => {
        let validChannels = ["x", "y", "clientStarted"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
        else {
            throw new Error(`Attempted to send data in unknown channel ${channel}`);
        }
    },
    startClient: (hostname) => {
        ipcRenderer.invoke("startClient", hostname);
    },
});
//# sourceMappingURL=preload.js.map