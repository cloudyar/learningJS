//数组
var fruits = ['Apple', 'Banana', 'melon', 'orange'];
console.log(fruits.length); //2

//遍历数组
fruits.forEach(function(element, index, arr) {
	console.log(`${index}:${element}`);
});
for(let i=0;i<fruits.length;i++) {
	console.log(`${i}:${fruits[i]}`);
}
for(var element of fruits) {
	console.log(element);
}
for(var i in fruits) {
	console.log(fruits[i]);
}
/* 数组遍历方法：
1. for循环
2. forEach循环
3. for-of循环
4. for-in循环

不太建议用for-in循环
首先循环变量i不是数字，而是字符串，造成不便
而且for-in会把不属于数组本身的属性遍历出来
*/
//Array方法
//从类数组对象或者可迭代对象中创建一个新数组
//比如将字符串转化为数组
var welcome = 'hello,world';
var welcomeArr = Array.from(welcome);
console.log(welcomeArr);

//Array实例的方法：
//1. 修改器方法：会改变原来的数组
//2. 访问方法：不会改变原来数组，而是生成一个新数组
//3. 迭代方法：大多数需要指定一个回调函数作为参数

//1. 修改器方法：
/*
删除元素：pop()/shift()/splice()
增加元素：push()/unshift()/splice()
替换或者覆盖元素：copyWithin()/fill()
排序：sort()/reverse()
*/
var lastElement = fruits.pop();
console.log(lastElement);
var firstElement = fruits.shift();
console.log(firstElement);
//删除元素：从索引1开始，删除一个
//splice(pre,n)  pre:索引，n：个数
var removeElement = fruits.splice(1,1);
console.log(removeElement);

fruits.push('Apple','orange','melon','strawberry','pear');
fruits.unshift('mango');
//[ 'mango', 'Banana', 'Apple', 'orange', 'melon', 'strawberry', 'pear' ]
fruits.splice(1,0,'olive','lemon');
console.log(fruits);
//[ 'mango', 'olive', 'lemon', Banana', 'Apple', 'orange', 'melon', 'strawberry', 'pear' ]
//从上面可以看出：splice()功能比push()或者pop()要好，统一用splice()

//copyWithin(target,start,end)
fruits.copyWithin(1,7,8);  //把7,8（不包括8）的元素替换到索引1这个位置上
//[ 'mango', 'strawberry', 'lemon', Banana', 'Apple', 'orange', 'melon', 'strawberry', 'pear' ]);
//看一个例子
[].copyWithin.call({length:5, 3:1}, 0, 3);
//{0:1, 3:1, length:5}
//copyWithin()是设计为通用的
//{length:5, 3:1}:类数组，长度是5，索引3对应1，将3号-4号索引的值复制到索引0的值上，其他不变

fruits.sort();
console.log(fruits);
//注意：默认排序顺序是根据字符串Unicode码点
//所以数字排序要特别注意
var scores = [1, 10, 21, 2]; 
scores.sort(); 
// [1, 10, 2, 21]
// 注意10在2之前,
// 因为在 Unicode 指针顺序中"10"在"2"之前
// 数字是先转化为字符串再比较的
// arr.sort(compareFunction);
// compareFunction(a,b) > 0 调换
// compareFunction(a,b) <= 0 保持不变
// 从小到大排序的对比函数如下：
// 思路：a < b，不用调换，返回 -1
function compare(a,b) {
	if(a > b) return 1;
	else if(a < b) return -1;
	return 0;
}
scores.sort(compare);
console.log(scores);
//从大到小排序，a > b,返回 -1
scores.sort((a,b) => b - a);
console.log(scores);
/*
compareFunction 可能需要对元素做多次映射以实现排序
尤其当compareFunction较为复杂，且元素较多的时候
某些 compareFunction 可能会导致很高的负载。
使用 map 辅助排序将会是一个好主意。
基本思想是首先将数组中的每个元素比较的实际值取出来
排序后再将数组恢复。
*/
//需要被排序的数组
//目标：按照首字母小写排序
//首先：把元素转化为首字母小写再排序
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];
//临时保存索引和值，用对象
var mapped = list.map(function(element, i) {
	//返回对象
	return {index: i, value: element.toLowerCase()};
});
console.log(mapped);
mapped.sort(function(a,b) {
	return +(a.value > b.value) || +(a.value === b.value) -1 ;
});
console.log(mapped);
//还原数组
var result = mapped.map(function(element, i) {
	return list[element.index];
});
console.log(result);

