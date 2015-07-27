'use strict';

require('../models/user');
var User = require('mongoose').model('User');

exports.list = function(req, res) {
  User.find({}, function(err, users){
    res.status(200).json({users: users});
  });
};

exports.one = function(req, res) {
  User.findById(req.params.id, function(err, user){
    res.status(200).json({contact: user});
  });
};

exports.call = function(req, res) {
  var from = req.session.user_id;
  var io = req.app.get('io');
  console.log(req.params.id);
  io.sockets.in(req.params.id).emit('call', {id: from});
  res.jsonp({contact: req.params.id});
};