var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(req, res) {
	console.log('访问主页/');
	var toIndex = '<a href="http://127.0.0.1:8081/index.html">Visit index.html</a>';

	res.send('Hello World!\n' + toIndex);
});

app.get('/index.html', function(req, res) {
	console.log('访问index.html页面');
	//将index.html response出去
	res.sendFile(__dirname + '/' + "index.html");
});

app.get('/process_get', function(req, res) {
	//输出JSON格式
	var response = {
		'first_name': req.query.first_name,
		'last_name': req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var server = app.listen(8081, function(req, res) {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`server is running at http://${host}:${port}`);
});