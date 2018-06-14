/*
类和实例：
类：模板，如Student类表示学生类型，并不表示具体的某个学生
实例：根据类（模板）创建出来的对象。Student - xiaoming

在JS中，不区分类和实例，而是通过原型(prototype)来实现
JS中没有class的概念，所有对象都是实例
继承就是一个对象的原型指向另外一个对象
a.__proto__ = b  a继承b
*/

var robot = {
	name: 'Robot',
	height: 1.6,
	run: function() {
		console.log(this.name + ' is running');
	}
};

var Student = {
	name: 'Robot',
	height: 1.2,
	run: function() {
		console.log(this.name + ' is running...');
	}
};

//把Student作为xiaoming的原型来创建xiaoming这个对象实例
var xiaoming = {
	name: '小明'
};
xiaoming.__proto__ = Student;
//这行代码把xiaoming的原型指向对象Student
//仿佛xiaoming是从Student对象继承来的
console.log(xiaoming.name);
console.log(xiaoming.height); 
//继承Student对象的height属性
console.log(xiaoming.run()); 
xiaoming.__proto__ = robot;
console.log(xiaoming.name);
//更改原型，继承robot对象的height
console.log(xiaoming.height); 
console.log(xiaoming.run());
//注意：演示作用，编写代码时不要用obj.__proto__去改变一个对象的原型
//可以用Object.create()方法传入一个原型对象
//创建基于该原型的新对象，不过没有什么属性
function createStudent(name) {
	var s = Object.create(Student);
	s.name = name;
	return s;
}
var xiaoming = createStudent('小明');
console.log('hello,', xiaoming.name); 
console.log(xiaoming.height);
console.log(xiaoming.run());
console.log(xiaoming.__proto__ === Student); //true

console.log('\n===Create Object===');
var arr = [1, 2, 3];
//原型链：arr --> Array.prototype --> Object.prototype --> null
function foo() {
	return 0;
}
//原型链：foo --> Function.prototype --> Object.prototype --> null
//构造函数：
function Students(name) {
	this.name = name;
	this.hello = function() {
		console.log('Hello, ' + this.name + '!');
	}
	// return this;
}
//语法：new关键字
var xiaoming = new Students('小明');
//通过new关键词将Students变成一个构造函数，这样Students绑定的
//this指向新对象xiaoming，并默认返回this.
console.log(xiaoming.name);
console.log(xiaoming.hello());
//原型链：xiaoming --> Student.prototype --> Object.prototype --> null
console.log(xiaoming.constructor === Students);
console.log(xiaoming.constructor === Students.prototype.constructor);
console.log(Object.getPrototypeOf(xiaoming));
console.log(xiaoming instanceof Students)
console.log('构造函数的原型对象:' + Object.getPrototypeOf(Students));

//编写一个createStudent函数,内部封装new操作
//var xiaoming = createiStudent({name:'小明'});
function createiStudent(obj) {
	return new iStudent(obj || {});
}
function iStudent(props) {
	this.name = props.name || 'No name';
	this.grade = props.grade || 1;
}
iStudent.prototype.hello = function() {
	console.log('hello, ' + this.name + '!');
};
var xiaohong = createiStudent({name:'小明'});
console.log(xiaohong.name);
console.log(xiaohong.grade);