'use strict';

var express = require('express');
var controller = require('./game.controller.js');

var router = express.Router();

router.post('/scores', controller.setScores);
router.get('/scores', controller.getScoresForUser);
router.get('/topscores/:criteria/:sorting/:limit', controller.getTopScores);

module.exports = router;
