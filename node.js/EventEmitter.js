/*
Node.js所有的异步IO操作在完成时都会发送一个事件到事件队列
Node.js里面的许多对象都会分发事件。
比如：
net.Server: 每次有新连接时分发一个事件；
fs.readStream: 有文件被打开会发出一个事件；
...
...
这些产生事件的对象都是events.EventEmitter的实例
var events = require('events');
var eventEmitter = new events.eventEmitter();

events模块只提供了一个对象：events.eventEmitter
eventEmitter的核心是事件触发与事件监听器功能的封装
*/

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

//EventEmitter对象绑定了事件'some_event'，注册该事件的一个监听器
emitter.on('some_event', function() {
	console.log('some_event 事件触发');
});
//一秒后向EventEmitter对象发送事件'some_event',
//EventEmitter对象会调用该对象的监听器
setTimeout(function() {
	emitter.emit('some_event');
},1000);

/*
one event -> more eventHandlers
emit event -> eventHandlers do.
*/
//监听器1
var listener1 = function(arg1) {
	console.log('listener1', arg1);
};
emitter.on('someEvent', listener1);
//eventEmitter.on()与eventEmitter.addListener()没有区别
emitter.addListener('someEvent', function(arg1, arg2) {
	console.log('listener2', arg1, arg2);
});
//类方法：listenerCount(emitter,event) 返回指定事件的监听器数量
var eventListeners = EventEmitter.listenerCount(emitter,'someEvent');
console.log(eventListeners);
emitter.emit('someEvent', 'arg1参数', 'arg2参数');
//someEvent事件注册了两个监听器，当事件触发后，监听器会依次被调用
//事件参数会作为回调函数参数传递
//现在移除监听器1
emitter.removeListener('someEvent',listener1);
//现在只有一个监听器
eventListeners = EventEmitter.listenerCount(emitter,'someEvent');
console.log(eventListeners);
emitter.emit('someEvent', 'arg1参数', 'arg2参数');

/* 
EventEmitter定义了一个特殊的事件error,包含错误的语义
遇到异常的时候通常会触发error事件。
当error别触发，EventEmitter规定如果没有响应的监听器
Node.js会把它当做异常，退出程序并输出错误信息
一般要为会触发error事件的对象设置监听器
避免遇到错误后整个程序崩溃。

(先留着)
为eventEmitter对象绑定error事件的监听器
自己触发error事件：emitter.emit('error') 打印出undefined
有错误时，还是会打印该异常的堆栈信息的。
*/

/*
大多数情况下不会直接使用EventEmitter，
而是使用继承EventEmitter的子类
比如：
fs, net, http
*/