//2. 访问方法
/*
不会改变原来数组内容
判断：includes()
连接：join()/concat()
切割：slice()
寻找：indexOf()/lastIndexOf()  前者：从左到右搜，后者：从右到左搜
*/
console.log(fruits.includes('Apple')); //true
console.log(fruits.includes('apple')); //false
console.log(fruits.join('-'));
//Apple-Banana-lemon-mango-melon-orange-pear-strawberry-strawberry
console.log(fruits.concat(['test1','test2']));
console.log(fruits.slice(0,2)); //fruits[0],fruits[1]
console.log(fruits.slice());  //数组的浅拷贝
console.log(fruits.slice(3,1)); //slice是从start到end的，start>end会返回空数组
//找出数组中出现'strawberry'的第一个索引
console.log(fruits.indexOf('strawberry')); //7
//找出所有索引呢
var starwberryArr = [];
var idx = fruits.indexOf('strawberry');
while(idx != -1) {
	starwberryArr.push(idx);
	idx = fruits.indexOf('strawberry',idx + 1);
	console.log(idx);
}
console.log(starwberryArr);

/*
上面这些访问方法不会改变数组内容，不过有意设计为通用方法
所以对于类数组也是可以用的
比如string可用slice()方法
*/
console.log([].slice.call('hello',1,3)); //['e', 'l']
(function (a,b,c) {
	console.log([].join.call(arguments,'-'));
})('a',1,true); //a-1-true

//3. 迭代方法
/*
很多方法都有一个回调函数callback(element,index,array)
执行完回调函数之前，length属性会被缓存
a. 增加元素不会被迭代到
b. 删除元素可能会影响结果
几个比较重要的：
Array.forEach()
Array.map()
Array.reduce()
Array.filter()
*/
fruits.forEach(function(e,i,arr) {
	console.log(`element:${e},index:${i}`);
});

//例子：对象的复制
function copy(obj) {
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames = Object.getOwnPropertyNames(obj); //得到obj的属性数组

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var obj1 = { a: 1, b: 2 };
var obj2 = copy(obj1); // obj2 looks like obj1 now
console.log(obj2);
//更改obj1对象引用的值，再看下obj2是否会变化
obj1.a = 2;
console.log(obj1); //{ a: 2, b: 2 }
console.log(obj2); //{ a: 1, b: 2 }

//map() 数组每个元素都调用提供的函数后返回结果
//把fruits每个元素都变成'fruits:element'形式
console.log(fruits.map(function(element,index,arr) {
	return element = 'fruits:' + element;
}));

let num = [1,2,3,4];
console.log(num.map((x)=>x ** 2));
//例子：字符串每个字符的ASCII码
console.log([].map.call('hello,world',s=>s.charCodeAt(0)));
//例子：字符串反转
console.log(Array.from('12345').reverse().join(''));
//用map实现
console.log([].map.call('12345',s=>s).reverse().join(''));
//一个错误的例子
console.log(['1','2','3'].map(parseInt));
//[ 1, NaN, NaN ]
//map回调函数默认参数是三个element,index,array，parseInt参数可以2个的，第二个是进制数
//第一次：parseInt('1',0,['1','2','3']);
//第二次：parseInt('2',1,['1','2','3']);
//第三次：parseInt('3',2,['1','2','3']);
//正确实现：
console.log(['1','2','3'].map(x => parseInt(x))); 
//[ 1, 2, 3 ]

//reduce()方法：对每个元素应用一个函数并两两累积，最后返回单个值。
//提供初始值通常更安全
const array1 = [1, 2, 3, 4];
//所有数字相加
console.log(array1.reduce(function(acc,cur) {
	return acc + cur;
},0));  //10
//例子：降维输出
console.log([[0, 1], [2, 3], [4, 5]].reduce((prev,curr) => prev.concat(curr),[]));
//例子：计算数组中每个元素出现的次数
//思路：每个能迭代到数组元素的都可以实现到
var fruit = {};
fruits.forEach(function(ifruit) {
	if(!fruit[ifruit]) {
		fruit[ifruit] = 1;
	} else {
		fruit[ifruit] += 1;
	}
});
console.log(fruit);