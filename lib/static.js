var path = require('path'),
  http = require('http'),
  fs = require('fs'),
  existsCheck = require('../utils/exists'),
  url = require('url'),
  mime = require('mime'),
  sendFileNotFound = function(res){
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('404 - ' + res + ' was not found\n');
    res.end();
    return;
  };

var merge = function() {
  var i      = 0,
    hasOwn   = Object.prototype.hasOwnProperty,
    len    = arguments.length,
    result = {},
    key,
    obj;

  for (; i < len; ++i) {
    obj = arguments[i];

    for (key in obj) {
      if (hasOwn.call(obj, key)) {
        result[key] = obj[key];
      }
    }
  }

  return result;
};

var defaults = {
  root: './',
  port: 3000,
  filename: 'index.html'
}
var cling = function(options){
  var config = merge(defaults,options);
  console.log('starting static server on port ' + config.port );
  http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(config.root, uri);
    existsCheck(filename, function (exists) {
      if (!exists) {
        return sendFileNotFound(res);
      }

      if (fs.statSync(filename).isDirectory()) {
        filename = path.resolve(config.root, path.join(filename, config.filename));
        if(!existsCheck(filename)){
          return sendFileNotFound(res);
        }
      }
      fs.readFile(filename, 'binary', function (err, file) {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.write(err + '\n');
          res.end();
          return;
        }
        var type = mime.lookup(filename);
        res.writeHead(200, {
          'Content-Type': type
        });
        res.write(file, 'binary');
        res.end();
      });
    });
  }).listen(config.port);
};
exports.cling = cling;
