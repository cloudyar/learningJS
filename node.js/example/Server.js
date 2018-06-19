var http = require('http');
var url = require('url');
var util = require('util');

function start() {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('request pathname is: ' + pathname);

		response.writeHead(200, {'Content-type': 'text/plain'});
		response.write('Hello world!\n');
		response.write(util.inspect(url.parse(request.url), true));
		response.end();
	}).listen(8888);
	console.log('Server is running at http://127.0.0.1:8888/');
}

module.exports.start = start;