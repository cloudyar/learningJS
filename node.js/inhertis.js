function Base(name) {
	this.name = name;
	this.color = [1, 2, 3];
	this.sayHello = function() {
		console.log('Hello, ' + this.name);
	}
}
Base.prototype.showName = function() {
	console.log('My name is ' + this.name);
};

function Sub(name,age) {
	Base.call(this,name);
	this.age = age;
}

function inherits(Child, Parent) {
	var prototype;
	if(typeof(Object.create) === 'function') {
		prototype = Object.create(Parent.prototype);
	} else {
		prototype = object(Parent.prototype);
	}
	prototype.constructor = Child;
	Child.prototype = prototype;
}

function object(o) {
	function F(){}
	F.prototype = new o();
	return new F();
}

inherits(Sub, Base);
var sub1 = new Sub('sub1', 20);
//验证
console.log(sub1.__proto__ === Sub.prototype); //true
console.log(sub1.__proto__.__proto__ === Base.prototype); //true
console.log(Sub.prototype.constructor);

console.log(sub1.name);
sub1.showName();
console.log(sub1.color);
sub1.sayHello();