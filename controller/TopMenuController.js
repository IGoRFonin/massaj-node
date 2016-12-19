'use strict';

const TopMenu = require('../model/TopMenu');

module.exports = class TopMenuController {
	constructor() {}
	static addDataToPage(res, next) {
		TopMenu.fetchAllArray(function(menus) {
			if(!!menus.length) {
				res.pageData.TopMenu = menus;
			}

			next();
		});
	}
}