var express = require('express');
var app = express();
var querystring = require('querystring');
var bodyParser = require('body-parser');
var util = require('util');
// 创建 application/x-www-form-urlencoded 编码解析
// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 
// 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。
var urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(urlencodedParser);

app.get('/', function(req, res) {
	console.log('访问主页 /');
	var toIndex = '<br><a href="http://127.0.0.1:8081/index_post.html">Visit index_post.html</a>';
	res.send('Hello World!' + toIndex);
});

app.get('/index_post.html', function(req, res) {
	res.sendFile(__dirname + '/' + 'index_post.html');
});

app.post('/process_post', urlencodedParser, function(req, res) {
	console.log('POST页面 process_post');
	//console.log(util.inspect(req, true));
	//输出JSON格式
	var response = {
		'first_name': req.body.first_name,
		'last_name': req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var server = app.listen(8081, function(req, res) {
	var host = this.address().address;
	var port = this.address().port;
	console.log(`Server is running at http://${host}:${port}`);
});