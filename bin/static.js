#!/usr/bin/env node
var existsCheck = require('../utils/exists'),
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
existsCheck(dir, function (exists) {
	if (exists) {
		console.log('starting to serve files in ' +  dir + ' on port ' + port);
		cling({ port: port, root: dir, filename: file });
	} else {
 		console.log('Directory does not exist');
	}
});


