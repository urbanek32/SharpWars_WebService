'use strict';
var mongo = require('mongoskin'),
  db = mongo.db("mongodb://localhost:27017/inzynierka", {native_parser:true});

db.bind('lobbies');

module.exports.addNewLobby = function(newLobby, callback) {
  db.lobbies.insert(newLobby, function(err, result) {
    callback(err, result);
  });
};

module.exports.findLobbyByName = function(name, callback) {
  db.lobbies.findOne({name: name}, function(err, result) {
    callback(err, result);
  });
};

module.exports.getAllLobbies = function(callback) {
  db.lobbies.find().toArray(function(err, result) {
    callback(err, result);
  });
};

module.exports.addUserToLobby = function(lobbyName, username, callback) {
  db.lobbies.update({name: lobbyName}, { $push: {players: username}}, function(err, result) {
    callback(err, result);
  });
};

module.exports.changeLobbyStatus = function(lobbyName, status, players, callback) {
  db.lobbies.update({name: lobbyName}, {$set: {state: status, players: players}}, function(err, result) {
    callback(err, result);
  })
};
