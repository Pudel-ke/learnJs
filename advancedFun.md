### 高级函数

#### 安全类型检测

成因：JavaScript内置类型检测机制并非完全可靠

-  typeof操作符 对正则表达式应用返回 "function"

- instanceof 操作符存在多个全局作用域，（一个页面包含多个frame）

```js
var isArray = value instanceof Array;
```

如果value是在另一个frame中定义的数组，则返回false

- 检测某个对象是原生对象还是自定义对象，JSON在有些浏览器中被原生支持

解决方法：

```js
function isArray(value) {
    return Object.prototype.toString.call(value) == "[objcet Array]";
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}
```

#### 作用域安全的构造函数

调用构造函数时，未使用new操作符，会导致this对象映射到window，导致错误对象属性意外增加。

通过构造函数窃取结合原型链或者寄生组合：

```js
function Polygon(sides) {
	if (this instanceof Polygon) {
	this.sides = sides;
	this.getArea = function() {
		return 0;
	};
	}
	else {
		return new Polygon(sides);
	}
}

function Rectangle(width, height) {
	Polygon.call(this, 2); //如果this指向rectangle实例，则会在polygon中新创建对象，无法为rectangle实例添加属性
	this.width = width;
	this.height = height;
	this.getArea = function() {
		return this.width * this.height;
	};
}

Rectangle.prototype = new Polygon(); // 新创建的rectangle实例同时也是polygon的实例

var rect = new Rectangle(5, 10);
alert(rect.sides);
```



#### 惰性载入函数

惰性载入即，js代码中的测试仅发生一次。

浏览器之间的行为差异，导致多数js代码包含大量if语句，多次加载损失性能

```js
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            var i,len;
            for (i = 0, len = versions.length; i<len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }
                catch(e) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
        
    }
    else {
        throw new Error("No XHR object availble");
    }
}
```

同一个浏览器中，一旦createXHR函数被调用，就完成了对浏览器支持能力的检查，且其不会再改变。后续调用时不需要再进行测试。

- 函数被调用时再处理函数。

  > 第一次调用时，该函数会被覆盖为另一个按合适方式执行的函数。后续调用则不必判断了

  ```js
  function createXHR() {
      if (typeof XMLHttpRequest != "undefined") {
          createXHR = function() {
              return new XMLHttpRequest();
          };
      }
      else if (typeof ActiveXObject != "undefined") {
          createXHR = function() {
              if (typeof arguments.callee.activeXString != "string") {
              var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
              var i,len;
              for (i = 0, len = versions.length; i<len; i++) {
                  try {
                      new ActiveXObject(versions[i]);
                      arguments.callee.activeXString = versions[i];
                      break;
                  }
                  catch(e) {
                      //跳过
                  }
              }
          }
                      return new ActiveXObject(arguments.callee.activeXString);
          };
  	 }
      else {
  		createXHR = function() {
             throw new Error("No XHR object availble");
          };
      }
      return createXHR();
  }
  ```

- 声明时就指定函数。仅在代码加载时损失一点性能。

```js
var createXHR = (function() {
    if (typeof XMLHttpRequest != "undefined") {
        return function() {
            return new XMLHttpRequest();
        };
    }
    else if (typeof ActiveXObject != "undefined") {
        return function() {
            if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
            var i,len;
            for (i = 0, len = versions.length; i<len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }
                catch(e) {
                    //跳过
                }
            }
        }
                    return new ActiveXObject(arguments.callee.activeXString);
        };
	 }
    else {
		return function() {
           throw new Error("No XHR object availble");
        };
    }
})();
```

#### 函数绑定

创建一个函数，在特定的this环境中指定参数调用另一个函数。常常和回调函数与事件处理程序一起使用，**以便在将函数作为变量的同时保留代码执行环境。**

使用bind()函数，为函数指定运行环境或参数。

bind函数使用闭包和apply为函数指定环境。

```js
//自定义bind方法
function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments); //arguments是内部函数传递的参数
    };
}
```



```js
var handler = {
    message: "Event handled",
    
    handleClick: function(event) {
        alert(this.message + ":" + event.type);
    },
};
var btn = document.getElementById("my-btn");
```



> 所有函数都内置bind()方法

```js
handler.handleClick.bind(handler); //bind函数还可以接收更多参数，将其与内部参数数组合并后作为原函数的参数
```

