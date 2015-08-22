'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add', controller.addNewScript);
router.get('/list', controller.getListOfScripts);
router.put('/update/:scriptName', controller.updateScript);

module.exports = router;
