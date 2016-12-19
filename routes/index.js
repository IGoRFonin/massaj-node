'use strict';

const express = require('express');
const ViewController = require('../controller/ViewController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let view = new ViewController('pages/index', res);

  view.render();
});

module.exports = router;
