'use strict';
const express = require('express');
const BlogController = require('../controller/BlogController');
const ViewController = require('../controller/ViewController');

var router = express.Router();
router.get('/', function(req, res, next) {
	BlogController.getAll({'sort':'asc'}, function(err, posts) {
		let view = new ViewController('pages/blog/index', res),
				data = {};

		data.posts = posts;
		data.title = "Блог";
		for(let post in posts) {
			posts[post].link = "/blog/" + posts[post].code;
		}
		
		view.render(data);
	});
});

router.get('/:code', (req, res, next) => {
	BlogController.getPost( req.params.code, function(err, post) {
		let view = new ViewController('pages/blog/detail', res),
				data = {};

		data.title = post.name;
		data.post = post;
		
		view.render(data);
	})
})

module.exports = router;
