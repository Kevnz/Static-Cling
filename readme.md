#Static Cling
This is a node.js module that allows you to spin up a static file server either from code or from the command line.

###Installing
$ npm install static-cling

Don't forget to use the global flag (--g) if you want the command line option everywhere.

###At the command line
$ static 

Yeah, that's it. You have the option to pass in -p for port, otherwise it defaults to port 3000, -d for directory, if you want to specify a different directory than the one you are in, and lastly -f for the default html page, this defaults to index.html

###In Code
Static Cling is available to be used as a module as well if you want to use node to host static files.

```
require('static-cling').cling();
```