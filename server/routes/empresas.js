var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/', function(req, res) {
  // obtener las empresas guardados en el servidor y enviarlos
  client.hgetall('empresas', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.get('/:nombreEmpresa', function(req, res) {
  const nombreEmpresa = req.params.nombreEmpresa;
  client.hgetall(nombreEmpresa, function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.delete('/:nombreEmpresa', function(req, res) {
  const nombreEmpresa = req.params.nombreEmpresa;
  client.hdel('empresas', nombreEmpresa);
  client.del(nombreEmpresa);
  res.json({ error: false });
});

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const director = req.body.director;
    const rubro = req.body.rubro;
    const cfi = req.body.cfi;

  // agregar el puesto a la lista de puestos
  client.hmset(nombre, [
    'direccion', direccion,
    'director', director,
    'rubro', rubro,
    'cfi', cfi,
  ], function(err, reply) {
  });

  client.hmset('empresas', [
      nombre, nombre
  ], function(err, reply) {
  });

  // enviar respuesta
  res.json({ error: false });
});

module.exports = router;
