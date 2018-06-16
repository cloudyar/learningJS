var http = require('http');

http.createServer(function(request, response) {
	response.writeHead(200, {'Content-type': 'text/plain'});
	response.write('Hello World!');
	response.end();
}).listen(8888);

console.log('Server is starting at http://127.0.0.1:8888');

/*
我们向createServer函数传递一个函数。
*/