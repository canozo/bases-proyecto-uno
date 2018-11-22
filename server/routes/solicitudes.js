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
  const { nombrePuesto, cargo, lugar, sueldo, cantidadPlazas, sanitarios, legales, laborales, profesionales, academicos, numAcadm, deseos, condiciones } = req.body;

  let sanitariosArr = [];
  let legalesArr = [];
  let laboralesArr = [];
  let profesionalesArr = [];
  let academicosArr = [];
  let deseosArr = [];
  let condicionesArr = [];
  let pos = 0;

  for (let key in sanitarios) {
    if (sanitarios[key] === true) {
      sanitariosArr.push(key);
    }
  }

  for (let key in legales) {
    if (legales[key] === true) {
      legalesArr.push(key);
    }
  }

  for (let key in laborales) {
    if (laborales[key] === true) {
      laboralesArr.push(key);
    }
  }

  for (let key in profesionales) {
    if (profesionales[key] === true) {
      profesionalesArr.push(key);
    }
  }

  for (let key in academicos) {
    if (academicos[key] === true) {
      academicosArr.push(key);
    }
  }

  for (let key in deseos) {
    if (deseos[key] === 'Si ofrece') {
      deseosArr.push(key);
    }
  }

  for (let key in condiciones) {
    if (condiciones[key] === 'Obligatorio') {
      condicionesArr.push(key);
    }
  }

  for (let key in academicos) {
    if (academicos[key] === 'Ninguno')
      break;

    academicosArr[pos] = key;
    pos += 1;
    academicosArr[pos] = academicos[key];
    pos += 1;
  }

  if (!error) {
    // agregar la llave a la tabla general
    client.hmset('solicitud puesto', [llaves.solPuestos, `solicitud puesto #${llaves.solPuestos}`]);

    // agregar la llave con toda la info
    client.hmset(`solicitud puesto #${llaves.solPuestos}`, [
      'nombrePuesto', nombrePuesto,
      'cargo', cargo,
      'lugar', lugar,
      'sueldo', sueldo,
      'cantidadPlazas', cantidadPlazas,
      'sanitarios', sanitariosArr.toString(),
      'legales', legalesArr.toString(),
      'laborales', laboralesArr.toString(),
      'profesionales', profesionalesArr.toString(),
      'deseos', deseosArr.toString(),
      'condiciones', condicionesArr.toString(),
    ]);

    if (academicosArr.length > 0) {
      // setear la informacion academica
      client.hmset(`academicos puesto #${llaves.solPuestos}`, academicosArr);
    }

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
