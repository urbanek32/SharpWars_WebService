'use strict';

var _ = require('lodash'),
  lobbyManager = require('../../../api/auth/lobby'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  lobbySchemas = require('../../../schemas/lobby-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses,
  remoteAddressExtractor = require('../../../lib/remoteAddressExtractor/remoteAddressExtractor');

exports.addNewLobby = function(req, res) {
  var errors = schemaValidator.validate(req.body, lobbySchemas.addNewLobby).errors;
  if(errors.length === 0) {
    lobbyManager.addNewLobby(req.user.username, remoteAddressExtractor(req), req.body, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.status(err[0].status).send(err);
      }
    });
  } else {
    res.status(400).send(errors);
  }
};

exports.getListOfLobbies = function(req, res) {
  lobbyManager.getListOfLobbies(function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err[0].status).send(err);
    }
  });
};

exports.joinToLobby = function(req, res) {
  var errors = schemaValidator.validate(req.body, lobbySchemas.joinToLobby).errors;
  if(errors.length === 0) {
    lobbyManager.joinToLobby(req.user.username, remoteAddressExtractor(req), req.params.lobby, req.body, function (err, result) {
      if (!err && result) {
        res.send(result);
      } else {
        res.status(err[0].status).send(err);
      }
    });
  } else {
    res.status(400).send(errors);
  }
};

exports.startLobby = function(req, res) {
  lobbyManager.startLobby(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err[0].status).send(err);
    }
  });
};

exports.changePlayerStatus = function(req, res) {
  lobbyManager.changePlayerStatus(req.user.username, req.params.lobby, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err[0].status).send(err);
    }
  });
};
