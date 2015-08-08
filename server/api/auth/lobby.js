'use strict';

var lobbyEntities = require('../../entities/lobby-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  lobbyStates = require('../../components/lobbyStates'),
  passwordHash = require('password-hash'),
  logger = require('../../lib/logger/logger').init();


var addNewLobby = function(username, options, callback) {
  var newLobby = options;
  newLobby.master = username;
  newLobby.state = lobbyStates.WAITING;
  newLobby.players = [
    {
      username: newLobby.master,
      state: lobbyStates.WAITING
    }
  ];

  if(newLobby.encrypted) {
    if(newLobby.password) {
      newLobby.password = passwordHash.generate(newLobby.password);
    } else {
      logger.debug("Password cannot be empty. Lobby not created.");
      return callback(null, httpStatuses.Auth.PasswordEmpty);
    }
  }
  lobbyEntities.findLobbyByName(newLobby.name, function(err, lobby) {
    if(!err) {
      if(!lobby) {
        lobbyEntities.addNewLobby(newLobby, function(err, result) {
          if(!err) {
            logger.debug("Lobby " + newLobby.name + " has been created.");
            callback(null, httpStatuses.Lobby.Created);
          } else {
            logger.error("Internal Server Error: " + JSON.stringify(err));
            callback(httpStatuses.Generic.InternalServerError, null)
          }
        });
      } else {
        logger.debug("Cannot add lobby: name " + newLobby.name + " already exists.");
        callback(httpStatuses.Lobby.AlreadyExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  });
};

var removeLobbySecretData = function(lobbies) {
  for(var lobby in lobbies) {
    delete lobbies[lobby]._id;
    delete lobbies[lobby].password;
  }
  return lobbies;
};

var getListOfLobbies = function(callback) {
  lobbyEntities.getAllLobbies(function(err, lobbies) {
    if(!err && lobbies) {
      logger.info("Lobbies array sent.");
      callback(null, removeLobbySecretData(lobbies));
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  })
};

var isUserAlreadyExistsInLobby = function(username, lobbyPlayers) {
  for(var user in lobbyPlayers) {
    if(lobbyPlayers[user].username === username) {
      return true;
    }
  }
  return false;
};

var joinToLobby = function(username, lobbyName, options, callback) {
  lobbyEntities.findLobbyByName(lobbyName, function(err, lobby) {
    if(!err) {
      if(lobby) {
        if(lobby.encrypted) {
          if(!passwordHash.verify(options.password, lobby.password)) {
            return callback(httpStatuses.Auth.Unauthorized, null);
          }
        }
        if(lobby.countOfMembers > lobby.players.length) {
          if(!isUserAlreadyExistsInLobby(username, lobby.players)) {
            var newUser = {
              username: username,
              status: lobbyStates.WAITING
            };
            lobbyEntities.addUserToLobby(lobbyName, newUser, function(err, result) {
              if(!err) {
                logger.info("User added to lobby " + lobbyName);
                callback(null, httpStatuses.Lobby.UserAdded);
              } else {
                logger.error("Internal Server Error: " + JSON.stringify(err));
                callback(httpStatuses.Generic.InternalServerError, null);
              }
            });
          } else {
            logger.debug("Player " + username + " already joined to this lobby.");
            callback(httpStatuses.Lobby.UserExists, null);
          }
        } else {
          logger.debug("Lobby is full");
          callback(httpStatuses.Lobby.Full, null);
        }
      } else {
        logger.debug("Lobby " + lobbyName + " not exist");
        callback(httpStatuses.Lobby.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  });
};

module.exports = {
  addNewLobby: addNewLobby,
  getListOfLobbies: getListOfLobbies,
  joinToLobby: joinToLobby
};
