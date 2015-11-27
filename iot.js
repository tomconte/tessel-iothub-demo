'use strict';

// Microsoft Azure IoT device SDK for Node.js
// https://github.com/Azure/azure-iot-sdks/tree/master/node/device
var device = require('azure-iot-device');

// http://start.tessel.io/modules/ambient
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

/*
** NOTE:
** First run 'generate-sas.js' on your machine in order to generate the SAS.
** Then copy/paste the SAS string below.
*/

var deviceId = 'tessel1';

var config = {
  host: "xxx.azure-devices.net",
  deviceId: deviceId,
  // Paste the SAS here
  sharedAccessSignature: "SharedAccessSignature sr=xxx.azure-devices.net/devices/tessel1&sig=xxx"
};

// Create the IoT Hub client object
var client = new device.Client(new device.Http(config));

// Create the Ambient module object
var ambient = ambientlib.use(tessel.port['B']);

// Once the module is ready, setup a 1-second interval to read values
ambient.on('ready', function () {
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;
        var light = ldata*1000;
        var sound = sdata*1000;
        //console.log("Light level:", light, " ", "Sound Level:", sound);
        // Send the values to Azure IoT Hub
        sendIoTHubData(light, sound);
    });
  })}, 1000);
});

/*setInterval(function() {
  sendIoTHubData(1, 2);
}, 1000);*/

/*
** Send a message to IoT Hub, using a JSON payload.
*/

function sendIoTHubData(light, sound) {

  // Assemble the message payload
  var data = JSON.stringify({
    deviceId: deviceId,
    light: light,
    sound: sound
  });

  // Create the message
  var message = new device.Message(data);

  console.log("Sending message: " + message.getData());

  // Send the message
  client.sendEvent(message, printResultFor('send'));
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res && (res.statusCode !== 204)) console.log(op + ' status: ' + res.statusCode + ' ' + res.statusMessage);
  };
}
