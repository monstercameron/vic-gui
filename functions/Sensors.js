const OBDReader = require("obd2-over-serial");

console.log("connecting: CNCB0");
const options = {};
options.baudRate = 115200;
const Sensors = new OBDReader("CNCB0", options);

Sensors.on("connected", function (data) {
  this.addPoller("vss");
  this.addPoller("rpm");
  this.addPoller("temp");
  // this.addPoller("load_pct");
  // this.addPoller("map");
  // this.addPoller("frp");

  this.startPolling(250); //Polls all added pollers each 2000 ms.
});

module.exports = Sensors;
