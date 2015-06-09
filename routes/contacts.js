'use strict';

var express = require('express'),
    router = express.Router(),
    contacts = require('../controllers/contacts.controller'),
    auth = require('../middleware/auth');

router.get('/', auth.authorizeAjax, contacts.list);
router.get('/:id', auth.authorizeAjax, contacts.one);
router.get('/:id/call', auth.authorizeAjax, contacts.call);

module.exports = router;
