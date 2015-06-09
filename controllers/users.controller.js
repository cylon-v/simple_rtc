'use strict';

var User = require('../db/users');

exports.authorize = function(req, res) {
  if (req.session.user_id) {
    res.jsonp({id: req.session.user_id});
  } else {
    res.sendStatus(403);
  }
};

exports.sign_in = function(req, res) {
  var user = User.findByName(req.body.name);
  if (user) {
    if (user.password === req.body.password) {
      req.session.user_id = user.id;
      res.redirect('/');
    } else {
      res.redirect('/sign_in');
    }
  } else {
    res.redirect('/sign_in');
  }
};


