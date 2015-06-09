'use strict';

var users = require('../db/users');

exports.list = function(req, res) {
  res.jsonp(users.getAll());
};

exports.one = function(req, res) {
  var contact = users.find(req.params.id);
  res.jsonp(contact);
};

exports.call = function(req, res) {
  var from = req.session.user_id;
  var io = req.app.get('io');
  console.log(req.params.id);
  io.sockets.in(req.params.id).emit('call', {id: from});
  res.jsonp({contact: req.params.id});
};