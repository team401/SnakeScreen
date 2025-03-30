const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');


autoUpdater.autoDownload = false;

autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error: ', (error == null) ? "unknown" : (error.stack || error).toString());
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox(
        {
            type: "info",
            title: "Found Updates",
            message: 'Found updates, do you want to update now?',
            buttons: ["Yes", "No"]
        }
    ).then((buttonIndex) => {
        if (buttonIndex.response === 0) {
            autoUpdater.downloadUpdate()
        }
    });
});

autoUpdater.on('update-not-available', () => {
    // Prevent from showing dialog on every start
    // dialog.showMessageBox({
    //     title: "No Updates",
    //     message: "Current version is up-to-date.",
    // });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        title: 'Installed Updates',
        message: 'Updates downloaded, application will quit to apply changes...'
    }).then(() => {
        setImmediate(() => autoUpdater.quitAndInstall());
    });
});

function checkForUpdates(){
    autoUpdater.checkForUpdates();
}

module.exports.checkForUpdates = checkForUpdates;