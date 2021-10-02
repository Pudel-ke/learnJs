## 离线应用与客户端存储

### 离线检测

HTML5定义 属性 navigator.onLine   为true表示设备能上网 false表示设备离线

> IE6+  Safari能够正常使用
>
> Firefox3+  Opera10.6 支持navigator.onLIne，但需要手动设置
>
> Chrome11及之前版本始终将navigator属性设置为true

属性检测示例

```js
if (navigator.onLine) {
 //正常工作
}
else {
	//离线工作
}
```

HTML5定义了网络状态变化的事件

```js
EventUtil.addHandler(window, "online", function(){
    alert("online");
})
Event.addHandler(window, "offline", function(){
    alert("offline");
})
```

为检测应用是否离线，页面加载后先通过navigator.onLine取得初始状态，然后通过上述事件确认状态变化。

### 应用缓存

应用缓存(aoocache)

从浏览器缓存中分出的缓存区，使用描述文件列出要下载和缓存的资源。

```
CACHE MANIFEST
#Comment

file.js
file.css
```

关联方式

```html
<html manifest="/offline.manifest">
    .
    .
    .
</html>
```

描述文件的MIME（媒体类型）必须是text/cache-manifest。现在扩展名推荐使用appcache。

可以通过applicationCache对象的update()方法手工干预，让应用缓存检查更新以触发：

- checking  查找更新时触发
- error  检查或下载资源时出错
- noupdate 检查文件无变化
- downloading  开始下载资源时触发
- progress  下载缓存中不断触发
- updateready  缓存下载完毕
- cached 应用缓存完整  

```js
EventUtil.addHandler(applicationCache, "updateready", function(){
    applicationCache.swapCache(); //启用新应用缓存
});
```



### 数据存储

[客服端存储的前端面试题](https://zhuanlan.zhihu.com/p/31656937)

#### Cookie

HTTP Cookie，最初是在客户端用于存储会话信息。

服务器对任意HTTP请求发送Set-Cookie  HTTP 头作为响应的一部分，名称和值在传送时都是URL编码的。

1. 限制

- 绑定在特定域名下

  设定一个特定cookie后，再给创建它的域名发送请求时，都会包含这个cookie。

- 每个域cookie总数有限，超过域名限制后会清除以前的cookie。整个cookie长度限制在4095B以内。

2. 构成

- 名称  最好看做区分大小写
- 值  储存在cookie中字符串值，需经过URL编码
- 域  cookie对哪个域有效
- 路径  指定域中的某个路径会向服务器发送cookie
- 失效时间  cookie何时应该被删除的**时间戳**
- 安全标志   指定后，只在使用SSL连接时才发送到服务器 

每段作为Set-Cookie头的一部分，使用分号加空格分隔每一段。如

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value
```

**只有名值对会被发送到服务器**。

3. JavaScript中的cookie

   使用BOM的document.cookie属性，返回所有cookie的字符串（根据cookie的域，路径，失效时间和安全设置）

   name1=value1;name2=value2;name3=value3

   所有名字和字都是经过URL编码 ，故需要decodeURLComponent()来解码

   设置cookie并不会覆盖原，除非设置的cookie名已存在

   name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure

```js
var CookieUtil = {

    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;

        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart); //
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}
```

4. 子cookie

   为绕开单域名下的cookie数限制而生。

   name=name1=value&name2=value2&name3=value3

5. 关于cookie的思考

   所有的cookie会由浏览器作为请求的头部发送，cookie中存储大量信息会影响到特定域的请求性能。

#### IE用户数据

#### WEB存储机制

- sessionStorage对象
- globalStorage对象
- localStorage对象

#### IndexDB

