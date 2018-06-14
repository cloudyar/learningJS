//define the function
//function is also a object.
function abs(x) {
	if(x >= 0) {
		return x;
	} else {
		return -x;
	}
}
//abs()是一个函数对象,abs是指向该函数的变量
//可以用其他变量代替abs，比如：
var myAbs = abs;
console.log(myAbs(-3)); // 3
//对收到的参数进行检查
function abs(x) {
	if(typeof x !== 'number'){
		throw 'Not a number';
	}
	return x >= 0 ? x : -x;
}
//console.log(abs('a'));  //throw error
console.log(abs(-4));  // 4
//Arguments对象
function foo(x) {
	Array.prototype.forEach.call(arguments,function(a) {
		console.log(a);
	});
}
foo(2, 3, 4);
//rest参数:不需要arguments就可以获取所有的参数
function bar(a,b,...rest) {
	console.log('a=' + a);
	console.log('b=' + b);
	console.log(rest);
}
bar(2, 3, 4);

//变量作用域
//var 函数作用域
//let 块级别作用域
//不在任何函数内定义的变量就具有全局作用域。
//其实JS默认有一个window全局对象，所以这个全局作用域的变量是绑定在window上的一个属性

//最顶层的全局对象是window，如果大家都使用同样的函数名或者变量就会冲突
//解决方法是：把相关的变量和函数全部绑定到一个自定义的全局变量（名字空间）
//唯一的全局变量MYAPP
var MYAPP = {};
//其他变量
MYAPP.name = 'myapp';
MYAPP.version = 1.0;
//其他函数
MYAPP.foo = function () {
	return 'foo';
};

//解构赋值
var x = 2,y=3;
[x, y] = [y, x];
console.log(`x=${x},y=${y}`); // x=3,y=2

//装饰器
//统计parseInt()运行了几次
var count = 0;
//先保存原来函数变量
var oldParseInt = parseInt;
parseInt = function(a) {
	count ++;
	return oldParseInt(a);
	//这样做确实可以实现同样的功能
	//return oldParseInt.apply(null, arguments);
};
console.log(parseInt(10));
parseInt(20);
parseInt(30);
console.log(count);