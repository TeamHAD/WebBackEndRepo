var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../models/devices.json'), 'utf8', function(err, data) {
    if (err) throw err;
    res.status(200);
    res.send(data);
  });
});


router.get('/:uid', function(req, res, next) {
  res.status(200);
  res.send("Hi");
  //next();
});

module.exports = router;
