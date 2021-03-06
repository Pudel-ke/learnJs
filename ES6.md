#### 变量声明

###### let

- for循环适合使用let命令
- let声明存在块级作用域，多次定义会报错
- 不存在变量提升：声明前使用，ReferenceError
- 暂时性死区：只要块级作用域内存在let指令，它所声明的变量绑定在这个区域。凡是在声明之前使用该变量，就会报错。
- 不允许重复声明。允许在块级作用域内声明函数。函数声明会提升到全局作用域或函数作用域头部。函数声明还会提升到所在块级作用域头部。

###### const

- const声明只读常量，一旦声明，常量不可更改值。

  > **声明后必须赋值，否则会报错**

```js
const PI = 3.14159;
const e = 2.7;
```

- const只在声明所在的块级作用域内有效
- 存在暂时性死区
- 不可重复声明

> `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。



声明变量，存在“创建、初始化、赋值”三个过程。

var 的过程，变量创建会被提升， 初始化会被提升。

```js
var x = 1;
//x被初始化为1
var y;
//y被初始化为undefined

```

###### 小结

- let 的过程，变量创建会被提升，初始化不会被提升，因此在let之前使用，会报错，即为暂时性死区(TDZ)

- const 的过程同let，初始化不会被提升。

- function 的过程，变量创建、初始化、赋值均被提升。



#### 变量的解构赋值

###### 数组的解构赋值

```js
let [a, b, c] = [1, 2, 3];
// a == 1, b == 2, c == 3;
```

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
```

赋值号左右两边需要“**模式匹配**”，否则变量的值为**undefined**

对于Set解构，也可使用解构赋值

```js
let [x, y, z] = new Set(["a", "b", "c"]);
```

> **只要某种数据具有iterator接口，就能采用数组的解构赋值**

解构赋值允许设置默认值

```js
let [flag = true] = [];
//flag = true
```

```js
let [x = "a", y] = ["b"]; // x == "b" , y == undefined;
```

**只有当一个数组成员严格等于`undefined`，默认值才会生效**

```js
let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null
```



```js
//默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```



###### 对象的解构赋值

- 数组的元素是按次序排列的，变量的取值由它的位置决定。

- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
// 例一
let { log, sin, cos } = Math; //math中内置有log sin cos方法

// 例二
const { log } = console;
log('hello') // hello
```

对象的解构赋值也可以使用默认值

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于`undefined`。

```javascript
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，属性`x`等于`null`，因为`null`与`undefined`不严格相等，所以是个有效的赋值，导致默认值`3`不会生效。

###### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

###### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

##### 用途

变量的解构赋值用途很多。

**（1）交换变量的值**

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

**（2）从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```javascript
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

**（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

**（4）提取 JSON 数据**

解构赋值对提取 JSON 对象中的数据，尤其有用。

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

上面代码可以快速提取 JSON 数据的值。

**（5）函数参数的默认值**

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

**（6）遍历 Map 结构**

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

**（7）输入模块的指定方法**

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

#### 字符串扩展

##### 字符的Unicode表示法

ES6 加强了对 Unicode 的支持，允许采用`\uxxxx`形式表示一个字符，其中`xxxx`表示字符的 Unicode 码点。

```javascript
"\u0061"
// "a"
```

但是，这种表示法只限于码点在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

```javascript
"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"
```

上面代码表示，如果直接在`\u`后面跟上超过`0xFFFF`的数值（比如`\u20BB7`），JavaScript 会理解成`\u20BB+7`。由于`\u20BB`是一个不可打印字符，所以只会显示一个空格，后面跟着一个`7`。

ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

```javascript
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。

有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。

```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

##### 字符串遍历器接口

ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被`for...of`循环遍历。

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是可以识别大于`0xFFFF`的码点，传统的`for`循环无法识别这样的码点。

```javascript
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

上面代码中，字符串`text`只有一个字符，但是`for`循环会认为它包含两个字符（都不可打印），而`for...of`循环会正确识别出这一个字符

##### 模板字符串

传统的 JavaScript 语言，输出模板通常是这样写的（下面使用了 jQuery 的方法）。

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```javascript
let greeting = `\`Yo\` World!`;
```

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```javascript
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
```

上面代码中，所有模板字符串的空格和换行，都是被保留的，比如`<ul>`标签前面会有一个换行。如果你不想要这个换行，可以使用`trim`方法消除它。

```javascript
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```

模板字符串中嵌入变量，需要将变量名写在`${}`之中。

```javascript
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

