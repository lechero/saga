/*jslint browser:true*/
/*global App, Saga*/

(function (asset) {
    "use strict";
    var div,
        debug = Saga.Debug,
        e = Saga.Dom.getById,
        setButtonHandlers = function () {
            e('btnHome').onclick = function () {
                Saga.Route.showPage("home");
            };
            e('btnAbout').onclick = function () {
                Saga.Route.showPage("about");
            };
            e('btnList').onclick = function () {
                Saga.Route.showPage("list");
            };
        },
        init = function () {
            debug.log(asset.name + ".init()");
            div = e(asset.name);
            setButtonHandlers();
            e('menuHeader').innerHTML = 'Saga (' + e('saga').src + ')';
        },
        simpleInit;

    Saga.Util.extend(asset.View, App.SimpleView(asset));

    simpleInit = asset.View.init;
    asset.View.init = function () {
        simpleInit();
        init();
    };
}(App.Assets.Menu));