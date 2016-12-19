'use strict';
let express = require('express');
let router = express.Router();
let fs = require('fs')
let path = require('path');
const ViewController = require('../controller/ViewController');


router.get('/:id', function(req, res, next) {
	let file = global.rootPath + path.sep
	   + 'static-pages' + path.sep
	   + req.params.id + '.json';
  	   
  if(fs.existsSync(file)) {
  	let view = new ViewController('pages/' + req.params.id, res);

  	view.render(require(file));
  } else {
  	next();	
  }
  
});

module.exports = router;
