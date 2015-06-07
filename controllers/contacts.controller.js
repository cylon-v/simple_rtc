'use strict';

var contacts = require('../db/contacts');

exports.list = function(req, res) {
  console.log('YES');
  console.log(contacts.getAll());
  res.render('index', { contacts: contacts.getAll() });
};