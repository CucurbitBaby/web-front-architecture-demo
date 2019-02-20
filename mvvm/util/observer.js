 /**
 * [名称]
 * 数据监听类
 * [描述]
 *  监听数据的所有属性
 * [主要方法]
 * 1.
 * [使用说明]
 * var obj = new xx();
 * obj.xx(param);
 *
 * [依赖对象]
 *  
 * [创建日期]
 *  2018/3/5
 * [作者]
 *  Qiutm
 * [版本]
 *  1.0
 *
 */
define(function () {
    var Observer;

    Observer = (function () {
        var _constr,
            _observeObjAttr,
            _Subscriber;

        /**
         * 监听数据方法
         * 重新定义[[getter]], [[setter]]，当数据发生变化时更新视图
         * @param  {object} obj [模型数据对象]
         * @param  {string} key [对象属性]
         * @param  value [对象属性值]
         */
        _observeObjAttr = function (obj, key, value, Subscriber) {
            _observeObj(value, Subscriber);
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
                    _observeObj(value, Subscriber);
                    Subscriber.notify(key);  
                }
            });
        };

        /**
         * 数据劫持
         * 1.深度遍历数据的所有可枚举属性，并监听属性
         * @param  {object} obj [模型数据对象]
         */
        _observeObj = function (obj, Subscriber) {
            if(obj && typeof obj === "object"){
                Object.keys(obj).forEach(function (key) {
                    var data = obj[key];                
                    _observeObjAttr(obj, key, data, Subscriber);                               
                });
            }
        };

        /**
         * 构造函数
         * 1.监听数据
         * @param  object data       [要监听的数据]
         * @param  object Subscriber [订阅器]
         */
        _constr = function (data, Subscriber) {
            this.observeData(data, Subscriber);
        };

        _constr.prototype = {
            /**
             * 监听数据
             * @param  {object} data [要监听的对象]  
             */
            observeData: function (data, Subscriber){
                _observeObj(data, Subscriber);
            }
        };
        return _constr;
    })();

    return {Observer: Observer};
});