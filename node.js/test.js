//测试代码片段

function Base(name, color) {
	this.name = name;
	this.sayHello = function() {
		console.log('Hello, ' + this.name);
	}
	//测试，添加一个引用类型
	this.colors = ['red', 'blue', 'green'];
}
//Base的原型
Base.prototype.showName = function() {
	console.log('My name is ' + this.name);
}
/*var base1 = new Base('base1');
var base2 = new Base('base2');
console.log(base1.name);
console.log(base2.name);
base1.showName();
base2.showName();*/

function Sub(name) {
	Base.call(this,name);
}
//new Sub() --> Sub.prototype --> Object.prototype --> null
/*var sub1 = new Sub('sub1');
var sub2 = new Sub('sub2');
console.log(sub1.name);
console.log(sub2.name);*/

//现在需要把原型链变为：
//new Sub() --> Sub.prototype --> Base.prototype --> Object.prototype --> null
//如果直接Sub.prototype = Base.prototype
/*Sub.prototype = Base.prototype;
Sub.prototype.subfunc = function() {
	console.log('Sub function');
};
var sub3 = new Sub('sub3');
sub3.subfunc();
var base3 = new Base('base3');
base3.subfunc();*/

/*function F() {};

F.prototype = Base.prototype;
Sub.prototype = new F();
Sub.constructor = Sub;
Sub.prototype.subfunc = function() {
	console.log('Sub function');
}

var sub4 = new Sub('sub4');
sub4.subfunc();
var base4 = new Base('base4');
//base4.subfunc();
//测试
console.log(sub4.__proto__ === Sub.prototype); //true
console.log(sub4.__proto__.__proto__ === Base.prototype); //true*/

Sub.prototype = new Base();

var sub5 = new Sub('sub5');
console.log(sub5.color);
//现在对其中color做更改
sub5.colors.push(4);
console.log(sub5.colors);
var sub6 = new Sub('sub6');
console.log(sub6.colors);
//测试
console.log(sub5.__proto__ === Sub.prototype); //true
console.log(sub5.__proto__.__proto__ === Base.prototype); //true


