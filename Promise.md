# Promise

### 期约基础

```js
let p = new Promise(() => {});
setTimeout(console.log, 0, p); //Promise <pending>
```

期约是一个有状态的对象，可能处于三种状态：

- pending 待定
- fulfilled 也称resolved 解决
- rejected 拒绝

期约抽象地表示一个异步操作。“待定”表示尚未开始，“解决”表示成功完成，会有一个私有的内部值value。“拒绝”表示没有成功完成，会有一个私有的拒绝理由reason。

**期约落定为哪种状态之后就是不可变的**

期约到达某个落定状态时执行的异步代码始终会收到这个值或理由。

#### 通过执行函数控制期约状态

```js
let p1 = new Promise((resolve, reject) => {
    resolve();
});
setTimeout(console.log, 0, p1); // Promise <resolved> : undefined
```

一旦状态落定就不可撤销。

为避免卡在待定状态，可以添加一个定时退出的功能

```js
let p = new Promise((resolve, reject) => {
    setTimeout(reject, 10000, "time's out");
    // 执行函数逻辑
});
```

#### Promise.resolve()

期约初始状态可用Promise.resolve()方法设置，解决的期约值对应传给方法的参数。

```js
console.log(Promise.resolve(value));
// Promise <resolved>:value
```

此方法可以把任何值转换为期约。

- 如果传入参数本身是期约，那么就相当于空包装

  ```js
  let p = Promise.resolve(7);
  p == Promise.resolve(p); //true
  ```

- 会保留传入期约的状态

  ```js
  let p = new Promise((resolve, reject) => {reject("err")});
  Promise.resolve(p); // Promise <rejected>: err
  ```

- 可以包装任何非期约的值，包括错误对象，并将其转换为解决的期约

```js
let p = Promise.resolve(new Error("foo"));
console.log(p); //Promise <resolved> : Error: foo
```

#### Promise.reject()

会实例化一个拒绝的期约并**抛出**一个异步错误（此错误不能通过try/catch捕获，只能通过拒绝处理程序catch()\then(null,()=>{})）捕获）

- 给它传入期约对象，传入的期约会变成拒绝的理由

```js
console.log(Promise.reject(Promise.resolve(1)));
```

#### 同步|异步执行的二元性

- 期约抛出的错误，只能通过异步模式捕获，即通过拒绝处理程序。

- > 期约是同步对象，也是异步执行模式的媒介。

- 代码一旦异步执行，唯一与之交互的方式是使用**异步结构**



### 期约的实例方法

#### 实现thenable接口

```js
class myThenable {
    then() {}
}
```

在ES暴露的异步结构中，任何对象都有一个then（）方法。

#### Promise.prototype.then()

为期约实例添加处理程序的主要方法。可接受两个参数。onResolved处理程序和onRejected处理程序。会在期约分别进入“解决”和“拒绝”状态执行。非函数处理程序会被静默忽略。

- Promise.then()方法返回一个新的期约实例

​    **新的期约实例基于Promise.resolve()构建。如果没有提供处理程序，则会包装上一个期约解决之后的值。如果没有显示的返回语句，则会包装默认的返回值undefined**

- 抛出异常会返回拒绝的期约

```js
let p1 = Promise.resolve("foo");
let p10 = p1.then(()=>{throw "baz"});
// uncaught (in promise) baz
console.log(p10); // Promise <rejected> : baz
```

- 返回错误值不会触发拒绝行为，而是用Promise.resolve()包装之。

#### Promise.prototype.catch()

语法糖，给期约添加拒绝处理程序。catch(foo)等价于 then(null, foo);

同样返回新的期约实例，与then一样

#### Promise.prototype.finally()

此处理程序在期约转换为拒绝或解决状态时都会执行。**但此方法不知道期约的状态时解决还是拒绝。**

- 如果处理程序返回一个待定期约或抛出错误（显示抛出或返回拒绝期约），则会返回相应的期约。

- 其他情况下都将表现为父期约的传递。

#### 非重入期约方法

当期约落入指定状态时，与该状态相关的处理程序仅仅会被**排期**，而非立即执行。跟在添加在这个处理程序代码之后的同步代码会先执行。**即使期约一开始就是与附加处理程序相关联的状态，执行顺序也不变**

**在一个解决期约上调用then()会把onResolved处理程序推进消息队列。**

### 期约连锁与期约合成

#### 期约连锁

把期约逐个地串联起来。因为每个期约的实例方法都会返回新的期约对象。

```js
let p = new Promise((resolve, reject) => {
    console.log("first");
    resolve();
})
p.then(()=>console.log("second"))
.then(() => console.log("third"))
.then(() => console.log("fourth"));
//first
//second
//third
//fourth
```

真正执行异步任务，需要让每个执行器返回一个新的期约实例，这样让每个后续期约等待之前的期约，也就是**串行化异步任务**

```js
let p1 = new Promise((resolve, reject) => {
    console.log("p1 exec");
    setTimeout(resolve, 1000);
})
p1.then(() => {
    new Promise((resolve, reject) => {
        console.log("p2 exec");
        setTimeout(resolve, 1000);
    })
})
.then(() => {
    new Promise((resolve, reject) => {
        console.log("p3 exec");
        setTimeout(resolve, 1000);
    })
})
.then(() => {
    new Promise((resolve, reject) => {
        console.log("p4 exec");
        setTimeout(resolve, 1000);
    })
});
// p1 exec  (1s)
// p2 exec  (2s)
// p3 exec  (3s)
// p4 exec  (4s)
```

