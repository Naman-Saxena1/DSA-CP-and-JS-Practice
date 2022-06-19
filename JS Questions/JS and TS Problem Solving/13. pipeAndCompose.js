const sum = (x) => x + 5;
const multiply = (x) => x*4;
const subtract = (x) => x - 5;

const pipe    = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);
const compose = (...fns) => (value) => fns.reduceRight((acc,fn) => fn(acc), value)

console.log(pipe(subtract, multiply, sum)(20))
console.log(compose(subtract, multiply, sum)(20))