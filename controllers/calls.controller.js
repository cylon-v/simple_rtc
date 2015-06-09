'use strict';

var calls = require('../db/calls'),
    crypto = require('crypto'),
    fs = require('fs'),
    dateFormat = require('dateformat');

exports.list = function(req, res) {
  console.log(calls.getAll());
  res.render('history', {calls: calls.getAll()});
};


var handleData = function(data) {
  return data.replace(/^data:audio\/ogg; codecs=opus;base64,/, '');
};

exports.create = function(req, res){
  var id = crypto.randomBytes(16).toString('hex');
  var data = handleData(req.body.data);
  var name = req.body.name + ' - ' + dateFormat(Date.now(), 'mm/dd/yyyy h:MM');
  calls.add({id: id, name: name });

  fs.writeFile('./public/uploads/' + id + '.ogg', data, 'base64');

  res.jsonp({id: id});
};

exports.update = function(req, res) {
  var data = handleData(req.body.data);
  fs.appendFile('./public/uploads/' + req.params.id + '.ogg', data, 'base64');
  res.jsonp({id: req.params.id});
};
