'use strict';

var fs = require('fs');
require('../models/record');
var Record = require('mongoose').model('Record');
var clarify = require('clarifyio');
var config = require('../config');
var clarifyClient = new clarify.Client('api.clarify.io', config.clarify.API_KEY);

exports.list = function(req, res) {
  Record.find({}, function(err, records){
    res.render('records/history', {records: records});
  });
};

exports.show = function(req, res) {
  Record.findById(req.params.id, function(err, record){
    res.render('records/show', {data: record.data});
  });
};

var handleData = function(data) {
  return data.replace(/^data:audio\/ogg; codecs=opus;base64,/, '');
};

exports.create = function(req, res){
  var data = handleData(req.body.data);
  Record.create({
    name: req.body.name,
    addedAt: Date.now()
  }, function(err, record){
    fs.writeFile(record.path, data, 'base64');
    res.jsonp({id: record._id});
  });
};

exports.update = function(req, res) {
  var data = handleData(req.body.data);
  Record.getById(req.params.id, function(err, record){
    fs.appendFile(record.path, data, 'base64');
    res.jsonp({id: req.params.id});
  });
};

exports.finish = function(req, res) {
  Record.getById(req.params.id, function(err, record){
    clarifyClient.createBundle({
      name: record.name,
      media_url: record.url,
      notify_url: config.BASE_URL + '/notify',
      external_id: record._id
    });
  });
};

exports.notify = function(req, res) {
  if (req.body.track_id) { // Handle tracks
    Record.findById(req.body.external_id, function(err, record){
      record.indexedAt = Date.now();
      record.data = JSON.stringify(req.body);
      record.save();
    });
  }
  res.sendStatus(200);
};


