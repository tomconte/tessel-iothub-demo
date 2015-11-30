# Send messages from Tessel to Azure IoT Hub

This little demo shows how to sent messages from a Tessel device to the [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/). The demo uses the [Ambient](https://tessel.io/modules#module-ambient) shield to read Light & Sound level values and send them to Azure IoT Hub as JSON messages.

Azure IoT Hub offers a [Nodes.JS Device SDK](https://github.com/Azure/azure-iot-sdks/tree/master/node/device) that makes it very easy to send messages from a JavaScript environment. Unfortunately, the Tessel has a limitation that makes things a bit more complicated: it is [currently unable](https://forums.tessel.io/t/hmac-encryption-sha256-not-supported/1403) to handle the sha256 hashing algorithm that is required to compute the Shared Access Signature used to identify the device with the Azure IoT Hub (although you could apparently recompile the Tessel firmware to solve the problem).

In order to work around this limitation, I have split the connection process in two: using `generate-sas.js` you can create a Shared Access Signature (SAS) for the Device on your PC, and then copy/paste this SAS into `iot.js`, which is the script that will actually run on the Tessel.

The scripts have comments that should walk you through the different steps.
