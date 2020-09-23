http缓存
缓存位置
Service Worker
Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的
当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容

Memory Cache
Memory Cache 也就是内存中的缓存，读取内存中的数据肯定比磁盘快。但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

Disk Cache
Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上
在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据

Push Cache
Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放


缓存分为强缓存（200）和协商缓存（304）

强缓存：判断本地缓存未过期，直接使用，无需发起http请求
expires
cache-control

协商缓存：浏览器会向服务器端发起http请求，然后服务器告诉浏览器文件为改变，让浏览器使用本地缓存
last-modified
e-tag

Expires
http 1.0
header添加Expires字段，表示到期时间，例子：

Expires: Wed, 21 Oct 2015 07:28:00 GMT

但是 Expires 存在一个问题，浏览器检查这个 Expires 的时间用的是电脑自身的时间，而设置 Expires 时间的是服务器，所以会存在服务器与客户端两者时间不同步的情况，这会使缓存无效

Cache-Control
Expires 是 http 1.0 就存在的缓存控制 Header ，存在上述的缺陷，所以在 http 1.1 中出了新的缓存控制 Header ，Cache-Control
设置缓存时间的用法是 Cache-Control: max-age=30 ，这代表这个 Response 的缓存时间为 30秒，这个时间是相对于请求的时间
Cache-Control 的优先级比 Expires 更高，也就是说，在 Cache-Control 设定 max-age 的情况下，以 max-age 作判断依据
Cache-Control: no-cache 是不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，如果之前的响应中存在ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。

Cache-Control: no-store 是直接禁止浏览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。

当资源过期了
首先，当前资源的 Header 设置的强缓存时间已到达期限。
所以，需要从服务器中重新获取资源。
那么，在这一步可以做个判断：比较之前缓存已到期的资源和将要重新获取的资源是否相同。
如果，得出比较结果是相同，则服务器就不发送请求资源，反之则发送请求资源
比较资源的方法就是通过 Last-Modified 和 E-tag

Last-Modified
http1.0
Last-Modified 与 If-Modified-Since 搭配使用
Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码
如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源
因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

E-tag
http 1.1
E-tag 和 If-None-Match 搭配使用
获取资源的 MD5 值，将该值设置给 E-tag 响应头，然后服务器将响应发送给浏览器，当缓存过期时，浏览器发送请求，请求头中携带 If-None-Match 信息（MD5 值）， 服务器利用这个信息来判断
如果在这段时间，资源不曾变更过（MD5 值没变化），则服务器会回一个 Status code : 304 (Not Modified) ，表示浏览器可以继续沿用这份资源
ETag 优先级比 Last-Modified 高

强缓存如何重新加载缓存缓存过的资源
通过更新页面中引用的资源路径，让浏览器主动放弃缓存，加载新资源
例如加个版本号