```javascript
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"
```

模板字符串之中还能调用函数。

```javascript
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的`toString`方法。

如果模板字符串中的变量没有声明，将报错。

```javascript
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```

由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。

```javascript
`Hello ${'World'}`
// "Hello World"
```

模板字符串甚至还能嵌套。

```javascript
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。

```javascript
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```javascript
let func = (name) => `Hello ${name}!`;
func('Jack') // "Hello Jack!"
```

上面代码中，模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。



#### 正则的扩展

创建正则表达式，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。

```javascript
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
```

ES6 改变了这种行为。如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```javascript
new RegExp(/abc/ig, 'i').flags
// "i"
```

上面代码中，原有正则对象的修饰符是`ig`，它会被第二个参数`i`覆盖。



###### 字符串的正则方法

ES6 出现之前，字符串对象共有 4 个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。

ES6 将这 4 个方法，在语言内部全部调用`RegExp`的实例方法，从而做到所有与正则相关的方法，全都定义在`RegExp`对象上。

- `String.prototype.match` 调用 `RegExp.prototype[Symbol.match]`
- `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
- `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
- `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`

###### 后行断言

“先行断言”指的是，`x`只有在`y`前面才匹配，必须写成`/x(?=y)/`。比如，只匹配百分号之前的数字，要写成`/\d+(?=%)/`。“先行否定断言”指的是，`x`只有不在`y`前面才匹配，必须写成`/x(?!y)/`。比如，只匹配不在百分号之前的数字，要写成`/\d+(?!%)/`。

```javascript
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
```

###### 可迭代对象

内部具有[Symbol.iterator]方法的对象

```javascript
let range = {
  from: 0,
  to: 5,
};
//迭代器对象和与其进行迭代的对象是分开的
range[Symbol.iterator] = function() {
  //返回迭代器对象
  return {
    current: this.from,
    last: this.to,
  //迭代器需要获取下一个迭代对象，调用next方法
    next() {
      if (this.current <= this.last) {
        return {done: false,  value: this.current++,};
      }
      else {
        return {done: true,};
      }
    }
  }
}

for (num of range) {
  console.log(num);
}
```
```js
//合并写法
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

```

###### 可迭代和类数组
- iterable 是实现了Symbol.iterator方法的对象
- 可迭代就是可以用 for of方法运行
- Array-like 是由索引和length属性的**对象** 看起来像数组
```js
let arrayLike = {
  0: 'hello',
  1:  'world',
  length: 2,
};

let arr = Array.from(arrayLike).
alert(arr) //hello,world   数组的toString方法生效
```
###### Array.from
Array.from 可以接受一个可迭代对象或类数组的值，并从中获取一个数组。
```js
Array.from(obj, maFn, thisArg)
```
- 可选的第二个参数可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外，thisArg允许我们为该函数设置this
- 字符串可迭代
```js
let str = 'abcd'
let chars = Array.from(str);
alert(chars[0]); //a
alert(chars[1]); //b
alert(chars.length); //4
```

#### Map and Set
##### 映射
- Map是一个k-v的数据项的集合，Map允许任何类型的key，但对象不能
- new Map()   
- map.set(key, value);
- map.get(key); 不存在则返回undef
- map.has(key); true/false
- map.delete(key);
- map.clear()  清空map
- map.size    
map可以将对象作为key
```js
let john = {name: 'John'};
let visitCountMap = new Map();
visitCountMap.set(john, 123);
alert(visitCountMap.get(john)) //123
```
对于普通Object 如果将键设置为key，则对象会被调用toString方法
```js
let john = {name: 'john'};
let visitCountObj = {};
visitCountObj[john] = 123;
//是写成了
alert(visitCountObj['[object Object]']); //123
```
**NaN**也能被用作键
Map可以链式调用,每次调用会返回map本身
```js
map.set('1', 'str')
  .set(1, 'num1')
  .set(true, 'bool1');
