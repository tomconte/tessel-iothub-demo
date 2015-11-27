# Send messages from Tessel to Azure IoT Hub

This little demo shows how to sent messages from a Tessel device to the Azure IoT Hub. The demo uses the Ambient shield to read Light & Sound level values and send them to Azure IoT Hub as JSON messages.

Azure IoT Hub offers a Nodes.JS SDK that makes it very easy to send messages from a JavaScript environment, however the Tessel has a limitation that makes things a bit more complicated: it is currentlu unable to handle the sha256 hashing algorithm that is required to compute the Shared Access Signature used to identify the device with the Azure IoT Hub.

In order to work around this configuration, I have split the connection process in two: using `generate-sas.js` you can create a Shared Access Signature on your PC, and then copy/paste it into `iot.js`, which is the script that will actually run on the Tessel.

The scripts have comments that should walk you through the different steps.
