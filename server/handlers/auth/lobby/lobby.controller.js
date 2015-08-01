'use strict';

var _ = require('lodash'),
  lobbyManager = require('../../../api/auth/lobby'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  lobbySchemas = require('../../../schemas/lobby-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses;

exports.addNewLobby = function(req, res) {
  var errors = schemaValidator.validate(req.body, lobbySchemas.addNewLobby).errors;
  if(errors.length === 0) {
    lobbyManager.addNewLobby(req.user.username, req.body, function(err, result) {
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
