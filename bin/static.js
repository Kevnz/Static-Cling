#!/usr/bin/env node
console.log('starting static file server');
var path = require('path'),
	argv = require('optimist').argv,
	cling = require('../lib/static').cling,
	port = 3000,
	dir = '.';
	
if(argv.p){
	port = argv.p;
}
if(argv.d){
	dir =  './'+ argv.d + '/';
}
path.exists(dir, function (exists) {
	if(exists){
		console.log('starting to serve files in ' +  dir + ' on port ' + port);
		cling(port, dir);
	}else{
		console.log('Directory does not exist');
	}
});

 
