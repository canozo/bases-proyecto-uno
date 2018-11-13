var express = require('express');
var util = require('util');
var redis = require('redis');

var router = express.Router();
var client = redis.createClient();

/* PUT a request from the user. */
router.put('/', function(req, res) {
  let entrada = util.inspect(req.body);
  console.log(entrada);
  res.json({ status: 'PUT request exitosa', error: false, initialRequest: entrada });
});

module.exports = router;
