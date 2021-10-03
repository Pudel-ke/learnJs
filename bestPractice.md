### 可维护

- 可理解性
- 直观性
- 可适应性
- 可扩展性  在代码架构上考虑到未来允许对核心功能进行扩展
- 可调试性  当有地方出错时，可知道足够信息确定问题所在



#### 代码约定

可读性

- 合理使用缩进

- 函数、方法、复杂算法、大段代码前添加注释

变量命名

- 变量和函数都应使用合乎逻辑的名字

变量类型透明

- ```js
  var found = false;
  var num = -1;
  var name - "";
  var person = null;
  ```

#### 松散耦合

- 解耦HTML/JavaScript

  避免在JavaScript中创建大量的HTML

- 解耦CSS/JavaScript

  现代web应用常使用JavaScript更改样式，不可能完全解耦。可以

  **松散耦合** ：通过动态更改样式类而非特定样式来实现

  ```js
  //CSS对JavaScript的松散耦合
  element.className = "edit";
  ```

- 解耦应用逻辑/事件处理程序

  将应用逻辑从事件处理程序中分离

```js
//未解耦
function handleKeyPress(event) {
    event = EventUtil.getEvent(event);
    if(event.keyCode == 13) {
        var target = EventUtil.getTarget(event);
        var value = 5 * parseInt(target.value);
        if (value > 10) {
            document.getElementById("error-msg").style.display = "block";
        }
    }
}

```

```js
//解耦后
function validateValue(value) {
    value = 5 * parseInt(value);
    if (value > 10) {
        document.getElementById("error-msg").style.display = "block";
    }
}

function handleKeyPress(event) {
    event = EventUtil.getEvent(event);
    if (event.keyCode == 13) {
        var target = EventUtil.getTarget(event);
        validateValue(target.value);
    }
}

```

###### 牢记

1. **勿将event对象传给其他方法，只传来自event对象中所需的数据；**
2. **任何可以在应用层面的动作都应该可以在不执行任何事件处理程序的情况下进行；**
3. **任何事件处理程序都应该处理事件，然后将处理转交给应用逻辑。**

#### 编程实践

- 尊重对象所有权

  如果不负责创建或维护某个对象、它的对象或者它的方法，那么就不能对它进行修改

  - 不要为实例或原型添加属性
  - 不要为实例或原型添加方法
  - 不要重定义已有的方法

- 避免全局量

  尽可能避免全局变量和函数

  ```js
  //一个全局量 --推荐
  var MyApplication = {
  	name: "nicolas",
  	sayName: function() {
  	alert(this.name);
  	}
  };
  ```

  > 命名空间很重要是确定每个人都同意使用的全局对象的名字

  如：

  ```js
  //创建全局对象
  var Wrox = {};
  
  //为professional JavaScript创建命名空间
  Wrox.ProJS = {};
  
  //添加对象
  Wrox.ProJS.EventUtil = {...};
  Wrox.ProJS.CookieUtil = {...};
  
  //为professional ajax创建命名空间
  Wrox.ProAjax = {};
  Wrox.ProAjax.EventUtil = {...};
  Wrox.ProAjax.CookieUtil = {...};
  
  //projs 和 proajax可以继续分别访问
  Wrox.ProJS.EventUtil.addHandler(...);
  Wrox.ProAjax.EventUtil.addHandler(...);
  ```

- 避免与null进行比较

  ```js
  function sortArray(values) {
  	if (values instanceof Array) {  //用instanceof  取代 values != null
  	values.sort(comparator);
  	}
  }
  ```

- 使用常量

  避免引用错误

  ```js
  var Constants = {
      INVALID_VALUE_MSG: "invalid value",
      INVALID_VALUE_URL: "/errors/invalid.php"
  };
  function validate(value){
      	if(!value) {
              alert(Constants.INVALID_VALUE_MSG);
              location.href = Constants.INVALID_VALUE_URL;
          }
  }
  ```

  

### 性能

#### 注意作用域

- 避免全局查找

  ```js
  function updateUI() {
  	var imgs = document.getElementByTagName("img"); //对document对象引用
  	for (var i = 0, len = imgs.length; i < len; i++) {
  	imgs[i].title = document.title + " image " + i; //for循环找那个多次对全局document引用
  	}
  	var msg = document.getElementById("msg"); //对document对象引用
  	msg.innerHTML = "Update complete";
  }
  ```

  解决方法，通过创建一个指向document对象的局部变量，限制只通过一次变量查找。

  ```js
  function updateUI() {
      var doc = document;
  	var imgs = doc.getElementByTagName("img"); //
  	for (var i = 0, len = imgs.length; i < len; i++) {
  	imgs[i].title = doc.title + " image " + i; 
  	}
  	var msg = doc.getElementById("msg"); //
  	msg.innerHTML = "Update complete";
  }
  ```

