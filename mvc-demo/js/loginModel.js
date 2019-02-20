define(function () {

    var LoginModel;

    LoginModel = (function(){
        var _LoginModel;

        _LoginModel = function () {
           this.userInfo = {userName:"", password:""};
           this.views = [];
        };

        _LoginModel.prototype = {
            //注册视图
            register: function (view) {
                this.views.push(view);
            },
            //通知视图
            notify: function () {
                var self = this;
                this.views.forEach(function (v) {
                    v.render(self);
                });
            },
            //保存用户信息
            saveUserInfo: function (userInfo) {
                this.userInfo = userInfo;
            },
            //获取用户名
            getUserName: function () {
                return this.userInfo.userName;
            },
            //设置用户名
            setUserName: function (name) {
                this.userInfo.userName = name;
            },
            //设置密码
            setPassword: function (pw) {
                this.userInfo.password = pw;
            }
        };

        return _LoginModel;
    })();
    

    return {LoginModel: LoginModel};
});