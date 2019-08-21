const { Rule, LinValidator } = require('@src/core/lin_validator');
const User = require('../model/user');

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.nickname = [new Rule('isLength', '昵称长度限制在4~32个字符', { min: 4, max: 32 })];
    this.email = [new Rule('isEmail', '邮箱格式错误')];
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ];
    this.password2 = this.password1;
  }
  /**
   * 密码校验（约定以validate开头的参数自定义校验function)
   * @param {object} vals 客户端参数
   */
  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }
  /**
   * 邮箱校验（约定以validate开头的参数自定义校验function)
   * @param {object} vals 客户端参数
   */
  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      throw new Error('Email已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [];
  }
}

module.exports = { RegisterValidator, TokenValidator };
