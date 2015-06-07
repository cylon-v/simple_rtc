'use strict';

var express = require('express'),
    router = express.Router(),
    contacts = require('../controllers/contacts.controller'),
    User = require('../db/users');

function authorize(req, res, next) {
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
}

function authorizeAjax(req, res, next) {
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
}

router.get('/sign_in', function(req, res){
  res.render('sign_in');
});

router.post('/sign_in', function(req, res){
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
});

router.get('/authorize', function(req, res){
  if (req.session.user_id) {
    res.jsonp({user: req.session.user_id});
  } else {
    res.sendStatus(403);
  }
});


router.get('/', authorize, function(req, res){
  res.render('index');
});

router.get('/contacts', authorizeAjax, contacts.list);
router.get('/call/:contactId', authorizeAjax, contacts.call);

module.exports = router;
