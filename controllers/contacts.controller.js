'use strict';

var users = require('../db/users');

exports.list = function(req, res) {
  res.jsonp(users.getAll());
};

exports.call = function(req, res) {
  var contact = users.find(req.params.contactId);
  res.render('call', { contact: contact });
};