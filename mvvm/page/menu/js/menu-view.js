 /**
 * [名称]
 * 菜单视图类
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
    var MenuView;

    MenuView = (function () {
        var _constr;

        _constr = function () {
            
        };
         _constr.prototype = {
            /**
             * 渲染菜单信息
             * @param  {arrray} menuList [菜单信息]
             */
            renderMenu: function (param) {
                var menuList = param.menu;
                var str = '<ul class="menu-content">';
                menuList.forEach(function (menu) {
                    str += '<li class="submenu" router="'+ menu.menuRouter +'">' + menu.menuName + '</li>';
                });
                str += '</ul>';
                $("#menu_centent").html(str);
                $(".submenu").first().addClass("selected-menu");
            }
        };
        return _constr;
    })();

    return {MenuView: MenuView};
});