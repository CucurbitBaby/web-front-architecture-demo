define(function () {
  var LoginModel

  LoginModel = (function () {
    var _LoginModel

    _LoginModel = function () {
      this.userInfo = {userName: '', password: ''}
    }

    _LoginModel.prototype = {
      // 获取用户信息
      getUserInfo: function () {
        return this.userInfo
      }
    }

    return _LoginModel
  })()

  return {LoginModel: LoginModel}
})
