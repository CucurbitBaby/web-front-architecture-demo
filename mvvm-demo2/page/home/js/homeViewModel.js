 /**
 * [名称]
 * 主页业务类
 * [描述]
 *  主页业务实现
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
define(["page/home/js/homeModel", "page/home/js/homeView"], function (homeModel, homeView) {

    var HomeViewModel;

    HomeViewModel = (function(){
        var _homeViewModel;

        /**
         * 1.实例化主页业务模型对象
         * 2.实例化主页视图对象
         */
        _homeViewModel = function(){ 
                
        };

        _homeViewModel.prototype = {

        };

        return _homeViewModel;
     
    })();

    return {HomeViewModel: HomeViewModel};
});