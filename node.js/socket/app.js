var http = require('http');
var socket = require('socket.io');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if(err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200, {'Content-type': 'text/plain'});
		res.end(data);
	});
});

server.listen(8081);

var io = socket(server);
io.on('connection', function(socket) {
	socket.emit('news', {hello: 'world'});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});

