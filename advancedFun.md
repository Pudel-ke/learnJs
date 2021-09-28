### 高级函数

##### 安全类型检测

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

###### 作用域安全的构造函数

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
	Polygon.call(this, 2);
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



###### 惰性载入函数

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

