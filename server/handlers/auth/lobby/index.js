'use strict';

var express = require('express');
var controller = require('./lobby.controller.js');

var router = express.Router();

router.post('/add', controller.addNewLobby);
router.get('/list', controller.getListOfLobbies);
router.put('/join/:lobby', controller.joinToLobby);
router.put('/leave/:lobby', controller.leaveLobby);
router.put('/start/:lobby', controller.startLobby);
router.put('/stop/:lobby', controller.stopLobby);
router.put('/:lobby/status', controller.changePlayerStatus);
router.get('/active', controller.getActiveLobbyForUser);
router.delete('/delete/:lobby', controller.deleteLobby);

module.exports = router;
