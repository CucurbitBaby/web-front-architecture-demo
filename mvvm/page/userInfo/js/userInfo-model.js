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
            /**
             * 保存用户信息
             * @param  {object} userInfo [用户信息]
             */
            saveUserInfo: function (userInfo) {
                $.extend(this.userInfo, userInfo);
            },

            /**
             * 获取用户名
             * @return {string} [用户名]
             */
            getUserName: function () {
                return this.userInfo.userName;
            },

            /**
             * 设置用户名
             * @param {string} [用户名]
             */
            setUserName: function (name) {
                this.userInfo.userName = name;
            },

            /**
             * 获取用户类型
             * @return {string} [用户类型]
             */
            getUserType: function(){
                return this.userInfo.userType;
            },
            /**
             * 设置用户类型
             * @param {string} userType [用户类型]
             */
            setUserType: function(userType){
                this.userInfo.userType = userType;
            },

            /**
             * 获取用户信息
             * @return {object} [用户信息]
             */
            getUserInfo: function(){
                return this.userInfo;
            }
        };
        return _constr;
    })();

    return {UserInfoModel: UserInfoModel};
});