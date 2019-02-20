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
define(["vm/loginPresenter"], function (loginPresenter) {

    var LoginView;

    LoginView = (function () {
        var _LoginView,
            _LC,
            _defaultEvent,
            _showTip;   

        /**
         * 登录后提示
         * @param  {object} data [用户信息]  {userName:"", password:""}
         */
        _showTip = function (data) {
            var name = data.userName;
            if(name === ""){
                $("#tip").html("登录失败!&emsp;用户名或密码错误");
            }else{
                $("#tip").html("登录成功!&emsp;" + "用户名："+ name);
            }
        };

        //默认事件
        _defaultEvent = function () {
            $("input[name='login']").off("click").on("click", function () {
                _LC.login({
                    userName: $("input[name='username']").val(),
                    password: $("input[name='password']").val()
                }, _showTip);
            });
        };

        _LoginView = function(){
            _LC = new loginPresenter.LoginPresenter();
        };

        _LoginView.prototype = {
            /**
             * 初始化
             * 加载交互事件
             */
            init: function () {
                _defaultEvent();
            }
        };

        return _LoginView;
    })();

    return {LoginView: LoginView};
});