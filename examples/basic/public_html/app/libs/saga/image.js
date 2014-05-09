/*jslint browser:true*/
/*global Saga */

Saga.Image = function (imageUrl, prefferedId) {
    "use strict";
    var pub,
        util = Saga.Util,
        url = imageUrl,
        img = document.createElement('img'),
        id = prefferedId || util.uniqueId('sagaImg'),
        timeout = 60 * 2,
        loaded = false,
        load = function () {
            img.src = url;
        };

    img.onload = function () {
        loaded = true;
        pub.fire("loaded");
    };

    pub = {
        load: function () {
            load();
        },
        loaded: function () {
            return loaded;
        },
        url: function () {
            return url;
        },
        id: function () {
            return id;
        },
        img: function () {
            return img;
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
};