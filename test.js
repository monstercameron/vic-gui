const { Window } = require("win-control");
const { NOZORDER } = require("win-control").SWP;
const { SHOWNORMAL, MINIMIZE, MAXIMIZE } = require("win-control").WindowStates;
//const cmd = require("node-cmd");
const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");

// const { openStreamDeck } = require("elgato-stream-deck");
// const sharp = require("sharp");

// const myStreamDeck = openStreamDeck();
// myStreamDeck.clearAllKeys();

try {
  const json = fs.readFileSync("./functions/Apps.json", "utf8");
  const jsonToObject = JSON.parse(json);
  shortcuts = jsonToObject.shortcuts;

  for (const app of shortcuts) {
    console.log("shortcut:", app);
    exec(`"shortcuts\\${app.link}.lnk"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    break;
  }
} catch (error) {
  console.log(error);
}

// let apps;

// const command =
//   "Get-Process |where {$_.mainWindowTItle} |format-table mainwindowtitle -AutoSize";

// exec(command, { shell: "powershell.exe" }, function (error, stdout, stderr) {
//   //console.log(error, stdout, stderr);
//   if (!stderr) {
//     apps = stdout
//       .split("\r\n")
//       .splice(3)
//       .filter((item) => item)
//       .map((item) => item.trim());
//     console.log(apps);

//     apps = apps.map((item) => Window.getByTitle(item)).filter((item) => item);
//     console.log(apps);

//     apps.forEach((item) => {
//       item.setShowStatus(MAXIMIZE);
//     });

//     myStreamDeck.on("down", (keyIndex) => {
//       console.log(
//         `key ${keyIndex} down | App set foreground: ${apps[keyIndex].getTitle()}`
//       );
//       apps[keyIndex].setForeground();
//       //apps[keyIndex].setShowStatus(SHOWNORMAL);
//     });
//   }
// });

// module.exports = { shortcuts };
