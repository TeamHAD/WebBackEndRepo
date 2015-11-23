var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var rest = require('restler');

fs.readFile(path.join(__dirname, '../models/devices.json'), function(err, data) {
  data = JSON.parse(data);

  router.get('/', function(req, res, next) {
    var devs = data.map(function(dev) {
      return {
        id: dev.id,
        description: dev.description
      };
    });

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(devs);
  });


  router.get('/:did', function(req, res, next) {
    var device = data.filter(function(dev) {
      return dev.id == req.params.did;
    }).map(function(dev) {
      return {
        description: dev.description,
        type: dev.type,
        status: dev.status
      };
    }).pop();

    if (device) {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(device);
    } else {
      res.status(404);
      res.end();
    }
  });


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
      	  if (body.indexOf('status=”OK”') > 0) {
            // update internal data structure
            data[req.params.did]['status'] = req.params.dvalue;
            res.status(200);
          } else {
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
