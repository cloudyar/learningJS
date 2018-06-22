var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

//用户
var users = [];

app.use('/', express.static(__dirname + '/'));
server.listen(3000);

//有连接connection绑定监听事件
io.on('connection', function(socket) {
	console.log('user connect!');
	//失去连接,绑定监听事件
	socket.on('disconnect', function() {
		if(users.indexOf(socket.username) > -1) {
			//删除用户表中的数据
			users.splice(users.indexOf(socket.username), 1);
			console.log(socket.username + ' ===> disconnected!');
		}
		//广播给所有用户,更新当前在线人数
		socket.broadcast.emit('users', {number: users.length});
	});
	//有接收到信息，绑定监听事件
	socket.on('message', function(data) {
		//接收的数据包含text：信息内容，user:发送人
		let newData = {text: data.text, user: socket.username};
		socket.emit('receive_message', newData);
		//把信息广播给所有用户
		socket.broadcast.emit('receive_message', newData);
	});
	//有新的用户登录
	socket.on('login', function(data) {
		if(users.indexOf(data.username) > -1) {
			console.log('welcome back ' + data.username);
		} else {
			socket.username = data.username;
			//新用户更新用户表
			users.push(data.username);
			//统计连接数
			socket.emit('users', {number: users.length});
			//广播给所有用户更新在线用户数
			socket.broadcast.emit('users', {number: users.length});
		}
	});
});

console.log('Server is running at http://127.0.0.1:3000');