 /**
 * [名称]
 * 主页视图类
 * [描述]
 *   
 * [主要方法]
 * 
 * [使用说明]
 * var obj = new xx();
 * obj.xx(param);
 *
 * [依赖对象]
 *  loginController
 * [创建日期]
 *  
 * [作者]
 *  Qiutm
 * [版本]
 *  1.0
 *
 */
define(function () {
    var HomeView;

    HomeView = (function(){
         var _homeView,
            _VM,
            _defaultEvent,
            _render;

        //默认事件
        _defaultEvent = function () {
            
        };

        _homeView = function(viewModel){
            _VM = viewModel;
            _defaultEvent();
        };

        _homeView.prototype = {
            /**
             * 渲染教学信息
             * @param  {object} teachInfo [教学信息]
             */
            renderTeacherInfo: function (teachInfo) {
                // body...
            }
        };

        return _homeView;
    })();

    return {HomeView: HomeView};
});