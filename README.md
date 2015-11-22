Node.js HAD Web Backend
=======================

Installation
------------

Database
download mongodb from https://www.mongodb.org/downloads#production


Clone the project from Git

    git clone https://github.com/TeamHAD/WebBackEndRepo.git ./WebBackEnd
    cd WebBackEnd
    npm install
    mkdir data

The mongod command is located in the bin directory of where you installed Mongodb.

    mongod --dbpath ./data

Populate the mongodb collection with device metadata

    mongo

(on Windows)

    mongo.exe

You should see something like:

    MongoDB shell version: 2.6.5
    connecting to: test
    >

Copy this a paste into the mondo shell:

    use haddb

    db.devices.insert([
      {
        "did": 0,
        "description": "Front Door",
        "address": "10.7.10.201",
        "port": "80",
        "channel": 0,
        "status": 0,
        "type": "lock",
        "format": "xml"
      },
      {
        "did": 1,
        "description": "Back Window",
        "address": "10.7.10.201",
        "port": "80",
        "channel": 1,
        "status": 0,
        "type": "lock",
        "format": "xml"
      },
      {
        "did": 2,
        "description": "Outside Light",
        "address": "10.7.10.201",
        "port": "80",
        "channel": 2,
        "status": 1,
        "type": "light",
        "format": "json"

      },
      {
        "did": 3,
        "description": "Inside Light",
      "address": "10.7.10.201",
        "port": "80",
      "channel": 3,
        "status": 1,
        "type": "light",
        "format": "json"
      },
      {
        "did": 4,
        "description": "Inside Light",
      "address": "10.7.10.201",
        "port": "80",
      "channel": 4,
        "status": 1,
        "type": "light",
        "format": "json"
      },
      {
        "did": 5,
        "description": "Inside Light",
      "address": "10.7.10.201",
        "port": "80",
      "channel": 5,
        "status": 1,
        "type": "light",
        "format": "json"
      }
    ])

Mongo should repond with something like:

    BulkWriteResult({
    "writeErrors" : [ ],
    "writeConcernErrors" : [ ],
    "nInserted" : 6,
    "nUpserted" : 0,
    "nMatched" : 0,
    "nModified" : 0,
    "nRemoved" : 0,
    "upserted" : [ ]
    })


Then fire up node

    npm start


This will start a web server running on port 8000. Access it from your browser at http://localhost:8000.
