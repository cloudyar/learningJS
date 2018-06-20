var express = require('express');
var app = express();
//上传文件需要
var fs = require('fs');
//POST 解析数据需要的module
var bodyParser = require('body-parser');
//multer是express官方推荐的文件上传中间件
//Multer会添加一个body对象以及file或files对象到express的request对象中。
//body对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。
var multer = require('multer');

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(multer({dest: './tmp/'}).array('image'));

app.get('/', function(req, res) {
	console.log('访问主页');
	var toIndex = '<br /><a href="./index_upload.html">To Index</a>';
	res.send('Hello World!' + toIndex);
});

app.get('/index_upload.html', function(req, res) {
	console.log('访问上传页面');
	res.sendFile(__dirname + '/' + 'index_upload.html');
});

//file_upload页面处理post数据
app.post('/file_upload', urlencodedParser, function(req, res) {
	console.log('访问文件上传处理页面');
	console.log(req.files[0]); //上传的文件信息
	//上传到服务器的文件名
	var des_file = __dirname + '/' + req.files[0].originalname;
	//异步读取这个文件
	fs.readFile(req.files[0].path, function(err, data) {
		fs.writeFile(des_file, data, function(err) {
			if(err){
				console.log(err);
			} else {
				var response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname
				};
				console.log(response);
				res.end(JSON.stringify(response));
			}
		});
	});	
});

var server = app.listen(8081, function() {
	var host = this.address().address;
	var port = this.address().port;
	console.log(`Server is running at http://${host}:${port}`);
});