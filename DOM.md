#### Javascript语法

###### 准备工作

- 将<script>标签尽量放在html文档最后，</body>之前

- 多写注释



###### 宿主对象

宿主对象包括Form, Image, Element,document等



#### DOM

window对象对应浏览器窗口本身

window object model

###### 家谱树

- 只有元素节点，不包括其他文本节点和属性节点

- 主体结构由元素节点，文本节点，属性节点组成

- 所有元素都包含title属性，表示这一元素的说明.默认为null
- 元素节点的nodeType是1 属性节点的nodeType是2 文本节点的nodeType是3

###### 获取元素的方法

getElementById()   按id返回

getElementByClassName()  某一类型，返回数组

getElementByTagName()  元素名，返回数组  使用通配符 getElementByTagName("*")  返回所有对象

几种方法可以结合使用 ，如 

```js
 let shoppingList = document.getElementByTagName("li");
let food = shoppingList.getElementByClassName("food");
```

###### 获取和设置属性

getAttribute()

```js
object.getAttribute(attribute);  //DOM-Core
```

```JS
object.attribute;  //HTML-DOM
```

setAttribute()

```js
obj.setAttribute("id", "myID");
obj.id = "myid";//等价
```



#### 最佳实践 

> 以用户体验为第一考虑

##### 平稳退化

**当用户浏览器不支持JavaScript的时候，需能保证基本功能**

使用window.open可以打开一个新窗口

```js
//window,open(URL, name, features)
function popUp(webURL) {
    window.open(webURL, "popup", "width = 320, height = 480");
}
//代码里可以通过name与新窗口进行通信
```

>  平稳退化做的不好，网站排名就很低

```html
<a href="https://www.google.com/" 
   onclick = "popUp(this.href); return false;">Example</a> //保证href本身可以通过标签属性点进去
```

###### 结构与样式分离

CSS实现结构和样式分离，能保证CSS功能被禁用，同样可以以正确的结构显示

###### 渐进式增强

用一些额外的信息层包裹原始数据。将css文件单独保存，从外部引入。

```html
<link rel="stylesheet" href="../css/gallery.css">
```

##### 分离Javascript

将js代码都保存在js文件中从外部引入

```js
<script src="script/example.js"></script>
```



##### 向后兼容

浏览器嗅探，通过js代码检索关于浏览器的品牌和版本信息

但有些浏览器会实现“伪装”

##### 性能最优

###### 减少DOM访问

检查循环等函数调用中，是否重复获取元素节点等

###### 合并和放置脚本

多个.js可以合并到一起

同时放在文档末尾，保证文档加载速度

###### 压缩脚本

删去空格 换行符 注释等

> 多数情况下，保存两个版本的代码，一个是正常带注释版本xxx.js
>
> 一个是xxx.min.js版本

现有的相关工具可快速实现压缩代码



##### 共享onload事件

```js
window.onload = function() {
	firstFunction();
	secondFunction();
};

//或者
function addLoadEevent(func) {
    var oldload = window.onload;
    if (typeof window.oldload != "function") {
        window.onload = func;    //如果当前未绑定函数，则绑定新的
    }
    else {
        window.onload = function() {  //如果绑定了 先执行旧函数  再执行新函数
            oldload();
            func();
        };
    }
}
```

