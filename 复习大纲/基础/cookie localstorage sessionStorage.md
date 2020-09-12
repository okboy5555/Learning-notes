cookie
由于HTTP是一种无状态的协议，服务器单从网络连接上是无法知道客户身份的。这时候服务器就需要给客户端颁发一个cookie，用来确认用户的身份。

服务器端向客户端发送Cookie是通过HTTP响应报文实现的，在Set-Cookie中设置需要向客户端发送的cookie

session
Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。
客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

工作步骤：
将客户端称为 client，服务端称为 server

产生 sessionID：session 是基于 cookie 的一种方案，所以，首先要产生 cookie。client 第一次访问 server，server 生成一个随机数，命名为 sessionID，并将其放在响应头里，以 cookie 的形式返回给 client，client 以处理其他 cookie 的方式处理这段 cookie。大概是这样：cookie：sessionID=135165432165


保存 sessionID： server 将要保存的数据保存在相对应的 sessionID 之下，再将 sessionID 保存到服务器端的特定的保存 session 的内存中（如 一个叫 session 的哈希表）


使用 session： client 再次访问 server，会带上首次访问时获得的 值为 sessionID 的cookie，server 读取 cookie 中的 sessionID，根据 sessionID 到保存 session 的内存寻找与 sessionID 匹配的数据，若寻找成功就将数据返回给 client。


localStorage
localStorage 是 HTML5 提供的一个 API，他本质上是一个hash（哈希表），是一个存在于浏览器上的 hash（哈希表）。
localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

localStorage的特点
localStorage 理论上永久有效，除非用户清理缓存
不同的浏览器，对每个域名 localStorage 的最大存储量的规定不一样，超出存储量会被拒绝。最大存5M 超过5M的数据就会丢失。而 Chrome 10MB 左右
只有相同域名的页面才能互相读取 localStorage，同源策略与 cookie 一致

sessionStorage的特点
sessionStorage 的有效期是页面会话持续，如果页面会话（session）结束（关闭窗口或标签页），sessionStorage 就会消失。而 localStorage 则会一直存在



Cookie如何应对的 CSRF攻击？
方案一：放弃Cookie、使用Token！
由于CSRF是通过Cookie伪造请求的方式，欺骗服务器，来达到自己的目的。那么我们采取的策略就是，不使用Cookie的方式来验证用户身份，我们使用Token！
Token的策略，一般就是登陆的时候，服务端在response中，返回一个token字段，然后以后所有的通信，前端就把这个token添加到http请求的头部。
这是当前，最常用的防御CSRF攻击的策略。
方案二：SameSite Cookies
前端在发展，Cookie也在进化，Cookie有一个新的属性——SateSite。能够解决CSRF攻击的问题。
它表示，只能当前域名的网站发出的http请求，携带这个Cookie。
当然，由于这是新的cookie属性，在兼容性上肯定会有问题。
方案三：服务端Referer验证
我们发送的http请求中，header中会带有Referer字段，这个字段代表的是当前域的域名，服务端可以通过这个字段来判断，是不是“真正”的用户请求。
也就是说，如果b网站伪造a网站的请求，Referer字段还是表明，这个请求是b网站的。也就能辨认这个请求的真伪了。

Cookie 如何应对 XSS攻击？
方案一：http-only
Cookie有一个http-only属性，表示只能被http请求携带。
假如你的网站遭受到XSS攻击，攻击者就无法通过document.cookie得到你的cookie信息。
方案二：正则校验
我们了解到，XSS是由于不安全的数据引起的，这些数据的来源，一个重要的渠道就是提交表单，注入到数据库。所以针对前端，我们需要把表单数据进行正则验证，通过验证之后，才能提交数据。
对于服务端，也应该对接受的数据，进行规则校验，不符合规则的数据不应该入库。从接口层面，保证数据安全。
方案三：数据转义
如果无法保证数据库的数据都是安全的，前端能做的事情就是，把所有需要展示到页面的数据，进行转义，比如遇到script标签，直接replace处理。或者遇到标签标识‘<’以及‘>’这类特殊字符，添加‘\’进行处理。
