var cling = require('../lib/static').cling,
    port= 8093; 
console.log('starting server with port ' + port)
cling({ port: port, root : './other/', filename: 'test.html' });
