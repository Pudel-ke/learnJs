# HTML学习笔记



## day1 

###  1.网页

* 构成网站的基本元素，由文字、声音、视频等元素组成
* 通常是.htm或.html文件
* HTML 超文本语言是一种**标记语言**

### 2.WEB标准

* W3C等组织制定的标准集合
* 结构

> HTML结构标签

* 表现

> CSS实现表现

* 行为

> Javascripts实现行为交互效果，“动起来”

### 3.html标签(语义化标签学习)

结构：

```html
<!DOCTYPE>
<html>
<head>
<title>..</title>
<meta ..>
</head>  
<body>.
.
.
</body>
<html>
```

 








### 4.具体标签

#### 双标签

< h1>..< /h1>:标题标签，head，h1-h6由大到小

< p>...< /p> : paragraph，段落标签

< a href="路径"> 锚点链接(文字图片均可)</ a>:  anchor, 其中href 必加，可实现跳转（配合属性id="jump",href="#jump"）or网页切换,属性中有target="_self",本页跳转，=“ _blank” 新页面跳转

< div>..< /div> :单独成一行

< span>..< /span> 一行多个"box"

#### 单标签

< br> : break，换行符

< img src="" > 属性可加height,width, border等

< !---...---> 注释标签  ctrl+/ 

特殊字符：&nbsp ; 空格  

​                   &lt ;  小于号 <   less than

​                   &gt ; 大于号>   greater than

## day2

### 1.表格标签

```html
<table>
    <tr>
        <th>表头1</th>
        <th>表头2</th>
        <th>表头3</th>
        <!--一般用th是对表头进行加粗，td也行，代表数据单元格-->
    </tr>
    <tr>
        <td>meta1</td>
        <td>meta2</td>
        <td>meta3</td>
    </tr>
</table>
```

tr: table row  

td: table data  可以是其他内容，不仅限于文字

表格相关属性:

* align    表格相对周围元素对其 left center right
* border  表格边框 单位为px
* cellpadding  元素距离边框内容
* cellspacing   单元格之间的距离
* width           表宽度
* height         表高度

**后续学习CSS，在CSS中设置**

表格结构标签：

* < thead> </ thead>  表格头部一行
* < tbody> </ tbody> 表格主体区域

>  表格更好的语义

合并单元格:

* 行合并  rowspan   从最上一行开始 < td rowspan="2"> </ td>
* 列合并  colspan  从最左边的一列开始  < td colspan="3"> </ td>

**删除多余单元格**



### 2.列表标签

#### 2.1 无序列表（important）

​	unordered list

```html
	<ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
</ul>
```

item 不限类型

去掉li前面的小圆点

```
	list-style: none;
```

**实际使用时，通过CSS设定属性**

#### 2.2 有序列表

ordered list	

```html
		<ol>
    <li>list1</li>
    <li>list2</li>
    <li>list3</li>
</ol>
```

**样式通过CSS实现**

#### 2.3 自定义列表

definite list

```html
	<dl>
    <dt>名词1</dt>
    <dd>explain1</dd>
    <dd>explain2</dd>
    <dd>..</dd>
</dl>
```

**< dt> ，< dd>的个数不限**



< li> < dd> < dt> 可以放任何标签

###  3.表单标签

> 用户填写表单，搜集用户信息

- 表单域 ：   表单元素信息区域 < form>
- 表单控件 ： 填写内容处
- 提示信息 ： 姓名、性别等提示信息

#### 3.1 表单域

```html
	<form action="demo.php" method="POST" name="name_1" >
    
</form>
```

#### 3.2 表单控件

- < input type="text">

  属性：

  ![input输入类型](C:\Users\邱珂\AppData\Roaming\Typora\typora-user-images\image-20210727194942781.png)

- name : 定义input元素名称。**单选按钮和复选框要有相同的name值**

- value: 规定input的元素值 

  > **name & value 后台人员使用**

- checked  规定input元素首次加载时应被选中

