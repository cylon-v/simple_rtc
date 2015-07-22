'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var uuid = require('uuid');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var contacts = require('./routes/contacts');
var records = require('./routes/records');
var app = express();

mongoose.connect('mongodb://localhost/clarify-indexer');

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
app.use('/records', records);

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
  socket.io = io;
});


server.listen(3000);


module.exports = app;
