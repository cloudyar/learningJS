/*
[1]每个实例对象(Object)都有一个私有属性(__proto__)
__proto__指向它的原型对象(prototype)
该原型对象也有一个自己的原型对象
层层向上直到一个对象的原型对象为null

JS对象有一个指向一个原型对象的链。
当试图访问一个对象的属性时，它不仅仅在对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型
直到找到一个名字匹配的属性或者到达原型链的末尾

[2]
当继承的函数被调用时
this指向的是当前继承的对象
而不是继承的函数的原型对象
*/

//[1]
//字面量对象
console.log('1:字面量创建对象');
var arr = [1, 2, 3];
console.log(arr.__proto__); //[]
console.log(arr.__proto__.__proto__); //Object
console.log(arr.__proto__ === Array.prototype); //true
// var arr = [1, 2, 3]; 等价于 var arr = new Array(1, 2, 3);  
// arr --> Array.prototype --> Object.prototype --> null

var num = 2;
console.log(num.__proto__); //[Number: 0]
console.log(num.__proto__ === Number.prototype); //true
// var num = 2; 等价于 var num = new Number(2);
// num --> Number.prototype --> Object.prototype --> null

var obj = {
	name: 'test'
};
console.log(obj.__proto__); //{}
console.log(obj.__proto__ === Object.prototype); //true
// obj --> Object.prototype --> null

var robot = {
	name: 'Robot',
	height: 1.2
};
var xiaomi = {
	name: 'xiaomi'
};
xiaomi.__proto__ = robot;
console.log(xiaomi.height);
console.log(Object.getPrototypeOf(xiaomi)); //robot
// xiaomi --> robot --> Object.prototype --> null

console.log('2:构造器创建对象');
function foo() {return 0} //构造函数
var f = new foo();  //实例对象
//实例对象f有一个私有属性(__proto__)
console.log(f.__proto__); //指向原型对象
console.log(f.__proto__ === foo.prototype); //true
console.log(Object.getPrototypeOf(f));
console.log(Object.getPrototypeOf(foo.prototype));
// f --> foo.prototype --> Object.prototype --> null
console.log(Object.getPrototypeOf(foo)); // [Function]
console.log(foo.__proto__ === Function.prototype); //true
// foo --> Function.prototype --> Object.prototype --> null
console.log(foo.prototype.constructor); //指向构造函数foo

console.log('3:还有一种是通过Object.create创建的对象');
//Object.create():创建一个新对象，该对象的原型就是调用方法传入的对象
var a = {a: 1};
// a --> Object.prototype --> null
var b = Object.create(a);
// b --> a --> Object.prototype --> null
console.log(b.a);

//还有一种是通过class关键字创建的对象（后续）

//[2]
var o = {
	a: 2,
	m: function() {
		return this.a + 1;
	}
};
console.log(o.m());  // 3
//当调用o.m时，'this'指向的是o
//相当于return o.a + 1; 

var p = Object.create(o);
p.a = 4;
console.log(p.m());  // 5
//调用p.m时，this指向的是p
//相当于return p.a + 1;

//原型继承 B继承A
console.log('原型继承');
function A(a) {
	this.Vara = a;
}
var testA = new A(2);
console.log(testA.Vara);
//testA --> A.prototype --> Object.prototype --> null
function B(a, b) {
	A.call(this,a);
	this.Varb = b;
}
var testB = new B(3,4);
console.log(testB.Vara);
console.log(testB.Varb);
//testB --> B.prototype --> Object.prototype --> null
console.log(Object.getPrototypeOf(testB)); // B.prototype
console.log(Object.getPrototypeOf(B.prototype)); // {}
//B调用了A的构造函数，并不一定B继承了A
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
var testAnotherB = new B(4,5);
console.log(Object.getPrototypeOf(testAnotherB));
console.log(testAnotherB.__proto__ === B.prototype);
console.log(B.__proto__ === A.prototype);
//这个问题暂且搁下 0614
