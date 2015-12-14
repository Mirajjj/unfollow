'use strict';

var express = require('express');
var cors = require('cors')
var controller = require('./authentication.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/callback', controller.callback);
router.get('/self', controller.getUser);

module.exports = router;