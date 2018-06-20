var express = require('express');
var app = express();
var querystring = require('querystring');

app.get('/', function(req, res) {
	console.log('访问主页 /');
	var toIndex = '<br><a href="http://127.0.0.1:8081/index_post.html">Visit index_post.html</a>';
	res.send('Hello World!' + toIndex);
});

app.get('/index_post.html', function(req, res) {
	res.sendFile(__dirname + '/' + 'index_post.html');
});

app.post('/process_post', function(req, res) {
	console.log('POST页面 process_post');
	var post = '';
	//通过req的data事件监听函数，每当接受到请求体的数据，累加到post变量中
	req.on('data', function(chunk) {
		post += chunk;
	});
	//在end事件触发后，通过querystring.parse将post解析为真正的post请求格式
	req.on('end', function() {
		post = querystring.parse(post);
		console.log(post);
		res.send(JSON.stringify(post));
	});	
});

var server = app.listen(8081, function(req, res) {
	var host = this.address().address;
	var port = this.address().port;
	console.log(`Server is running at http://${host}:${port}`);
});