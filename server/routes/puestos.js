var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/', function(req, res) {
  // obtener los puestos guardados en el servidor y enviarlos
  // obtener el listado de puestos
  client.hgetall('puestos', function(err, obj) {
    res.json(obj);
  });
});

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
  const puesto = req.body.puesto;
  const puestoPadre = req.body.puestoPadre;

  // agregar el puesto a la lista de puestos
  client.hmset('puestos', [
    puesto, puestoPadre,
  ], function(err, reply) {
      console.log(reply);
  });

  // enviar respuesta
  res.json({ error: false });
});

router.get('/:puesto', function(req, res) {
  // obtener un puesto y su puesto padre
  const puesto = req.params.puesto;

  // obtener el puesto
  client.hgetall('puestos', function(err, obj) {
    if (!err) {
      res.json({ puesto: puesto, padre: obj[puesto] });
    }
  });
});

router.delete('/:puesto', function(req, res) {
  // eliminar un puesto como llave y de la tabla de puestos
  const puesto = req.params.puesto;

  // buscar si es padre de algun puesto y eliminar ese padre
  client.hgetall('puestos', function(err, obj) {
    if (!err)
      for (let key in obj)
        if (obj[key] === puesto)
          client.hmset('puestos', [key, 'Ninguno']);
  });

  // eliminar de la tabla de puestos
  client.hdel('puestos', puesto);

  // enviar respuesta
  res.json({ error: false });
});

module.exports = router;
