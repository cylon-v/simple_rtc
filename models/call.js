'use strict';

var mongoose = require('mongoose');

var Call = new mongoose.Schema({
  date: Date,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  clarify: {
    bundle_id: {
      type: String
    }
  }
});

module.exports = mongoose.model('Call', Call);
