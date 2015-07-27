'use strict';

require('../models/call');
var Call = require('mongoose').model('Call');

exports.list = function(req, res) {
  Call.find({user: req.user}, function(err, calls){
    res.render('history', {calls: calls});
  });
};
