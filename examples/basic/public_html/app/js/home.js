/*jslint browser:true*/
/*global App, Saga, alert*/

(function (asset) {
    "use strict";
    var view = asset.View,
        setButtonHandlers = function () {
            Saga.Dom.elem("btnClickMe").onclick = function () {
                alert("Yeah!");
            };
        };

    Saga.Util.extend(view, App.SimpleView(asset));
    Saga.AssetManager.on(asset.name + ":inited", function () {
        setButtonHandlers();
    });
}(App.Assets.Home));