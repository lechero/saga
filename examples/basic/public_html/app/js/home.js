/*jslint browser:true*/
/*global App, Saga, alert*/

(function (asset) {
    "use strict";
    var view = asset.View,
        debug = Saga.Debug,
        d = Saga.Dom,
        endTime = (new Date().getTime() / 1000) + (60 * 60 * 24),
        templateTimeLeft = Saga.Util.template('<%= time.hours %>:<%= time.minutes %>:<%= time.seconds %>'),
        countdown = Saga.CountDown(endTime),
        startCountDown = function () {
            countdown.on("changed", function (timeLeft) {
                d.elem("timeContainer").innerHTML = templateTimeLeft({
                    time: timeLeft
                });
            });
            countdown.start();
        },
        setButtonHandlers = function () {
            Saga.Dom.elem("btnStartCountdown").onclick = function () {
                countdown.start();
            };
            Saga.Dom.elem("btnStopCountdown").onclick = function () {
                countdown.stop();
            };
        };

    Saga.Util.extend(view, App.SimpleView(asset));
    Saga.AssetManager.on(asset.name + ":inited", function () {
        startCountDown();
        setButtonHandlers();
    });
}(App.Assets.Home));