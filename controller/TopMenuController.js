'use strict';

const TopMenu = require('../model/TopMenu');

module.exports = class TopMenuController {
	constructor() {}
	addDataToPage(res, next) {
		TopMenu.fetchAllArray(function(menus) {
			res.pageData.TopMenu = menus;
			next();
		});
	}
}