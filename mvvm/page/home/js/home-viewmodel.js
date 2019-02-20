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
define(["page/home/js/home-model", "page/home/js/home-view"], function (homeModel, homeView) {

    var HomeViewModel;

    HomeViewModel = (function(){
        var _homeViewModel,
            _HV,
            _HM;

        /**
         * 1.实例化主页业务模型对象
         * 2.实例化主页视图对象
         * 3.数据双向绑定
         */
        _homeViewModel = function(){ 
            var _HV = new homeView.HomeView(this);  
            var _HM = new homeModel.HomeModel();
            this.vm = new MVVM({
                data: _HM.getTeachInfo(), 
                callback: _HV.renderTeacherInfo
            });       
        };

        _homeViewModel.prototype = {
            init: function () {

            }
        };

        return _homeViewModel;
     
    })();

    return {HomeViewModel: HomeViewModel};
});