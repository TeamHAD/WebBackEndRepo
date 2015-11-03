var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

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
    }).map(function(dev) {
      return {
        description: dev.description,
        type: dev.type,
        status: dev.status
      };
    }).pop();
    // TODO call device api to update
    if (device) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.end();
  });

});

module.exports = router;
