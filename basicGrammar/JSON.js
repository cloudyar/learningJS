//All is Object.
/*
基本数据类型：
number/string/boolean/function/undefined/object
我们可以用 typeof 操作符来获取对象的类型
*/
console.log(typeof 123); //'number'
console.log(typeof 'str'); //'string'
console.log(typeof true); //'boolean'
console.log(typeof Math.abs); //'function'
console.log(typeof undefined); //'undefined'

console.log(typeof null); //'object'
console.log(typeof []); //'object'
console.log(typeof {}); //'object'

console.log(typeof NaN); //'number'
/*
null,[],{}，判断这三种类型是没法通过typeof来获取的
数组：Array.isArray(arr);
null:myVar === null;
*/

//JSON:数据交换格式，对象序列化之后便于网络传输
//1.序列化：JSON.stringify(object);
//* a.输出好看一点，可加参数JSON.stringify(object, null, ' ');
//* b.第二个参数可以控制筛选对象的键值，传入属性数组Array
//* c.还可以传入一个函数，对象的每个键值对会被函数先处理
//* d.对象还可以定义一个toJSON方法
//2.反序列化：JSON.parse(string);
var xiaoming = {
	name: '小明',
	height: 1.70,
	weight: 65,
	school: 'NO.1 Middle School',
	score: null
};
console.log(JSON.stringify(xiaoming));
//{"name":"小明","height":1.7,"weight":65,"school":"NO.1 Middle School","score":null}
console.log(JSON.stringify(xiaoming, null, ' '));
console.log(JSON.stringify(xiaoming, ['name','score'], ' '));
function convert(key,value) {
	if(key === 'name') {
		return value = value + '同学';
	}
	return value;
}
console.log(JSON.stringify(xiaoming,convert));