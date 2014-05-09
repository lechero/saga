/*jslint browser:true*/
/*global Saga*/

Saga.Keyboard = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        usefulKeys = {
            39: "right",
            40: "down",
            37: "left",
            38: "up",
            32: "space",
            13: "enter"
        },
        keyDown = function (evt) {
            debug.info("Saga.Keyboard.keyDown() -> ", evt);
            pub.fire("key:down", evt);
            if (usefulKeys.hasOwnProperty(evt.keyCode)) {
                pub.fire(usefulKeys[evt.keyCode], evt);
                debug.warn("Saga.Keyboard.keyDown() -> usefulKey: ", usefulKeys[evt.keyCode]);
            }
        },
        keyPress = function (evt) {
            debug.info("Saga.Keyboard.keyPress() -> ", evt);
            pub.fire("key:press", evt);
        },
        keyUp = function (evt) {
            debug.info("Saga.Keyboard.keyUp() -> ", evt);
            pub.fire("key:up", evt);
        },
        init = function () {
            debug.info("Saga.Keyboard.init()");
            window.onkeydown = keyDown;
            window.onkeypress = keyPress;
            window.onkeyup = keyUp;
        },
        deinit = function () {
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null;
        };

    pub = {
        init: function () {
            init();
        },
        deinit: function () {
            deinit();
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
}());