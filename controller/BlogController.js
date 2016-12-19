'use strict';

const Blog = require('../model/Blog');

module.exports = class BlogController {
	constructor() {

	}

	static getAll(sort, fn) {
		if(arguments.length > 1) {
			return Blog.fetchAllArray(sort, fn);
		} else {
			return Blog.fetchAllArray(undefined, arguments[0]);
		}
		
	}

	static getPost(code, fn) {
		return Blog.getByCode(code, fn);
	}
}