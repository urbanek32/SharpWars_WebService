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
        res.status(err.status).send(err);
      }
    });
  } else {
    res.status(400).send(errors);
  }
};

exports.activateUser = function(req, res) {
  usersManager.activateUser(req.params, function(err, result) {
    if(!err && result) {
      res.redirect('/accountActivationSuccess');
    } else {
      res.redirect('/accountActivationError');
    }
  });
};

exports.logInUser = function(req, res) {
  var errors = schemaValidator.validate(req.body, userSchemas.loginUser).errors;
  if(errors.length === 0) {
    usersManager.logInUser(req.body, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.status(err.status).send(err);
      }
    })
  } else {
    res.status(400).send(errors);
  }
};

exports.forgotPassword = function(req, res) {
  var errors = schemaValidator.validate(req.body, userSchemas.forgotPassword).errors;
  if(errors.length === 0) {
    usersManager.forgotPassword(req.body, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.status(err.status).send(err);
      }
    })
  } else {
    res.status(400).send(errors);
  }
};

exports.resetPassword = function(req, res) {
  var errors = schemaValidator.validate(req.body, userSchemas.resetPassword).errors;
  if(errors.length === 0) {
    var options = {
      username: req.params.username,
      token: req.params.token,
      newPassword: req.body.newpassword
    };
    usersManager.resetPassword(options, function(err, result) {
      if(!err && result) {
        res.send(result);
      } else {
        res.status(err.status).send(err);
      }
    })
  } else {
    res.status(400).send(errors);
  }
};
