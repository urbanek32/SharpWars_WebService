'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('scores');

module.exports.addNewLobby = function(newLobby, callback) {
  db.scores.find(function(err, result) {
    callback(err, result);
  });
};
