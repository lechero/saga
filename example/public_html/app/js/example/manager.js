/*jslint browser:true*/
/*global App, Saga*/

App.Manager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        keyboard = Saga.Keyboard,
        model,
        d = Saga.Dom,
        u = Saga.Util,
        e = d.elem,
        load = Saga.StackLoader(),
        stackLoader = Saga.StackLoader(),

        routeChanged = function (route) {
            debug.log("App.Manager.routeChanged() -> ", route);
        },
        menuShown = function () {
            Saga.Route.showPage('home');
        },
        startSite = function () {
            debug.log("App.Manager.startSite()");

            Saga.Route.on("vars:changed", routeChanged);
            Saga.Route.init(App.Routes);

            Saga.AssetManager.once("Menu:shown", menuShown);
            Saga.AssetManager.show(App.Assets.Menu);
        },
        itemLoaded = function (item, l) {
            debug.log("itemLoaded", (Math.floor((App.Preload.length - item.length) * 100 / App.Preload.length)));
        },
        templatesLoaded = function () {
            load.on("loaded", itemLoaded);
            load.load(App.Preload, startSite);
        },
        init = function () {
            debug.levels(["log", "info", "error", "warn", "trace"]);
            debug.log("App.Manager.init()");

            debug.log("App.Manager.init() -> preloader.shown: ", arguments);
            Saga.AssetManager.init(App.Assets);
            Saga.AssetManager.initTemplates(App.Templates, templatesLoaded);
        };

    pub = {
        routeChanged: function (hv) {
            routeChanged(hv);
        },
        init: function () {
            init();
        }
    };

    u.extend(pub, Saga.Event());

    return pub;
}());