'use strict';

var express = require('express');
var router = express.Router();
var calls = require('../controllers/calls.controller');
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.get('/', auth.authorize, calls.list);
router.post('/:id/record', auth.authorizeAjax, records.create);
module.exports = router;

