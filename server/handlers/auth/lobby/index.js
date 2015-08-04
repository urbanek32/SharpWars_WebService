'use strict';

var express = require('express');
var controller = require('./lobby.controller.js');

var router = express.Router();

router.post('/add', controller.addNewLobby);
router.get('/list', controller.getListOfLobbies);

module.exports = router;
