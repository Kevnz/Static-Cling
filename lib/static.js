var path = require('path'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');

var cling = function(port,rootPath, defaultFilename){
	if(rootPath===undefined){
		rootPath = '.';
	}
	if(port === undefined){
		port=3000;
	}
	if(defaultFilename === undefined){
		defaultFilename = 'index.html';
	}
	
	http.createServer(function (req, res) {
		var uri = url.parse(req.url).pathname;
		var filename = path.join(rootPath, uri);
		path.exists(filename, function (exists) {
			if (!exists) {
				res.writeHead(404, {
					'Content-Type': 'text/plain'
				});
				res.write('404 - File Not Found\n');
				res.end();
				return;
			}

			if (fs.statSync(filename).isDirectory()) {
				filename = path.join(filename, defaultFilename);
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
	}).listen(port);
};
exports.cling = cling;