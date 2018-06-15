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