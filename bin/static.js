#!/usr/bin/env node

const meow = require('meow')
const asciify = require('asciify')
const cling = require('../lib/index')

const message = text =>
  new Promise((resolve, reject) => {
    asciify(text, { color: 'blue', font: 'doh' }, (err, res) => {
      if (err) {
        return reject(err)
      }
      console.log(res)
      return resolve()
    })
  })
const cli = meow(
  `
  Usage

    $ static

    $ npx @kev_nz/create my-app

    Options
		--root, -d  Root folder
		--filename, -f Default file to return
		--port, -p Port to run
`,
  {
    booleanDefault: undefined,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
      root: {
        type: 'string',
        alias: 'd',
        default: process.cwd(),
      },
      filename: {
        type: 'string',
        alias: 'f',
        default: 'index.html',
      },
      port: {
        type: 'number',
        alias: 'p',
        default: 3000,
      },
    },
  }
)

message('Static Cling').then(_ => cling({ ...cli.flags }))
