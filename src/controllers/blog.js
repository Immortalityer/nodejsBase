// 博客相关的方法
const { execSQL } = require("../db/mysql");

// 获取列表数据
const getList = (author, keyword) => {
  // 从数据库获取
  // 数据库操作语句
    let sql = `select * from blogs where true`;

    if(author) {
      sql += ` and author='${author}' `;
    }

    if(keyword) {
      sql += `and title like '%${keyword}%'`;
    }

    return execSQL(sql);
}

// 获取详情数据
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;

  return execSQL(sql);
}

// 创建新的博客
const createNewBlog = (blogData) => {
  // 用于新建博客的数据
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createdAt = Date.now();

  let sql = `insert into blogs (title, content, author, createdAt) values ('${title}', '${content}', '${author}', '${createdAt}')`

  return execSQL(sql).then(insertResult => {
    return {
      id: insertResult.insertId
    }
  });
}

// 更新博客
const createUpdataBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;

  let sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

  return execSQL(sql).then(updateResult => {
    if (updateResult.affectedRows > 0) {
      return true;
    }

    return false;
  });
}

// 删除博客
const deleteBlog = (blogData) => {
  console.log('删除博客');

  return true;
}

module.exports = {
  getList,
  getDetail,
  createNewBlog,
  createUpdataBlog,
  deleteBlog
};