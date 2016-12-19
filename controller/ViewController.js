'use strict';

module.exports = class View {
	constructor(template, res) {
		this.template = template;
		this.res = res;
	}
	collect() {
		  var ret = {};
		  var len = arguments.length;
		  for (var i=0; i<len; i++) {
		    for (let p in arguments[i]) {
		      if (arguments[i].hasOwnProperty(p)) {
		        ret[p] = arguments[i][p];
		      }
		    }
		  }

		  return ret;
	}
	render(data) {

		data = data ? data : {};
		
		if(this.res.pageData != undefined) {
			data = this.collect(data, this.res.pageData);	
		}
		console.log(this.res.pageData.TopMenu);
		this.res.render(this.template, data);
	}
}