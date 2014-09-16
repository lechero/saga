/*jslint browser:true*/
/*global App, Saga*/

App.SimpleAnimation = (function () {
    "use strict";
    var speed = 0.5,
        genContentInit = function (div, cb) {
            TweenLite.set(div, {
                css: {
                    autoAlpha: 0
                }
            });
            if (cb) {
                cb();
            }
        },
        genContentShow = function (div, cb) {
            var opts = {
                css: {
                    autoAlpha: 1
                }
            };
            if (cb) {
                opts.onComplete = cb;
            }
            TweenLite.to(div, speed, opts);
        },
        genContentHide = function (div, cb) {
            var opts = {
                css: {
                    autoAlpha: 0
                }
            };
            if (cb) {
                opts.onComplete = cb;
            }
            TweenLite.to(div, speed, opts);
        },
        genContentRemove = function (div, cb) {

        },
        pub = {
            genContentHide: function (div, cb) {
                genContentHide(div, cb);
            },
            genContentInit: function (div, cb) {
                genContentInit(div, cb);
            },
            genContentShow: function (div, cb) {
                genContentShow(div, cb);
            }
        };
    return pub;
}());