- style属性只能读取内嵌样式

- style对象的属性值永远是字符串，value必须放在“”中

- 通过JavaScript更新某个元素的class属性比直接改变某个元素的样式简明

- 通过className属性设置class属性时将替换原有class，而不是追加

  ```js
  //可以通过+=来赋值
  elem.className += "intro";
  ```

  ```js
  function addClass(element, value) {
      if(!element.className) {
          element.className = value;
      } 
      else {
          element.className = element.className + " " + value;
      }
  }
  ```

### javascript实现动画效果

- 元素初始没有设置style属性，则不能通过element.style来访问，除非通过DOM设置属性后
- IE使用currentStyle可以访问样式，chrome等通过getComputedStyle来访问
- 设置定时器，需要及时清除。clearTimeout()  \ clearInterval

### HTML5 

> ​          **HTML5是一个集合，不是一个全有或全无的概念**

- 新的标记元素。<section> <article> <header> <footer>
- 交互及媒体元素。 <canvas> <audio> <video>

- 新的JavaScript API包括其他模块，如 geolocation 、storage、drag-and-drop、socket 以及多线程等
- 

###### 新的输入控件类型

>  浏览器知道控件接受什么类型的输入

- email
- url
- date
- number  数值
- range   生成滑动条
- search  搜索框
- tel   电话
- color  选择颜色

###### 新的属性

- autocomplete  用于添加建议的输入项
- autofocus   表单元素自动获得焦点
- form   用于对<form>标签外部的表单元素分组
- min, max, step  用在range和number输入框中
- pattern  定义正则表达式 验证输入值
- placeholder 显示临时性的提示信息
- required  必填

