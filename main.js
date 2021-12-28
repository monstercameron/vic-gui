// main.js

// Modules to control application life and create native browser window
const { log } = require("console");
const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  ipcRenderer,
} = require("electron");
const path = require("path");
const fs = require("fs");
const Sensors = require("./functions/Sensors");

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 480,
    // autoHideMenuBar: true,
    // frame: false,
    title: "Crown Victoria GUI",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");
  //mainWindow.loadFile('http://localhost:3000')

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // let count = 0;
  // const timer = setInterval(() => {
  //   mainWindow.webContents.send("OBD2", { rpm: count++ });
  // }, 33);
};

ipcMain.on("toMain", (event, args) => {
  console.log(args);
  // Send result back to renderer process
  mainWindow.webContents.send("fromMain", { test: "test" });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // const displays = screen.getAllDisplays();
  // console.log(displays);

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

Sensors.connect();
let dataReceivedMarker = {};
Sensors.on("dataReceived", function (data) {
  console.log(data);
  mainWindow.webContents.send("OBD2", data);
  dataReceivedMarker = data;
});
