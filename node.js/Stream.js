/*
Stream是一个抽象接口，Node中有很多对象实现了这个接口
比如http服务器发起请求的request对象就是一个Stream

Stream有四种流类型：
1. Readable - 可读操作
2. Writable - 可写操作
3. Duplex - 可读可写操作
4. Transform - 操作被写入数据，然后读出结果

Stream对象是EventEmitter的实例，常见的事件有：
1. data - 当有数据可读时触发
2. end - 没有更多的数据可读时触发
3. error - 在接收和写入过程中发生错误时触发
4. finish - 所有数据已被写入到底层系统时触发

*/

//从流中读取数据
var fs = require('fs');
var data = '';

//创建可读流
var readerStream = fs.createReadStream('Buffer.js');
//设置编码为utf8
readerStream.setEncoding('UTF8');
//处理流事件 --> data,end,and error
readerStream.on('data', function(chunk) {
	data += chunk;
});
readerStream.on('end', function() {
	console.log(data);
});
readerStream.on('error', function(err) {
	console.log(err.stack);
});

console.log('程序执行完毕');

//写入流
//写入的内容
var writeData = 'hello,world!';
//创建一个可以写入的流，写入到文件output.txt中
var writerStream = fs.createWriteStream('output.txt');
//使用utf8编码写入数据
writerStream.write(writeData,'UTF8');
//标记文件末尾
writerStream.end();

//处理流事件：-->data,end,and error
writerStream.on('finish', function() {
	console.log('写入完成');
});
writerStream.on('error', function(err) {
	console.log(err.stack);
});

console.log('写程序执行完毕');

//管道流
//管道提供了一个输出流到输入流的机制。
//通常我们用于从一个流中获取数据并将数据传入到另外一个流中
//实现大文件的复制过程

//创建一个可读流
readerStream = fs.createReadStream('Buffer.js');
//创建一个可写流
//设置第二个参数append,可以追加到文件的最后
writerStream = fs.createWriteStream('BufferOutput.txt', {'flags': 'a'});
//管道读写操作
//读取Buffer.js的内容，并将内容写入到output.txt中
readerStream.pipe(writerStream);
console.log('管道流程序执行完毕');

//链式流
//链式是通过连接输出流到另外一个流并创建多个流操作链的机制
//链式流一般用于管道操作
var zlib = require('zlib');
//压缩Buffer.js为Buffer.js.gz
fs.createReadStream('Buffer.js')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('Buffer.js.gz'));
console.log('Buffer.js压缩完成');