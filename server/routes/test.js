var express = require('express');
var util = require('util');
var redis = require('redis');

var router = express.Router();
var client = redis.createClient();

/* PUT a request from the user. */
router.put('/', function(req, res) {
  let some = "Recieved the next json: " + util.inspect(req.body);

  console.log("Setting key " + req.body.key + " to value " + req.body.value);
  client.set(req.body.key, req.body.value, redis.print);

  res.json({ status: "PUT request completed", response: some });
});

module.exports = router;
