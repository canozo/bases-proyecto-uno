var express = require('express');
var util = require('util');
var router = express.Router();

router.put('/', function(req, res) {
  // guardar la informacion obtenida en redis
  console.log("servidor");
    const nombre= req.body.nombre;
    const direccion= req.body.direccion;
    const director= req.body.director;
    const rubro= req.body.rubro;
    const cfi= req.body.cfi;

  // agregar el puesto a la lista de puestos
  client.hmset(nombre, [
    'direccion', direccion,
    'director', director,
    'rubro', rubro,
    'cfi', cfi,
  ], function(err, reply) {
      console.log(reply);
  });

  client.hmset('empresas', [
      nombre, nombre
  ], function(err, reply) {
      console.log(reply);
  });

  // enviar respuesta
  res.json({ error: false });
});

module.exports = router;
