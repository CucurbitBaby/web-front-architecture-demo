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
    var LoginView;

    LoginView = (function(){
        var _loginView,
            _VM,
            _defaultEvent,
            _showErrorTip,
            _render;

        _showErrorTip = function (param) {
           alert("登录失败!" + param.userName + "不合法");
        };

        //默认事件
        _defaultEvent = function () {
            $("input[name='login']").off("click").on("click", function () {
                _VM.login({
                    userName: $("input[name='username']").val(),
                    password: $("input[name='password']").val()
                });
            });
        };

        _LoginView = function(viewModel){
            _VM = viewModel;  
            _defaultEvent();      
        };

        _LoginView.prototype = {
            showErrorTip: function (param) {
                alert("登录失败!" + param.type + "不合法");
            },
            showUserInfo: function (param) {
                alert("用户名："+param);
            }
        };

        return _LoginView;
    })();

    return {LoginView: LoginView};
});