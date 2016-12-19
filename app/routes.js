'use strict';

const express = require('express');
let Route = express.Router();

let route = {
	index: require('../routes/index'),
	staticPages: require('../routes/static-pages'),
  blog: require('../routes/blog')
}

module.exports = function(app) {
	let staticPages = express.Router();

  staticPages.get('/:id', route.staticPages);
  app.use(staticPages);

  app.use('/blog', route.blog);
  app.use('/', route.index);
}