'use strict';

var _ = require('lodash'),
  usersManager = require('../../api/users'),
  schemaValidator = require('../../lib/schema-validator/schemaValidator'),
  userSchemas = require('.././../schemas/users-schema.json'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses;

// Create a new user
exports.addUser = function(req, res) {
  var errors = schemaValidator.validate(req.body, userSchemas.addUser).errors;
  if(errors.length === 0) {
    usersManager.addUser(req.body, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  } else {
    res.status(400).send(errors);
  }
};

exports.activateUser = function(req, res) {
  usersManager.activateUser(req.params, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
};
