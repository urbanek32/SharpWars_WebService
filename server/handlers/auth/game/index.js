'use strict';

var express = require('express');
var controller = require('./game.controller.js');

var router = express.Router();

router.post('/scores', controller.setScores);

module.exports = router;
