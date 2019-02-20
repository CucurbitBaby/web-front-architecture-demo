define(function () {
    var LoginModel;

    LoginModel = (function(){
        var _LoginModel;

        _LoginModel = function () {
           this.userInfo = {userName:"", password:""};
        };

        _LoginModel.prototype = {
            //保存用户信息
            saveUserInfo: function (userInfo) {
                $.extend(this.userInfo, userInfo);
            },
            //获取用户信息
            getUserInfo: function () {
                return this.userInfo;
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