​      单选按钮和复选框可以设置默认值 checked="checked"

- maxlength  规定输入字段中字符的最大长度

- submit   < input type="submit" value="免费注册">   将form的信息提交到后台服务器
- reset  恢复默认值

- button  定义可点击按钮（常与JS配合使用）
- file  上传文件 < input type="file" value="提交文件">

#### 3.3 表单label标签

```html
		<label for="man">男 </label> <input type="radio"  value="man" id="man">
```



#### 3.4 下拉表单标签

```html
<select>
    <option selected="selected">选项1</option>
    <option>选项2</option>
    <option>选项3</option>
    <option>选项4</option>
</select>
```

#### 3.5文本域表单元素

textarea 输入内容较多的情况下

```html
<form>
    
<textarea>
  请输入文字
</textarea>
 </form>
```

## day3

### 1.1 CSS语法

- 选择器用于指定CSS的html标签，花括号内设置具体样式
- 属性和属性值以**键值对**的形式出现
- 属性是对指定对象设置样式属性，如字体大小、文本颜色等
- css定义一般在html的头部，与结构body分开，定义在<style>里面

```html
<head>
    <style>
        p {
            color: red;
            font-size: 12px;
        }
    </style>
</head>
```

### 1.2 CSS代码风格

- 展开格式

```html
h3 {
   color: pink;
   font-size: 20px;
}
```

- 推荐用小写字母写style
- 冒号后面保留空格
- 选择器和{}保留空格

### 1.3 选择器分类

#### 1.3.1 基础选择器

- 标签选择器

>  p {color :red;
>
> ​      font-size: 12px;
>
> }

- 类选择器  

>  样式**点**定义 
>
>  结构**类**(class)调用  
>
>  一个或多个
>
>  开发最常用 

```html
<style>
    .definite_name {
        color: red;
        font-size: 25px;
    }
</style>
.
.
<div class="definite_name">
    
</div>
```

- **多类名**

```
  class="red font35"
```

**存在相同部分的放在同一个class里，多个类之间用空格隔开**

- **id选择器**

> 样式#定义
>
> 结构id调用
>
> 只能调用一次
>
> 别人切勿使用

```
#red {
  color: red;
}
<p id="red";></P>
```

**id选择器一般用于页面唯一性的元素是，经常搭配JavaScript使用**

- 通配符选择器

```
* {

   color: red;

}
```

把body在内**所有的**标签样式修改，**不需要调用**

### 1.4font字体属性

#### 1.4.1 字体种类

```html
body {font-family: 'mircrosoft YaHei',times,'times new roman';}
```

 字体之间用'**逗号,**'隔开  一般写在body属性内

#### 1.4.2 字体大小

```
p {font-size: 20px;}
```

>  **标题标签需要单独指定大小**

#### 1.4.3字体粗细

***学会查找CSS技术手册***

- normal: 默认值 400
- bold: 定义粗体 加粗 700
- 100——900： 自定义大小  不接px

> 通常用数字表示粗细

#### 1.4.4 文字样式

```
p {font-style:  italic;}

p {font-style: normal} 把倾斜字体变不倾斜
```



#### 1.4.5 复合属性

```
body {
  font: font-style font-weight font-size/line-height font-family;
}
```

e.g. 

```
 p {font: normal 700 16px 'microsoft yahei';}
```

- 其中 font-family  font-size **不可省略**

- 各个属性必须按照**规定顺序**书写

- 各属性之间用**空格**隔开

### 1.5 文本属性

#### 1.5.1文本颜色

```
color: pink;

color: #ff0000;

color: rgb(255,0,0);
```

常用16进制

#### 1.5.2 对齐文本

水平对齐方式

```
div{
  text-aligh: center;
}
```

  默认left  

#### 1.5.3 装饰文本

```
div {
  text-decoration: underline;
}
```

- 默认 none
- 下划线 underline
- 上划线 overline
- 删除线 line-through

常用

```
<style>
  a {text-decoration: none;}
</style>
```

