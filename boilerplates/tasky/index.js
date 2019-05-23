const path = require('path');
const electron = require('electron');
const { app, ipcMain } = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
    
    const iconName = process.platform === 'wind32' ? 'windows-icon.png' : 'icon-template.png';
    const iconPath = path.join(__dirname,`./src/assets/${iconName}`);

    tray = new TimerTray(iconPath, mainWindow);
})

ipcMain.on("update-timer", (event, timeLeft) => {
    tray.setTitle(timeLeft);
})