```
- map.keys()  遍历并返回所有的键 iterable对象
- map.values()  遍历并返回所有的值 的iterable对象
- map.entries  遍历并返回所有的实体 [key, value] 对象

###### Object.entries :从对象创建Map
```js
let obj = {
  name: 'john',
  age: 30,
};
let map = new Map(Object.entries(obj)); //Oebject.entries 返回对象的键值对数组 [['name', 'john'], ['age', 30]]
```
###### Object.fromEntries: 从Map创建对象
```js
let prices = Object.fromEntries([
  ['banana', 1],
  ['apple', 2],
  ['meat', 3],
]);
//prices = { banana: 1, orange: 2,  meat: 4,};
```
```js
//Map中的键值对可以作为fromEntries()参数，其本身也可以
let map = new Map();
map.set('banana', 1).
  .set('orange', 2)
  .set('meat', 4);

let obj = Object.fromEntries(map);
//obj = {banana: 1, orange: 2,  meat: 4,}
```

##### 集合 Set
> 是值的集合，没有键，每个值只能出现一次
- new Set(iterable) 创建一个set，如果提供了一个iterable对象，（通常是数组），会从数组中复制到set，可以去重
- set.add(value)   添加一个值，返回set本身
- set.delete(value) 删除值，存在则返回true，否则false
- set.has(value)  
- set.clear()   
- set.size   

###### Set迭代
可以用for of  或forEach来遍历
- set.keys() —— 遍历并返回所有的值（returns an iterable object for values），
- set.values() —— 与 set.keys() 作用相同，这是为了兼容 Map，
- set.entries() —— 遍历并返回所有的实体（returns an iterable object for entries）[value, value]，它的存在也是为了兼容 Map。


##### WeakMap and WeakSet (弱映射和弱集合)
- 通常，当对象、数组这类数据结构在内存中存在时，他们的子元素、如对象属性、数组的元素都是可访问的。即使没有其他对该对象的引用，它也不会被垃圾回收机制回收。
- 同理，我们使用对象作为Map的key，当map存在时，对象也存在，不会被回收。如：
```js
let john = {name: 'John'};

let map = new Map();
map.set(john, '...');

john = null; //此时john仍在内存中，可以用get访问
```

###### WeakMap 
- 只能使用对象作为key，不能为原始值
```js
let john = {name: 'john'};

let weakMap = new WeakMap();
weakMap.set(john, '...');
john = null; //覆盖引用
//john被从内存中删除了
```
##### JSON 方法
javascript Object Notation
**JSON是表示值和对象的通用格式。使用JSON可以容易跟服务器端进行数据交换**
1. JSON.stringify
- JSON.stringify(obj) 将对象转换为JSON
2. JSON.parse
- JSON.parse(json) 将JSON转换为对象

**JSON编码的对象与对象字面量的区别**
- 字符串使用双引号，JSON中没有单引号或者反引号
- 对象属性名称也是双引号，强制性）
JSON 支持以下数据类型：

Objects { ... }
Arrays [ ... ]
Primitives：
strings，
numbers，
boolean values true/false，
null。
```js
// 数字在 JSON 还是数字
alert( JSON.stringify(1) ) // 1

// 字符串在 JSON 中还是字符串，只是被双引号扩起来
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```
**JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。即：函数属性（方法）。Symbol 类型的属性。存储 undefined 的属性.**

###### JSON.parse
```js
let value = JSON.parse(str,[reviver]);
```
- str 要解析的字符串
- reviver 可选函数function(key, value),该函数将为每个(key,value)对调用，并可以对值进行转化
```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // 现在正常运行了！
```

#### 递归和堆栈

- 递归通常比迭代解更短
- 最大的嵌套调用次数（包括首次）被称为递归深度。
- 最大递归深度受JavaScript引擎限制。

##### 执行上下文(context)和堆栈

- 有关正在运行的函数的执行过程的相关信息被存储在其执行上下文中。

- 执行上下文是一个内部数据结构，它包含有关函数执行时的详细细节：

  - 当前控制流所在的位置
  - 当前的变量
  - this
  - 其他细节

- 当一个函数进行嵌套调用时，会发生：

  - 当前函数被暂停
  - 与它关联的执行上下文被 **执行上下文堆栈**保存
  - 执行嵌套调用
  - 嵌套调用结束后，从堆栈中恢复之前的执行上下文，并从停止的位置恢复外部函数。

  **任何递归都可以用循环来重写，通常循环变体更有效**

  > ……但有时重写很难，尤其是函数根据条件使用不同的子调用，然后合并它们的结果，或者分支比较复杂时。而且有些优化可能没有必要，完全不值得。
  >
  > 递归可以使代码更短，更易于理解和维护。并不是每个地方都需要优化，大多数时候我们需要一个好代码，这就是为什么要使用它。

```js
let company = { // 是同一个对象，简洁起见被压缩了
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  };
    function sumSalaries(department) {
        if (department instanceof Array) {
            return department.reduce((prev, current) => prev + current.salary, 0);
        }
        else {
            let sum = 0;
            for (let subdep of department) {
                sum += sumSalaries(subdep);
            }
        }
        return sum;
    }


