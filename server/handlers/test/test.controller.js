'use strict';

var schemaValidator = require('../../lib/schema-validator/schemaValidator'),
  testSchemas = require('.././../schemas/test-schema.json');

exports.testEmptyBodyGet = function(req, res) {
  res.send({message:'GET with empty body works'});
};

exports.testEmptyBodyPost = function(req, res) {
  res.send({message:'Post with empty body works'});
};

exports.testEmptyBodyPut = function(req, res) {
  res.send({message:'Put with empty body works'});
};

exports.testStringBodyPost = function(req, res) {
  var errors = schemaValidator.validate(req.body, testSchemas.testString).errors;
  if(errors.length === 0) {
    res.send({message:'Post with string body', result: req.body.word + req.body.word});
  } else {
    res.status(400).send(errors);
  }
};

exports.testStringBodyPut = function(req, res) {
  var errors = schemaValidator.validate(req.body, testSchemas.testString).errors;
  if(errors.length === 0) {
    res.send({message:'Put with string body works', result: req.body.word + req.body.word});
  } else {
    res.status(400).send(errors);
  }
};

exports.testMultipleBodyPost = function(req, res) {
  var errors = schemaValidator.validate(req.body, testSchemas.multipleTest).errors;
  if(errors.length === 0) {
    res.send({message:'Post with string and number body', result: req.body.number + req.body.word});
  } else {
    res.status(400).send(errors);
  }
};

exports.testMultiplePut = function(req, res) {
  var errors = schemaValidator.validate(req.body, testSchemas.testString).errors;
  if(errors.length === 0 && req.params.number) {
    res.send({message:'Put with string body and number param', result: req.params.number + req.body.word});
  } else {
    res.status(400).send(errors);
  }
};


