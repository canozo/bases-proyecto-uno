var express = require('express');
var util = require('util');
var router = express.Router();

// TODO una persona empleada puede solicitar empleo

router.delete('/:tabla/:deletethis', function(req, res) {
  const tabla = req.params.tabla;
  const deletethis = req.params.deletethis;

  client.hdel(tabla, deletethis);
  res.json({ error: false });
});

module.exports = router;
