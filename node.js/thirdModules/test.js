var merge = require('merge-descriptors');

var thing = {
  name: 'charlie',
  age: 20
}

var animal = {
	name: 'hello'
}

merge(animal, thing, false);
console.log(animal.name);
console.log(animal.age);