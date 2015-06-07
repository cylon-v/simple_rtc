'use strict';

var express = require('express'),
    router = express.Router(),
    contacts = require('../controllers/contacts.controller');

router.get('/', contacts.list);

module.exports = router;
