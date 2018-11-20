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

    router.get('/', function(req, res) {
        // obtener los puestos guardados en el servidor y enviarlos
        // obtener el listado de puestos
        client.hgetall('personas', function(err, obj) {
          if (!err) {
            res.json(obj);
          }
        });
      });

      router.put('/', function(req, res) {
        // guardar la informacion obtenida en redis
        console.log("servidor");
          const numID= req.body.numID;
          const nombre= req.body.nombre;
          const telefono= req.body.telefono;
          const email= req.body.email;
          const direccion= req.body.direccion;
          const genero= req.body.genero;
          const fecha_nacimiento= req.body.fecha_nacimiento;
          const estado_civil= req.body.estado_civil;
          const familiares= req.body.familiares;
          const sanitarios= req.body.sanitarios;
          const legales= req.body.legales;
          const laborales= req.body.laborales;
          const profesionales= req.body.profesionales;
          const academicos= req.body.academicos;
      
        // agregar el puesto a la lista de puestos
        client.hmset(numID, [
          'direccion', direccion,
          'nombre', nombre,
            'telefono',telefono,
            'email',email,
            'direccion',direccion,
            'genero',genero,
            'fecha_nacimiento',fecha_nacimiento,
            'estado_civil',estado_civil,
            'familiares',familiares,
            'sanitarios',sanitarios,
            'legales',legales,
            'laborales',laborales,
            'profesionales',profesionales,
            'academicos',academicos,
        ], function(err, reply) {
            console.log(reply);
        });
      
        client.hmset('personas', [
            numID, nombre
        ], function(err, reply) {
            console.log(reply);
        });
      
        // enviar respuesta
        res.json({ error: false });
      });
    
    })
module.exports = router;
