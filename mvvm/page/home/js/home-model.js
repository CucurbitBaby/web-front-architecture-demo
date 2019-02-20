 /**
 * [名称]
 * 主页底层类
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
    var HomeModel;

    HomeModel = (function(){
         var _homeModel;

        _homeModel = function () {
            this.teachInfo = {};
        };

        _homeModel.prototype = {
            /**
             * 获取教学信息
             * @return {object} [教学信息]
             */
           getTeachInfo: function () {
               return this.teachInfo;
           }
        };

        return _homeModel;
    })();
   

    return {HomeModel: HomeModel};
});