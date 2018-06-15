/* 
node.js应用包含：
1. 引入required模块：require指令载入Node.js模块；
2. 创建服务器；
3. 接收请求和响应请求
*/

//载入http模块，并将实例化的HTTP赋值给http变量
var http = require('http');
//创建服务器
//http模块提供createServer()方法创建服务器对象
//服务器对象使用listen方法绑定端口监听事件
//http.createServer(callback).listen(port);
http.createServer(function(request, response) {
	//1. 发送HTTP头部
	//HTTP状态值： 200:OK
	//内容类型： text/plain
	response.writeHead(200, {'Content-type': 'text/plain'});
	//2. 发送响应数据
	response.end('Hello World\n');
}).listen(8888);

//终端打印信息
console.log('Server running at http://127.0.0.1:8888');