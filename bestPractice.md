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
  	var imgs = document.getElementByTagName("img");
  	for (var i = 0, len = imgs.length; i < len; i++) {
  	imgs[i].title = document.title + " image " + i;
  	}
  	var msg = document.getElementById("msg");
  	msg.innerHTML = "Update complete";
  }
  ```

  

### 部署