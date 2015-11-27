'use strict';

var _ = require('lodash'),
  lobbyManager = require('../../../api/auth/lobby'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  lobbySchemas = require('../../../schemas/lobby-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses,
  uuid = require('node-uuid');

exports.addNewLobby = function(req, res) {
  var reqId = uuid.v1();
  var errors = schemaValidator.validate(req.body, lobbySchemas.addNewLobby).errors;
  if(errors.length === 0) {
    lobbyManager.addNewLobby(reqId, req.user.username, req.body, function(err, result) {
      if(!err && result) {
        result.reqId = reqId;
        res.send(result);
      } else {
        err.reqId = reqId;
        res.status(err.status).send(err);
      }
    });
  } else {
    errors.push({"reqId": reqId});
    res.status(400).send(errors);
  }
};

exports.getListOfLobbies = function(req, res) {
  lobbyManager.getListOfLobbies(function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.getActiveLobbyForUser = function(req, res) {
  lobbyManager.getActiveLobbyForUser(req.user.username, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.joinToLobby = function(req, res) {
  var errors = schemaValidator.validate(req.body, lobbySchemas.joinToLobby).errors;
  if(errors.length === 0) {
    lobbyManager.joinToLobby(req.user.username, req.params.lobby, req.body, function (err, result) {
      if (!err && result) {
        res.send(result);
      } else {
        res.status(err.status).send(err);
      }
    });
  } else {
    res.status(400).send(errors);
  }
};

exports.leaveLobby = function(req, res) {
  lobbyManager.leaveLobby(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.startLobby = function(req, res) {
  lobbyManager.startLobby(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.changePlayerStatus = function(req, res) {
  lobbyManager.changePlayerStatus(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.stopLobby = function(req, res) {
  lobbyManager.stopLobby(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.deleteLobby = function(req, res) {
  lobbyManager.deleteLobby(req.params.lobby, req.user.username, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};
