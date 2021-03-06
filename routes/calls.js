'use strict';

var express = require('express'),
  router = express.Router(),
  calls = require('../controllers/calls.controller'),
  auth = require('../middleware/auth');

router.get('/', auth.authorize, calls.list);
router.post('/', auth.authorizeAjax, calls.create);
router.put('/:id', auth.authorizeAjax, calls.update);

module.exports = router;

