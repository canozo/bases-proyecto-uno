var express = require('express');
var util = require('util');
var router = express.Router();

router.delete('/:tabla/:deletethis', function(req, res) {
  const tabla = req.params.tabla;
  const deletethis = req.params.deletethis;

  client.hdel(tabla, deletethis);
  res.json({ error: false });
});

router.put('/uno', function(req, res) {
  console.log(req.body);
  const nombreUno = req.body.nombre;
  
  client.hmset('uno', [
    nombreUno, nombreUno,
  ], function(err, reply) {
      console.log(reply);
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });
});

router.get('/uno', function(req, res) {
  client.hgetall('uno', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/dos', function(req, res) {
  const nombreDos = req.body.nombre;
  
  client.hmset('dos', [
    nombreDos, nombreDos,
  ], function(err, reply) {
      console.log(reply);
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});
router.get('/dos', function(req, res) {
  client.hgetall('dos', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/tres', function(req, res) {
  const nombreTres = req.body.nombre;

  client.hmset('tres', [
    nombreTres, nombreTres,
  ], function(err, reply) {
      console.log(reply);
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/tres', function(req, res) {
  client.hgetall('tres', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/cuatro', function(req, res) {
  const nombreCuatro = req.body.nombre;
  
  client.hmset('cuatro', [
    nombreCuatro, nombreCuatro,
  ], function(err, reply) {
      console.log(reply);
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});

router.get('/cuatro', function(req, res) {
  client.hgetall('cuatro', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

router.put('/cinco', function(req, res) {
  const nombreCinco = req.body.nombre;

  client.hmset('cinco', [
    nombreCinco, nombreCinco,
  ], function(err, reply) {
      console.log(reply);
      if (!err) {
        res.json({ error: false });
      } else {
        res.json({ error: true });
      }
  });

});
router.get('/cinco', function(req, res) {
  client.hgetall('cinco', function(err, obj) {
    if (!err) {
      res.json(obj);
    }
  });
});

module.exports = router;
