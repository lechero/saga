/*jslint browser:true*/
/*global Saga */

Saga.StackLoader = function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        dom = Saga.Dom,
        u = Saga.Util,
        loader = Saga.net.Loader(),
        loading = false,
        loaded = {},
        stack = [],
        load,
        loadItem,
        loadItemDone,
        loadCss = function (file, cb) {
            var node = document.createElement("link");
            node.onload = function () {
                if (cb) {
                    cb(node);
                }
            };
            node.setAttribute("rel", "stylesheet");
            node.setAttribute("type", "text/css");
            node.setAttribute("href", file);
        },
        loadImage = function (file, cb) {
            var img = document.createElement('img');
            img.onload = function () {
                if (cb) {
                    cb(img);
                }
            };
            img.src = file;
        },
        loadJs = function (file, cb) {
            var script = document.createElement('script'),
                done = false,
                head = dom.head();
            script.type = "text/javascript";
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    /*
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                    */
                    if (cb) {
                        cb(script);
                    }
                }
            };
            script.src = file;
            head.appendChild(script);
            return script;
        },
        loadHtml = function (file, cb) {
            var loadOptions = {
                method: "get",
                url: file,
                success: function (result) {
                    if (cb) {
                        cb(result);
                    }
                }
            };
            loader.execute(loadOptions);
        };

    loadItemDone = function () {
        var item = stack[0];
        stack.shift();
        loading = false;
        loadItem();
        pub.fire("loaded", {
            url: item,
            length: stack.length
        });
    };

    loadItem = function () {
        //debug.info("Saga.StackLoader.loadItem() -> ", stack.length);
        if (loading) {
            debug.info("Saga.StackLoader.loadItem() -> Already loading, waiting...");
            return;
        }

        if (stack.length <= 0) {
            debug.info("Saga.StackLoader.loadItem() -> Stack fully loaded!");
            // event?@?!!?!
            return;
        }

        loading = true;

        var file,
            ext;
       
        if (u.isFunction(stack[0])) { // callback
            stack[0]();
            loadItemDone();
			//debug.log("Saga.StackLoader.loadItem() -> CALLBACKED", stack);
        } else {
            file = stack[0];
			//debug.log("Saga.StackLoader.loadItem() ->", file);
            ext = u.fileExtension(file);
            if (ext === "js" || ext === "jst") {
                loadJs(file, function (script) {
                    loaded[file] = script;
                    loadItemDone();
                });
            } else if (ext === "png" || ext === "gif" || ext === "jpg" || ext === "jpeg" || ext === "svg") {
                loadImage(file, function (img) {
                    loaded[file] = img;
                    loadItemDone();
                });
            } else if (ext === "html") {
                loadHtml(file, function (text) {
                    loaded[file] = text;
                    loadItemDone();
                });
            } else if (ext === "css") {
                loadCss(file, function (node) {
                    loaded[file] = node;
                    loadItemDone();
                });
            }
        }
    };

    load = function (stuff, cb) { // collection of urls
        //debug.info("Saga.StackLoader.load() -> stuff: " + stuff);
        if (u.isString(stuff)) {
            stack.push(stuff);
        } else {
            u.each(stuff, function (item) {
                stack.push(item);
            });
        }
        stack.push(cb);
        loadItem();
    };

    pub = {
        load: function () {
            load.apply(this, arguments);
        },
        dir: function () {
            return loaded;
        }
    };
    u.extend(pub, Saga.Event());
    return pub;
};