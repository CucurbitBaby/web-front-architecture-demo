 /**
 * [名称]
 * 用户信息业务类
 * [描述]
 *  管理用户信息业务逻辑，绑定数据和视图
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
define(["page/userInfo/js/userInfo-model", "page/userInfo/js/userInfo-view"], function (UserInfoModel, UserInfoView) {
    var UserInfoViewModel;

    UserInfoViewModel = (function () {
        var _constr,
            _TV,
            _TM;

        /**
         *  构造函数
         *  1.实例化登录业务模型，登录视图
         *  2.数据双向绑定
         */
        _constr = function () {       
            _TM = new UserInfoModel.UserInfoModel();
            _TV = new UserInfoView.UserInfoView(this);  
            this.vm = new MVVM({
                data: _TM.getUserInfo(), 
                callback: _TV.renderUserName
            });                    
        };

        _constr.prototype = {
            /**
             * 初始化
             */
            init: function(){
                
            },
            /**
             * 修改用户名（当新用户名修改成功后，会自动更新userInfo视图）
             * @param  {string} name [新用户名]
             */
            editUserName: function (name) {
                if(/^\w+$/.test(name)){
                    _TM.setUserName(name);
                }
            },
            /**
             * 获取用户类型
             * @return {string} [用户类型]
             */
            getUserType: function(){
                return _TM.getUserType();
            },
            /**
             * 获取viewmodel
             * @return {object} [userInfo的数据双向绑定实例]
             */
            getVM: function(){
                return this.vm;
            },
            /**
             * 选择角色
             * @param  {string} role [角色]
             */
            selectRole: function(role){
                _TM.setUserType(role);
            }
        };
        return _constr;
    })();

    return {UserInfoViewModel: UserInfoViewModel};
});