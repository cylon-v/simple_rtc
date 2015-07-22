'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.get('/', auth.authorize, records.list);
router.get('/show/:id', auth.authorize, records.show);
router.post('/', auth.authorizeAjax, records.create);
router.put('/:id', auth.authorizeAjax, records.update);
router.put('/notify', records.notify);

router.get('/search', function(req, res){
  res.render('records/search');
});

module.exports = router;

