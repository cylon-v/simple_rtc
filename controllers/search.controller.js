'use strict';

require('../models/record.js');
var Record = require('mongoose').model('Record');
var clarify = require('clarifyio');
var config = require('../config')
var clarifyClient = new clarify.Client("api.clarify.io", config.clarify.API_KEY);
var  _ = require('lodash');


exports.search = function(req, res) {
  var query = req.params.query;

  var json = {
    searchResults: []
  };

  clarifyClient.search({query: query}, function(results){
    var count = Math.min(results.total, results.limit);
    json.terms = (results.search_terms || []).map(function(t){ return t.term; });

    if (count > 0) {
      var ids = results._embedded.items.map(function(item){
        return item._embedded["clarify:metadata"].data.mediaId;
      });

      Record.find({"_id": {"$in": ids}}, function(data){
        var records = _.transform(data, function(result, item){
          result[item.id] = item;
        });

        for(var i = 0; i < count; i++) {
          var metadata = results._embedded.items[i]._embedded["clarify:metadata"].data;
          var itemResult = results.item_results[i];
          var media = records[metadata.mediaId];
          if (media){
            var result = {
              id: media._id,
              mediaUrl: media.url,
              name: media.name,
              score: itemResult.score,
              hits: gatherHits(itemResult),
              duration: gatherDuration(media),
              searchTermResults: itemResult.term_results
            };
            json.searchResults.push(result);
          }
        }
        res.status(200);
        res.json(json);
      });
    }
  });

};

var gatherDuration = function(media) {
  var durations = (media.tracks || []).filter(function(track){
    return track.duration != null;
  }).map(function(track){
    return track.duration;
  });
  var duration = null;
  if(durations && durations.length > 0){
    duration = durations.reduce(function(prev, cur){ return Math.max(prev, cur);});
  }
  return duration;
};

var gatherHits = function(itemResult) {
  var hits = [];
  (itemResult.term_results || []).forEach(function (tr, i) {
    var term = terms[i] || "";
    var matches = tr.matches || [];
    matches.forEach(function (m) {
      if (m.type === "audio") {
        m.hits.forEach(function (h) {
          h.term = term;
          hits.push(h);
        });
      }
    });
  });
};