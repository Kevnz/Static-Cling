var cling = require('../lib/static').cling,
	port= 8083;
console.log('starting server with port ' + port)
cling({ port: port, root: __dirname, filename: 'sample.html' });

setTimeout(function () {
    console.log('shutting down');
    process.exit(0);
}, 20000);

