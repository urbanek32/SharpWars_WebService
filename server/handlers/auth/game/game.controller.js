'use strict';

var _ = require('lodash'),
  scoresManager = require('../../../api/auth/scores'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  scoresSchemas = require('../../../schemas/scores-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses;

exports.setScores = function(req, res) {
  var errors = schemaValidator.validate(req.body, scoresSchemas.finishOnePlayer).errors;
  if(errors.length === 0) {
    scoresManager.setScores(req.user.username, req.body, function (err, result) {
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

exports.getScoresForUser = function(req, res) {
  scoresManager.getScoresForUser(req.user.username, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};


exports.getTopScores = function(req, res) {
  scoresManager.getTopScores(req.params.criteria, req.params.sorting, req.params.limit, function (err, result) {
    if (!err && result) {
      res.send(result);
    } else {
      res.status(err.status).send(err);
    }
  });
};
