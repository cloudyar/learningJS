/*
为路由提供请求的URL和其他需要的GET/POST参数
路由根据这些数据执行相应代码
查看HTTP请求，提取出请求的URL以及GET/POST参数

所有数据都在request对象中
解析模块 url和querystring

http://localhost:8888/start?foo=bar&hello=world
1. /start: 路径名  --> url.parse(string).pathname
2. foo=bar&hello=world  --> url.parse(string).query
3. bar  -> querystring.parse(queryString)['foo']

*/
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(request, response) {
	console.log(request);
	//路径名
	var pathname = url.parse(request.url).pathname;
	console.log('Request for ' + pathname + ' received!');
	//回应
	response.writeHead(200, {'Content-type': 'text/plain'});
	response.write('pathname: ' + pathname);
	response.write('request: ' + util.inspect(request));
	response.end();
}).listen(8888);
console.log('Servr has started');
