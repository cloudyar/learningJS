### Socket.io中client加载的资源路径分析
---
```
<html>
<head>
	<title>socket.io</title>
	<script src='socket.io/socket.io.js'></script>
</head>
<body>
	<script>
		var socket = io();
		socket.on('connect', function() {
			console.log('connect a socket client');
		});
	</script>
</body>
</html>
```
> ```<script src='/socket.io/socket.io.js'></script>```从哪里加载来的？

client去server加载socket.io.js这个文件，然后浏览器解析获取io这个实例全局对象，这个实例封装关于wbsocket相关方法

- 那么这个socket.io.js是从哪里加载的呢？

node.js使用express框架可以通过express.static(path)处理静态资源文件
```
app.use(express.static(__dirname + '/public'));
```
但是请求的资源并不在我们的静态资源文件夹里面，可以从引入的socket.io包分析

有socket.io,socket.io-client等相关包，在socket.io.client/dist/socket.io.js看到了！

- 那是如何实现该资源的静态化的呢？

从socket.io模块的入口文件index.js可以搜到代码：
```
var clientSource = undefined;//定义静态资源内容变量
/**
 * Server 构造函数.
 *
 * @param {http.Server|Number|Object} srv http server, port or options
 * @param {Object} [opts]
 * @api public
 */
function Server(srv, opts){
  if (!(this instanceof Server)) return new Server(srv, opts);
  if ('object' == typeof srv && srv instanceof Object && !srv.listen) {
    opts = srv;
    srv = null;
  }
  opts = opts || {};
  this.nsps = {};
  this.path(opts.path || '/socket.io');
  this.serveClient(false !== opts.serveClient);
  this.parser = opts.parser || parser;
  this.encoder = new this.parser.Encoder();
  this.adapter(opts.adapter || Adapter);
  this.origins(opts.origins || '*:*');
  this.sockets = this.of('/');
  //这一句实现了静态资源socket.io.js
  if (srv) this.attach(srv, opts);
}
```
我们看下express是如何搭建socket服务的：
```
var app = require('express')();
var socket = require('socket.io');
var port = 8080;
app.set('port', port);
var server = require('http').createServer(app);
var io = socket(server);
server.listen(port);
```
sockct(server)其实在启动websocket服务的时候，同时还相当于给这个http服务增加了一条处理/socket.io/socket.io.js的路由

总结：

```
var io = socket(server); 
```

1. 第一种是当传入server是一个http对象的时候，这句代码会在传入的server对象上添加两条处理/socket.io/socket.io.js和/socket.io/socket.io.js.map的路由,然后将对应的文件响应给http请求；
2. 另外一种是当传入的server是一个数字（端口）的时候，socket(server)会重新启动一个监听在该端口的http服务，然后将上面提到的那两条路由挂在新端口的http服务下。

这样就可以加载到资源了。
