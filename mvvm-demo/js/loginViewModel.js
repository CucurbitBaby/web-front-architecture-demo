/**
 * [名称]
 * 视图模型映射类
 * [描述]
 *  模块管理模型视图的单向映射关系，模型和视图并不会直接通讯，视图提供渲染API，不会直接调用模型数据,而是通过controller提供的render方法（提供数据的处理，调用渲染API）
 * [主要方法]
 * 1.监听模型数据，有变化时更新视图
 * 2.更新视图
 * 3.设置要劫持的数据并监听属性
 * [使用说明]
 * var obj = new xx();
 * obj.xx(param);
 *
 * [依赖对象]
 *
 * [创建日期]
 *
 * [作者]
 *  Qiutm
 * [版本]
 *  1.0
 *
 */
define(['vm/loginView', 'vm/loginModel'], function (loginView, loginModel) {
  var LoginViewModel

  LoginViewModel = (function () {
    var _observeObjAttr,
      _observeObj,
      _updateView,
      _ViewModel,
      _test,
      _data

    /**
         * 监听数据方法
         * 重新定义[[getter]], [[setter]]，当数据发生变化时更新视图
         * @param  {object} obj [模型数据对象]
         * @param  {string} key [对象属性]
         * @param  value [对象属性值]
         */
    _observeObjAttr = function (obj, key, value) {
      _observeObj(value)
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          return value
        },
        set: function (newValue) {
          if (value === newValue) {
            return
          }
          value = newValue
          _observeObj(value)
          _updateView()
        }
      })
    }

    /**
         * 数据劫持
         * 1.深度遍历数据的所有可枚举属性，并监听属性
         * @param  {object} obj [模型数据对象]
         */
    _observeObj = function (obj) {
      if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(function (key) {
          var data = obj[key]
          _observeObjAttr(obj, key, data)
        })
      }
    }

    /**
         * 更新视图
         */
    _updateView = function () {
      _LV.render(_data)
    }

    _test = function () {
      setTimeout(function () {
        _data.userName = 'Qtm'
      }, 2000)
    }

    _ViewModel = function () {
      _LM = new loginModel.LoginModel()
      _LV = new loginView.LoginView(this)
      _data = _LM.getUserInfo()
      _observeObj(_data) // 数据绑定
    }

    _ViewModel.prototype = {

      /**
             * 登陆事件
             * 1.检查登录的输入文本
             * 2.输入符合校验规则则保存
             * @param  {object} userInfo [页面输入的用户信息]
             */
      login: function (userInfo) {
        var name,
          pw,
          patt,
          patt2
        name = userInfo.userName
        pw = userInfo.password
        patt = /^\w+$/
        patt2 = /^[0-9]{8}$/
        if (patt.test(name) && patt2.test(pw)) {
          $.extend(_data, {
            userName: name,
            password: pw
          })
        }
        _test() // 测试绑定数据是否有效
      }
    }

    return _ViewModel
  })()

  return {
    LoginViewModel: LoginViewModel
  }
})
