'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    session = require('express-session'),
    uuid = require('uuid');

var routes = require('./routes/index'),
    contacts = require('./routes/contacts'),
    calls = require('./routes/calls');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret: 'ffjHJHKKKJKgFNh5!5hjf67pp'
}));

app.use('/', routes);
app.use('/contacts', contacts);
app.use('/calls', calls);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = http.createServer(app);
var io = require('socket.io')(server),
  broker = require('./brokers/calls.broker');

app.set('io', io);
io.on('connection', function(socket){
  broker.authorize(socket);
});


server.listen(3000);


module.exports = app;
