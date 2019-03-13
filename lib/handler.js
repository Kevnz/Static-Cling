const url = require('url')
const path = require('path')
const fs = require('fs-extra')
const mime = require('mime')
const doesExist = async file => {
  return fs.pathExists(file)
}

const notFound = res => {
  const notFoundFile = path.resolve(__dirname, '../', 'assets', '404.html')

  return handleFile(notFoundFile, res, 404)
}
const handleFile = async (file, res, statusCode = 200) => {
  const fileContents = await fs.readFile(file, 'binary')
  const type = mime.getType(file)

  res.writeHead(statusCode, {
    'Content-Type': type,
  })
  res.write(fileContents, 'binary')
  return res.end()
}

module.exports = config => async (req, res) => {
  try {
    const myUrl = new url.URL(req.url, 'http://localhost')
    const uri = myUrl.pathname

    const filename = path.join(process.cwd(), config.root, uri)

    const exists = await doesExist(filename)

    if (!exists && filename.indexOf('favicon.ico') > -1) {
      return handleFile(
        path.resolve(__dirname, '../', 'assets', 'favicon.ico'),
        res
      )
    }
    if (!exists) {
      return notFound(res)
    }

    const rStat = await fs.stat(filename)
    const isDirectory = rStat.isDirectory()

    if (isDirectory) {
      const directoryFile = path.resolve(path.join(filename, config.filename))
      const dirFileExists = await doesExist(directoryFile)
      if (!dirFileExists) {
        return notFound(res)
      }
      return handleFile(directoryFile, res)
    }
    return handleFile(filename, res)
  } catch (e) {
    console.error(e)
  }
}
