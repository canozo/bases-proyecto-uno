var express = require('express');
var util = require('util');
var router = express.Router();

router.put('/sanitarios', function(req, res) {
  console.log(req.body);
  const nombreSanitario = req.body.nombre;
  
  client.hmset('sanitarios', [
    nombreSanitario, nombreSanitario,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/sanitarios', function(req, res) {
  client.hgetall('sanitarios', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});


router.put('/legales', function(req, res) {
  const nombreLegales = req.body.nombre;
  
  client.hmset('legales', [
    nombreLegales, nombreLegales,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/legales', function(req, res) {
  client.hgetall('legales', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/institucionAcademica', function(req, res) {
  const nombreInstitucionAcademica = req.body.nombre;
  
  client.hmset('institucionAcademica', [
    nombreInstitucionAcademica, nombreInstitucionAcademica,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/institucionAcademica', function(req, res) {
  client.hgetall('institucionAcademica', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/profesionales', function(req, res) {
  const nombreProfesionales = req.body.nombre;
  
  client.hmset('profesionales', [
    nombreProfesionales, nombreProfesionales,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/profesionales', function(req, res) {
  client.hgetall('profesionales', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/laborales', function(req, res) {
  const nombreLaborales = req.body.nombre;
  
  client.hmset('laborales', [
    nombreLaborales, nombreLaborales,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/laborales', function(req, res) {
  client.hgetall('laborales', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/gradoEstudio', function(req, res) {
  const nombreGradoEstudio = req.body.nombre;
  
  client.hmset('gradoEstudio', [
    nombreGradoEstudio, nombreGradoEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/gradoEstudio', function(req, res) {
  client.hgetall('gradoEstudio', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/carreraEstudio', function(req, res) {
  const nombreCarreraEstudio = req.body.nombre;
  
  client.hmset('carreraEstudio', [
    nombreCarreraEstudio, nombreCarreraEstudio,
  ], function(err, reply) {
      console.log(reply);
  });

});
router.get('/carreraEstudio', function(req, res) {
  client.hgetall('carreraEstudio', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});
module.exports = router;
