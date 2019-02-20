 /**
 * [名称]
 * 路由类
 * [描述]
 *  1.设置路由要渲染的根节点，将模块(ViewModel)映射到路由(hash),根据预定义路由和hash动态变化时加载对应的html文档和viewModel。
 *  2.模块之间通过Router调用
 * [主要方法]
 * 1.查找模块
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
define(function (require) {
    var Router;
        
    Router = (function () {
        var _constr,
            _config,
            _moduleList,
            _listenHash,
            _loadRouter,
            _addModule,
            _findModule; 

        //已装载的模块集合
        _moduleList = [];

        /**
         * 监听hash变化
         * 监听哈希变化：
         * a.加载对应的html文档，获取dom节点插入到根文档中
         * b.加载对应的viewModel
         */
        _listenHash = function () {
            $(window).on("hashchange", function () {
                var hash,
                    vmUrl,
                    vmName,
                    preloadRouter,
                    routers,
                    router;
                hash = window.location.hash.split("#");
                preloadRouter = _config.preloadRouter;
                routers = _config.router;
                router = preloadRouter[hash];
                router = router ? router : routers[hash];
                if(router){
                    var module = _findModule(router.moduleName);
                    if(module){
                        module.init();
                    }else{
                        _loadModule(router.htmlPath, function (dom) {
                            $(window.top.document).find("head").append(dom.head);
                            $(window.top.document).find("#" + _config.root).find("#" + router.renderNode).html(dom.body);
                            require([vmUrl], function (vm) {
                                VM = new vm[router.moduleName]();
                                VM.init();
                                _addModule({moduleName:vmName, moduleObject:VM});              
                            });
                        });
                    }
                    
                }
                
            });
        };

        /**
         * 加载模块DOM结构并返回
         * @modify 
              content:页面渲染dom，分离出head标签和body标签。
              author:qianwb
              date:2016-08-24
         * @param url "模块html文件地址"
         * @param callback
         * @return {head:head, body:body}
         * @private
         */
        _loadModule = function(url, callback) {
            var async = null,
                dom = null,
                body = null,
                head = null;
            if(url !== "") {
                async = (typeof callback === "function");
                $.ajax({
                    url: url,
                    dataType: "html",
                    async: async,
                    cache:false,
                    // type: "get",
                    success: function(data) {
                        dom = data;
                        if(data.indexOf("<html") != -1) {
                            head = dom.substring(dom.indexOf("<head>")+6, dom.indexOf("</head>"));
                            body = dom.substring(dom.indexOf("<body>")+6, dom.indexOf("</body>"));
                            //正则表达式去除title
                            head = head.replace(/<title[^>]*?>[\s\S]*?<\/title>/,"");
                            //正则表达式去除script
                            head = head.replace(/<script[^>]*?>[\s\S]*?<\/script>/,"");
                            //正则表达式去除meta
                            head = head.replace(/<meta *?[\s\S]*?>/,"");
                            //dom = head + body;
                            
                            dom = {head:head, body:body};
                            ////dom = dom.substring(dom.indexOf("<html>")+6, dom.indexOf("</html>"));
                            //正则表达式去除head
                            //dom = dom.replace(/<\/?head>/g,"");
                            //正则表达式去除title
                            //dom = dom.replace(/<title[^>]*?>[\s\S]*?<\/title>/,"");
                            //正则表达式去除script
                            //dom = dom.replace(/<script[^>]*?>[\s\S]*?<\/script>/,"");
                            //正则表达式去除meta
                            //dom = dom.replace(/<meta *?[\s\S]*?>/,"");
                        }
                        if(async) {
                            callback.call(null, dom);
                        }
                    }
                });
            } else {
                dom = {head:"", body: ""};
            }
            return dom;
        };

        /**
         * 添加已加载的模块
         * @param {object} [parm] [模块]  {moduleName:vmName, moduleObject:VM}
         */
        _addModule = function(param){
            var name = param.moduleName;
            if(_findModule(name)){
                _moduleList.push({moduleName: name, moduleObject: param.moduleObject});
            }    
        };

        /**
         * 查找模块
         * @param  {string} param [模块名称] 
         * @return {object} module     [模块]
         */
        _findModule = function(param){
            var module;
            module = _moduleList.filter(function(m){
                return m.moduleName === param;
            });
            if(module.length > 0){
                return module[0];
            }
        };

        /**
         * 加载路由
         * @param  {string} router [路由信息]
         * ｛"userInfo":{
                "moduleName":"userInfoViewModel",
                "modulePath":"page/userInfo/js/userInfo-viewmodel.js",
                "renderNode":"userInfo"
            }｝
         * a.加载对应的html文档，获取dom节点插入到根文档中,说明：默认加载index.html
         * b.加载对应的viewModel
         */
        _loadRouter = function(router, callback){
            var VM, 
                vmUrl, 
                vmName,
                htmlPath,
                target;
            vmUrl = router.modulePath;
            vmName = router.moduleName;
            htmlPath = router.htmlPath;
            target = router.renderNode;
            _loadModule(htmlPath, function (dom) {
                $(window.top.document).find("head").append(dom.head);
                $(window.top.document).find("#" + _config.root).find("#" + target).html(dom.body);
                require([vmUrl], function (vm) {
                    VM = new vm[vmName]();
                    VM.init();
                    _moduleList.push({moduleName:vmName, moduleObject:VM});
                    if(callback){
                        callback.call(null, VM);
                    }                  
                });
            });
        };

        /**
         * 路由构造函数
         * 1.设置路由渲染的根节点
         * 2.将预定义路由首先渲染
         * 3.监听url hash
         * 4.若有锚点，则加载此锚点对应的路由
         * @param  {object} param [包含根节点，预定义路由的对象]  
         *      {
                    root: "#app", 
                    preloadRouters: ["top", "menu", "home"]
                }
        */
        _constr = function (param) { };

        _constr.prototype = {
            /**
             * 初始化router
             * 1.查找配置文件，根据配置加载模块
             * 2.监听路由变化
             * @param  {object} param [配置文件路径] {url:""}
             */
            init: function(param, callback){
                var hash;
                $.ajax({
                    url: param.url,
                    dataType: "json",
                    async: "true",
                    success: function(data){                        
                        var preloadModule;
                        _config = data;
                        preloadRouter = data.preloadRouter;
                        for(var router in preloadRouter){
                            _loadRouter(preloadRouter[router]);
                        }  
                        callback.call(null);                                
                    }
                });
                _listenHash();
            },
            /**
             * 查找模块
             * 1.根据模块名称查找对应模块
             * 2.若没有找到模块，则此模块尚未加载，加载此模块后返回
             * @param  {object} param [模块路由名称] 
             * @param  {object} callback     [回调函数]
             */
            loadModule: function (param, callback) {
                var module;
                module = _moduleList.filter(function (module) {
                    return module.moduleName == param;
                });
                if(module.length === 0){
                    var router = _config.router[param];
                    router = router ? router : _config.preloadRouter[param];
                    if(router){
                        _loadRouter(router, function(module){
                            callback.call(null, module);
                        });
                    }                    
                }else{
                    callback.call(null, module);
                }
            }
        };

        return _constr;
    })();   

    return {Router: Router};
});