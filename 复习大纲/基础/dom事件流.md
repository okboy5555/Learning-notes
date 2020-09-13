property 和 attribute 的区别是什么
property 的获取和修改，是直接改变 JS 对象，而 attribute 是直接改变 HTML 的属性
attribute 就是对 HTML 属性的 get 和 set，和 DOM 节点的 JS 范畴的 property 没有关系
get 和 set attribute 时，还会触发 DOM 的查询或者重绘、重排，频繁操作会影响页面性能

例子1
body a
  div b
    button c
    button2 d

触发顺序 b => c => a

设置 Bdiv.addEventListener('click', b, true)

例子2


<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
对于以上 HTML 代码结构，要求点击p1时候进入激活状态，点击其他任何<p>都取消激活状态，如何实现
var body = document.body
bindEvent(body, 'click', function (e) {
    // 所有 p 的点击都会冒泡到 body 上，因为 DOM 结构中 body 是 p 的上级节点，事件会沿着 DOM 树向上冒泡
    alert('取消')
})

var p1 = document.getElementById('p1')
bindEvent(p1, 'click', function (e) {
    e.stopPropagation() // 阻止冒泡
    alert('激活')
})
