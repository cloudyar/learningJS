var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var util = require('util');

app.use(cookieParser);

app.get('/', function(req, res) {
	console.log('Cookies: ' + util.inspect(req.cookies));
});
var server = app.listen(8081, function() {
	console.log('Server is running at http://127.0.0.1:8081');
});
//有问题，暂时保留