#### 1.5.4 文本缩进

```
div {text-indent: 20px;}

div {text-indent: 2em;}  缩进当前字大小两个字的距离
```



#### 1.5.5 行间距

```
p {line-height: 26px;}
当line-height=height 时，文本垂直居中对齐
```

包括**上间距、文字高度、下间距**

### 1.6 CSS的引入方式

#### 1.6.1 内部样式表

```html
<style>
    div {
        color: red;
        font-size: 12px;
    }
</style>
```

- 通常写在head标签中，理论上可在任何地方
- 方便控制整个页面元素
- 未实现结构样式分离

#### 1.6.2 行内样式表

```
<p style="color: pink; font-size: 12px";>青春</p>
```

适用**简单**修改

#### 1.6.3 外部样式表 (最常用)

***样式单独写到CSS文件中，之后把CSS文件引入到HTML页面中使用***

1. 新建.css的文件，把所有CSS代码放入此文件中
2. 在HTML页面中，使用<link>标签引入css文件

```
<link rel="stylesheet" href="css文件路径">
```

**优点：控制多个页面**

### 2.1 复合选择器

#### 2.1.1 后代选择器

```
元素1 元素2 {样式声明}
元素1里所有元素2的后代
ul li {color: pink;}
ol lo {color: green;}
```

可以选多级

```
ul li a {color: blue;}
```

#### 2.1.2 子选择器

- 只选择"亲儿子" 所有直接后代(儿子)

```
div>p {color: red;}
```

#### 2.1.3 并集选择器

```html
div, p {}  通过逗号,分隔
```

同时对div, p设置样式*（对多标签设置样式）*

#### 2.1.4 伪类选择器

```
a:link {color: blue;} 未访问
a:visited 已访问
a:hover  指针指向
a:active  按下但未弹起
```

- 按照*RVHA*的顺序  link-visited-hover-active
- 需要给a单独指定样式

```
<style>
  a {
    color: gray;
    text-decoration: none;
  }
  a:hover {
    color: skyblue;
    text-decoration: underline;
  }
  </style>
```

#### 2.1.5 focus伪类选择器

- 一般为<input>类表单元素选取

```
input:focus {
  color: blue;
  background-color: pink;
}
```

### 2.2 CSS元素显示模式 

#### 2.2.1 块元素

> **div**,h1,h6,p,ul,ol,li等

- 独占一行
- 高度、宽度、内外边距可控制
- 宽度默认是容器（父级宽度）的100%
- 高度依据内容而定
- 是容器及盒子，里面可放行内元素或者块级元素

 **文字类元素内不能使用块级元素，如p,h1~h6**

#### 2.2.2 行内元素(内联元素)

> a,strong,b,em,i,del,i,s,ins,u,**span**等

- 一行可显示多个行内元素
- 高、宽直接设置无效
- 默认宽度是内容本身
- 只能容纳文本或其他行内元素

note:

- **链接里面不能放链接**
- **特殊情况链接<a>里可以放块级元素，但给a转换一下块级模式最安全**

#### 2.2.3 行内块元素

<img> <input> <td>

同时具有块元素和行内元素的特点 ”行内块元素“

### 2.3 模式转换

```
display: block; 转换为块
display: inline; ——行内元素
display: inline-block; 行内块
```

#### 2.3.1 文字垂直居中

```
line-height=height;
```

### 背景图片

 **常见于logo，或者装饰性的小图片、超大背景图片**

```
background-image: url();
```

background-repeat: repeat|no-repeat|repeat-x|repeat-y

##### 背景图片位置

```html
background-position: x y;
```

- 可用方位名词  right center  left top bottom  只用一个，另一个则默认居中
- 具体像素值   第一个一定是x轴， 第二个不写则默认居中
- 可以混合单位，方位跟px混合

##### 背景图片悬停方式

```html
background-attachment: scroll |  fixed
```

