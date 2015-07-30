'use strict';

var _ = require('lodash'),
  usersManager = require('../../../api/auth/users'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  userSchemas = require('../../../schemas/users-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses;

// Create a new user
exports.changePasswordUsingCurrentPwd = function(req, res) {
  var errors = schemaValidator.validate(req.body, userSchemas.changePassword).errors;
  if(errors.length === 0) {
    usersManager.changePassword(req.body, function(err, result) {
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

exports.getUserInformations = function(req, res) {
  if(req.params.username === req.user.username) {
    usersManager.getUserInformations(req.params.username, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.status(err[0].status).send(err);
      }
    });
  } else {
    res.status(401).send(httpStatuses.Auth.Unauthorized[0]);
  }
};
