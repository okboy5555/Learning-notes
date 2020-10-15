http访问控制CORS

预检请求

简单请求不会触发预检请求
非简单请求会首先使用options方法发起一个预检请求到服务器，告知服务器是否允许该实际请求
大多数浏览器不支持预检请求重定向，如果发生重定向，浏览器会报错
解决方法：
去掉预检请求的重定向
将实际请求变成一个简单请求
发出一个简单请求，判断真正预见请求返回什么地址
发出另一个请求（真正的请求），使用在上一步通过Response.url 或 XMLHttpRequest.responseURL获得的URL

如果是由于Authorization字段引发的预检请求，那么只能要求服务端修改

附带身份凭证的请求
客户端设置：withCredentials：true
服务器不可以设置Access-Control-Allow-Origin：“*”，请求将会失败，需要设置成具体的域
服务器需要设置Access-Control-Allow-Credentials: true 否则cookie会丢失



预检请求例子
客户端
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

服务端
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain