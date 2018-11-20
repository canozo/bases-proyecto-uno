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

router.put('/puestos', function(req, res) {
  // guardar la informacion obtenida en redis
  let error = false;
  const { lugar, genero, estadoCivil, rangoEdad, sueldo, cantidadPlazas, condicionManejar, condicionIngles, condicionOffice, condicionPresion, condicionAuxilios} = req.body;

  if (lugar === '') {
    error = true;
  }

  if (genero === '') {
    error = true;
  }

  if (estadoCivil === '') {
    error = true;
  }

  if (rangoEdad === '') {
    error = true;
  }

  if (sueldo === '') {
    error = true;
  }

  if (cantidadPlazas === '') {
    error = true;
  }

  if (condicionManejar === '') {
    error = true;
  }

  if (condicionIngles === '') {
    error = true;
  }

  if (condicionOffice === '') {
    error = true;
  }

  if (condicionPresion === '') {
    error = true;
  }

  if (condicionAuxilios === '') {
    error = true;
  }

  if (!error) {

  }

  console.log(llaves);

  // // agregar el puesto a la lista de puestos
  // client.hmset('puestos', [
  //   puesto, puesto,
  // ], function(err, reply) {
  //     console.log(reply);
  // });

  // // agregar el nuevo puesto
  // client.hmset(puesto, [
  //   'puestoPadre', puestoPadre,
  // ], function(err, reply) {
  //   console.log(reply);
  // });

  // // enviar respuesta
  // res.json({ error: false });
});

module.exports = router;
