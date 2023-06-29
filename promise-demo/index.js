const fs = require('fs');
const path = require('path');

// 读取文件
// promise实现
function fetFileContent(filename) {
  const promise = new Promise((resolve, reject) => {
    // 获取文件的绝对路径
    const fullFilename = path.resolve(__dirname, "data", filename);

    fs.readFile(fullFilename, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(data.toString()));
    })
  })

  return promise;
}

fetFileContent('a.json').then((aData) => {
  console.log('aData', aData);
  return fetFileContent(aData.next);
}).then(bData => {
  console.log('bData', bData);
  return fetFileContent(bData.next);
}).then(cData => {
  console.log('cData', cData);
})
