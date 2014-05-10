/*jslint browser:true*/
/*global Saga*/

Saga.Asset = function (assetName, assetInfo) {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        name = assetName,
        loaded = false,
        view = {},
        holder = false,
        content = {},
       
        loadStack = [],
        stackObj = function (type, file, prop) {
            return {
                'type': type,
                'file': file,
                'loaded': false,
                'content': false,
                'prop': prop
            };
        },
        addLoad = function (type, obj) {
            if (u.isString(obj)) {
                content[type] = false;
                loadStack.push(stackObj(type, obj, ""));
            } else {
                content[type] = {};
                if (u.isArray(obj)) {
                    content[type] = [];
                }
                u.each(obj, function (file, prop) {
                    content[type][prop] = false;
                    loadStack.push(stackObj(type, file, prop));
                });
            }
        },
        init = function (info) {
            debug.info("Saga.Asset.init('" + name + "')", assetInfo);
            if (!assetInfo.hasOwnProperty('files')) {
                debug.error("Saga.Asset.init('" + name + "') -> No content found, exiting");
                return;
            }
            if (!assetInfo.files.hasOwnProperty('js') && !assetInfo.files.hasOwnProperty('html')) {
                debug.error("Saga.Asset.init('" + name + "') -> No Javascript or Html found, exiting");
                return;
            }
            if (assetInfo.files.hasOwnProperty('html')) {
                addLoad('html', assetInfo.files.html);
            }
            if (assetInfo.files.hasOwnProperty('js')) {
                addLoad('js', assetInfo.files.js);
            }
            if (assetInfo.files.hasOwnProperty('template')) {
                addLoad('template', assetInfo.files.template);
            }
        },
        loadComplete = function () {
            u.each(loadStack, function (item) {
                if (item.type === "template") {
                    if (item.prop === "") {
                        content.template = u.template(item.content);
                    } else {
                        content.template[item.prop] = u.template(item.content);
                    }
                } else {
                    if (item.prop === "") {
                        content[item.type] = item.content;
                    } else {
                        content[item.type][item.prop] = item.content;
                    }
                }
            });
            loaded = true;
        };

    init(assetInfo);

    pub = {
        init: function (assetInfo) {
            init(assetInfo);
        },
        loadStack: function () {
            return loadStack;
        },
        loadComplete: function () {
            loadComplete();
        },
        Template: function () {
            return content.template;
        },
        Html: function () {
            return content.html;
        },
        Js: function () {
            return content.js;
        },
        View: view,
        Holder: holder,
        name: (function () {
            return name;
        }()),
        loaded: function () {
            return loaded;
        }
    };
    return pub;
};