var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
	res.status(404).send('Sorry can\'t find that!');
});

app.listen(8081, () => {
	console.log('start:8081');
});

/*
静态资源文件：对不同用户来说，内容都不会变化的文件
express通过static来管理托管这些静态文件
express.static('public');

app.use(express.static(__dirname + '/public'));
//设置静态文件目录

app.use([path,], function[,function...]);
//app.use用来给path注册函数的，path默认是'/'
app.use(express.static(__dirname + '/public'));
表示将所有请求先交给express.static处理后返回一个函数

可以给静态资源文件创建一个虚拟文件前缀（实际文件系统不存在）
app.use('/static', express.static('public'));
*/