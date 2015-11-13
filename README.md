Node.js HAD Web Backend
=======================

Installation
------------
### Prequisites
Node.js – see [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager) for installation instructions

Express.js - see [http://expressjs.com/starter/installing.html](http://expressjs.com/starter/installing.html) for installation instructions

Clone the project from Git

    git clone https://github.com/TeamHAD/WebBackEndRepo.git ./WebBackEnd
    cd WebBackEnd
    npm install
    mkdir data
    npm start



This will start a web server running on port 3000. Access it from your browser at http://localhost:8000.

Devices
-------
Edit /models/devices.json to configure hardware devices. An example JSON object describing an ADAM 6066 device:

  {
    "id": 0,
    "description": "Front Door",
    "address": "10.7.10.210",
    "port": "80",
    "channel": 0,
    "status": 0,
    "type": "lock",
    "format": "xml"
  }


TODO

Add configuration instructions for Monogodb.
