 /**
 * [名称]
 * 订阅类
 * [描述]
 *  收集订阅者，通知订阅者
 * [主要方法]
 * 
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
    var Subscriber;

    Subscriber = (function () {
        var _constr;
        
        _constr = function () {
            this.subs = [];   //订阅者集合
        };

        _constr.prototype = {
            /**
             * 增加订阅者
             * @param object sub 订阅者
             */
            addSub: function(sub){
                this.subs.push(sub);
            },
            /**
             * 通知订阅者，触发其更新函数
             * @param {string} [key] [属性名称]
             */
            notify: function(key){
                this.subs.forEach(function(sub){
                    sub.update(key);
                });              
            }            
        };
        return _constr;
    })();

    return {Subscriber: Subscriber};
});

