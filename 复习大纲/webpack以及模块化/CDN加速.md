接入cdn
导入资源时都是通过相对路径去访问的，当把这些资源都放到同一个 CDN 服务上去时，网页是能正常使用的。 但需要注意的是由于 CDN 服务一般都会给资源开启很长时间的缓存，例如用户从 CDN 上获取到了 index.html 这个文件后， 即使之后的发布操作把 index.html 文件给重新覆盖了，但是用户在很长一段时间内还是运行的之前的版本，这会新的导致发布不能立即生效

要避免以上问题，业界比较成熟的做法是这样的：

针对 HTML 文件：不开启缓存，把 HTML 放到自己的服务器上，而不是 CDN 服务上，同时关闭自己服务器上的缓存。自己的服务器只提供 HTML 文件和数据接口。
针对静态的 JavaScript、CSS、图片等文件：开启 CDN 和缓存，上传到 CDN 服务上去，同时给每个文件名带上由文件内容算出的 Hash 值， 例如app_a6976b6d.css 文件。 带上 Hash 值的原因是文件名会随着文件内容而变化，只要文件发生变化其对应的 URL 就会变化，它就会被重新下载，无论缓存时间有多长。

除此之外，如果你还知道浏览器有一个规则是同一时刻针对同一个域名的资源并行请求是有限制的话（具体数字大概4个左右，不同浏览器可能不同）， 你会发现上面的做法有个很大的问题。由于所有静态资源都放到了同一个 CDN 服务的域名下，也就是上面的 cdn.com。 如果网页的资源很多，例如有很多图片，就会导致资源的加载被阻塞，因为同时只能加载几个，必须等其它资源加载完才能继续加载。 要解决这个问题，可以把这些静态资源分散到不同的 CDN 服务上去， 例如把 JavaScript 文件放到 js.cdn.com 域名下、把 CSS 文件放到 css.cdn.com 域名下、图片文件放到 img.cdn.com 域名下

用 Webpack 实现 CDN 的接入
静态资源的导入 URL 需要变成指向 CDN 服务的绝对路径的 URL 而不是相对于 HTML 文件的 URL。
静态资源的文件名称需要带上有文件内容算出来的 Hash 值，以防止被缓存。
不同类型的资源放到不同域名的 CDN 服务上去，以防止资源的并行加载被阻塞。

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // 省略 entry 配置...
  output: {
    // 给输出的 JavaScript 文件名称加上 Hash 值
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    publicPath: '//js.cdn.com/id/',
  },
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          // 压缩 CSS 代码
          use: ['css-loader?minimize'],
          // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
          publicPath: '//img.cdn.com/id/'
        }),
      },
      {
        // 增加对 PNG 文件的支持
        test: /\.png$/,
        // 给输出的 PNG 文件名称加上 Hash 值
        use: ['file-loader?name=[name]_[hash:8].[ext]'],
      },
      // 省略其它 Loader 配置...
    ]
  },
  plugins: [
    // 使用 WebPlugin 自动生成 HTML
    new WebPlugin({
      // HTML 模版文件所在的文件路径
      template: './template.html',
      // 输出的 HTML 的文件名称
      filename: 'index.html',
      // 指定存放 CSS 文件的 CDN 目录 URL
      stylePublicPath: '//css.cdn.com/id/',
    }),
    new ExtractTextPlugin({
      // 给输出的 CSS 文件名称加上 Hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    // 省略代码压缩插件配置...
  ],
};
```

以上代码中最核心的部分是通过 publicPath 参数设置存放静态资源的 CDN 目录 URL， 为了让不同类型的资源输出到不同的 CDN，需要分别在：

output.publicPath 中设置 JavaScript 的地址。
css-loader.publicPath 中设置被 CSS 导入的资源的的地址。
WebPlugin.stylePublicPath 中设置 CSS 文件的地址。
设置好 publicPath 后，WebPlugin 在生成 HTML 文件和 css-loader 转换 CSS 代码时，会考虑到配置中的 publicPath，用对应的线上地址替换原来的相对地址。