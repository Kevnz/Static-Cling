const http = require('http')

module.exports = handler => {
  return http.createServer(handler)
}
