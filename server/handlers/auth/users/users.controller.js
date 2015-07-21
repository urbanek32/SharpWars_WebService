'use strict';

var _ = require('lodash'),
  usersManager = require('../../../api/auth/users'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  userSchemas = require('../../../schemas/users-schema.json');

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
