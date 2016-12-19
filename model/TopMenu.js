'use strict';

const mongoose = require('mongoose');
const slug = require('limax');
let Schema = mongoose.Schema;

let TopMenuSchema = new Schema({
	name: String,
	link: { type: String },
	active: { type: Boolean, default: true },
	sort: { type: Number, default: 500 },
});

let TopMenuModel = mongoose.model('TopMenu', TopMenuSchema);

module.exports = class TopMenu extends TopMenuModel {
	constructor(options) {
		super(options);
	}
	insert() {
		let _this = this;
			if(this.link == undefined) {
				this.link = slug(this.name);
			}
			
			this.constructor.find({ link: this.link }).find(function(err, data) {
				if(data.length !== 0) {
					_this.dontSave('Пост не сохранен из-за имеющегося \'link\' - ' + _this.link);
				} else {
					_this.save();
				}
			});
	}	
	static fetchAllArray(fn) {
		let menus = [];
		let _this = this;
		let findSort =  {'sort': 'asc'};
		
		new Promise(function(resolve, reject) {
		  _this.find( (err, menus) => {
			    if (err) return console.error(err);
			    
			    resolve(menus);
			});
		}).then((result) => {
			fn(result);
		}, (error) => {
			console.log(error);
		});
		
	}
}