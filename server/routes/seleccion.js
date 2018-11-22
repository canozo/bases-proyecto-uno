var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/puestos', function(req, res) {
  let promises = [];

    for (let i = 0; i <= llaves.solPuestos; i++) {
      promises.push(new Promise((resolve, reject) => {
        client.hgetall(`solicitud puesto #${i}`, function(err, obj) {
          if (err)
            reject(err);
          obj.tipo = 'solicitud puesto';
          obj.llave = `solicitud puesto #${i}`;
          obj.requisitos = obj.requisitos.split(',');
          obj.deseos = obj.deseos.split(',');
          obj.condiciones = obj.condiciones.split(',');
          resolve(obj);
        });
      }));
    }

    Promise.all(promises).then((values) => {
      res.json(values);
    });
});


router.get('/empleos', function(req, res) {
  let promises = [];

  for (let i = 0; i <= llaves.solEmpleos; i++) {
    promises.push(new Promise((resolve, reject) => {
      client.hgetall(`solicitud empleo #${i}`, function(err, obj) {
        if (err)
          reject(err);
        obj.tipo = 'solicitud empleo';
        obj.llave = `solicitud empleo #${i}`;
        obj.puestos = obj.puestos.split(',');
        obj.deseos = obj.deseos.split(',');
        obj.condiciones = obj.condiciones.split(',');
        resolve(obj);
      });
    }));
  }

  Promise.all(promises).then((values) => {
    res.json(values);
  });
});

router.get('/', function(req, res) {
  let promesaPersonas = new Promise((resolve, reject) => {
    client.hgetall('personas', function(err, obj1) {
      if (err)
        reject(err);
      else
        resolve(obj1);
    });
  });

  promesaPersonas.then((values) => {
    for (let key in values) {
      promises.push(new Promise((resolve, reject) => {
        client.hgetall(key, function(err, obj2) {
          if (err)
            reject(err);
          obj2.tipo = 'personas';
          obj2.requisitos = obj2.requisitos.split(',');
          resolve(obj2);
        });
      }));
    }
  });

  promises.push(promesaPersonas);

  Promise.all(promises).then((values) => {
    console.log(promises);
    res.json(values);
  });

  // // para cada solicitud empresas
  // for (let i = 0; i < solicitudesPuesto.length; i++) {
  //   //  para cada solicitud de empleo
  //   for (let j = 0; j < solicitudesEmpleo.length; j++) {
  //     // si una solicitud de empleo aplica en el mismo puesto que la solicitud de empresa
  //     // agregar la solicitud de empleo a la solicitud de empresa

  //   }
  // }
  // //   si la persona cumple con todos los requisitos
  // //    si la solicitud de empleo cumple con todas las condiciones
  // //     setear la solicitud agregada anteriormente con aceptada: true
});

router.put('/', function(req, res) {
  const numID = req.params.id;
  client.hgetall(numID, function(err, obj) {
    res.json(obj);
  });
});

module.exports = router;
