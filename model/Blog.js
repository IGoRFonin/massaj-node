'use strict';

const mongoose = require('mongoose');
const slug = require('limax');
let Schema = mongoose.Schema;

let BlogSchema = new Schema({
	name: String,
	code:{ type: String },
	author: { type: Number, default: 1 },
	body: String, 
	active: { type: Boolean, default: true },
	sort: { type: Number, default: 500 },
	dateCreated: { type: Date, default: Date.now },
	dateChanged: { type: Date, default: Date.now }
});

BlogSchema.post('save', function(doc) {
  console.log('%s has been save', doc._id);
});

BlogSchema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

let BlogModel = mongoose.model('Blog', BlogSchema);
module.exports = class Blog extends BlogModel {
	constructor(options) {
		super(options);
		let _this = this;

		
	}
	insert() {
		let _this = this;
			if(this.code == undefined) {
				this.code = slug(this.name);
			}
			
			this.constructor.find({ code: this.code }).find(function(err, data) {
				if(data.length !== 0) {
					_this.dontSave('Пост не сохранен из-за имеющегося \'code\' - ' + _this.code);
				} else {
					_this.save();
				}
			});
	}	
	dontSave(text) {
		console.log(text);
	}
	static _removeAll() {
		this.find().remove().exec();
	}
	static fetchAllArray(sort, fn) {
		let posts = [];
		let _this = this;
		let findSort = sort ? sort : {'name': 'asc'};

		new Promise(function(resolve, reject) {
		  _this.find( (err, post) => {
			    if (err) return console.error(err);
			    
			    posts = post;
			    resolve(posts);

			}).sort(findSort);
		}).then((result) => {
			fn(null, result);
		}, (error) => {
			console.log(error);
		});
		
	}

	static fetchAllObject() {
		let posts = {};
		
		this.find(function (err, post) {
		    if (err) return console.error(err);
		    posts[post._id] = post;
		});

		return posts;
	}

	static getByCode(code, fn) {
		let _this = this;

		new Promise(function(resolve, reject) {
		  _this.find({ code: code }).find( (err, post) => {
			    if (err) return console.error(err);
			    resolve(post[0]);
			});
		}).then((result) => {
			fn(null, result);
		}, (error) => {
			fn(error, result);
			console.log(error);
		});
	}
}