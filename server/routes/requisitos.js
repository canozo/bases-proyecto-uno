var express = require('express');
var util = require('util');
var router = express.Router();

router.delete('/:tabla/:deletethis', function(req, res) {
  const tabla = req.params.tabla;
  const deletethis = req.params.deletethis;

  client.hdel(tabla, deletethis);
  res.json({ error: false });
});

router.put('/sanitarios', function(req, res) {
  const nombreSanitario = req.body.nombre;
  
  client.hmset('sanitarios', [
    nombreSanitario, nombreSanitario,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
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
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/legales', function(req, res) {
  client.hgetall('legales', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/institucionacademica', function(req, res) {
  const nombreInstitucionAcademica = req.body.nombre;

  client.hmset('institucionacademica', [
    nombreInstitucionAcademica, nombreInstitucionAcademica,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/institucionacademica', function(req, res) {
  client.hgetall('institucionacademica', function(err, obj) {
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
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
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
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/laborales', function(req, res) {
  client.hgetall('laborales', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/gradoestudio', function(req, res) {
  const nombreGradoEstudio = req.body.nombre;

  client.hmset('gradoestudio', [
    nombreGradoEstudio, nombreGradoEstudio,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/gradoestudio', function(req, res) {
  client.hgetall('gradoestudio', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/carreraestudio', function(req, res) {
  const nombreCarreraEstudio = req.body.nombre;
  
  client.hmset('carreraestudio', [
    nombreCarreraEstudio, nombreCarreraEstudio,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/carreraestudio', function(req, res) {
  client.hgetall('carreraestudio', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/condiciones', function(req, res) {
  const nombreCondiciones = req.body.nombre;
  
  client.hmset('condiciones', [
    nombreCondiciones, nombreCondiciones,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/condiciones', function(req, res) {
  client.hgetall('condiciones', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/deseos', function(req, res) {
  const nombreDeseos = req.body.nombre;
  
  client.hmset('deseos', [
    nombreDeseos, nombreDeseos,
  ], function(err, reply) {
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/deseos', function(req, res) {
  client.hgetall('deseos', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

module.exports = router;
