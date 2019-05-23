const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const TimerTray = require('./app/timer_tray');

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    const iconName = process.platform === 'wind32' ? 'windows-icon.png' : 'icon-template.png';
    const iconPath = path.join(__dirname,`./src/assets/${iconName}`);

    mainWindow.on('blur', () => {
        mainWindow.hide();
    })

    tray = new TimerTray(iconPath, mainWindow);
})