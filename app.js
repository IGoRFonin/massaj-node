'use strict';
global.rootPath = __dirname;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Blog = require('./model/Blog');
const Router = require('./app/routes');
const Middleware = require('./app/middlewares');
let nunjucks = require('nunjucks');


mongoose.connect('mongodb://localhost:27017/massaj');
var db = mongoose.connection;
let app = express();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  let post = new Blog({
    'name': 'Нерзул', 
    'body': 'Этот загадочный орк-шаман так и не дал понять, жив он или нет, но про него уже давно слагают легенды',
    'sort': 95})
  // post.insert();
  // Blog._removeAll();
  // view engine setup
  nunjucks.configure('views', {
  	autoescape: true,
  	express: app,
  	watch: true
  });

  app.set('view engine', 'njk');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', express.static(path.join(__dirname, 'public')));
  
  Middleware(app);
  Router(app);

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
  	console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });


});
module.exports = app;