```

##### 尾调用优化

1. 尾调用概念：尾调用指的是函数作为另外一个函数的最后一条语句被调用。
   示例代码：

   ```js
   function demo(){
      return demoAnother();//尾调用
    }
   ```

   

2. ES5引擎环境中，尾调用底层实现机制：创建一个新的栈帧，将其推入调用栈来表示函数调用。也就是说，在循环调用中，每一个未用完的栈帧都会保存在内存中，当调用栈变得过大时会造成程序问题。

3. ES6引擎环境中，尾调用底层实现机制：ES6缩减了严格模式下尾调用栈的大小，当满足以下条件时，尾调用不再创建新的栈帧，而是清除并重用当前栈帧：
   a、尾调用不访问当前栈帧的变量（就是说函数不是一个闭包）
   b、在函数内部，尾调用是最后一条语句
   c、尾调用的结果作为函数值返回

   #### Rest参数

   ```js
   function sumAll(...args) { // 数组名为 args 将收集到的参数储存到数组args中，
     let sum = 0;
   
     for (let arg of args) sum += arg;
   
     return sum;
   }
   
   alert( sumAll(1) ); // 1
   alert( sumAll(1, 2) ); // 3
   alert( sumAll(1, 2, 3) ); // 6
   ```
   
   

   #### Spread语法

**当在函数调用中使用 `...arr` 时，它会把可迭代对象 `arr` “展开”到参数列表中。**

**Spread语法内部使用了迭代器来收集元素，与for...of的方式相同**

- Array.from适用于类数组也适用于可迭代对象
- [...obj] 只适用于可迭代对象

##### 浅拷贝

```js
let arr = [1,2,3];
let arrCopy = [...arr];

