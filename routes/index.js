'use strict';

var express = require('express'),
    router = express.Router(),
    contacts = require('../controllers/contacts.controller');

router.get('/', function(req, res){
  res.render('index');
});

router.get('/contacts', contacts.list);


router.get('/call/:contactId', contacts.call);

module.exports = router;
