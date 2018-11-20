var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/', function(req, res) {
  // obtener los puestos guardados en el servidor y enviarlos
  // obtener el listado de puestos
  client.hgetall('puestos', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
  const puesto = req.body.puesto;
  const puestoPadre = req.body.puestoPadre;

  // agregar el puesto a la lista de puestos
  client.hmset('puestos', [
    puesto, puesto,
  ], function(err, reply) {
      console.log(reply);
  });

  // agregar el nuevo puesto
  client.hmset(puesto, [
    'puestoPadre', puestoPadre,
  ], function(err, reply) {
    console.log(reply);
  });

  // enviar respuesta
  res.json({ error: false });
});

module.exports = router;
