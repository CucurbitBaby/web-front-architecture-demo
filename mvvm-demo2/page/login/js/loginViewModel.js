 /**
 * [名称]
 * 登录业务类
 * [描述]
 *  登录业务实现
 * [主要方法]
 * 
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
define(["page/login/js/loginModel", "page/login/js/loginView"], function (loginModel, loginView) {

    var LoginViewModel;

    LoginViewModel = (function(){
        var _loginViewModel;

        /**
         * 实例化登录业务模型，登录视图
         */
        _loginViewModel = function(){ 
            _LM = new loginModel.LoginModel();
            _LV = new loginView.LoginView(this);
        };

        _loginViewModel.prototype = {        
            /**
             * 登陆事件
             * 1.检查登录的输入文本
             * 2.输入符合校验规则则保存
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
                    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));             
                    window.location.href = "../home.html";
                }else if(!patt.test(name) && patt2.test(pw)){
                    _LV.showErrorTip({type: "用户名"});
                }else if(patt.test(name) && !patt2.test(pw)){
                    _LV.showErrorTip({type: "密码"});
                }else{
                    _LV.showErrorTip({type: "用户名和密码"});
                }
            },
            saveUserName: function (name) {
                _LM.setUserName(name);
            },
            saveUserInfo: function (userInfo){
                _LM.saveUserInfo(userInfo);
                window.ShareStore.storeData({key: "userInfo", value:{data:_LM.getUserInfo()}});
            }
        };

        return _loginViewModel;
    })();
     
    return {LoginViewModel: LoginViewModel};
});