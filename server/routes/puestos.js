var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/', function(req, res) {
  // obtener los puestos guardados en el servidor y enviarlos
  res.json([{
      name: 'Programador',
      value: '1',
    }, {
      name: 'Vendedor',
      value: '2',
    }
  ])
});

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
  const puesto = req.body.puesto;
  const idPuestoPadre = req.body.idPuestoPadre;
  console.log(puesto, idPuestoPadre);
  res.json({ status: 'sin error' });
});

module.exports = router;
