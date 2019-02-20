 /**
 * [名称]
 * 用户信息业务类
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
define(["page/userInfo/js/userInfo-model", "page/userInfo/js/userInfo-view"], function (UserInfoModel, UserInfoView) {
    var _UserInfoViewModel;

    _UserInfoViewModel = (function () {
        var _constr,
            _TV,
            _TM;

        /**
         *  构造函数
         *  1.实例化登录业务模型，登录视图
         *  2.渲染用户信息
         */
        _constr = function () {       
            _TM = new UserInfoModel.UserInfoModel();
            _TV = new UserInfoView.UserInfoView(this);          
            
        };

        _constr.prototype = {
            /**
             * 初始化
             * 渲染用户名
             */
            init: function(){
                _TV.renderUserName(_TM.getUserName());
            },
            /**
             * 修改用户名（当新用户名修改成功后，会自动更新top模块视图）
             * @param  {string} name [新用户名]
             */
            editUserName: function (name) {
                if(/^\w+$/.test(name)){
                    _TM.saveUserName(name);
                }
            },
            getUserType: function(){
                return _TM.getUserType();
            }
        };
        return _constr;
    })();

    return {UserInfoViewModel: _UserInfoViewModel};
});