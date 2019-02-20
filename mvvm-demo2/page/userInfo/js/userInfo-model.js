 /**
 * [名称]
 * 用户信息底层类
 * [描述]
 *  
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
define(function () {
    var UserInfoModel;

    UserInfoModel = (function () {
        var _constr;

        _constr = function () {
            this.userInfo = {userType:"admin", userName:"dfa", password:"123456"};
        };
         _constr.prototype = {
            saveUserInfo: function (userInfo) {
                $.extend(this.userInfo, userInfo);
            },
            getUserName: function () {
                return this.userInfo.userName;
            },
            setUserName: function (name) {
                this.userInfo.userName = name;
            },
            getUserType: function(){
                return this.userInfo.userType;
            }
        };
        return _constr;
    })();

    return {UserInfoModel: UserInfoModel};
});