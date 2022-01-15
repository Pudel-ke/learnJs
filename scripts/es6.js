// let company = { // 是同一个对象，简洁起见被压缩了
//     sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 1600 }],
//     development: {
//         sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
//         internals: [{ name: 'Jack', salary: 1300 }]
//     }
// };
// function sumSalaries(department) {
//     if (department instanceof Array) {
//         return department.reduce((prev, current) => prev + current.salary, 0);
//     }
//     else {
//         let sum = 0;
//         for (let subdep of Object.values(department)) {
//             sum += sumSalaries(subdep);
//         }
//         return sum;
//     }
// }
// console.log(sumSalaries(company));
// function inBetween(from, to) {
//     return function (item) {
//         return item <= to && item >= from;
//     }
// }
// function inArray(targetArr) {
//     return function (item) {
//         return targetArr.includes(item);
//     }
// }
// let arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
// console.log(arr.filter(inArray([1, 2, 10])));
// function throttle(fn, interval) {
//     let canRun = true;
//     let savedArgs, savedThis;

//     function wrapper() {
//         if (!canRun) {
//             savedArgs = arguments;
//             savedThis = this;
//             return;
//         }
//         canRun = false;
//         fn.apply(this, arguments);
//         setTimeout(() => {
//             canRun = true;
//             if (savedArgs) {
//                 wrapper.apply(savedThis, savedArgs);
//                 savedArgs = savedThis = null;
//             }
//         }, interval);


//     }
//     return wrapper;
// }



// function g(a) {
//     console.log(a + 'time is :' + new Date());
// };
// let f = throttle(g, 2000);
// f(12);
// f(20);

// function partial(func, ...argsBound) {
//     return function (...args) { // (*)
//         return func.call(this, ...argsBound, ...args);
//     }
// }

// // 用法：
// let user = {
//     firstName: "John",
//     say(time, phrase) {
//         console.log(`[${time}] ${this.firstName}: ${phrase}!`);
//     }
// };

// // 添加一个带有绑定时间的 partial 方法
// user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

// user.sayNow("Hello");
//   // 类似于这样的一些内容：
//   // [10:00] John: Hello!
// class Button {
//     constructor(value) {
//         this.value = value;
//     }

//     click = () => {
//         console.log(this.value);
//     }
// }

// let button = new Button("hello");

// setTimeout(button.click, 1000);

class A {
    constructor() {
        this.show();
    }
    show() {
        console.log('parents show')
    }
}
class B extends A {
    constructor() {
        super();
    }
    show() {
        console.log('实例');
    }
    static show() {
        console.log('子类');
    }
}
new B(); 　