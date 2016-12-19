'use strict';

const TopMenuController = require('../controller/TopMenuController');

module.exports = function(app) {
	app.use(function(req, res, next) {
		TopMenuController.addDataToPage(res, next);
	});
}