'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('tokens');

module.exports.addToken = function(username, token, type, callback) {
  db.tokens.insert({username: username, token: token, type: type}, function(err, result) {
    callback(err, result);
  })
};

module.exports.findTokenByUsernameAndType = function(username, type, callback) {
  db.tokens.findOne({username: username, type: type}, function(err, result) {
    callback(err, result);
  })
};

module.exports.deleteByUsernameAndType = function(username, type, callback) {
  db.tokens.remove({username: username, type: type}, function(err, result) {
    callback(err, result);
  })
};
