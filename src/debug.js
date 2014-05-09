/*jslint browser:true*/
/*global Saga, console */

Saga.Debug = (function () {
    "use strict";
    var pub,
        util = Saga.Util,
        levels = ["log", "info", "error", "warn"],
        activeLevels = ["log", "error"],
        timestamp = function () {
            var d = new Date();
            return (d.getUTCHours() + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2) + '.' + ('00' + d.getUTCMilliseconds()).slice(-3));
        },
        log = function () {
            if (util.contains(activeLevels, 'log')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.log.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        info = function () {
            if (util.contains(activeLevels, 'info')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.info.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        error = function () {
            if (util.contains(activeLevels, 'error')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.error.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        warn = function () {
            if (util.contains(activeLevels, 'warn')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.warn.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
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