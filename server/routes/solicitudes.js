var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/puestos', function(req, res) {
  // obtener los puestos guardados en el servidor y enviarlos
  // obtener el listado de puestos
  client.hgetall('solicitud puesto', function(err, obj) {
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
    client.hmset('solicitud puesto', [llaves.solPuestos, `solicitud puesto #${llaves.solPuestos}`]);

    // agregar la llave con toda la info
    client.hmset(`solicitud puesto #${llaves.solPuestos}`, [
      'lugar', lugar,
      'genero', genero,
      'estadoCivil', estadoCivil,
      'rangoEdad', rangoEdad,
      'sueldo', sueldo,
      'cantidadPlazas', cantidadPlazas,
    ]);

    // aumentar el valor de la llave
    llaves.solPuestos += 1;
  }
});

router.get('/empleos', function(req, res) {
  // obtener las solicitud de empleo guardados en el servidor y enviarlos
  client.hgetall('solicitud empleo', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/empleos', function(req, res) {
  // guardar la informacion obtenida en redis
  let error = false;
  const { puestosAplica, condicionesRes, deseosRes, idSolicitante } = req.body;

  let puestosArr = [];
  let condicionesArr = [];
  let deseosArr = [];

  for (let key in puestosAplica) {
    if (puestosAplica[key] === true) {
      if (key === '') {
        error = true;
        break;
      }
      puestosArr.push(key);
    }
  }

  for (let key in condicionesRes) {
    if (condicionesRes[key] === 'Si') {
      if (key === '') {
        error = true;
        break;
      }
      condicionesArr.push(key);
    }
  }

  for (let key in deseosRes) {
    if (deseosRes[key] === 'Si') {
      if (key === '') {
        error = true;
        break;
      }
      deseosArr.push(key);
    }
  }

  console.log('prueba arr: ', puestosArr.toString());
  console.log('prueba arr: ', condicionesArr.toString());
  console.log('prueba arr: ', deseosArr.toString());

  if (!error) {
    // agregar la llave a la tabla general
    client.hmset('solicitud empleo', [llaves.solEmpleos, `solicitud empleo #${llaves.solEmpleos}`]);

    // agregar la llave con toda la info
    client.hmset(`solicitud empleo #${llaves.solEmpleos}`, [
      'solicitante', idSolicitante,
      'deseos', deseosArr.toString(),
      'condiciones', condicionesArr.toString(),
      'puestos', puestosArr.toString(),
    ]);

    // aumentar el valor de la llave
    llaves.solEmpleos += 1;
  }

  res.json({ error: false });
});

module.exports = router;
