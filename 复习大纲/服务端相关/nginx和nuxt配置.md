```
#通过upstream nodejs 可以配置多台nodejs节点，做负载均衡
#keepalive 设置存活时间。如果不设置可能会产生大量的timewait
#proxy_pass 反向代理转发 http://nodejs

upstream nodenext {
	server 127.0.0.1:3001; #next项目 监听端口
	keepalive 64;
}

server {
	listen 80;
	server_name next.sosout.com;
	location / {
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;  
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $host;
		proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://nodenext; #反向代理
	}
}

upstream nodenuxt {
	server 127.0.0.1:3002; #nuxt项目 监听端口
	keepalive 64;
}

server {
	listen 80;
	server_name nuxt.sosout.com;
	location / {
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;  
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $host;
		proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://nodenuxt; #反向代理
	}
}
```

nuxt配置
```
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "start": "PORT=3002 nuxt start",
    "build": "nuxt build && npm start"
  }
}

```

部署（以nuxt为例）
基础模板的部署方式
何为基础模板？使用了vue init nuxt-community/starter-template <project-name>进行搭建的！

第一步，打包
在执行npm run build的时候，nuxt会自动打包。

第二步，选择要部署的文件（社友最关心的步骤）：
.nuxt/文件夹
package.json文件
nuxt.config.js文件(如果你配置proxy等，则需要上传这个文件，建议把它传上去)
第三步，启动你的nuxt：
使用pm2启动你的nuxt.js：

$ npm install // or yarn install 如果未安装依赖或依赖有更改
$ pm2 start npm --name "my-nuxt" -- run start
