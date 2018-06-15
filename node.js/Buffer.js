/*
JS语言没有处理二进制的数据类型
node.js定义了Buffer类，便于处理TCP流或者文件流的二进制数据
---
Buffer类：创建一个专门存放二进制数据的缓存区。
---

*/

const buf = Buffer.from('runoob', 'ascii');
// r 0111 0010 72
// u 0111 0101 75
// n 0110 1110 6E
// o 0110 1111 6F
// o 0110 1111 6F
// b 0110 0010 62
// base64 [0111 00] [10 0111] [0101 01] [10 1110]
console.log(buf); //<Buffer 72 75 6e 6f 6f 62>
console.log(buf.toString('hex')); //16进制 72756e6f6f62
console.log(buf.toString('base64')); //base64 cnVub29i

//创建一个长度为10，且用0填充的Buffer
const buf1 = Buffer.alloc(10);
//创建一个长度为10，且用0x1填充的Buffer
const buf2 = Buffer.alloc(10,1);

//写入缓冲区
//buf.write(string)
const buf3 = Buffer.alloc(256);
var len = buf3.write('hello');
console.log('写入的字节数：' + len);

//从缓冲区读取数据
//buf.toString([encoding])
const buf4 = Buffer.alloc(26);
for(let i=0;i<26;i++) {
	buf4[i] = i + 97;
}
console.log(buf4.toString('ascii'));
console.log(buf4.toString('ascii',0,5));
console.log(buf4.toString('utf8',0,5));
console.log(buf4.toString(undefined,0,5));

//将Buffer转换为JSON对象
//buf.toJSON()
const buf5 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf5);
console.log(json); //{"type":"Buffer","data":[1,2,3,4,5]}
//还原
const copy = JSON.parse(json, (key,value) => {
	return value && value.type === 'Buffer' ?
	    Buffer.from(value.data) : value;
});
console.log(copy); //<Buffer 01 02 03 04 05>

//缓冲区合并
//var buffer3 = Buffer.concat([buffer1, buffer2]);

//缓冲区比较
//buf.compare(otherBuffer);