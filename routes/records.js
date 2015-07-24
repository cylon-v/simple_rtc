'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.put('/:id', auth.authorizeAjax, records.update);
router.put('/:id/finish', auth.authorizeAjax, records.finish);

module.exports = router;

