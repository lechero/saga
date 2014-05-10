/*jslint browser:true*/
/*global */

var Saga = (function () {
    "use strict";
    var version = "@VERSION",
        id = "saga",
        doc = document,
        vars = false,
        pub = {
            vars: (function () {
                return vars;
            }())
        };
    try {
        JSON.parse(doc.getElementById(id).innerHTML);
    } catch (err) {
        vars = "NOT_SET";
    }
    return pub;
}());