const server = require('../lib/index')
const port = 8093
console.log('starting server with port ' + port)

server({ port: port, root: './test/other/', filename: 'test.html' })
