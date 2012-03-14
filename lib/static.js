var path = require('path'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');


var cling = function(port,rootPath){
	if(rootPath===undefined){
		rootPath = '.';
	}
	if(port === undefined){
		port=3000;
	}
	http.createServer(function (req, res) {
		var uri = url.parse(req.url).pathname;
		var filename = path.join(rootPath, uri);
		path.exists(filename, function (exists) {
			if (!exists) {
				res.writeHead(404, {
					'Content-Type': 'text/plain'
				});
				res.write('404 Not Found\n');
				res.end();
				return;
			}

			if (fs.statSync(filename).isDirectory()) {
				filename += '/index.html';
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
}
exports.cling = cling;