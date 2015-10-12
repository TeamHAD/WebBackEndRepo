var express = require('express');
var router = express.Router();

//var redis = require('redis');
//var client = redis.createClient();


/* GET home page. */
router.get('/', function(req, res, next) {


  /*
  client.on('error', function (err) {
    console.log('Error!!! ' + err);
  });
  client.set('string key', 'string val', redis.print);
  client.hset('hash key', 'hashtest 1', 'some value', redis.print);
  client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

  client.hkeys('hash key', function (err, replies) {

    console.log(replies.length + ' replies:');
    replies.forEach(function (reply, i) {
      console.log('    ' + i + ': ' + reply);
    });

    client.quit();
  });
  */




  res.render('index', { title: 'Home Automation Dashboard' });
});

module.exports = router;
