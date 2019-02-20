/**
 * [名称]
 * 登录视图类
 * [描述]
 *
 * [主要方法]
 *
 * [使用说明]
 * var obj = new xx();
 * obj.xx(param);
 *
 * [依赖对象]
 *  loginController
 * [创建日期]
 *
 * [作者]
 *  Qiutm
 * [版本]
 *  1.0
 *
 */
define(function () {
  var LoginView

  LoginView = (function () {
    var _LoginView,
      _VM,
      _defaultEvent

    // 默认事件
    _defaultEvent = function () {
      $("input[name='login']").off('click').on('click', function () {
        _VM.login({
          userName: $("input[name='username']").val(),
          password: $("input[name='password']").val()
        })
      })
    }

    _LoginView = function (viewModel) {
      _VM = viewModel
      _defaultEvent()
    }

    _LoginView.prototype = {
      /**
             * 登录后提示
             * @param  {object} data [用户信息]  {userName:"", password:""}
             */
      render: function (data) {
        var name = data.userName
        if (name === '') {
          $('#tip').html('登录失败!&emsp;用户名或密码错误')
        } else {
          $('#tip').html('登录成功!&emsp;' + '用户名：' + name)
        }
      }
    }

    return _LoginView
  })()

  return { LoginView: LoginView }
})
