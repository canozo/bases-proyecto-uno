var express = require('express');
var util = require('util');
var router = express.Router();

router.put('/sanitarios', function(req, res) {
  console.log(req.body);
  const nombreSanitario = req.body.nombre;
  
  client.hmset('sanitarios', [
    nombreSanitario, nombreSanitario,
  ], function(err, reply) {
      console.log(reply);
  });

});


router.put('/legales', function(req, res) {
  const nombreLegales = req.body.nombre;
  
  client.hmset('legales', [
    nombreLegales, nombreLegales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/institucionAcademica', function(req, res) {
  const nombreInstitucionAcademica = req.body.nombre;
  
  client.hmset('institucionAcademica', [
    nombreInstitucionAcademica, nombreInstitucionAcademica,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/profesionales', function(req, res) {
  const nombreProfesionales = req.body.nombre;
  
  client.hmset('profesionales', [
    nombreProfesionales, nombreProfesionales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/laborales', function(req, res) {
  const nombreLaborales = req.body.nombre;
  
  client.hmset('laborales', [
    nombreLaborales, nombreLaborales,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/gradoEstudio', function(req, res) {
  const nombreGradoEstudio = req.body.nombre;
  
  client.hmset('gradoEstudio', [
    nombreGradoEstudio, nombreGradoEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});

router.put('/carreraEstudio', function(req, res) {
  const nombreCarreraEstudio = req.body.nombre;
  
  client.hmset('carreraEstudio', [
    nombreCarreraEstudio, nombreCarreraEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});
module.exports = router;
