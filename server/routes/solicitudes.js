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
    // agregar la llave a la tabla general
    client.hmset('solicitudes puesto', [
      llaves.solPuestos, `solicitud puesto ${llaves.solPuestos}`,
    ], function(err, reply) {
    });

    // agregar la llave con toda la info
    client.hmset(`solicitud puesto ${llaves.solPuestos}`, [
      'lugar', lugar,
      'genero', genero,
      'estadoCivil', estadoCivil,
      'rangoEdad', rangoEdad,
      'sueldo', sueldo,
      'cantidadPlazas', cantidadPlazas,
      'condicionManejar', condicionManejar,
      'condicionIngles', condicionIngles,
      'condicionOffice', condicionOffice,
      'condicionPresion', condicionPresion,
      'condicionAuxilios', condicionAuxilios,
    ], function(err, reply) {
    });

    // aumentar el valor de la llave
    llaves.solPuestos += 1;
  }
});

module.exports = router;
