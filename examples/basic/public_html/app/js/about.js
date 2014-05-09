/*jslint browser:true*/
/*global App, Saga*/

(function (asset) {
    "use strict";
    var view = asset.View;
    Saga.Util.extend(view, App.SimpleView(asset));
}(App.Assets.About));