alert(arr === arrCopy);//false  他们引用不同
```

```js
let obj = {a: 1, b: 2, c: 3,};
let objCopy = {...obj};
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); //true   内容相同
```

函数属性（方法）、Symbol 类型的属性、存储 undefined 的属性会被忽略。



### 变量作用域 闭包

#### 变量

> 在JavaScript中，每个运行的函数，代码块以及脚本都有一个被称为**词法环境**(lexical environment of the call)的内部（隐藏）关联对象。

词法环境对象的组成：

1. **环境记录(environment record)**——一个存储所有局部变量作为其属性（包括一些其他信息，例如this的值）的对象
2. 对**外部词法环境**的引用，与外部代码相关联。

一个变量只是**环境记录**这个特殊内部对象的一个属性。

> 1. 当脚本开始运行，词法环境预先填充了所有声明的变量。
>    - 最初，它们处于“未初始化（Uninitialized）”状态。这是一种特殊的内部状态，这意味着引擎知道变量，但是在用 `let` 声明前，不能引用它。几乎就像变量不存在一样。
> 2. 然后 `let phrase` 定义出现了。它尚未被赋值，因此它的值为 `undefined`。从这一刻起，我们就可以使用变量了。
> 3. `phrase` 被赋予了一个值。
> 4. `phrase` 的值被修改。

#### 函数声明

**函数声明的初始化会立即被完成。**``

当创建了一个词法环境（Lexical Environment）时，函数声明会立即变为即用型函数（不像 `let` 那样直到声明处才可用）。

#### 返回函数

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

- 在每次 `makeCounter()` 调用的开始，都会创建一个新的词法环境对象，以存储该 `makeCounter` 运行时的变量。
- 不同的是，在执行 `makeCounter()` 的过程中创建了一个仅占一行的嵌套函数：`return count++`。我们尚未运行它，仅创建了它。

![image-20211221162923926](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211221162923926.png)

- 所有的函数在“诞生”时都会记住创建它们的词法环境。从技术上讲，这里没有什么魔法：所有函数都有名为 **`[[Environment]]` 的隐藏属性**，该属性保存了**对创建该函数的词法环境的引用**。
- 因此，`counter.[[Environment]]` 有对 `{count: 0}` 词法环境的引用。这就是函数记住它创建于何处的方式，与函数被在哪儿调用无关。`[[Environment]]` 引用在函数创建时被设置并永久保存。
- 稍后，当调用 `counter()` 时，会为该调用创建一个新的词法环境，并且其外部词法环境引用获取于 `counter.[[Environment]]`：
- 现在，当 `counter()` 中的代码查找 `count` 变量时，它首先搜索自己的词法环境（为空，因为那里没有局部变量），然后是外部 `makeCounter()` 的词法环境，并且在哪里找到就在哪里修改。
- **在变量所在的词法环境中更新变量。**

![image-20211221163312454](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20211221163312454.png)



#### 闭包

闭包 是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使在其外部函数被返回（寿命终结）了之后。



#### 垃圾收集

与 JavaScript 中的任何其他对象一样，词法环境仅在可达时才会被保留在内存中。

但是，如果有一个嵌套的函数在函数结束后仍可达，则它将具有引用词法环境的 `[[Environment]]` 属性。



> 正如我们所看到的，理论上当函数可达时，它外部的所有变量也都将存在。
>
> 但在实际中，JavaScript 引擎会试图优化它。它们会分析变量的使用情况，如果从代码中可以明显看出有未使用的外部变量，那么就会将其删除。
>
> **在 V8（Chrome，Edge，Opera）中的一个重要的副作用是，此类变量在调试中将不可用。**



#### 全局对象

- 浏览器中的全局对象是 window

- Node.js中 全局对象是 global

- 其他环境可能是别的名字

- globalThis 最近被作为全局对象的标准名称加入到了JavaScript中。

- 如果脚本可能会用来在其他环境中运行，则最好使用 `gloablThis`

- 如果一个值非常重要，以至于你想使它在全局范围内可用，那么可以直接将其作为属性写入

  ```js
  window.currentUser = {
      name: "John",
  };
  ```

- 一般不建议使用全局变量。仅当值对于我们的项目而言确实是全局的时，才应将其存储在全局对象中。并保持其数量最少。



#### new Funtion 

```js
let func = new Function([arg1, arg2,...argn], functionBody);
```

这种创建函数的方法，不同在于通过运行时传递过来的字符串创建的。

- 在复杂的Web应用程序中，我们需要从服务器获取代码或者动态地从模板编译函数时才会使用

##### 闭包

通常，闭包指函数通过一个特殊属性[[Environment]]来记录函数自身创建时的环境的函数。它具体指向了函数创建时的词法环境。

- 通过`new Function`创建的函数，该函数指向全局环境。
- 此类函数无法访问外部变量，只能访问全局变量。

> 如果这个函数能够访问外部（outer）变量会怎么样？
>
> 问题在于，在将 JavaScript 发布到生产环境之前，需要使用 **压缩程序（minifier）** 对其进行压缩 —— 一个特殊的程序，通过删除多余的注释和空格等压缩代码 —— 更重要的是，将局部变量命名为较短的变量。
>
> 例如，如果一个函数有 `let userName`，压缩程序会把它替换为 `let a`（如果 a 已被占用了，那就使用其他字符），剩余的局部变量也会被进行类似的替换。一般来说这样的替换是安全的，毕竟这些变量是函数内的局部变量，函数外的任何东西都无法访问它。在函数内部，压缩程序会替换所有使用了使用了这些变量的代码。压缩程序很聪明，它会分析代码的结构，而不是呆板地查找然后替换，因此它不会“破坏”你的程序。
>
> 但是在这种情况下，如果使 `new Function` 可以访问自身函数以外的变量，它也很有可能无法找到重命名的 `userName`，这是因为新函数的创建发生在代码压缩以后，变量名已经被替换了。
>
> **即使我们可以在 `new Function` 中访问外部词法环境，我们也会受挫于压缩程序。**
>
> 此外，这样的代码在架构上很差并且容易出错。



#### 调度 setTimeout 和 setInterval

##### setTimeout

```js
function sayHi(phrase, who) {
alert( phrase + ',' + who)
};
setTimeout(sayHi, 1000, 'hello', 'John');

