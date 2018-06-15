/*
node.js：单线程单进程
node.js 基本上所有事件机制都用设计模式中观察者模式实现的
node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出
每个异步事件都生成一个事件观察者(emitter)，如果有事件发生就调用回调函数(emit)

事件驱动模型：
Web Server接收到请求，node.js关闭请求然后处理，接着去服务下一个请求
当这个请求完成，它被放回处理队列，当到达队列开头，把结果返回给客户端

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

Node.js有多个内置的事件，通过require('events')引入
*/

//引入events模块，指定events对象为变量events
var events = require('events');
//events有方法EventEmitter，实例化后的对象赋值给变量eventEmitter
var eventEmitter = new events.EventEmitter();
//eventEmitter对象可以绑定<事件>和<事件处理程序>(on)，并在适当时候触发事件(emit)
//eventEmitter.on('eventName', eventHandler);
//触发事件
//eventEmitter.emit('eventName');
/*
EventEmitter的核心是事件触发与事件监听器功能的封装。



*/

//现在创建一个事件处理程序 connectHandler
var connectHandler = function connected() {
	console.log('连接成功');
	
	//触发 data_received 事件
	eventEmitter.emit('data_received');
};
//绑定connection，事件处理程序是connectHandler
eventEmitter.on('connection', connectHandler);

//绑定data_received，事件处理程序是一个匿名函数
eventEmitter.on('data_received', function() {
	console.log('数据接收成功');
});

//触发connection事件
//分析：触发connection事件，事件处理程序connectHandler会执行
//     中间会触发data_received事件
eventEmitter.emit('connection');

console.log('程序执行结束!');

