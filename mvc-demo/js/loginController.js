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
define(["js/loginView", "js/loginModel"], function (loginView, loginModel) {

    var  LoginController;

    LoginController = (function () {
        var _loginController,
            _LM,
            _LV;

        _loginController = function(){ 
            _LM = new loginModel.LoginModel();
            _LV = new loginView.LoginView(this);
            _LM.register(_LV);
        };

        _loginController.prototype = {
            /**
             * 登陆事件
             * 1.检查登录的输入文本
             * 2.输入符合校验规则则保存
             * 3.通知loginView更新视图
             * @param  {object} userInfo [页面抓取的用户信息]
             */
            login: function (userInfo) {
                var name,
                    pw,
                    patt,
                    patt2;              
                name = userInfo.userName;
                pw = userInfo.password;
                patt = /^\w+$/;
                patt2 = /^[0-9]{8}$/;
                if(patt.test(name) && patt2.test(pw)){
                    _LM.saveUserInfo(userInfo); 
                } 
                _LM.notify();   
            },
        };

        return _loginController;
    })();
     
    return {LoginController: LoginController};
});