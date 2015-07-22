'use strict';

var mongoose = require('mongoose');
var config = require('../config');

var Record = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  data: {
    type: String
  },
  addedAt: {
    type: Date
  },
  indexedAt: {
    type: Date
  }
});

Record.virtual('path').get(function(){
  return './public/uploads/' + this.id + '.ogg';
});

Record.virtual('url').get(function(){
  return config.BASE_URL + '/uploads/' + this.id + '.ogg';
});

module.exports = mongoose.model('Record', Record);