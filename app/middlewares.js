'use strict';

const PageMiddleware = require('../middleware/PageMiddleware');
const TopMenuMiddleware = require('../middleware/TopMenuMiddleware');

module.exports = function(app) {
	PageMiddleware(app);
	TopMenuMiddleware(app);
}