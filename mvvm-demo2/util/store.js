 /**
 * [名称]
 * 数据监听类
 * [描述]
 *  监听数据属性，当属性值变化时更新视图
 * [主要方法]
 * 1.
 * [使用说明]
 * var obj = new xx();
 * obj.xx(param);
 *
 * [依赖对象]
 *  
 * [创建日期]
 *  2018/2/18
 * [作者]
 *  Qiutm
 * [版本]
 *  1.0
 *
 */
define(function () {

    var ShareStore;

    ShareStore = function(){
        var _store,
            _data,
            _observeObjAttr,
            _observeObj,
            _updateView;

        /**
         * 监听数据方法
         * 重新定义[[getter]], [[setter]]，当数据发生变化时更新视图
         * @param  {object} obj [模型数据对象]
         * @param  {string} key [对象属性]
         * @param  value [对象属性值]
         * @param  {string} sid [数据集合的索引值]
         */
        _observeObjAttr = function (obj, key, value, sid) {
            _observeObj(value, sid);
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return value;
                },
                set: function (newValue) {
                    if(value === newValue){
                        return ;
                    }
                    value = newValue;
                    _observeObj(value, sid);
                    _updateView(sid);   //说明：每个属性变化时都调用更新视图方法性能过于低下，需要优化
                }
            });
        };

        /**
         * 数据劫持
         * 1.深度遍历数据的所有可枚举属性，并监听属性
         * @param  {object} obj [模型数据对象]
         */
        _observeObj = function (obj, sid) {
            if(obj && typeof obj === "object"){
                Object.keys(obj).forEach(function (key) {
                    var data = obj[key];                
                    _observeObjAttr(obj, key, data, sid);                               
                });
            }
        };

        /**
         * 当数据变化时更新视图
         * 查找sid对应的数据，遍历监听此数据的所有回调。
         */
        _updateView =  function (sid) { 
            var callbacks =  _data[sid].renderFns;      
            callbacks.forEach(function (c) {
                c.call(null, _data[sid].data);
            });
        };

        _store = function(){
            _data = {}; 
        };

        _store.prototype = {
            /**
             * 储存公共数据
             * @param  {object} param [数据和绑定的渲染方法]  {key:"要监听的数据名称"，value:{data:"要监听的数据"，renderFns:"可选，要绑定的渲染方法数组"}}
             */
            storeData: function (param) {
                if(_data[param.key]){
                    $.extend(_data[param.key], param.value);
                }else{
                    _data[param.key] = param.value;
                }  
                if(!param.value.renderFns) {
                    _data[param.key].renderFns = [];
                }        
                _observeObj(_data[param.key].data, param.key);
            },
            /**
             * 根据key获取数据
             * @param  {string} key [索引]
             * @return {object}     [存储的公用对象]
             */
            getData: function (key) {
                return _data[key].data;
            },
            /**
             * 对数据添加对数据操作的接口
             * @param {string}   sid      [数据索引]
             * @param {Function} fn [对数据操作的接口]
             */
            addRenderFn: function (sid, fn) {
                _data[sid].renderFns.push(fn);
            }
        };

        return _store;
    }();

    return {ShareStore: ShareStore};
});