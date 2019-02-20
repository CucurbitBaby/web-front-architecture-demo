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
            /**
             * 修改用户名点击事件
             */
            $("#top_centent").on("click", "#edit_name", function () {
                var name = prompt("请输入新用户名");
                if(name){
                    _VM.editUserName(name);
                }             
            })
            /**
             * 选择角色事件
             */
            .on("change", "#select_role", function(){
                _VM.selectRole($(this).val());
            });
            
        };

        _constr = function (VM) {
            _VM = VM;
            _defaultEvent();
        };
        
         _constr.prototype = {
            /**
             * 渲染用户名
             * @param  {object} userInfo [用户信息]
             */
            renderUserName: function (userInfo) {
                $("#userName").html(userInfo.userName);
            }
        };
        return _constr;
    })();

    return {UserInfoView: UserInfoView};
});