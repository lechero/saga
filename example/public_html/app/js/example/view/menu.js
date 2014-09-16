/*jslint browser:true*/
/*global App, Saga, qq*/

(function (asset) {
    "use strict";
    var div,
        debug = Saga.Debug,
        d = Saga.Dom,
        e = d.getById,
        u = Saga.Util,
        btnHomeClicked = function () {
            debug.log(asset.name + ".btnHomeClicked()");
            Saga.Route.showPage("home");
        },
        btnAboutClicked = function () {
            debug.log(asset.name + ".btnAboutClicked()");
            Saga.Route.showPage("about");
        },
        btnContactClicked = function () {
            debug.log(asset.name + ".btnContactClicked()");
            Saga.Route.showPage("contact");
        },
        setButtonHandlers = function () {
            e('btnHome').onclick = btnHomeClicked;
            e('btnAbout').onclick = btnAboutClicked;
            e('btnContact').onclick = btnContactClicked;
        },
        setMenuButtons = function () {
            debug.log(asset.name + ".setMenuButtons()");
            var page = Saga.Route.page(),
                btns = d.getByClass("btn", div),
                btnPage;
            u.each(btns, function (btn) {
                d.removeClass(btn, "btn-info");
                d.addClass(btn, "btn-primary");
                btnPage = btn.id.replace("btn", "").toLowerCase();
                debug.warn(asset.name + ".setMenuButtons()", btn, btnPage, page);
                if (btnPage === page) {
                    d.addClass(btn, "btn-info");
                    d.removeClass(btn, "btn-primary");
                }
            });
        },
        addListeners = function () {
            debug.log(asset.name + ".addListeners()");
            Saga.Route.on("changed", setMenuButtons);
        },
        removeListeners = function () {
            debug.log(asset.name + ".addListeners()");
            Saga.Route.off("changed", setMenuButtons);
        },
        init = function () {
            debug.log(asset.name + ".init()");
            div = e('Menu');
            setButtonHandlers();
            addListeners();
            setMenuButtons();
        },
        deinit = function () {
            debug.log(asset.name + ".deinit()");
            removeListeners();
        };

    Saga.Util.extend(asset.View, App.SimpleView(asset));

    Saga.AssetManager.on(asset.name + ":inited", init);
    Saga.AssetManager.on(asset.name + ":hidden", deinit);

}(App.Assets.Menu));