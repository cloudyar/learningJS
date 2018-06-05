//对象
var xiaoming = {
	name: '小明',
	birth: 1990,
	school: 'No.1 Middle School',
	height: 1.70,
	weight: 65,
	score: null
}

//访问属性通过.操作符  Object.prop
console.log(xiaoming.name);
console.log(xiaoming.birth);
//所有对象的属性都是字符串，ES6增加数据类型map，也是键值对形式,key可以为其他类型
console.log(xiaoming.age);  //undefined

//检测是否含有某个属性，可用in操作符
console.log('height' in xiaoming);  //true

//问题：用in判断存在的属性，不一定是该对象的，有可能是继承来的
console.log('toString' in xiaoming); //true
//xiaoming本身不具有toString属性，是Object对象的
//最好用方法hasOwnProperty()
console.log(xiaoming.hasOwnProperty('height'));  //true
console.log(xiaoming.hasOwnProperty('toString')); //false

Object.prototype.test = 10; //为测试for-in循环带来的额外属性
//遍历对象
for(var prop in xiaoming) {
	console.log(prop);
	console.log(xiaoming[prop]);  
}
//对于循环体，改成console.log(xiaoming.prop)会报错
//JS可能会误以为是访问prop这个属性
/*
for-in循环
1. 对于数组来说，index的值不是实际的数字，而是"0","1",没法通过.操作符访问；
2. 所有原型链上的属性都会被访问到，可通过hasOwnProperty()排除
*/
for(var prop in xiaoming) {
	if(xiaoming.hasOwnProperty(prop)) {  //排除test这个属性
		console.log(xiaoming[prop]);
	}
}
//把对象JSON化便于传输
console.log(JSON.stringify(xiaoming));
//对象实例没有length这个属性
console.log(xiaoming.length);  //undefined.