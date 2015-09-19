'use strict';

var _ = require('lodash'),
  scriptsManager = require('../../../api/auth/scripts'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  scriptsSchemas = require('../../../schemas/scripts-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses;

exports.addNewScript = function(req, res) {
  var errors = schemaValidator.validate(req.body, scriptsSchemas.addNewScript).errors;
  if(errors.length === 0) {
    scriptsManager.addNewScript(req.user.username, req.body, function(err, result) {
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

exports.getListOfScriptsForUser = function(req, res) {
  scriptsManager.getListOfScriptsForUser(req.user.username, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.updateScript = function(req, res) {
  var errors = schemaValidator.validate(req.body, scriptsSchemas.updateScript).errors;
  if(errors.length === 0) {
    scriptsManager.updateScript(req.params.scriptName, req.user.username, req.body, function (err, result) {
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

exports.getScript = function(req, res) {
  scriptsManager.getScript(req.params.scriptName, req.user.username, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};

exports.deleteScript = function(req, res) {
  scriptsManager.deleteScript(req.params.scriptName, req.user.username, function(err, result) {
    if(!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};
