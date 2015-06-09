'use strict';

var User = require('../db/users');

exports.authorize = function(req, res, next) {
  if (req.session.user_id) {
    var user = User.find(req.session.user_id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/sign_in');
    }
  } else {
    res.redirect('/sign_in');
  }
};

exports.authorizeAjax = function(req, res, next) {
  if (req.session.user_id) {
    var user = User.find(req.session.user_id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
