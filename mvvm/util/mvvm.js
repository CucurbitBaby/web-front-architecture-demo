 /**
 * [名称]
 * 数据双向绑定类
 * [描述]
 *  整合observer,subscriber,watcher类,通过observer类监听数据变化，在subscriber类中添加数据的订阅者，由subscriber类通知watcher类更新视图
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
define(["util/watcher.js", "util/subscriber.js", "util/observer.js"], function (watcher, subscriber, observer) {
    var MVVM;

    MVVM = (function () {
        var _constr;
        
        /**
         * 构造函数
         * 1.实例化订阅器和监听器
         * @param  object options [参数配置]  {data: {...}, callback}
         */
        _constr = function (options) {
            this.options = options;
            this.Subscriber = new subscriber.Subscriber();
            this.Observer = new observer.Observer(this.options.data, this.Subscriber);
            this.watch(options.callback);
        };

        _constr.prototype = {
            /**
             * 实例化一个订阅者
             * @param {function} [callback] [回调函数]
             * @param {string} [key] [可选，要订阅的属性名称]
             */
            watch: function(callback, key){
                var Watcher = new watcher.Watcher({data: this.options.data, callback: callback, key: key});
                this.Subscriber.addSub(Watcher);
            }
        };
        return _constr;
    })();

    return {MVVM: MVVM};
});