/*jslint browser:true*/
/*global App, Saga*/

(function (asset) {
    "use strict";
    var div,
        debug = Saga.Debug,
        e = Saga.Dom.getById,
        u = Saga.Util,
        list = Saga.List("data/list.json"),
        addClicks = function () {
            e("btnLoadList").onclick = function () {
                list.load();
            };
        },
        loadList = function () {
            list.checkbox(true, function (row) {

            });

            list.on("loaded", function () {
                Saga.Dom.elem("listContainer").innerHTML = list.template({
                    rows: list.data()
                });
            });
            list.load();
        },
        init = function (cb) {
            debug.log(asset.id + ".init()");
            div = e(asset.name);
            loadList();
            if(cb){ // ok this need more epic
                cb();
            }
            //addClicks(); 
        },
        simpleInit;

    Saga.Util.extend(asset.View, App.SimpleView(asset));

    simpleInit = asset.View.init;
    asset.View.init = function () {
        simpleInit();
        init();
    };
}(App.Assets.List));