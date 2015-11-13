var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var http = require('http');
var request = require("request");

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
    var device = data.filter(function(dev) {
      return dev.id == req.params.did;
    }).pop();
    if (device) {
      var device_key = "DO" + req.params.did;
      var options = {
        uri: "http://" + device.address + ":" + device.port + "/digitaloutput/all/value?" + device_key + "=" + req.params.dvalue,
        method: "POST",
        timeout: 3000
      };
      console.log(options);
      request.post(options, function(error, dev_res, body) {
        console.log(body);
        if (error) {
          res.status(500);
        } else if (body.indexOf('status=”OK”') > 0) {
          res.status(200);
        } else {
          res.status(404);
        }
        res.end();
      });
    } else {
      res.status(404);
      res.end();
    }
  });
});

module.exports = router;
