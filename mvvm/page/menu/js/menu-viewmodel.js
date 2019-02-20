 /**
 * [名称]
 * 菜单业务类
 * [描述]
 *  管理菜单业务逻辑，绑定数据和视图
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
            _MM,
            _updateMenu;

        _updateMenu = function(type){
            _MM.setMenu(type);
        };

        /**
         *  构造函数
         *  1.实例化菜单业务模型，菜单视图
         *  2.数据双向绑定
         */
        _constr = function () {
            _MM = new menuModel.MenuModel();
            _MV = new menuView.MenuView(); 
            this.vm = new MVVM({
                data: _MM.getMenu(), 
                callback: _MV.renderMenu
            });                    
        };

         _constr.prototype = {
            /**
             * 初始化
             * 1.订阅userInfo模块的userType属性，加载相应菜单
             */
            init: function(){
                var UVM = Router.getModule("UserInfoViewModel");
                if(UVM){
                    UVM.getVM().watch(_updateMenu, "userType"); 
                }else{
                    Router.loadModule("userInfo", function(userInfoVM){
                        userInfoVM.getVM().watch(_updateMenu, "userType");                       
                    });
                }
            }
        };
        return _constr;
    })();

    return {MenuViewModel: MenuViewModel};
});