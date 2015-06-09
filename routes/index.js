'use strict';

var express = require('express'),
    router = express.Router(),
    users = require('../controllers/users.controller'),
    auth = require('../middleware/auth');


router.get('/sign_in', function(req, res){
  res.render('sign_in');
});

router.get('/', auth.authorize, function(req, res){
  res.render('index');
});

router.post('/sign_in', users.sign_in);
router.get('/authorize', users.authorize);


module.exports = router;
