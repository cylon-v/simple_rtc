'use strict';

var calls = require('../db/calls'),
    fs = require('fs'),
    dateFormat = require('dateformat');

exports.list = function(req, res) {
  console.log(calls.getAll());
  res.render('history', {calls: calls.getAll()});
};
