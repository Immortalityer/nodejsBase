// 连接数据库，并进行操作
const mysql = require('mysql');

// 创建连接数据
const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'myblog'
});

// 开始链结
connection.connect();

// 执行sql语句
const sql = `INSERT INTO blogs (title,content,author,createdAt) VALUES ('标题3','内容3','wangwu','456789');`;
connection.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('result', result);
})

// 关闭连接
connection.end();