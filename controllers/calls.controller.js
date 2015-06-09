'use strict';

var calls = require('../db/calls'),
    crypto = require('crypto'),
    fs = require('fs'),
    dateFormat = require('dateformat');

exports.list = function(req, res) {
  console.log(calls.getAll());
  res.render('history', {calls: calls.getAll()});
};

exports.create = function(req, res){
  var id = crypto.randomBytes(16).toString('hex');
  var data = req.body.data.replace(/^data:audio\/ogg; codecs=opus;base64,/, '');
  var name = req.body.name + ' - ' + dateFormat(Date.now(), 'mm/dd/yyyy h:MM');
  calls.add({id: id, name: name });

  fs.writeFile('./public/uploads/' + id + '.ogg', data, 'base64');

  res.jsonp({id: id});
};