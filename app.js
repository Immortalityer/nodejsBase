const querystring = require('querystring');
const handleBlogRoute = require('./src/routes/blog');

// 业务代码

// 处理POST数据
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({});
      return;
    }

    if(req.headers['Content-Type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = '';
    req.on("data", (chunk) => {
      postData += chunk.toString();
    })

    req.on("end", () => {
      resolve(JSON.stringify(postData));
    })
  })

  return promise;
}

// 服务器业务代码
const serverHandler = (req, res) => {
  // 设置响应格式
  res.setHeader('Content-Type','application/json');

  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 处理post数据
  getPostData(req).then((postData) => {
    req.body = postData;
    // promise是异步，需要将下列代码移到内部
    // 路由数据
    const blogDataPromise = handleBlogRoute(req, res);

    if(blogDataPromise) {
      blogDataPromise.then((blogData) => {
        res.end(
          JSON.stringify(blogData)
        )
      });
      return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 not found');
    res.end();
  })
}


module.exports = serverHandler;