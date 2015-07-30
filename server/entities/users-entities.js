'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('users');

module.exports.addUser = function(newUser, callback) {
  db.users.insert(newUser, function(err, result) {
    callback(err, result);
  })
};

module.exports.findUserByEmail = function(email, callback) {
  db.users.findOne({email: email}, function(err, result) {
    callback(err, result);
  })
};

module.exports.findUserByUsername = function(username, callback) {
  db.users.findOne({username: username}, function(err, result) {
    callback(err, result);
  })
};

module.exports.deleteUserByEmail = function(email, callback) {
  db.users.remove({email: email}, function(err, result) {
    callback(err, result);
  })
};

module.exports.activateByUsername = function(username, callback) {
  db.users.update({username: username}, {$set: {activated: true}}, {strict: true}, function(err, result) {
    callback(err, result);
  })
};

module.exports.updateByUsername = function(username, userAttributes, callback) {
  db.users.update({username: username}, {$set: userAttributes}, {strict: true}, function(err, result) {
    callback(err, result);
  })
};

module.exports.setNewPasswordForEmail = function(email, newPassword, callback) {
  db.users.update({email: email}, {$set: {password: newPassword}}, {strict: true}, function(err, result) {
    callback(err, result);
  })
};
