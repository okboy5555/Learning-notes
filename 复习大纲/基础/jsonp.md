就是利用<script>标签没有跨域限制的“漏洞”来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如：     <script src="http://www.example.net/api?param1=1&param2=2"></script>     
并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。     
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：     callback({"name":"hax","gender":"Male"})     这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。



# jsonp 安全问题

## CSRF 攻击

前端构造一个恶意页面，请求 JSONP 接口，收集服务端的敏感信息。如果 JSONP 接口还涉及一些敏感操作或信息（如登陆、删除等操作）就更不安全了。

**解决办法**：验证 JSONP 的调用来源（Referer），服务端判断 Referer 是否是白名单，或者部署随机 Token 来防御；避免敏感接口使用 JSONP 方法。

## XSS 漏洞

不严谨的 content-type 导致的 XSS 漏洞，如果没有严格定义好 content-type（content-type：application/json），再加上没有过滤 callback 的参数，直接当 html 解析，就是一个赤裸裸的 XSS。

**解决办法**：严格定义 content-type：application/json，然后严格过滤 callback 后的参数并限制长度（进行字符转译），这样返回的脚本内容会变成文本格式，脚本将不会执行）
