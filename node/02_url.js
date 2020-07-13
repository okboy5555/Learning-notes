var url = require('url')

var http = require('http')

http.createServer((res,req) => {
    // 排除req.url == /favicon.ico
    if(req.url != '/favicon.ico') {
        
    }
})