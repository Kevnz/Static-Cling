const handler = require('./handler')
const server = require('./server')

const defaults = {
  root: './',
  port: 3000,
  filename: 'index.html',
}
module.exports = options => {
  const config = { ...defaults, ...options }
  console.log('config', options)
  const serverHandler = handler(config)

  const s = server(serverHandler)
  s.listen(config.port)
  console.log('server')
}
