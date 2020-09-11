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