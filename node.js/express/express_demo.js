//引入express模块，并把函数对象赋值给express变量
var express = require('express');
var util = require('util');
var url = require('url');
//express是一个函数对象，express()函数执行后返回一个函数对象
var app = express();

app.get('/', function(request, response) {
	//var req = url.parse(request);
	console.log('req: \n' + util.inspect(request, true));
	response.send('hello world!\n');
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});