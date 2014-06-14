/*jslint browser:true*/
/*global Saga */

Saga.Route = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        routes = false,
        hash = false,
        hashParts = false,
        baseHash = false,
        hashVars = false, // ? ?
        getHash = function () {
            return window.location.hash.replace("#", "");
        },
        getHashParts = function (hash) {
            return hash.split("/");
            /*
            var hash = window.location.hash.replace("#", "");
            return hash.split("/");
            */
        },
        hashChange = function (newHash) {
            debug.info("Saga.Route.hashChange('" + newHash + "'), from '" + hash + "'");

            hashParts = getHashParts(newHash);
            if (baseHash !== hashParts[0]) {
                baseHash = hashParts[0];
                if (routes.hasOwnProperty(baseHash)) {
                    routes[baseHash]();
                } else {
                    routes['default']();
                }
                pub.fire("base:changed");
            } else {
                pub.fire("vars:changed", hashParts.slice(1));
            }

            hash = newHash;

            pub.fire("changed");
        },
        init = function (projectRoutes) {
            routes = projectRoutes;
            hash = getHash();
            if (window.hasOwnProperty('onhashchange')) {
                window.onhashchange = function () {
                    hashChange(getHash());
                };
            } else {
                window.setInterval(function () {
                    if (getHash() !== hash) {
                        hashChange(getHash());
                    }
                }, 100);
            }
            hashChange(hash);
        },
        showPage = function (page) {
            debug.info("Saga.Route.showPage('" + page + "')");
            window.location.hash = page;
        };

    pub = {
        init: function (routes) {
            init(routes);
        },
        hashVars: function () {
            return getHashParts(window.location.hash.replace("#", ""));
        },
        showPage: function (page) {
            showPage(page);
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
}());