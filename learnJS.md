##### 变量 

使用var关键字声明变量  5种*基本*数据类型：Number String Boolean Null  Undefined    

var a = 789;

var a = "'我好像食麦当当'"

var helloWorld = 778;

###### 检查变量类型

console.log(typeof a);

typeof NaN  , typeof Infinity 返回值都是Number

typeof null 返回object

Null的值只有null     表示空对象

Undefined的值只有undefined  表示未定义

###### 强制类型转换

将其他数据类型转换为 String Number  Boolean

var a = 123;

1. var b = a.toString();  toString**不会改变原变量，存在返回值**

   console.log(typeof b);// string

2. toString(base)   base 表示返回值的进制数

3. 直接对数字使用时需要 两个'.' 123456..toString(36);



**null和undefined没有toString方法**

2. 调用String()函数，并将被转换的数据作为参数传递给函数

   a = String(a);

可以把null和undefined转化为string，不会调用toString()方法，将null直接转换成“null”

> 没有toNumber  toBoolean  可以使用Number()   Boolean()

// null -> 0

// undefined -> NaN

针对字符串

a = "123px";

a = parseInt(a,10);// 123  取出有效十进制整数

b = "123.456px"

b = parseFloat(b); // 123.456  取出有效小数



舍入

Math.floor 向下舍入

Math.ceil  向上舍入

Math.round 向最近整数舍入

Math.trunc  舍去小数点后内容

舍入到小数点后两位

```
let num = 1.114514
alert( Math.floor(num * 100) / 100 );
alert( Math.trunc(num * 100) / 100 ); //均返回数字

let num = 21.32;
alert( num.toFixed(1) );//舍入到小数点第1位并 返回更接近的值 //"21.3"
//返回结果是 字符串！！
```

```
let num = 12.34;
alert( +num.toFxied(5) );//12.34000
```



---



***Boolean()***

**数字**：除了0和NaN返回都是true

**字符串：**除了空串其余都是true

**null** 和**undefined** 都会转换为false

**对象**：也会转换为true

```js
a = "true";
a = Boolean(a);
console.log(a); // true
console.log(typeof a); //boolean
```

##### 运算符（操作符）

###### 二元运算符

对非number的变量进行+运算时会转换为number，

除了

- 包含NaN的 结果都是NaN

```
result = 1 + NaN 
//NaN
```



- 对字符串 +  会拼接字符串 

  ```
  result = "hello" + "world";
  //helloworld
  ```

任何值和字符串+号，都会先转换为字符串，然后拼接

```
123 + "1" //1231
```

> 隐式类型转换
>
> var c = 123;
>
> c = c + "";

var c = 123;

console.log("c = "+c);//  c=123



```
100 - "1" //99
```

###### 一元运算符  

 '-'  对number取反

'+' 对正数无影响

对非number数会先转换为number

可以对其他数 加一个 + 正号 转换为number

自增 ++   变量在后面的 则表达式为增加之后  在前则表达式为增加之前 ，但变量发生了改变

>  a=1;
>
> a++; // a++ = 1  a = 2
>
> ++a;// ++a = 3   a = 3

自减同理

###### 逻辑运算符

JS允许对非bool值进行运算

NaN && 1 // NaN

1 && 4  //4

1 && 'hello' // 'hello'

NaN || 1 //1

NaN || 'hello' // 'hello'

###### 关系运算符

> '>' '<'  '<='  '>='

比较字符编码时，只比第一位。如果两位一样 则比下一位

比较两个数字型的字符串时，一定要转型！ 加+号

###### 相等运算符

**'=='**

会将两边转换为数字比较 返回值为boolean

true == 1 // true

true == 'hello' //  false  因为hello转换为NaN

null == undefined  // true   后者衍生自前者

NaN和任何值包括本身，结果都是false

isNaN() 函数 检查该值是否为NaN  返回值为true / false

!= 用于判断两个值是否相等

**'==='**  

全等 不发生转换 判断是否相等

**!==** 不全等

###### 条件运算符

条件?语句1:语句2

true?:alert('语句1'):alert('语句2')

true执行前者  并返回执行结果

> 判断最大值
>
> var max = a > b ? a : b 
>
> 三者比较
>
> var max = a > b ?  (a > c ? a : c) : (b > c ? b : c) ;

**条件为非布尔值时会先转换为boolean值**

