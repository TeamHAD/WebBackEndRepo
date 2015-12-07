var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var rest = require('restler');

// Basic HTTP Auth credtentials necessary to communicate with ADAM devices
var ADAM_USER = 'root';
var ADAM_PASSWD = '00000000';

// Get device meta data from json file
// TODO read from db
fs.readFile(path.join(__dirname, '../models/devices.json'), function(err, data) {
  data = JSON.parse(data);

  // GET /devices/
  // Returns JSON array of devices and their info
  router.get('/', function(req, res, next) {
    var devs = data.map(function(dev) {
      return {
        tag: dev.tagType,
        text: dev.description,
        deviceId: dev.id
      };
    });

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(devs);
  });

  // GET /devices/:id
  // Returns info for a specific device
  // Returns 404 if there is no device with given :id
  // Returns 500 if there is an error returned from device
  router.get('/:did', function(req, res, next) {
    var device_id = req.params.did;
    var device = data.filter(function(dev) {
      return dev.id == device_id;
    }).pop();
    if (device) {
      var api_mothod;
      if (device.type == "light") {
        api_method = 'digitaloutput';
      } else if (device.type == "lock") {
        api_method = 'digitalinput';
      } else if (device.type == "sensor") {
        api_method = 'analoginput';
      } else {
		  api_method = 'digitaloutput';
	  }

    console.log("http://" + ADAM_USER + ":" + ADAM_PASSWD + "@" + device.address + ":" + device.port + "/" + api_method + "/" + device.channel + "/value");

      rest.get("http://" + ADAM_USER + ":" + ADAM_PASSWD + "@" + device.address + ":" + device.port + "/" + api_method + "/" + device.channel + "/value")
        .on("error", function(err) {
          res.status(500);
        })
        .on("success", function(body, dev_res) {
      	  console.log("BODY " + body);
          if (body.indexOf('6017') > 0) {
            if (body.indexOf('VALUE') > 0) {
              var rvalue = body.match(/(<VALUE>(.+)<\/VALUE>)/g);
              var hvalue = rvalue[0].replace("<VALUE>", "");
              hvalue = hvalue.replace("</VALUE>", "");
              var dvsor = parseInt('ffff', 16);
              hvalue = parseInt(hvalue, 16) / dvsor;;
              res.status(200);
              res.send({
                id: device.id,
                description: device.description,
                status: hvalue
              });
            }
          } else {
        	  if (body.indexOf('status="OK"') > 0) {
              rvalue = body.match(/(<VALUE>(.+)<\/VALUE>)/g);
              var ivalue = rvalue[0].replace("<VALUE>", "");
              ivalue = ivalue.replace("</VALUE>", "");

              // update internal data structure
              [device_id]['status'] = ivalue;
              res.status(200);
              res.send({
                id: device.id,
                description: device.description,
                status: ivalue
              });
            } else {
              res.status(404);
            }
          }
        });

    } else {
      res.status(404);
    }
  });


  // POST /devices/:id/:value
  // Updates device with given id to have a status of :value
  // Returns 204 if the device was updated
  // Returns 404 if there is no device with given :id
  // Returns 500 if there is an error returned from device
  router.post('/:did/:dvalue', function(req, res, next) {
    console.log(data);
    var device = data.filter(function(dev) {
      return dev.id == req.params.did;
    }).pop();
	   console.log(device);
     if (device) {
      var device_key = "DO" + req.params.did;
      console.log(device_key + ": " + req.params.dvalue);
      console.log("http://root:00000000@" + device.address + ":" + device.port + "/digitaloutput/all/value");

  	  var dev_params = {data: {}};
  	  dev_params['data'][device_key] = req.params.dvalue;
  	  console.log(dev_params);
      rest.post("http://root:00000000@" + device.address + ":" + device.port + "/digitaloutput/all/value", dev_params)
        .on("error", function(err) {
          res.status(500);
          res.end();
        })
        .on("success", function(body, dev_res) {
      	  console.log("BODY " + body);
      	  if (body.indexOf('status="OK"') > 0) {
            // update internal data structure
            data[req.params.did]['status'] = parseInt(req.params.dvalue);
            res.status(204);


          } else {
            res.write(JSON.stringify(body));
            res.status(404);
          }
          res.end();
        });

    } else {
      res.status(404);
    }
  });
});


module.exports = router;
