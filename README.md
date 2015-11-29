Node.js HAD Web Backend
=======================

Installation
------------

Clone the project from Git

    git clone https://github.com/TeamHAD/WebBackEndRepo.git ./WebBackEnd
    cd WebBackEnd
    npm install
    mkdir data
    npm start



This will start a web server running on port 8000. Access it from your browser at http://localhost:8000.

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


Testing
-------

From inside the app directory run the command

    mocha

    
