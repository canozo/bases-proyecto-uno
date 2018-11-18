var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/sanitarios', function(req, res) {
  let requisito1 = req.body.requisito1;
  let requisito2 = req.body.requisito2;
  let requisito3 = req.body.requisito3;

  // obtener la data del server
  // procesarla
  // enviarla

  res.json({
    status: 200
  });
});

router.get('/legales', function(req, res) {
  // obtener la data del server
  // procesarla
  // enviarla

  res.json({
    status: 200
  });
});

router.get('/academicos', function(req, res) {
  // obtener la data del server
  // procesarla
  // enviarla

  res.json({
    status: 200
  });
});

router.get('/profesionales', function(req, res) {
  // obtener la data del server
  // procesarla
  // enviarla

  res.json({
    status: 200
  });
});

router.get('/laborales', function(req, res) {
  // obtener la data del server
  // procesarla
  // enviarla

  res.json({
    status: 200
  });
});

module.exports = router;
