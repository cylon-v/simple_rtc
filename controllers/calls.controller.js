'use strict';

var calls = require('../db/calls'),
    crypto = require('crypto'),
    fs = require('fs');

exports.list = function(req, res) {
  res.jsonp(calls.getAll());
};

exports.create = function(req, res){
  var id = crypto.randomBytes(16).toString('hex');
  var data = req.body.data.replace(/^data:audio\/ogg; codecs=opus;base64,/, "");

  require("fs").writeFile(id + '.ogg', data, 'base64', function(err) {
    console.log(err);
  });

  res.jsonp({id: id});
};