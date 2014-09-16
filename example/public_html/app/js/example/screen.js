/*jslint browser:true*/
/*global Saga*/

Saga.Screen = (function () {
    "use strict";
    var pub,
        getWidth = function () {
            return document.documentElement.clientWidth;
        },
        none;

    pub = {
        width: function () {
            return getWidth();
        }
    };
    
    return pub;
}());