'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var passport = require('passport');


router.get('/sign_in', function(req, res){
  res.render('sign_in');
});

router.get('/', auth.ensureAuthenticated, function(req, res){
  res.render('index');
});

router.get('/sign_in', function(req, res){
  res.render('sign_in', { user: req.user });
});

router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/sign_in'}), function(req, res){
  res.redirect('/');
});

module.exports = router;
