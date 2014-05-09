/*jslint browser:true*/
/*global App, Saga, alert*/
Saga.CountDown = function (time) {
    "use strict";
    var pub,
        u = Saga.Util,
        debug = Saga.Debug,
        timeCountdown = time || false,
        timeLeft = false,
        running = false,
        delay = false,
        date = false,
        getTimeLeft = function () {
            var seconds = timeLeft,
                minutes = Math.floor(seconds / 60),
                hours = Math.floor(minutes / 60),
                days = Math.floor(hours / 24);

            hours = hours - (days * 24);
            minutes = minutes - (days * 24 * 60) - (hours * 60);
            seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

            return {
                'days': Math.floor(days),
                'hours': Math.floor(hours),
                'minutes': Math.floor(minutes),
                'seconds': Math.floor(seconds),
                'totalSeconds': timeLeft
            };

        },
        tick = function () {
            timeLeft = timeCountdown - (new Date().getTime() / 1000);
            pub.fire("changed", getTimeLeft());
        },
        interval = function () {
            //debug.info("Saga.CountDown.interval()");
            delay = u.delay(function () {
                tick();
                if (running) {
                    interval();
                }
            }, 1000);
        },
        start = function () {
            debug.info("Saga.CountDown.start()");
            running = true;
            tick();
            interval();
        },
        stop = function () {
            debug.info("Saga.CountDown.stop()");
            clearTimeout(delay);
            running = false;
        };

    date = new Date();
    date.setTime(timeCountdown * 1000);
    debug.info("Saga.CountDown -> End Time : ", date);
    pub = {
        start: function () {
            start();
        },
        stop: function () {
            stop();
        },
        timeLeft: function () {
            getTimeLeft();
        }
    };
    Saga.Util.extend(pub, Saga.Event());
    return pub;
};

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
                //debug.log("countdown:changed", timeLeft);
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