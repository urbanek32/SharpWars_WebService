'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('scripts');

module.exports.addNewScript = function(newScript, callback) {
  db.scripts.insert(newScript, function(err, result) {
    callback(err, result);
  });
};

module.exports.findScriptByNameAndOwner = function(name, owner, callback) {
  db.scripts.findOne({name: name, owner: owner}, function(err, result) {
    callback(err, result);
  });
};

module.exports.getAllScriptsForUser = function(username, callback) {
  db.scripts.find({owner: username}).toArray(function(err, result) {
    callback(err, result);
  });
};

module.exports.updateByNameAndOwner = function(name, owner, updatedScript, callback) {
  db.scripts.update({name: name, owner: owner}, {$set: updatedScript}, {strict: true}, function(err, result) {
    callback(err, result);
  })
};

module.exports.deleteByNameAndOwner = function(name, owner, callback) {
  db.scripts.remove({name: name, owner: owner}, function(err, result) {
    callback(err, result);
  })
};
