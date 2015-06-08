'use strict';

var calls = [];

exports.getAll = function() {
  return calls;
};

exports.add = function(call) {
  calls.push(call);
};