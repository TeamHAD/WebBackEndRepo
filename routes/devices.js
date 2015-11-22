var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var http = require('http');
var rest = require('restler');

fs.readFile(path.join(__dirname, '../models/devices.json'), function(err, data) {

  router.get('/', function(req, res, next) {
    var collection = req.db.get('devices');
    collection.find({}, {fields: {_id: false, id: true, description: true}}, function(err, recs) {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(recs);

    });
  });


  router.get('/:did', function(req, res, next) {
    var collection = req.db.get('devices');
    console.log(req.params.did);
    collection.find({}, {fields: {_id: false, did: true, description: true, status: true}}, function(err, rec) {
      console.log(rec);
      if (rec) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(rec);
      } else {
        res.status(404);
        res.end();
      }
    });
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
      rest.post("http://root:00000000@" + device.address + ":" + device.port + "/digitaloutput/all/value", dev_params).on("complete", function(body, dev_res) {
		  console.log("BODY " + body);
		  //console.log("ERROR " + error);
		  //console.log("RESPONSE " + dev_res.statusCode);
        if (false) {
          res.status(500);
        } else if (body.indexOf('status=”OK”') > 0) {
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
      res.end();
    }
  });
});


module.exports = router;
