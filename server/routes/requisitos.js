var express = require('express');
var util = require('util');
var router = express.Router();

router.put('/sanitarios', function(req, res) {
  console.log(req.body);
  const nombreSanitario = req.body.nombre;
  
  client.hmset('sanitarios', [
    "nombre", nombreSanitario,
  ], function(err, reply) {
      console.log(reply);
  });

});


router.put('/legales', function(req, res) {
  const nombreLegales = req.body.nombre;
  
  client.hmset('legales', [
    "nombre", nombreLegales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/institucionAcademica', function(req, res) {
  const nombreInstitucionAcademica = req.body.nombre;
  
  client.hmset('institucionAcademica', [
    "nombre", nombreInstitucionAcademica,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/profesionales', function(req, res) {
  const nombreProfesionales = req.body.nombre;
  
  client.hmset('profesionales', [
    "nombre", nombreProfesionales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/laborales', function(req, res) {
  const nombreLaborales = req.body.nombre;
  
  client.hmset('laborales', [
    "nombre", nombreLaborales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/gradoEstudio', function(req, res) {
  const nombreGradoEstudio = req.body.nombre;
  
  client.hmset('gradoEstudio', [
    "nombre", nombreGradoEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/carreraEstudio', function(req, res) {
  const nombreCarreraEstudio = req.body.nombre;
  
  client.hmset('carreraEstudio', [
    "nombre", nombreCarreraEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});
module.exports = router;
