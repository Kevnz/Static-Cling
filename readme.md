# Static Cling

[![npm version](https://badge.fury.io/js/static-cling.svg)](https://badge.fury.io/js/static-cling) ![Build Status](https://img.shields.io/circleci/project/github/Kevnz/Static-Cling/master.svg)


This is a node.js module that allows you to spin up a static file server either from code or from the command line.

### Installing

```bash
npm install static-cling
```

Don't forget to use the global flag (--g) if you want the command line option everywhere.

### At the command line

```bash
static
```

Yeah, that's it. You have the option to pass in -p for port, otherwise it defaults to port 3000, -d for directory, if you want to specify a different directory than the one you are in, and lastly -f for the default html page, this defaults to index.html

### In Code

Static Cling is available to be used as a module as well if you want to use node to host static files.

```js
require('static-cling')();
```

### Options

If using the module you can override the defaults by providing a config object

```js
//defaults
var config = {
    root: '.',
    port: 3000,
    filename: 'index.html'
}
const cling = require('static-cling')
//overriding defaults
cling({ port: 3456, root : './other/', filename: 'test.html' });
```
