'use strict';

const TopMenu = require('../model/TopMenu');

module.exports = class TopMenuController {
	constructor() {}
	static addDataToPage(res, next) {
		TopMenu.fetchAllArray(function(menus) {
			if(!!menus.length) {
				for(let menu in menus) {
					if(res.req.url.search(menus[menu].link) + 1) {
						menus[menu].selected = true;
					}
				}
				
				res.pageData.TopMenu = menus;
			}
			
			next();
		});
	}
}