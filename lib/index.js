const handler = require('./handler')
const server = require('./server')

const defaults = {
  root: './',
  port: 3000,
  filename: 'index.html',
}
module.exports = options => {
  const config = { ...defaults, ...options }

  const serverHandler = handler(config)

  const s = server(serverHandler)
  s.listen(config.port)
  console.info(
    `Server started and available at: http://localhost:${config.port}/`
  )
}
