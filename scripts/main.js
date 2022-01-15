// 'use strict';
//计算薪资对象总和
// function calcSalary(obj) {
//   let sum = 0;
//   for (let key in obj) {
//     sum += obj[key];
//   }
//   return sum ;
// }
// let salaries = {
//   John : 100,
//   Ann : 160,
//   Pete : 130,
// }
// let empty = {};
// alert( calcSalary(salaries) );
// console.log(calcSalary(empty));
//
// 对象数值*2
// let multiplyNumeric = (obj) => {
//     for (let key in obj) {
//       if (typeof obj[key] == 'number') {
//         obj[key] *= 2;
//       }
//     }
// }
// let menu = {
//     width: 200,
//     height: 300,
//     title: 'My menu',
// };
// multiplyNumeric(menu);
//计算器对象
// let handleNum = {} ;
// let calculator = {
//   read() {

//     handleNum.num1 = +prompt("please input num1",'0') ;
//     handleNum.num2 = +prompt('please input num2','0') ;
//   },
//   sum() {
//     return handleNum.num1 + handleNum.num2 ;
//   },
//   mul() {
//     return handleNum.num1 * handleNum.num2 ;
//   }
// }
// calculator.read();
// alert( calculator.sum() );
// alert( calculator.mul() );
//梯子示例
// let ladder = {
//   step: 0,
//   up() {
//     this.step++;
//     return this;
//   },
//   down() {
//     this.step--;
//     return this;
//   },
//   showStep: function() { // 显示当前的 step
//     alert( this.step );
//     return this;
//   }
// };
//Fibonacci cal
// function F(n) {
//     if ( n <= 2 ) {
//      return 1;
//     }
//     else  return F(n - 1) + F(n - 2);
// }
// alert( F(5) );

// 构造计算器对象
// function Calculator() {
//     this.read = function() {
//         this.num1 = +prompt("num1?",0);
//         this.num2 = +prompt("num2?",0);
//     };
//     this.sum = function() {
//         return this.num1 + this.num2;
//     };
//     this.mul = function() {
//         return this.num1 * this.num2;
//     };
// }
// let calculator = new Calculator();
// calculator.read();

// alert( "Sum=" + calculator.sum() );
// alert( "Mul=" + calculator.mul() );

//构造累积器对象
// function Accumulator(startingValue) {
//     this.value = startingValue;
//     this.read = function() {
//         this.value += +prompt('add a number',0);
//     };
//     return this.value;
// }
// let accumulator = new Accumulator(1);
// accumulator.read();
// accumulator.read();
// alert(accumulator.value);

//收集成年数组信息
// let perArr=[ {name: '红孩儿' ,age: 8,},{name: '孙悟空' ,age: 28,},{name: '猪八戒', age: 30,},{name: '唐僧' ,age: 35,},{name: '二郎神', age: 41,}];

// function findAdult(arr) {
//     let result = [];
//     for (let i = 0; i < arr.length; i++) {
//         if ( arr[i].age >= 18) {
//             result.push(arr[i]);
//         }
//     }
//     return result;
// }
// console.log(findAdult(perArr));

//删除数组重复元素
// let arr = [1,2,3,2,2,1,1,3,4,2,5];
// function delRepeat(array) {
//     for (let i = 0; i < array.length; i++) {
//         for (let j = i +1; j < array.length; j++) {
//             if (array[i] == array[j]) {
//                 array.splice(j,1);
//                 j--; //需要考虑连续重复数字！
//         }
//     }
//     }
//     return array;
// }
// let result = delRepeat(arr);
// console.log(result);

//邮件的正则表达式
