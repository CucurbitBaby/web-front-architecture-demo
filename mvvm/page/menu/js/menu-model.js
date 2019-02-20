 /**
 * [名称]
 * 菜单底层类
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
    var MenuModel;

    MenuModel = (function () {
        var _constr;

        _constr = function () {
            this.menu = {
                menu:[]
            };
        };
         _constr.prototype = {
            /**
             * 获取菜单
             * @return {object}    [菜单信息]
             */
            getMenu: function(){
                return this.menu;
            },

            /**
             * 设置菜单
             * @param {[string]} userType [用户类型]
             */
            setMenu: function(userType){
                var menu;
                if(userType === "admin"){
                    menu = [{
                        menuName:"首页",
                        menuRouter:"home"
                    },{
                        menuName:"科目",
                        menuRouter:"subject"
                    },{
                        menuName:"班级",
                        menuRouter:"class"
                    },{
                        menuName:"教师",
                        menuRouter:"teacher"
                    }];
                }else if(userType === "school"){
                    menu = [{
                        menuName:"首页",
                        menuRouter:"home"
                    },{
                        menuName:"学校",
                        menuRouter:"school"
                    }];
                }
                $.extend(this.menu, {menu:menu});
            }
        };
        return _constr;
    })();

    return {MenuModel: MenuModel};
});