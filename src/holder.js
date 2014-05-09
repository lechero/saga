/*jslint browser:true*/
/*global Saga*/

Saga.Holder = function (holderDivName) {
    "use strict";
    var pub,
        asset = false,
        divName = holderDivName,
        div = false,
        debug = Saga.Debug,
        setAsset = function (newAsset) {
            asset = newAsset;
            div = document.getElementById(divName);
            div.innerHTML = asset.saga.html[0];
            return true;
        };

    pub = {
        asset: function () {
            return asset;
        },
        div: function () {
            return div;
        },
        setAsset: function (asset) {
            return setAsset(asset);
        }
    };
    return pub;
};