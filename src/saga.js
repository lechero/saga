/*jslint browser:true*/
/*global */

var Saga = (function () {
    "use strict";
    var pub,
        version = "@VERSION",
        id = "saga",
        doc = document || false,
        vars = false,
        init = function () {
            try {
                JSON.parse(doc.getElementById(id).innerHTML);
            } catch (err) {
                vars = "NOT_SET";
            }
        };

    pub = {
        vars: (function () {
            return vars;
        }())
    };

    init();

    return pub;
}());