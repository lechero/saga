/*jslint browser:true*/
/*global Saga */

Saga.LoadManager = (function () {
    "use strict";
    var pub = {},
        u = Saga.Util;
    u.extend(pub, Saga.StackLoader());
    return pub;
}());