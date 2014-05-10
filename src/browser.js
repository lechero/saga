/*jslint browser:true*/
/*global Saga, escape, unescape */

Saga.Browser = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        agent = navigator.userAgent.split(/\s*[;)(]\s*/),
        setCookie = function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
        },
        getCookie = function (c_name) { // have to find who to credit for this
            if (document.cookie.length > 0) {
                var c_start, c_end;
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start !== -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end === -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return false;
        };

    pub = {
        setCookie: function (name, value, expiredays) {
            setCookie(name, value, expiredays);
        },
        getCookie: function (name) {
            setCookie(name);
        }
    };
    return pub;
}());