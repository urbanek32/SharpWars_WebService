'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add', controller.addNewScript);
router.get('/list', controller.getListOfScriptsForUser);
router.put('/update/:scriptName', controller.updateScript);
router.get('/:scriptName', controller.getScript);
router.delete('/:scriptName', controller.deleteScript);

module.exports = router;
