## 函数表达式

###### 函数声明提升

声明可以放在调用函数之后

###### 函数表达式

使用前必须赋值，跟表达式要求一样。

###### 匿名函数

```js
var funName = function() {}; //function 后面没有标识符,先创建匿名函数，后赋值
```

> 可创建函数赋值给变量，也可以作为返回值返回

```js
function createFunction(property) {
    return function(obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
    };
}
var compare = creatFuntion("age");
```

> 函数当成值来使用时，可以使用匿名函数

###### 递归

创建递归函数时，尽量使用arguments.callee（**指向执行函数的指针**）来递归调用自身

```
function test(){
	alert(arguments.callee);
} // test
```



## 闭包

**闭包指有权访问另一个函数作用域中变量的函数**

在一个函数内部创建另一个函数，即可创建闭包

```js
function createFunction(property) {
    return function(obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
    };
}
var compare = createFunction("age");
var result = compare({age: 13},{age:14});
```

匿名函数即为闭包，它可以访问包含函数createFunction中的变量.

当createFunction函数执行时，createFunction的活动对象为arguments——["age"]和"age",以及其外部的全局执行环境对象

  compare: undefined  | result : undefined

然后执行匿名函数，此时createFunction函数的活动对象不会销毁，因为匿名函数的作用域链仍然在引用这个活动对象，“age”

即createFunction的作用域链会销毁，但活动对象仍保留，直到匿名函数被销毁后。

**过度使用闭包可能导致内存占用过多！**



#### 闭包与变量

- 闭包只能取得包含函数中任何变量的最后一个值。

- **闭包保存的是整个变量对象，不是某个特殊的量。**

- 函数被调用会自动获取this(**默认是window**)和arguments(**默认是自己内部的**)。内部函数在搜索this时，只会搜索到其活动对象为止，不会搜索到其包含函数。

**解决方法**： 将外部作用域的**this对象**或者**arguments**保存在**闭包能访问的变量**中。



#### 模仿块级作用域

通过立即执行的匿名函数

```js
(function(){
//块级作用域
})();  //圆括号会立即调用函数
```

匿名函数中定义的任何变量，都会在执行结束之后被销毁！**因此临时需要一些变量，就可以使用私有作用域**

经常被用在函数外部，限制向全局作用域中添加过多的变量和函数。

#### 私有变量

###### 构造函数中定义特权方法

```js
function MyObject(){
	var privateVariable = 10; //私有变量
	var privateFunction = function(){  //私有函数，只能通过特权方法访问
		return false;
	};
	this.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
}
//可以隐藏那些不应该被直接修改的数据
//缺点：每次创建实例都会创建同样一组方法
```

###### 在私有作用域中定义私有变量或函数

**静态变量 所有的实例共享变量对象**

```js
(function(){
	var privateVariable = 10;
	var privateFunction = function(){
		return false;
	};
	MyObject = function(){}; //这里Myobject构造函数是全局变量 （在严格模式中会报错
	MyObject.prototype.publicMethod = function(){  //公共方法
	privateVariable++;
	return privateFunction();  //在原型里定义共有方法，可以避免重复创建
        						//闭包总是包含着对私有变量的引用，因此立即执行函数返回之后 私有变量不会被清除
	};
})(); // 
```

初始化未声明的变量，总是会创建一个全局变量。（非严格模式）

此方法会因为使用原型增进代码复用，**每个实例都没有自己的私有变量**。



###### 模块模式

通过为**单例**添加私有变量和特权方法使其增强

```js
var singleon = function(){
    var privateVariable = 10;
    function privateFun(){
        return false;
    }
    return {
        publicProperty: true,
        publicMethod: function(){
            privateVariable++;
            return privateFun();
        }  //直接返回一个对象。只用通过实例中的特权方法才能访问私有对象
    };
}();
```

使用：对单例进行某些初始化，同时有需要维护其私有变量

```js
var application = function(){
    //定义私有变量
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    return {
        getComponent: function(){
            return Components.length;
        },
        registerComponent : function(component){
            if (typeof component == "object" ) {
                components.push(component);
            }
        }
    };
}();
application.getComponent(); //访问私有变量components的长度
application.registerComponent([1,2,3]);// 将数组存入私有变量
```



###### 增强的模块模式

**不用*字面量*返回，而使用具体的构造函数创建后，添加返回**。