var express = require('express');
var app = express();

app.use(express.static('public'));
//主页输出'hello world'
app.get('/', function(req, res) {
	console.log('主页 GET 请求');
	res.send('Hello GET');
});
//POST请求
app.post('/', function(req, res) {
	console.log('主页 POST请求');
	res.send('Hello POST');
});

//info页面响应
app.get('/info', function(req, res) {
	console.log('INFO GET 请求');
	res.send('个人信息页面');
});

// /del_user页面响应
app.get('/del_user', function(req, res) {
	console.log('/del_user 响应DELETE请求');
	res.send('删除页面');
});

//对页面abcd,abxcd,ab123cd,等响应GET请求
app.get('/ab*cd', function(req, res) {
	console.log('/ab*cd GET请求');
	res.send('正则匹配页面');
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`访问地址：${host}:${port}`);
});