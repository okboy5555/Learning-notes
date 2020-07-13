const http = require('http')

http.createServer((req,res) => {
    res.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
    })
    res.write('<h1>test http</h1>')

    res.end()
}).listen(3000)