!! **被绑定的函数比普通函数有更多的开销，需要更多内存，同时速度慢一点，必要时使用。**

#### 函数柯里化

用于创建已经设置好了一个或多个参数的函数。

函数柯里化方法：使用闭包返回一个函数

```js
function curry(fn) {
    var args = Array.prototypt.slice.call(arguments, 1); //柯里化传入外部参数，从第二个参数开始截取，第一个为fn
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}
function add(num1, num2) {
    return num1 + num2;
}
var curriedAdd = curry(add, 5); //此时传入外部参数 5 
alert(curriedAdd(3)); //8  此时finalArgs = [5, 3];
```

函数柯里化常作为函数绑定的一部分包含在其中

```js
function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2); //从第二个参数开始截取
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context, finalArgs); //执行环境不再为null 为一个为fn绑定的对象
    };
}
```

ES5的bind()方法也实现函数柯里化。

```js
var handler = {
	message: "Event handled",
	
	handleClick: function(name, event) {
		alert(this.message + ":" + name + ":" + event.type);
	},
};
EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler, "my-btn"));
```

使用bind() 还是curry()根据是否需要object对象响应来决定。都能用于创建复杂的算法和功能。

> 两者都会为函数带来额外的内存开销

### 防篡改对象

tamper-proof object

#### 不可扩展对象

默认情况下，所有对象都是可扩展的。通过Object.preventExtensions()方法可以使其不可扩展，即无法为对象增加属性和方法。

！**虽然不能添加属性和方法，但对于已有的属性和方法仍旧可以删除和修改。**

> Object.isExtensible(obj); 可以确定对象是否可以扩展

#### 密封的对象

密封的对象不可扩展，且已有成员的[[configurable]]特性会被设置为false。**不能删除属性和方法，也不能修改数据属性为访问器属性**

当前属性值的[[writable]]特性保持不变。自定义对象则仍旧可以修改其值

使用Object.seal(obj)方法设置密封对象。

使用Object.isSealed(obj)方法检测是否被密封。

#### 冻结的对象

最严格的防篡改级别是**冻结对象** 。冻结的对象既不可扩展，又是密封的，同时数据的[[writable]]特性为false，即无法修改对象的属性值。

Object.freeze(obj);

Object.isFrozen(obj);

> 对于JavaScript库的作者而言，冻结对象十分有用



### 高级定时器

指定的时间间隔表示何时将定时器的代码添加到队列，而不是何时实际执行代码。！！！！

> 定时器对队列的工作方式是，当特定时间过去后将代码插入。注意，给队列添加代码并不意味着对它立刻执行，而只能表示它会尽快执行。设定一个 150ms 后执行的定时器不代表到了 150ms代码就立刻执行，它表示代码会在 150ms 后被加入到队列中。如果在这个时间点上，队列中没有其他东西，那么这段代码就会被执行，表面上看上去好像代码就在精确指定的时间点上执行了。其他情况下，代码可能明显地等待更长时间才执行。

定时器仅仅只是计划代码在未来的某个时间执行。执行的时间是不能保证的，因为在页面的生命周期中，不同时间可能有其他代码在控制 JavaScript 进程。在页面下载完后的代码运行、事件处理程序、Ajax 回调函数都必须使用同样的线程来执行。实际上，浏览器负责进行排序，指派某段代码在某个时间点运行的优先级。

##### 重复定时器

**setInterval()**

问题：定时器代码可能在代码再次被添加到队列之前还没完成执行，导致定时器代码连续运行多次，没有停顿

> 当使用setInterval()时，仅当没有该定时器的任何其他代码实例（队列中没有添加代码实例）时，才能将定时器添加到队列中。

- 某些间隔会被跳过
- 多个定时器代码执行之间的间隔会比预期小

解决办法

```js
setTimeout(function(){
    	//处理中
    
    	setTimeout(arguments.callee, interval);
},interval);
```

**在前一个定时器代码执行完成之前，不会向队列中插入新的定时器代码。**



### 自定义事件

观察者模式两类对象：**主题**和**观察者**

主体发布事件，观察者通过订阅事件来观察主体。**主体不知道观察者的任何事情**，它可以独自存在并正常运作。

> 涉及DOM时，DOM元素便是主体，事件处理代码便是观察者。

[自定义事件面试题](https://juejin.cn/post/6844903464301133837)

