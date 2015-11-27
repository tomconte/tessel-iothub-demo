'use strict';

var device = require('azure-iot-device');

/* 
** Use this script to generate the Device SAS (Shared Access Signature) from the Device connection string.
** To get the Device connection string, use the IoT Explorer:
**
** npm install iothub-explorer -g
** (or get it from the SDK: https://github.com/Azure/azure-iot-sdks)
**
** Then create a device:
**
** iothub-explorer <connection-string> create <device-id> --connection-string
**
** Find the <connection-string> for the IoT Hub in the Azure Management Portal (portal.azure.com)
*/

// Paste the Device connection string here
var connectionString = 'HostName=xxx.azure-devices.net;DeviceId=tessel1;SharedAccessKey=xxx';

var client = new device.Client.fromConnectionString(connectionString);

// This will display the Device SAS; paste it into the iot.js script
console.log(client._transport._config.sharedAccessSignature);
