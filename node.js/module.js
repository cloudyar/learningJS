/*
module是Node.js的基本组成部分
文件和模块是一一对应的，一个文件就是一个模块

Node.js提供了exports和require两个对象
exports: module公开的接口
require: 用于从外部获取一个module的接口
*/

//hello.js
function greet() {
	console.log('Hello world!');
};

//把greet这个函数作为模块暴露出去，这样其他模块就可以使用greet这个函数了
//这个函数的功能是输出'Hello world!'
/*module.exports = greet;
console.log(module);*/
exports.greet = greet;
console.log(exports);
console.log(module);


/*
要在模块中对外输出变量，用：
module.exports = variable;
这里的variable可以是任意对象、函数或者数组等。

引入模块：
var variable = require('module_name');
variable具体是什么，取决于模块输出的对象。
*/

/*
module.exports怎么实现的？
//准备module对象
var module = {
	id: 'module',  //模块名
	exports: {}
};
//传入module对象,返回module.exports
var load = function(module) {
	//读取module.js代码
	function greet() {
	    console.log('Hello world!');
	}

	module.exports = greet;
	//module.js代码结束
	return module.exports;
};
var exported = load(module);
//保存module;
save(module, exported);

module变量是JS加载前准备的一个变量，并将其传入加载函数
我们在module.js中使用变量就是因为module是函数的一个参数
module变量传递给load()函数,module.js就把module变量传递给node执行环境
Node会把module变量保存到某个地方
require()获取module时，Node找到对应的module，把这个module的exports变量返回
*/

/*
module.exports  VS  exports

//hello.js
function hello() {}
function greet() {}
module.exports = {
	hello: hello,
	greet: greet
};

//hello.js
function hello() {}
function greet() {}
exports.hello = hello;
exports.greet = greet;

注意：不可以直接对exports赋值
exports = {
	hello: hello,
	greet: greet
};

// 服务器的模块放在哪里？
// var http = require('http');
// 服务器去哪里获取http这个module的呢？

/*
Node.js中有 4 类module（原生模块和3种文件模块）
1. 文件模块的缓存区；
2. 原生模块；
2.1 原生模块的缓存区
3. 文件模块
3.1 缓存文件模块

node.js解析require方法传入的参数
1. http/fs/path等原生模块
2. ./mod或../mod等相对路径的文件模块
3. /pathtomodule/mod,绝对路径的文件模块
4. mod，非原生模块的文件模块

*/

/*module.exports = {};
//exports对module.exports的对象引用
var exports = module.exports; 
//对exports添加属性
exports.name = 'test'
console.log(module.exports); //{ name: 'test' }
console.log(exports); //{ name: 'test' }
//对export赋值，改变了指针指向
exports = [1, 2, 3];
console.log(module.exports); //{ name: 'test' }
console.log(exports); //[ 1, 2, 3 ]
//module.exports没变化

//模块默认有```module```变量，包含```exports```属性
//直接用```module.exports = 'xxx'```比较直接好理解

console.log(module);
function hello() {}
function greet() {}
module.exports = {
	hello: hello,
	greet: greet
}
console.log(module);*/
