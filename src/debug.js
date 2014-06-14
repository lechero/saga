/*jslint browser:true*/
/*global Saga, console */

Saga.Debug = (function () {
    "use strict";
    var pub,
        util = Saga.Util,
        levels = ["log", "info", "error", "warn", "trace"],
        activeLevels = ["log", "error"],
        timestamp = function () {
            var d = new Date();
            return (d.getUTCHours() + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2) + '.' + ('00' + d.getUTCMilliseconds()).slice(-3));
        },
        output = function (type) {
            if (util.contains(activeLevels, type)) {
                var arg = Array.prototype.slice.call(arguments, 1);
                arg.unshift(timestamp() + ": ");
                try {
                    console[type].apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        trace = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('trace');
            output.apply(this, arg);
        },
        log = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('log');
            output.apply(this, arg);
        },
        info = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('info');
            output.apply(this, arg);
        },
        error = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('error');
            output.apply(this, arg);
        },
        warn = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('warn');
            output.apply(this, arg);
        };
    pub = {
        log: function () {
            log.apply(this, arguments);
        },
        info: function () {
            info.apply(this, arguments);
        },
        error: function () {
            error.apply(this, arguments);
        },
        warn: function () {
            warn.apply(this, arguments);
        },
        levels: function (newLevels) {
            if (newLevels) {
                activeLevels = newLevels;
            } else {
                return activeLevels;
            }
        }
    };
    return pub;
}());