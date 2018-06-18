function Base(name) {
	this.name = name;
	this.colors = ['red', 'green'];
}
Base.prototype.showName = function() {
	console.log('My name is ' + this.name);
}
//原型链：new Base() --> Base.prototype --> Object.prototype --> null
function Sub(name,age) {
	this.name = name;
	this.age = age;
}
//原型链：new Sub() --> Sub.prototype --> Object.prototype --> null

//现在想要Sub继承Base
//继承从原型链角度来看：
//new Sub() --> Sub.prototype --> Base.prototype --> Object.prototype --> null
//继承从字面上看：
//Sub.prototype拥有Base.prototype中公有方法和属性
//Base非prototype中定义的方法和属性可以被Sub获取到

//可能会这样想：Sub.prototype = Base.prototype;
//Sub.prototype拥有Base.prototype的方法和属性
//但：Sub.prototype和Base.prototype共享一个原型对象
//1. 实例化Sub和实例化Base区别不大，创建Sub有什么意义呢？
//2. Sub.prototype添加属性，也会影响到Base.prototype

//换个思路：Sub.prototype = new Base();
//这样做，满足继承的要求的。
//Sub.prototype作为Base()的一个实例，作为所有Sub实例对象的共享部分
//相当于重写了Sub.prototype
//导致：
Sub.prototype = new Base();
//验证原型链：
console.log(new Sub().__proto__ === Sub.prototype); // true
console.log(new Sub().__proto__.__proto__ === Base.prototype); //true
var sub1 = new Sub('sub1', 20);
console.log(sub1.name); //sub1
console.log(sub1.colors); // [ 'red', 'green' ]
sub1.name = 'sub11';
sub1.colors.push('black');
console.log(sub1.name); // sub11
console.log(sub1.colors); // [ 'red', 'green', 'black' ]
//再实例化另外一个对象
var sub2 = new Sub('sub2', 30);
console.log(sub2.name); // sub2
console.log(sub2.colors); // [ 'red', 'green', 'black' ]
//对Base引用类型的属性更改后，会影响其他实例。
//而且对于Sub.prototype不能进行赋值，只能添加属性，不然会再一次重写原型

//修补方法是利用call把Base中通过this指定的属性和方法复制到子类的实例中
/*function Sub(name,age) {
	Base.call(this,name);
	this.age = age;
}*/

//但这个修补好的方法有个不好的地方是：调用两次超类型的构造函数
//Sub.prototype = new Base()
//这个方法会把Base的非prototype方法和属性都放到Sub.prototype中
//如果Base的非prototype中没有引用类型的属性或者方法，那没有问题
//现在考虑用一个空的函数F来做过桥
function F() {};
F.prototype = Base.prototype;
Sub.prototype = new F();
//把constructor指向正确
Sub.prototype.constructor = Sub;
//验证原型链：
console.log(new Sub().__proto__ === Sub.prototype); // true
console.log(new Sub().__proto__.__proto__ === Base.prototype); //true

//把继承的工作用一个函数inherits()函数封装，可以隐藏F的定义，并简化代码
function inherits(Child, Parent) {
	var F = function() {};
	F.prototype = Parent.prototype; 
	Child.prototype = new F();
	Child.prototype.constructor = Child;
}
//ES5中Object.create()方法可以让一个对象跟另外一个对象建立继承关系
/*var F = function() {};
F.prototype = Parent.prototype; 
Child.prototype = new F();*/
//这三句可用var prototype = Object.create(Parent.prototype);
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
function inheritPrototype(Child,Parent){
    var prototype;
    if(typeof Object.create === 'function'){
    	prototype = Object.create(Parent.prototype);
    }else{
    	prototype = object(Parent.prototype);
    }          
    prototype.constructor = Child;
    Child.prototype = prototype;
}
