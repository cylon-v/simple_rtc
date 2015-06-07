'use strict';

var users = require('../db/users');

exports.list = function(req, res) {
  res.jsonp(users.getAll());
};

exports.call = function(req, res) {
  var contact = users.find(req.params.id);
  var io = req.app.get('io');
  io.sockets.in(req.params.id).emit('contact.call');
  res.jsonp({contact: req.params.id});
};