可以把生产期约的代码提取到工厂函数

```js
function delayedResolve(str, dalay) {
	return new Promise((resolve, reject) => {
		console.log(str);
		setTimeout(cresolve, dalay);
	})
}
delayedResolve("p1 exec", 1000)
.then(() => delayedResolve("p2 exec", 1000))
.then(() => delayedResolve("p3 exec", 1000))
.then(() => delayedResolve("p4 exec", 1000));
```

#### Promise.all()和Promise.race()

将多个期约合成为一个期约，合成期约的状态取决于内部期约的行为。

##### Promis.all() 

**类似一票否决**

- 所有子期约均解决，它才为解决。一旦出现拒绝，它也拒绝。
- 所有的期约都成功解决，那么合成期约的解决值就是包含期约解决值得数组。
- 如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。
- 合成期约会静默处理所有包含期约的静默操作。

```js
let p = Promise.all([
	Promise.reject(3),
	new Promise((resolve, reject) => {setTimeout(reject, 1000)});
])
p.catch((reason) => setTimeout(console.log, 0, reason)); //3
```

##### Promise.race()

**类似先发制人**

无论子期约是拒绝还是解决，只要第一个落定，该方法就会包装其解决值，并返回新期约。

```js
let p1 = Promiser.race([
    Promise.resolve(4),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
console.log(p1);// Promise <resolved> :4  超时的解决被忽略
```



### 期约扩展

#### 期约取消

#### 期约进度通知



# 异步函数 

### 异步函数 

**（async/await）**

#### async

使用关键字async声明异步函数，让函数具有异步特征，但总体上代仍是同步求值的。async/await 中真正起作用的是await。

- 异步函数始终返回期约对象

>  async异步函数执行与普通函数没区别。但如果异步函数使用了return 关键字返回值（没有return就返回undefined），这个值会被Promise.resolve()包装为期约对象。

- 异步函数返回值期待(实际并不要求)一个实现thenable接口的对象，但常规值也可以
  - 如果返回的是thenable接口对象，则此对象可以由提供给then()的处理程序“解包”
  - 如果不是，则返回值被当做已解决的期约
- 拒绝期约的错误不会被异步函数捕获

```js
async function foo() {
	console.log(1);
	Promise.reject(3);
}
foo.catch(console.log);
console.log(2);
//1
//2
//uncaught (in promise) :3 
```

#### await

异步函数主要针对不会马上完成的任务，需要一种暂停和恢复执行的能力。使用await关键字可以暂停异步函数代码的执行，等待期约解决。

```js
async function foo() {
	let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
	console.log(await p);
    //后续代码暂停执行
}
foo();
//3;
```

- await会暂停执行异步函数之后的代码，让出JavaScript运行时的执行线程。
- 可以单独使用，也可以在表达式中使用
- await 后 期待实现thenable接口的对象，若不是，则被当做已解决的期约。
- 等待 会抛出错误的 同步操作，会返回拒绝的期约：

```js
async function foo() {
	console.log(1);
	await (() => {throw 3;});
}
foo().catch(console.log);
console.log(2);
//1
// 2
//3
```

- 对拒绝的期约使用await，会释放错误值（将期约返回）。
- 异步函数的特质不会扩展到嵌套函数。

### 停止和恢复执行

JavaScript运行时碰到await关键字，会记录在哪里暂停执行。等到await右边的值可用了，JavaScript运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。

**即使await后跟着一个立即可用的值，函数的其余部分也会被异步求值**。

```js
async function foo() {
	console.log(2);
    await null;
    console.log(4);  //打印2后被暂停
}
console.log(1);
foo();
console.log(3);
//1
//2
//3
//4
```

**顺序调用异步函数，await的输出顺序相反**

```js
async function foo() {
	console.log(await Promise.resolve("foo"));
}

async function bar() {
	console.log(await "bar");
}

async function baz() {
	console.log("baz");
}
foo();
bar();
baz();
//baz
//bar
//foo
```

#### 异步函数策略

##### 实现sleep()

```js
async function sleep(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
	const t0 = Date.now();
	await sleep(1500);
	console.log(Date.now() - t0);
}
foo();
// 1507;
```

##### 利用平行执行

##### 串行执行期约

```js
async function addTwo(x) {return x+2};
async function addThree(x) {return x+3};
async function addFive(x) {return x+5};

async function addTen(x) {
    for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x);
    }
    return x;
}
addTen(9).then(console.log);
//19
```



# 小结

> 期约的主要功能是为异步代码提供了清晰的抽象。可以用期约表示异步执行的代码块，也可以用期约表示异步计算的值。在需要串行异步代码时，期约的价值最为突出。期约可以被**序列化、连锁使用、复合、扩展合重组。**
>
> 异步函数是将期约应用于JavaScript函数的结果。异步函数可以暂停执行，而不阻塞主线程。无论是编写基于期约的代码，还是组织串行或平行执行的异步代码，使用异步函数都非常得心应手。







