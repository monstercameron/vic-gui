const { Window } = require("win-control");
const { NOZORDER } = require("win-control").SWP;
const { SHOWNORMAL, MINIMIZE, MAXIMIZE } = require("win-control").WindowStates;
//const cmd = require("node-cmd");
const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const { openStreamDeck } = require("elgato-stream-deck");

const myStreamDeck = openStreamDeck();
myStreamDeck.clearAllKeys();
let apps;

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const buildApps = (exclude) => {
  const command =
    "Get-Process |where {$_.mainWindowTItle} |format-table mainwindowtitle -AutoSize";

  console.log("getting processes");
  exec(command, { shell: "powershell.exe" }, function (error, stdout, stderr) {
    //console.log(error, stdout, stderr);
    if (!stderr) {
      console.log("Filtering list of apps");
      let apps = stdout
        .split("\r\n")
        .splice(3)
        .filter((item) => item)
        .map((item) => item.trim())
        .filter((item) => !exclude.includes(item));
      console.log(apps);

      console.log("Getting App handles");
      apps = apps.map((item) => Window.getByTitle(item)).filter((item) => item);
      console.log(apps);

      console.log("Setting App handles to Maximize");
      apps.forEach((item) => {
        console.log("Maximizing window -->", item.getTitle());
        //item.setShowStatus(MAXIMIZE);
      });

      console.log("Registering App handles to StreamDeck");
      myStreamDeck.on("down", (keyIndex) => {
        console.log(
          `key ${keyIndex} down | App set foreground: ${apps[
            keyIndex
          ].getTitle()}`
        );
        apps[keyIndex].setForeground();
        //apps[keyIndex].setShowStatus(SHOWNORMAL);
      });
      return apps;
    }
  });
};

const launchApps = (app) => {
  console.log("shortcut:", `"shortcuts\\${app.link}.lnk"`);
  exec(`"shortcuts\\${app.link}.lnk"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

try {
  const json = fs.readFileSync("./functions/Apps.json", "utf8");
  const jsonToObject = JSON.parse(json);
  const { shortcuts, exclude } = jsonToObject;

  let iter = 1;
  console.log("Launching shortcuts");
  for (const app of shortcuts) {
    sleep(1000 + 500 * iter++).then(() => launchApps(app));
    //break;
  }

  console.log("Waiting on shortcuts to open");
  sleep(500 * iter).then(() => (app = buildApps(exclude)));
} catch (error) {
  console.log(error);
}

module.exports = { apps };
