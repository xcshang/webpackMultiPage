var path = require('path')
var cwd = process.cwd()
var ROOT = path.join(cwd,'src/pages/')

module.exports = {	
	'index': { 
		"src": ROOT + "index", 
		"tpl": "index.html" 
	},
	'about': { 
		"src": ROOT + "/about/index", 
		"tpl": "about/index.html" //注意前面不能是/about/index.html
	}	
	
}
