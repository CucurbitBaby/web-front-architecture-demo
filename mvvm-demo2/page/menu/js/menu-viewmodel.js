 /**
 * [名称]
 * 菜单业务类
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
define(["page/menu/js/menu-model", "page/menu/js/menu-view"], function (menuModel, menuView) {
    var MenuViewModel;

    MenuViewModel = (function () {
        var _constr,
            _MV,
            _MM;
        _constr = function () {
            _MM = new menuModel.MenuModel();
            _MV = new menuView.MenuView();                    
        };

         _constr.prototype = {
            /**
             * 初始化
             * 1.从userInfo模块获取用户类型，加载相应菜单
             */
            init: function(){
                window.Monitor.monitorData({data: _MM.getMenu(), fn: _MV.renderMenu});

                window.Router.loadModule("userInfo", function(userInfo){
                    var userType = userInfo.getUserType();
                    _MM.setMenu(userType);              
                });  
                this.test();
            },
            test: function(){
                setTimeout(function(){
                    _MM.setMenu("school");
                }, 2000);
            }
        };
        return _constr;
    })();

    return {MenuViewModel: MenuViewModel};
});