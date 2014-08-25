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
               
                vars = JSON.parse(doc.getElementById(id).innerHTML);
               
            } catch (err) {
                vars = "NOT_SET";
            }
        };

    pub = {
        vars: function () {
            return vars
        }
    };

    init();
    //console.error("!!!!!!!!!!!!!1", vars);
    return pub;
}());