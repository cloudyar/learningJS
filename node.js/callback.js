//异步依托回调来实现
// function foo(arg1, arg2, ...rest, callback1, callback2)

//阻塞代码：读取install.js文件
//加载fs模块,把文件系统模块对象赋值给变量fs
var fs = require('fs');
//通过fs模块的readFileSync同步方法读取文件，返回buffer对象
var data = fs.readFileSync('install.js');
//把Buffer内容转化为字符串输出 Buffer.toString();
console.log(data.toString());
console.log('同步程序执行结束!');

//非阻塞代码：
//readFile异步方法，传入回调函数返回文件内容
//回调函数两个参数：err,data
//读取成功 -> 处理
//读取失败 -> err
fs.readFile('install.js', function(err, data) {
	if(err) return console.error(err);
	console.log(data.toString());
});
console.log('异步程序执行结束!');

//readFile方法每次读取的内容大小是多少？ data.toString()是一次性读取文件吗？
