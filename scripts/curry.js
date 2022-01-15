// function curry(fn) {
//     let args = Array.prototype.slice.call(arguments, 1);
//     return function () {
//         let innerArgs = Array.prototype.slice.call(arguments);
//         let finalArgs = args.concat(innerArgs);
//         return fn.apply(null, finalArgs);
//     };
// }

// function add(num1, num2, num3) {
//     return num1 + num2 + num3;
// }
// var curryAdd = curry(add, 4);
// console.log(curryAdd(3, 2));
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }


        else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
function sum(a, b, c) {
    return a + b + c;
}
let currySum = curry(sum);
console.log(currySum(2)(2)(1));