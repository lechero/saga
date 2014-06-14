/*jslint browser:true*/
/*global Saga, console, _ */

Saga.Util = (function () {
    "use strict";
    var pub = _,
        objectSize = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size += 1;
                }
            }
            return size;
        },
        fileExtension = function (str) {
            //var re = /(?:\.([^.]+))?$/;
            return str.substr(str.lastIndexOf('.') + 1);
            //return re.exec(str);
        },
        getHigher = function (col, prefix) {
            var arr = [];
            if (!prefix) {
                prefix = "";
            }
            if (pub.isEmpty(col)) {
                return prefix + "0";
            }
            pub.each(col, function (el) {
                arr.push(parseInt(el.id.replace(prefix, ""), 10));
            });
            if (arr.length <= 0) {
                return prefix + "0";
            }
            if (prefix + String(Math.max.apply(null, arr) + 1) === prefix + "NaN") {
                return prefix + "0";
            }

            return prefix + String(Math.max.apply(null, arr) + 1);
        };
    pub.fileExtension = function (str) {
        return fileExtension(str);
    };

    pub.objectSize = function (obj) {
        return objectSize(obj);
    };

    pub.getHigher = function (col, prefix) {
        return getHigher(col, prefix);
    };

    return pub;
}());