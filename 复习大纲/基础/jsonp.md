就是利用<script>标签没有跨域限制的“漏洞”来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如：     <script src="http://www.example.net/api?param1=1&param2=2"></script>     
并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。     
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：     callback({"name":"hax","gender":"Male"})     这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。
