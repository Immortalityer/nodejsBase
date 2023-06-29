const { SuccessModel, ErrorModel } = require("../model/responseModel");
const { getList, getDetail, createNewBlog, createUpdataBlog, deleteBlog } = require("../controllers/blog");

// 处理相关路由
const handleBlogRoute = (req, res) => {
  // 定义处理路由的逻辑
  const method = req.method;
  // const url = req.url;
  // const path = url.split("?")[0];
  const id = req.query.id;
  const blogData = req.body;

  // 获取列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    // /api/blog/list?author=zhangyifan&keyword=123
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listDataPromise = getList(author, keyword);

    return listDataPromise.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  // 获取详情
  if(method === 'GET' && req.path === "/api/blog/detail") {

    const detailDataPromise = getDetail(id);

    return detailDataPromise.then((detailData) => {
      return new SuccessModel(detailData)
    })
  }

  // 新增博客
  if(method === 'POST' && req.path === '/api/blog/new') {
    // 用于新建博客的数据

    const newBlogDataPromise = createNewBlog(blogData);

    return newBlogDataPromise.then(newBlogData => {
      return new SuccessModel(newBlogData);
    })
  }

  // 更新博客
  if(method === 'POST' && req.path === '/api/blog/updata') {
    const updataBlogDataPromise = createUpdataBlog(blogData);

    return updataBlogDataPromise.then(updataBlogData => {
      if(updataBlogData) {
        return new SuccessModel('更新成功');
      } else {
        return new ErrorModel('更新失败');
      }
    })
  }

  // 删除博客
  if(method === 'POST' && req.path === '/api/blog/delete') {
    const deleteBlogData = deleteBlog(id);

    if(deleteBlogData) {
      return new SuccessModel(deleteBlogData);
    } else {
      return new ErrorModel(deleteBlogData);
    }
  }
}

module.exports = handleBlogRoute