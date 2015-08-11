'use strict';

var _ = require('lodash'),
  scoresManager = require('../../../api/auth/scores'),
  schemaValidator = require('../../../lib/schema-validator/schemaValidator'),
  lobbySchemas = require('../../../schemas/scores-schema.json'),
  httpStatuses = require('../../../components/httpStatuses/index').httpStatuses;

exports.setScores = function(req, res) {
  res.status(200).send("Placeholder");
};
