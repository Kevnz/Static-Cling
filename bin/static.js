#!/usr/bin/env node
var path = require('path'),
	argv = require('optimist').argv,
	cling = require('../lib/static').cling,
	port = 3000,
	dir = '.',
	file = 'index.html';
	
if(argv.p){
	port = argv.p;
}
if(argv.d){
	dir =  './'+ argv.d + '/';
}
if(argv.f){
	file = argv.f;
}
path.exists(dir, function (exists) {
	if (exists) {
		console.log('starting to serve files in ' +  dir + ' on port ' + port);
		cling({ port: port, root: dir, filename: file });
	} else {
 		console.log('Directory does not exist');
	}
});

 
