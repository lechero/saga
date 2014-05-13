/*jslint browser:true*/
/*global Saga, console, _ */

Saga.Util = (function () {
    "use strict";
    var pub = _,
        fileExtension = function (str) {
            //var re = /(?:\.([^.]+))?$/;
            return str.substr(str.lastIndexOf('.') + 1);
            //return re.exec(str);
        };
    pub.fileExtension = function (str) {
        return fileExtension(str);
    };

    return pub;
}());