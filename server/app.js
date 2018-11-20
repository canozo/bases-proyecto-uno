var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis');

var indexRouter = require('./routes/index');
var puestosRouter = require('./routes/puestos');
var requisitosRouter = require('./routes/requisitos');
var empresasRouter = require('./routes/empresas');
var personasRouter = require('./routes/personas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cliente de redis
client = redis.createClient();
client.on('connect', () => {
  console.log('Conectado a Redis.');
});

app.use('/', indexRouter);
app.use('/requisitos', requisitosRouter);
app.use('/puestos', puestosRouter);
app.use('/empresas', empresasRouter);
app.use('/personas', personasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
