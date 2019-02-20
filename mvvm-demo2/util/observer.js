define(function () {
    var Observer;

    Observer = (function () {
        var _constr;

        /**
         * 监听数据方法
         * 重新定义[[getter]], [[setter]]，当数据发生变化时更新视图
         * @param  {object} obj [模型数据对象]
         * @param  {string} key [对象属性]
         * @param  value [对象属性值]
         * @param  {function} fn [要绑定的方法]
         */
        _observeObjAttr = function (obj, key, value, fn, data) {
            _observeObj(value, fn, data);
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
                    _observeObj(value, fn, data);
                    fn.call(null, data);
                }
            });
        };

        /**
         * 数据劫持
         * 1.深度遍历数据的所有可枚举属性，并监听属性
         * @param  {object} obj [要监听的对象]
         * @param  {function} [fn] [要绑定的方法]
         */
        _observeObj = function (obj, fn, data) {
            if(obj && typeof obj === "object"){
                var value;
                Object.keys(obj).forEach(function (key) {
                    value = obj[key];                
                    _observeObjAttr(obj, key, value, fn, data);                               
                });
            }
        };

        _constr = function () {
            
        };

        _constr.prototype = {
            /**
             * 监听数据
             * @param  {object} param [要监听的对象,要绑定的方法]  {data: object, fn: function}
             */
            monitorData: function (param){
                _observeObj(param.data, param.fn, param.data);
            }
        };
        return _constr;
    })();

    return {Observer: Observer};
});