setTimeout(() => alert('hello'). 1000);
```

- **传入函数后不要执行**

- **clearTimeout**取消调度

##### setInterval

```js
let timerId = setInterval(func, interval, arg1, arg2, ...argN);
```

##### 嵌套的setTimeout

```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...发送请求...

  if (request failed due to server overload) {
    // 下一次执行的间隔是当前的 2 倍
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```

如果我们调度的函数占用大量的CPU，那么我们可以测量执行所需要花费的时间，并安排下次调用应该提前还是推迟。

> **使用 `setInterval` 时，`func` 函数的实际调用间隔要比代码中设定的时间间隔要短！**
>
> 这也是正常的，因为 `func` 的执行所花费的时间“消耗”了一部分间隔时间。
>
> 也可能出现这种情况，就是 `func` 的执行所花费的时间比我们预期的时间更长，并且超出了 100 毫秒。
>
> 在这种情况下，JavaScript 引擎会等待 `func` 执行完成，然后检查调度程序，如果时间到了，则 **立即** 再次执行它。
>
> 极端情况下，如果函数每次执行时间都超过 `delay` 设置的时间，那么每次调用之间将完全没有停顿。

**嵌套的setTimeout**能确保延时的固定

##### 垃圾回收

当一个函数传入调度时，将为其创建一个内部引用，并保存在调度程序中。即使这个函数没有其他引用，也能防止垃圾回收。

当函数引用了外部变量时，只要这个函数存在，外部变量也随之存在。外部变量可能占更多内存。因此不需要调度时最好取消。(clearTimeout\clearInterval)

> 无论是哪种调度，设置的时间间隔只决定了要执行的代码什么时候被添加到任务队列中，而非什么时候能执行。

##### 零延时的setTimeout

- setTimeout(func) \ setTimeout(func, 0);
- 只能让func尽快执行。但是只有在当前执行的脚本执行完毕后，调度程序才会调用。

>在浏览器环境下，嵌套定时器的运行频率是受限制的。根据 [HTML5 标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) 所讲：“经过 5 重嵌套定时器之后，时间间隔被强制设定为至少 4 毫秒”。

**所有的调度方法搜不能保证确切的延时。**

例如，浏览器内的计时器可能由于许多原因而变慢：

- CPU 过载。
- 浏览器页签处于后台模式。
- 笔记本电脑用的是电池供电（译注：使用电池供电会以降低性能为代价提升续航）。

所有这些因素，可能会将定时器的最小计时器分辨率（最小延迟）增加到 300ms 甚至 1000ms，具体以浏览器及其设置为准。



#### 装饰器模式和转发

##### 透明缓存

```js
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // 如果缓存中有对应的结果
      return cache.get(x); // 从缓存中读取结果
    }

    let result = func(x);  // 否则就调用 func

    cache.set(x, result);  // 然后将结果缓存（记住）下来
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) 被缓存下来了
alert( "Again: " + slow(1) ); // 一样的

alert( slow(2) ); // slow(2) 被缓存下来了
alert( "Again: " + slow(2) ); // 和前面一行结果相同
```

以上代码中，cachingDecorator是一个装饰器：一个特殊的函数，接收另一个函数并改变它的行为。

弊端：上述缓存装饰器不适用于对象方法

原因：`let func = worker.slow; func(2);`

不是通过.fun（即方法调用的函数，其this为undefined。

##### func.call设定上下文 context

`func.call(context, ...args)`

##### func.apply 设定上下文

`func.apply(context, args);`

args是数组

##### 借用方法

```js
//function hash(args) {
  //return args.join();
//} //Error:arguments.join is not a function
//arguments对象是一个类数组，里面没有定义join方法。
..//借用数组的join方法
  function hash() {
  alert( [].join.call(arguments) ); // 1,2
}

