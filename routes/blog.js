'use strict';
const express = require('express');
const BlogController = require('../controller/BlogController');
const ViewController = require('../controller/ViewController');

var router = express.Router();
router.get('/', function(req, res, next) {
	BlogController.getAll({'sort':'asc'}, function(err, posts) {
		let view = new ViewController('pages/blog/index', res);
		let data = {};
		data.posts = posts;
		data.title = "Блог";
		for(let post in posts) {
			posts[post].link = "/blog/" + posts[post].code;
		}
		// res.render('pages/blog/index', data);
		view.render(data);
	});
});

router.get('/:code', (req, res, next) => {
	BlogController.getPost( req.params.code, function(err, post) {
		let data = {};
		data.title = post.name;
		data.post = post;
		res.render('pages/blog/detail', data);
	})
})

module.exports = router;
