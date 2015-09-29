'use strict';

var express = require('express');
var controller = require('./lobby.controller.js');

var router = express.Router();

router.post('/add', controller.addNewLobby);
router.get('/list', controller.getListOfLobbies);
router.post('/join/:lobby', controller.joinToLobby);
router.post('/leave/:lobby', controller.leaveLobby);
router.post('/start/:lobby', controller.startLobby);
router.post('/stop/:lobby', controller.stopLobby);
router.post('/:lobby/status', controller.changePlayerStatus);
router.get('/active', controller.getActiveLobbyForUser);
router.delete('/delete/:lobby', controller.deleteLobby);

module.exports = router;
