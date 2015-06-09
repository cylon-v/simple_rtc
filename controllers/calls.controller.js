'use strict';

var calls = require('../db/calls'),
    crypto = require('crypto'),
    fs = require('fs');

exports.list = function(req, res) {
  console.log(calls.getAll());
  res.render('history', {calls: calls.getAll()});
};

exports.create = function(req, res){
  var id = crypto.randomBytes(16).toString('hex');
  var data = req.body.data.replace(/^data:audio\/ogg; codecs=opus;base64,/, '');
  calls.add({id: id, name: req.body.name});

  fs.writeFile('./public/uploads/' + id + '.ogg', data, 'base64');

  res.jsonp({id: id});
};