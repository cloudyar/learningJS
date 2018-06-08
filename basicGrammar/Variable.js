// var let const
// 明白各自的作用域
// let是块级作用域，var是函数体作用域
function foo() {
	var x = 1;
	console.log(x);
}
// console.log(x); //ReferenceError

let a = 1;
{
	let a = 2; //块级作用域，只在该区域内生效，对函数外部没影响
}
console.log(a); // 1
var b = 1;
{
	var b = 2;
}
console.log(b); // 2

//JS引擎会自动提升变量的声明
//但不会提升变量的赋值
function bar() {
	console.log(y); //提升变量y声明 var y;不会提升y的赋值'hello';
}
var y = 'hello';
//undefined.
//最好的习惯是把所有需要声明的变量都放在最前面