hash(1, 2);
```

##### 装饰器和函数属性

>通常，用装饰的函数替换一个函数或一个方法是安全的，除了一件小东西。如果原始函数有属性，例如 `func.calledCount` 或其他，则装饰后的函数将不再提供这些属性。因为这是装饰器。因此，如果有人使用它们，那么就需要小心。
>
>例如，在上面的示例中，如果 `slow` 函数具有任何属性，而 `cachingDecorator(slow)` 则是一个没有这些属性的包装器。
>
>一些包装器可能会提供自己的属性。例如，装饰器会计算一个函数被调用了多少次以及花费了多少时间，并通过包装器属性公开（expose）这些信息。
>
>存在一种创建装饰器的方法，该装饰器可保留对函数属性的访问权限，但这需要使用特殊的 `Proxy` 对象来包装函数。我们将在后面的 Proxy 和 Reflect 中学习它。





##### 延时装饰器

```js
function f(x) {
    alert(x);
};
function delay(f, ms) {
    return function() {
        setTimeout(() => f.apply(this,arguments), ms);
    };
}
```

**箭头函数没有自己的this和arguments参数。！**



##### 防抖装饰器

debounce(f, ms)

> 抖动结束的时间超过指定时间间隔才执行一次任务

```js
function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);//箭头函数没有自己的this， arguments，因此执行时的this和arguments均是函数调用时的上下文。
    };
}
```

调用 `debounce` 会返回一个包装器。当它被调用时，它会安排一个在给定的 `ms` 之后对原始函数的调用，并取消之前的此类超时。



节流装饰器

throttle(f, ms)

> 指定时间间隔内只执行一次任务，并不断更新上下文和参数，并保存。
>
> 即以超过指定的频率调用函数，没有意义。

```js
function throttle(fn, interval = 300) {
	let canRun = true;
    return function() {
        if (!canRun) return;
        canRun = false;//设置之后 函数执行（冷却）期间 不会再调用
        setTimeout(() => {
            fn.apply(this, arguments); //参数为最初调用时的参数，以及上下文。
            canRun = true; //指定时间间隔后，fn执行完一次了，冷却结束，表示可以继续执行下次调用。
        }， interval);
    };
}
//这种写法会出现，第一次触发时，需要等待ms，并且冷却时间内更新的最后一次调用，不会执行。
```



**推荐下面这种写法**

```js
function throttle(fn, ms) {
    let canRun = true,
        savedArgs,
        savedThis;

    function wrapper() {
        if (!canRun) {
            savedArgs = arguments;
            savedThis = this;  //保存最新的参数以及上下文
            return;
        }
        fn.apply(this, arguments); //

        canRun = false;   //第一次执行fn时，canRun设置成false，不允许继续执行。期间调用fn 只会更新上下文和arguments

        setTimeout(function() {
            canRun = true;   //冷却时间到达后，将canRun设置为TRUE，恢复到初始待执行状态。
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);  //如果期间有被忽略的调用，则以更新的调用上下文及参数来处理最终的调用，调用wrapper，并重新设置计时器。如果没有被忽略的调用，则恢复到待启动状态。一旦有调用则启动。
                savedArgs = savedThis = null;     //传递完后 清空保存上下文，恢复到未调用状态。如果不清除，会出现：如果下次调用只触发一次，仍旧会以上回最后触发的上下文，循环多次执行。
            }
        }, ms);

    }
    return wrapper;
}
```



#### 函数绑定

- 一旦this方法被传递到与对象分开的某个地方——this就丢失
- 浏览器中的setTimeout方法为函数调用设定了this = window
- Node.js 则会变为计时器对象

实例：

```js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

解决1：**包装器**

弊端：如果setTimeout触发之前，user更改，则会调用错误的对象

```js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
```

解决2：**bind**

```js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

// 可以在没有对象（译注：与对象分离）的情况下运行它
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// 即使 user 的值在不到 1 秒内发生了改变
// sayHi 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

> 如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定：
>
> ```javascript
> for (let key in user) {
>   if (typeof user[key] == 'function') {
>     user[key] = user[key].bind(user);
>   }
> }
> ```
>
> JavaScript 库还提供了方便批量绑定的函数，例如 lodash 中的 [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll)。



#### 偏函数

bind 不仅可以绑定this，还可以绑定参数。

```js
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

#### 在没有上下文情况下的partial

```js
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// 用法：
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// 添加一个带有绑定时间的 partial 方法
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// 类似于这样的一些内容：
// [10:00] John: Hello!
```