##### 复合写法 

 (没有顺序要求 且各属性之间用空格隔开

一般习惯  

```html
background: color url() repeat fixed top ;
```

```html
background: rgba(0,0,0,0.3) url() repeat-x scroll top
```

###  3. CSS特性

##### 层叠性

- 样式冲突：就近原则，哪个样式离结构近，执行哪个样式
- 样式不冲突： 不会层叠

##### 继承性

- 子标签继承父标签的属性

  一般是text-   font-  line-  color等属性

```html
<style>
    div {
        color: pink;
        font: 14px/1.5;
    }
   .test1 {
        font-size: 16px;
    }
</style>
<div>
    <p class="test1">
        p的行高是16*1.5=24px
    </p>
    <p>
        这个P的行高是14*1.5=21px
    </p>
</div>
```

##### 优先级

| 选择器             | 选择器权重 |
| ------------------ | ---------- |
| 继承或者*          | 0,0,0,0    |
| 元素选择器         | 0,0,0,1    |
| 类/伪类选择器      | 0,0,1,0    |
| ID选择器           | 0,1,0,0    |
| 行内样式(style="") | 1,0,0,0    |
| !important 重要的  | ∞ 无穷大   |

```
color: pink!important;
```

---

```html
<head>
    
<style>
    #father {
        color: red;
    }
    p {
        color: pink;
    }
</style>
</head>
<body>
    <div id="father">
        <p>
            maomao yyds!
        </p>
    </div>   
</body>
```

**maomaoyyds 颜色是粉色**

因为p继承了父亲div属性，权重为0,0,0,0,因此考虑元素选择器权重为0，0，0，1，故为粉色

不管父亲优先级多高，子标签优先级都为

###### 权重叠加

```
li 权重 0,0,0,1
ul li 权重 0,0,0,2
.nav li  权重 0,0,1,0+0,0,0,1=0,0,1,1
```

**复合选择器 权重会有叠加 但不会进位**

> 0,0,0,1+0,0,0,9=0，0,0,0,10 < 0,0,1,0

### 4. 盒子模型

###### 4.1 网页布局本质

1. 先准备好相关网页元素，网页元素基本都是盒子box
2. 利用CSS设置样式，放到相应位置
3. 往盒子里装内容

**核心：利用CSS设置盒子**

###### 4.2 盒子组成

- **border边框** 

```html
border-width |border-style |border-color
```

```html
border-style: solid  实线边框 ||dashed 虚线边框 |dotted 点线边框
```

**复合写法**：

```html
border: 5px solid pink; 没有先后顺序
```

```html
border-bottom  border-top  border-left  border-right 可以分别设置
```

```html
border-collapse:  collapse 边框合并
```



- **content内容**

> 直接书写内容，可以是文字、盒子、图片等



- **padding内边距**

```html
padding-top padding-bottom padding-left padding-right
```

简写属性

padding: 5px; 上下左右都是5px

padding：5px 10px ; 上下5px 左右10px

padding: 5px 10px 20px; 上5px   左右10px   下 20px 

padding: 5px 10px 15px 20px;    上5 右10 下15 左20  顺时针

**如果未指定盒子w/h，则padding会撑开盒子**！！！

- **margin外边距**

简写方式与padding相同

- **若要设置*块级盒子*水平居中，盒子需要设置宽度，且设置左右外边距为auto**

```html
margin: 0 auto;
margin-left: auto; margin-right: auto;
```

- **若要设置行内块或行内盒子水平居中，则在父级元素样式设置text-align: center**

- **嵌套块元素垂直外边距的塌陷，父子元素都有上外边距时，父级元素会塌陷较大的外边距。**

避免外边距合并：

1. 为父元素定义边框

2. 为父元素定义上内边距

3. **为父元素添加属性 overflow: hidden;**   （常用）

   ---

   **清除内外边距**

 很多网页元素带有默认的内外边距，布局之前需要清除内外边距。****

```html
* {
	margin: 0;
	padding: 0;
}
```

**行内元素为了照顾兼容性，尽量只设置左右内外边距，不要设置上下内外边距。****但设置成**块**或**行内块**元素就可以解决。**

###### 4.3 圆角边框

盒子变成圆角

```html
border-radius: length;
```

可以简写或分开写

border-top-left-radius: 10px;

###### 4.4 盒子阴影

```html
box-shadow: h-shadow v-shadow blur spread color inset
```

h-shadow  v-shadow  为 水平 垂直阴影位置  必需

blur为模糊距离 spread为阴影尺寸

color阴影颜色   inset  外部阴影改为内部阴影



### 5.CSS三大常用布局

#### 5.1 标准流（普通流）

标签按照默认方式排列

>  块、行内、行内块

#### 5.2浮动式

- 浮动会依次在同一行排列，移动到一边，直到左侧边缘或者右侧边缘贴到一个块或另一个浮动盒子。

- 可以让多个块级元素并排显示，中间无缝隙

```html
float: left | right;
```

> 网页中有多个块级元素纵向排列，找标准流
>
> 网页中有多个块级元素横向排列，找浮动

​        **三大特性**

##### 5.2.1 脱标：

盒子有浮动属性后，便脱离标准流，不再占用标准流位置。

##### 5.2.2  同一行

多个盒子具有浮动属性，会紧贴顶端左侧贴近，依次显示

##### 5.2.3 **浮动元素具有***行内块*特性

 任何元素都可以添加浮动特性。

> 网页布局第一准则，先用标准流的父元素排列上下位置，之后内部元素采取浮动排列左右位置。
>
> 网页布局第二准则，先设置盒子大小，再设置盒子的位置。
>
> 浮动只会影响后面的标准流，不会影响前面的标准流。
>
> 一个元素浮动，理论上其余兄弟元素都会浮动。

##### 5.2.4 很多父盒子不方便给高度

子盒子浮动不占用标准流，则会影响父盒子高度，而后影响后续标准流排版。

需要 **清除浮动**！

> 清除浮动元素脱标造成的影响

- **额外标签法** （不常用）

​      找到最后一个浮动盒子，在其后面添加一个空盒子**（块级元素）**或者< br />

​       添加属性 clear    

```html
  <div style="clear: both"></div>
```



- **父级添加overflow属性**

   为父亲添加属性 

```html
  overflow: hidden;
```

**无法显示溢出的部分** 代码简洁

- **:after 伪元素法**  （百度  阿里 淘宝）

``` html
  .clearfix:after {
    content: "";
   	display: block;
    height: 0;
	clear: both;
	visibility: hidden;
 	}
	.clearfix {
 	   *zoom: 1;
	}
```

然后给父元素添加类

< div class="box clearfix" >

- **双伪元素清除浮动法** (小米 腾讯)

```html
  .clearfix:before, .clearfix:after {
   		content="";
   		display: table;
  }
  .clearfix:after {
   		clear: both;
  }
  .clearfix: {
  		*zoom: 1;
  }
```

父级双伪元素

### 6 PS切图

#### 6.1 常见图片格式

1.  JPEG  产品类图片常用
2. GIF  实际常用于图片小动画效果
3. PNG 切成背景透镜的图片，选择PNG
4. PSD  Photoshop专用格式，可以直接从上面复制文字。还可以测量大小和距离

#### 6.2 PS切图

##### 6.2.1 图层切图

 右击图层，导出为PNG

多个图层合并  选择后ctrl+E后导出

##### 6.2.2 切片切图

1. 利用切片选择图片
2. 导出 存储为web设备所用格式

##### 6.2.3 PS插件切图

cutterman 切图



### CSS属性书写顺序

遵循以下顺序

1. 定位布局属性：display/position/float/clear/visibility/overflow

2. 自身属性:

   width/height/padding/margin/border/background

3. 文本属性:

   color/font/text-decoration/text-align/white-space/break-word

4. 其他属性(css3):

   content/cursor/border-radius/box-shadow/text-shadow/background:linear-gradient...

### 7 CSS定位

