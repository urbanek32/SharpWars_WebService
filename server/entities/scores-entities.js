'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('scores');

module.exports.setScore = function(username, lastGameScore, lastGameTime, isWinner, callback) {
  db.scores.update({username: username}, {$set: {lastGameScore: lastGameScore, lastGameTime: lastGameTime},
                                      $inc: {summaryGameScore: lastGameScore, summaryGameTime: lastGameTime,
                                              victories: +(isWinner), losts: +(!isWinner)}},
                  {upsert: true}, function(err, result) {
    callback(err, result);
  });
};

module.exports.findScoresByUsername = function(username, callback) {
  db.scores.findOne({username: username}, function(err, result) {
    callback(err, result);
  })
};

module.exports.getTopScores = function(criteria, order, limit, callback) {
  var query = {};
  query[criteria] = order;
  db.scores.find().sort(query).limit(limit).toArray(function(err, result) {
    callback(err, result);
  });
};
