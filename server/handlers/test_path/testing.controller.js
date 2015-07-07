/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
  testManager = require('../../api/test_path');


// Get list of things
exports.testJson = function(req, res) {
  testManager.test_a(function(resBody) {
    res.send(resBody);
  });
};

exports.testString = function(req, res) {
  var options = req.body;
  testManager.test_b(options, function(err, resBody) {
    if(!err) {
      res.status(400).send(resBody);
    } else {
      res.status(400).send(resBody);
    }
  });
};
