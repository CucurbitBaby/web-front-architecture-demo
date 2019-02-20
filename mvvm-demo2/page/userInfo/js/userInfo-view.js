 /**
 * [名称]
 * 用户信息视图类
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
    var UserInfoView;

    UserInfoView = (function () {
        var _constr,
            _VM,
            _defaultEvent;

        _defaultEvent = function () {
            $("#top_centent").on("click", "#edit_name", function () {
                var name = prompt("请输入新用户名");
                if(name){
                    _VM.editUserName(name);
                }             
            });
        };

        _constr = function (VM) {
            _VM = VM;
            _defaultEvent();
        };
        
         _constr.prototype = {
            renderUserName: function (userName) {
                $("#userName").html(userName);
            }
        };
        return _constr;
    })();

    return {UserInfoView: UserInfoView};
});