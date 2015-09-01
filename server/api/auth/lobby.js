'use strict';

var lobbyEntities = require('../../entities/lobby-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  lobbyStates = require('../../components/lobbyStates'),
  passwordHash = require('password-hash'),
  logger = require('../../lib/logger/logger').init();


var addNewLobby = function(username, userRemoteAddress, options, callback) {
  var newLobby = options;
  newLobby.master = username;
  newLobby.state = lobbyStates.WAITING;
  newLobby.players = [
    {
      username: newLobby.master,
      state: lobbyStates.WAITING,
      remoteAddress: userRemoteAddress
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

var getActiveLobbyForUser = function(username, callback) {
  lobbyEntities.getActiveLobby(username, function(err, lobbies) {
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

var joinToLobby = function(username, userRemoteAddress, lobbyName, options, callback) {
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
              state: lobbyStates.WAITING,
              remoteAddress: userRemoteAddress
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

var removePlayerFromArray = function(username, players) {
  var cleanedPlayers = [];
  for(var player in players) {
    if(players[player].username !== username) {
      cleanedPlayers.push(players[player]);
    }
  }
  return cleanedPlayers;
};

var leaveLobby = function(username, lobbyName, callback) {
  lobbyEntities.findLobbyByName(lobbyName, function(err, lobby) {
    if(!err) {
      if(lobby) {
          if(isUserAlreadyExistsInLobby(username, lobby.players)) {
            if(username !== lobby.master) {
              var updatedUsers = removePlayerFromArray(username, lobby.players);
              lobbyEntities.updatePlayersInLobby(lobbyName, removePlayerFromArray(username, lobby.players), function(err, result) {
                if(!err) {
                  logger.info("Player has been removed from lobby " + lobbyName);
                  callback(null, httpStatuses.Lobby.PlayerRemoved);
                } else {
                  logger.error("Internal Server Error: " + JSON.stringify(err));
                  callback(httpStatuses.Generic.InternalServerError, null);
                }
              });
            } else {
              logger.debug("Owner of lobby cannot leave the lobby.");
              callback(httpStatuses.Lobby.MasterLeave, null);
            }
          } else {
            logger.debug("Player " + username + " has not join to this lobby yet.");
            callback(httpStatuses.Lobby.UserNotExists, null);
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

var everybodyReady = function(lobbyPlayers) {
  for(var user in lobbyPlayers) {
    if(lobbyPlayers[user].state !== lobbyStates.READY) {
      return false;
    }
  }
  return true;
};

var changeStatusOfPlayers = function(lobbyPlayers, status) {
  for(var user in lobbyPlayers) {
    lobbyPlayers[user].state = status;
  }
  return lobbyPlayers;
};

var startLobby = function(username, lobbyName, callback) {
  lobbyEntities.findLobbyByName(lobbyName, function(err, lobby) {
    if(!err) {
      if(lobby) {
        if(lobby.state !== lobbyStates.PLAY) {
          if(username === lobby.master) {
            if(lobby.countOfMembers === lobby.players.length) {
              if(everybodyReady(lobby.players)) {
                // ****************************************************************************
                // placeholder dla wysłania requestu do mastera gry, zablokowane przez GameCore
                // W callbacku wysłania wrzucić zmianę statusu lobby
                // ****************************************************************************
                lobbyEntities.changeLobbyStatus(lobbyName, lobbyStates.PLAY, changeStatusOfPlayers(lobby.players, lobbyStates.PLAY), function(err, result) {
                  if(!err) {
                    logger.info("Lobby game " + lobbyName + " started.");
                    callback(null, httpStatuses.Lobby.Started);
                  } else {
                    logger.error("Internal Server Error: " + JSON.stringify(err));
                    callback(httpStatuses.Generic.InternalServerError, null);
                  }
                });
              } else {
                logger.debug("Lobby could not start game. Not each player is ready.");
                callback(httpStatuses.Lobby.NotReady, null);
              }
            } else {
              logger.debug("Lobby could not start game. More players is required.");
              callback(httpStatuses.Lobby.NotFull, null);
            }
          } else {
            logger.debug("Lobby game" + lobbyName + " can be started only by master.");
            callback(httpStatuses.Auth.Unauthorized, null);
          }
        } else {
          logger.debug("Lobby " + lobbyName + " has been already started.");
          callback(httpStatuses.Lobby.AlreadyStarted, null);
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

var stopLobby = function(username, lobbyName, callback) {
  lobbyEntities.findLobbyByName(lobbyName, function(err, lobby) {
    if(!err) {
      if(lobby) {
        if(lobby.state === lobbyStates.PLAY) {
          if(username === lobby.master) {
            lobbyEntities.changeLobbyStatus(lobbyName, lobbyStates.WAITING, changeStatusOfPlayers(lobby.players, lobbyStates.WAITING), function(err, result) {
              if(!err) {
                logger.info("Lobby game " + lobbyName + " stopped.");
                callback(null, httpStatuses.Lobby.Stopped);
              } else {
                logger.error("Internal Server Error: " + JSON.stringify(err));
                callback(httpStatuses.Generic.InternalServerError, null);
              }
            });
          } else {
            logger.debug("Lobby game" + lobbyName + " can be stopped only by master.");
            callback(httpStatuses.Auth.Unauthorized, null);
          }
        } else {
          logger.debug("Lobby " + lobbyName + " has not been started yet.");
          callback(httpStatuses.Lobby.AlreadyStopped, null);
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

var updatePlayerStatus = function(username, players) {
  for(var user in players) {
    if(players[user].username === username) {
      if(players[user].state === lobbyStates.WAITING) {
        players[user].state = lobbyStates.READY;
      } else if(players[user].state === lobbyStates.READY) {
        players[user].state = lobbyStates.WAITING;
      }
    }
  }
  return players;
};

var changePlayerStatus = function(username, lobbyName, callback) {
  lobbyEntities.findLobbyByName(lobbyName, function(err, lobby) {
    if(!err) {
      if(lobby) {
        if(lobby.state !== lobbyStates.PLAY) {
          lobbyEntities.changeLobbyStatus(lobbyName, lobbyStates.WAITING, updatePlayerStatus(username, lobby.players),
            function(err, result) {
            if(!err) {
              logger.info("Player status " + username + " updated.");
              callback(null, httpStatuses.Lobby.PlayerUpdated);
            } else {
              logger.error("Internal Server Error: " + JSON.stringify(err));
              callback(httpStatuses.Generic.InternalServerError, null);
            }
          });
        } else {
          logger.debug("Lobby " + lobbyName + " has been already started.");
          callback(httpStatuses.Lobby.AlreadyStarted, null);
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
  joinToLobby: joinToLobby,
  leaveLobby: leaveLobby,
  startLobby: startLobby,
  stopLobby: stopLobby,
  changePlayerStatus: changePlayerStatus,
  getActiveLobbyForUser: getActiveLobbyForUser
};
