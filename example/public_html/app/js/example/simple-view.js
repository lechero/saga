/*jslint browser:true*/
/*global App, Saga*/

App.SimpleView = function (asset) {
    "use strict";
    var view,
        div,
        debug = Saga.Debug,
        e = Saga.Dom.getById,
        viewInit = function (cb) {
            debug.log("SimpleView ->" + asset.name + ".init()");
            div = e(asset.name);
            debug.log("SimpleView ->" + asset.name + ".init()", div);
            App.SimpleAnimation.genContentInit(div, cb);
        },
        viewShow = function (cb) {
            debug.log("SimpleView ->" + asset.name + ".show()");
            App.SimpleAnimation.genContentShow(div, cb);
        },
        viewHide = function (cb) {
            debug.log("SimpleView ->" + asset.name + ".hide()");
            App.SimpleAnimation.genContentHide(div, cb);
        },
        viewRemove = function () {
            debug.log("SimpleView ->" + asset.name + ".remove()");
        };
    
    view = {
        init: function (completeCallback) {
            viewInit(completeCallback);
        },
        show: function (completeCallback) {
            viewShow(completeCallback);
        },
        hide: function (completeCallback) {
            viewHide(completeCallback);
        },
        remove: function () {
            viewRemove();
        }
    };
    return view;
};