// 基础数据模型
class BaseModel {
  constructor(data, message) {
    // 希望data保持对象类型，如果传过来的是字符串，将数据给message
    if(typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }

    if(data) {
      this.data = data;
    }

    if(message) {
      this.message = message;
    }
  }
}

// 成功模型
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0
  }
}

// 失败模型
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}