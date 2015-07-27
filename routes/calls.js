'use strict';

var express = require('express');
var router = express.Router();
var calls = require('../controllers/calls.controller');
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.get('/', auth.ensureAuthenticatedAjax, calls.list);
router.post('/:id/record', auth.ensureAuthenticatedAjax, records.create);

module.exports = router;