- 避免with语句



#### 选择正确方法

- 避免不必要查找

  - **使用变量和数组要比访问对象上的属性更有效率**。后者是一个O(N)操作。

  - **一旦用到对象属性**，**应该将其存储到局部变量中**。

    ```js
    var url = window.location.href;
    var query = url.substring(uri.indexof("?"));
    ```

  - **只要能减少算法复杂度，尽可能减少。尽可能多地使用局部变量将属性查找替换为值查找。**

- 优化循环

  - **减少迭代**  从最大值开始，不断减值迭代
  - **简化终止条件**   每次循环都会计算终止条件，避免属性查找
  - **简化循环体**   保证循环体最大限度被优化
  - **使用后测试循环**  do-while

- 展开循环

  - **Duff装置**   通过将values数组中元素个数除以8来计算出循环需要进行多少次迭代。

    ```js
    //假设values.length > 0 
    var iterations = Math.ceil(values.length / 8);
    var startAt = values % 8;
    var i = 0;
    
    do {
        swtich(startAt) {
            		case 0: process(values[i++]);
                    case 7: process(values[i++]);
                    case 6: process(values[i++]);
                    case 5: process(values[i++]);
                    case 4: process(values[i++]);
                    case 3: process(values[i++]);
                    case 2: process(values[i++]);
                    case 1: process(values[i++]);
            
        }
        startAt = 0;
    } while (--interations > 0);
    ```

  - **更快的duff装置**

    ```js
    var interations = Math.floor(values.length / 8);
    var leftover = values.length % 8;
    var i = 0;
    
    if (leftover > 0) {
    	do {
    		process(values[i++]);
    	} while (--leftover > 0);
    } 
    do {
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    } while(-- iterations > 0);
    ```

- 避免双重解释

  避免以下代码。其都解析了包含JavaScript代码的字符串。每次运行都需要新启动一个解析器，增加开销。

  ```js
  eval(alert("hello world"));
  
  var sayHi = new Function(alert("hellow"));
  
  setTimeout("alert('hello world')", 600);
  
  ```

- 其他事项

  - **原生方法较快，尽可能使用原生方法而不是自己重写**
  - **Switch语句较快，如果有一系列if-else语句，转换成单个switch语句更好**
  - **位运算符较快，当数学运算的时候，位运算符最快，取模、逻辑与、逻辑或都可考虑位运算符**

#### 最小化语句数

- 多个变量声明

  ```js
  var count = 5,
  	color = "blue",
  	person = null;
  ```

- 插入迭代值 

  ```js
  var name = values[i++];
  ```

- 使用数组和对象字面量

  ```js
  var values = [231, 23, 123];
  var person = {
  	name: "joke",
  	age: 15,
  	sayName: function() {
  		alert(this.name);
  	}
  };
  ```

#### 优化和DOM交互

**DOM是JavaScript中最慢的一部分。DOM操作往往需要重新渲染整个页面或者某一部分**

- 最小化现场更新

  使用文档片段构建DOM结构。文档片段作为临时占位符。给appendChild()传入文档片段时，只有片段中的子节点被添加到目标，片段本身不被添加。

  ```js
  var list = getElementById("mylist"),
  	fragment = document.createDocumemtFragment(),
  	item,
  	i;
  for (i = 0; i < 10; i++) {
  	item = document.createElement("li");
  	fragment.appendChild(item);
  	item.appendChild(document.createTextNode("item" + i));
  }
  list.appendChild(fragment);
  ```

- 使用innerHTML

  对于大的DOM更改，使用innerHTML要比使用标准的DOM方法速度快得多。

  使用过程中，要最小化调用innerHTML的次数。

- 使用事件代理

  将事件处理程序附加到更高层的地方负责多个目标的事件处理。**如果可能，在文档级别附加事件处理程序，这样可以处理整个页面的事件**

- 注意HTMLCollection

  - 进行对getElemensByTagName()调用
  - 获取元素childNodes属性
  - 获取元素attributes属性
  - 访问document.forms  , document.images.

### 部署

[前端部署优化](https://juejin.cn/post/6844904086823780366)

