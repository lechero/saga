/*jslint browser:true*/
/*global Saga*/

Saga.Holder = function (holderDivName) {
    "use strict";
    var pub,
        asset = false,
        divName = holderDivName,
        div = false,
        debug = Saga.Debug,
        d = Saga.Dom,
        place = function (newAsset) {
            asset = newAsset;
            debug.info("Saga.Holder.place()", newAsset);
            div = document.getElementById(divName);
            div.innerHTML = asset.Html();

            d.head().appendChild(asset.Js());

            return true;
        },
        setAsset = function (newAsset) {
            asset = newAsset;
            div = document.getElementById(divName);
            div.innerHTML = asset.saga.html[0];
            return true;
        };

    pub = {
        place: function (asset) {
            place(asset);
        },
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