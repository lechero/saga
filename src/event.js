/*jslint browser:true*/
/*global Saga*/

Saga.Event = function () {
    "use strict";
    var pub,
        cbs = {},
        off = function (evt, cb) {
            if (typeof cbs[evt] === "undefined") {
                return;
            }
            var l = cbs[evt].length,
                i = l - 1,
                removed = 0;
            if (l > 0) {
                for (i; i >= 0; i -= 1) { //removing all for now
                    if (cbs[evt][i].cb === cb) {
                        cbs[evt].splice(i, 1);
                        removed += 1;
                    }
                }
            }
            return removed;
        },
        offCb = function (e) {
            if (typeof cbs[e.evt] === "undefined") {
                return;
            }
            off(e.evt, e.cb);
        },
        addCb = function (evt, cb, context, amount) {
            if (typeof cbs[evt] === "undefined") {
                cbs[evt] = [];
            }
            var e = {
                'cb': cb,
                'evt': evt,
                'type': amount,
                'context': context
            };
            e.off = function () {
                offCb(e);
            };
            cbs[evt].push(e);
            return e;
        },
        on = function (evt, cb, context) {
            return addCb(evt, cb, context, 0);
        },
        once = function (evt, cb, context) {
            return addCb(evt, cb, context, 1);
        },
        kill = function () { // removes all listeners !!!!
            cbs = {};
        },
        fire = function (evt, data) {
            if (typeof cbs[evt] === "undefined") {
                return;
            }
            var l = cbs[evt].length,
                i = l - 1,
                removed = 0;
            if (l > 0) {
                for (i; i >= 0; i -= 1) {
                    cbs[evt][i].cb(data);
                    if (cbs[evt][i] && cbs[evt][i].type === 1) {
                        cbs[evt].splice(i, 1);
                    }
                }
            }
        };

    pub = {
        on: function (evt, cb) {
            return on(evt, cb);
        },
        once: function (evt, cb) {
            return once(evt, cb);
        },
        off: function (evt, cb) {
            return off(evt, cb);
        },
        fire: function (evt, data) {
            fire(evt, data);
        },
        kill: function () {
            kill();
        }
    };
    return pub;
};