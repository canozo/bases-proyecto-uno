// para insertar
client.hmset('lista', [
  'item', item,
], function(err, reply) {

  if (err) {
    res.json({ status: 'error' });
  } else {
    res.json({ status: 'sin error' });
  }
});

client.hmset(llave, [
  'campoUno', campoUno,
  'campoDos', campoDos
], function(err, reply) {
  if (err) {
    res.json({ status: 'error' });
  } else {
    res.json({ status: 'sin error' });
  }
});

// para buscar
client.hgetall(llave, function(err, obj) {
  console.log(obj);
});

// para eliminar
client.delete(llave);

// para modificar, lo mismo que insertar
client.hmset(llave, [
  'campoUno', campoUno,
  'campoDos', campoDos
], function(err, reply) {
  if (err) {
    res.json({ status: 'error' });
  } else {
    res.json({ status: 'sin error' });
  }
});
