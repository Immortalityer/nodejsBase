// 连接数据库，并进行操作
const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接数据
const connection =  mysql.createConnection(MYSQL_CONFIG);

// 开始链结
connection.connect();

// 执行sql语句
const sql = `INSERT INTO blogs (title,content,author,createdAt) VALUES ('标题3','内容3','wangwu','456789');`;
// connection.query(sql, (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('result', result);
// })

// 封装执行sql语句
// function execSQL(sql, callback) {
//   connection.query(sql, callback);
// }

function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  })

  return  promise;
}

module.exports = {
  execSQL
}