'use strict';

var scoresEntities = require('../../entities/scores-entities'),
  lobbyEntities = require('../../entities/lobby-entities'),
  lobbyStates = require('../../components/lobbyStates'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  logger = require('../../lib/logger/logger').init();

var findPlayerInLobbyByUsername = function(username, players) {
  for(var i in players) {
    if(players[i].username === username) {
      return {
        indexInArray: i,
        playerBody: players[i]
      };
    }
  }
};

var setScores = function(username, options, callback) {
 lobbyEntities.getActiveLobby(username, function(err, activeLobby) {
   if(!err) {
     if(activeLobby.length) {
       var player = findPlayerInLobbyByUsername(username, activeLobby[0].players);
       if(player.playerBody.state === lobbyStates.PLAY) {
         activeLobby[0].players[player.indexInArray].state = lobbyStates.FINISHED;
         lobbyEntities.updatePlayersInLobby(activeLobby[0].name, activeLobby[0].players, function(err, result) {
           if(!err) {
             logger.debug("Status of player " + username + " has been changed to FINISHED.");
             scoresEntities.setScore(username, options.score, options.gameTime, function(err, result) {
               if(!err) {
                 logger.info("User score added");
                 callback(null, httpStatuses.Scores.Added);
               } else {
                 logger.error("Internal Server Error: " + JSON.stringify(err));
                 callback(httpStatuses.Generic.InternalServerError, null);
               }
             })
           } else {
             logger.error("Internal Server Error: " + JSON.stringify(err));
             callback(httpStatuses.Generic.InternalServerError, null);
           }
         });
       } else {
         logger.debug("Player " + username + " has not been started yet or game is finished for this user.");
         callback(httpStatuses.Lobby.PlayerNotStartedYetOrFinished, null);
       }
     } else {
       logger.debug("Player " + username + " is not assigned to any lobby.");
       callback(httpStatuses.Lobby.NotAssignedToAnyLobby, null);
     }
   } else {
     logger.error("Internal Server Error: " + JSON.stringify(err));
     callback(httpStatuses.Generic.InternalServerError, null);
   }
 });
};

var getScoresForUser = function(username, callback) {
  scoresEntities.findScoresByUsername(username, function(err, scores) {
    if(!err) {
      if(scores) {
        logger.info("User " + username + " scores sent.");
        delete scores._id;
        callback(null, scores);
      } else {
        logger.debug("Cannot get user scores: User " + username + " has not any scores.");
        callback(httpStatuses.Scores.EmptyScores, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null);
    }
  })
};

module.exports = {
  setScores: setScores,
  getScoresForUser: getScoresForUser
};
