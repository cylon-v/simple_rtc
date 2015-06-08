'use strict';

var calls = require('../db/calls'),
    crypto = require('crypto'),
    fs = require('fs');

exports.list = function(req, res) {
  res.jsonp(calls.getAll());
};

exports.start = function(req, res){
  var id = crypto.randomBytes(16).toString('hex');

  res.jsonp({id: id});
};