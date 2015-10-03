'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('scores');

module.exports.setScore = function(username, lastGameScore, lastGameTime, callback) {
  db.scores.update({username: username}, {$set: {lastGameScore: lastGameScore, lastGameTime: lastGameTime},
                                      $inc: {summaryGameScore: lastGameScore, summaryGameTime: lastGameTime}},
                  {upsert: true}, function(err, result) {
    callback(err, result);
  });
};
