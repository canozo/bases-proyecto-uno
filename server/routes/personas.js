var express = require('express');
var util = require('util');
var router = express.Router();

router.get('/', function(req, res) {
  // obtener las personas guardados en el servidor y enviarlos
  // obtener el listado de personas
  client.hgetall('personas', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.delete('/:id', function(req, res) {
  const numID = req.params.id;
  client.del(numID);
  client.hdel('personas', numID);
  res.json({ error: false });
});

router.get('/:id', function(req, res) {
  const numID = req.params.id;
  client.hgetall(numID, function(err, obj) {
    res.json(obj);
  });
});

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
  const numID = req.body.numID;
  const nombre = req.body.nombre;
  const telefono = req.body.telefono;
  const email = req.body.email;
  const direccion = req.body.direccion;
  const genero = req.body.genero;
  const fecha_nacimiento = req.body.fecha_nacimiento;
  const estado_civil = req.body.estado_civil;
  const familiares = req.body.familiares;
  const sanitarios = req.body.sanitarios;
  const legales = req.body.legales;
  const laborales = req.body.laborales;
  const profesionales = req.body.profesionales;
  const academicos = req.body.academicos;
  const numAcadm = req.body.numAcadm;

  let academicosArr = [];
  let pos = 0;

  for (let key in academicos) {
    if (academicos[key] === 'Ninguno')
      break;

    academicosArr[pos] = key;
    pos += 1;
    academicosArr[pos] = academicos[key];
    pos += 1;
  }

  // en empleo se guarda la empresa donde trabaja
  // agregar la persona a la lista de personas
  client.hmset(numID, [
    'direccion', direccion,
    'nombre', nombre,
    'telefono', Number(telefono),
    'email', email,
    'direccion', direccion,
    'genero', genero,
    'fecha_nacimiento', fecha_nacimiento,
    'estado_civil', estado_civil,
    'familiares', Object.keys(familiares).toString(),
    'sanitarios', Object.keys(sanitarios).toString(),
    'legales', Object.keys(legales).toString(),
    'laborales', Object.keys(laborales).toString(),
    'profesionales', Object.keys(profesionales).toString(),
    'num_academicos', numAcadm,
    'empleo', '',
  ], function(err, reply) {
  });

  // tabla de personas
  client.hmset('personas', [numID, nombre]);

  if (academicosArr.length > 0) {
    // setear la informacion academica
    client.hmset(numID, academicosArr);
  }

  // enviar respuesta
  res.json({ error: false });
});

module.exports = router;
