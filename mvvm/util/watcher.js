 /**
 * [名称]
 * 订阅者类
 * [描述]
 *  订阅的属性变动时，触发绑定的回调
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
    var Watcher;

    Watcher = (function () {
        var _constr;
        
        /**
         * 构造函数
         * 1.触发绑定的函数
         * @param {object} [options] {data: {...}, callback: function, key: "string"}
         */
        _constr = function (options) {
            this.key = options.key;
            this.data = options.data;
            this.callback = options.callback;
            this.update(this.key);     
        };

        _constr.prototype = {
            /**
             * 触发绑定的回调
             * 当存this.key存在时，则回调函数的参数只传当前属性值，否则参数传入整个监听对象
             */
            update: function(key){
                if(this.key){
                    if(this.key === key){
                        this.callback.call(null, this.data[this.key]);
                    }                    
                }else{
                    this.callback.call(null, this.data);
                }               
            }  
        };
        return _constr;
    })();

    return {Watcher: Watcher};
});