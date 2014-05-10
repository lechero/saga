/*jslint browser:true*/
/*global Saga */

/****************************************
** Just some stuff for the Milkman ... **
****************************************/

Saga.List = function (urlJson) {
    "use strict";
    var pub,
        data = false,
        debug = Saga.Debug,
        u = Saga.Util,
        d = Saga.Dom,
        id = u.uniqueId("sl"),
        url = urlJson || false,
        loader = Saga.net.Loader(),
        template = false,
        settings = {
            'keys': false,
            'checkbox': false,
            'checkboxHandler': false,
            'headerHandler': false
        },
        options = {
            'page': 1,
            'totalPages': 1,
            'total': 1,
            'amount': 4,
            'order': 'desc',
            'orderField': ""
        },
        addClick = function (checkbox) {
            checkbox.onclick = function () {};
        },
        addClicks = function () {
            var cbs = u.getByClass(id + 'cb');
            u.each(cbs, function (checkbox) {
                addClick(checkbox);
            });
        },
        getTableTemplate = function () {
            var i = 0,
                l = settings.keys.length,
                tableRow = "",
                compiled;
            template = '<table class="table table-striped">';
            template += '<thead>';
            template += '<tr>';
            if (settings.checkbox) {
                template += '<th><input type="checkbox" id="' + id + 'cb"></th>';
                tableRow += '<td><input type="checkbox" id="' + id + 'cb<%= i %>" class="' + id + 'cb"></td>';
            }
            for (i; i < l; i += 1) {
                template += '<th>' + settings.keys[i] + '</th>';
                tableRow += '<td><%= row.' + settings.keys[i] + ' %></td>';
            }
            template += '</thead>';
            template += '</tr>';
            template += '<tbody>';
            template += '<% var i=0; _.each(rows, function(row){ %>';
            template += '<tr>' + tableRow + '</tr>';
            template += '<% i += 1; }); %>';
            template += '</tbody>';
            template += '</table>';

            compiled = u.template(template);

            return compiled;
        },
        loadComplete = function (result) {
            result = JSON.parse(result);
            if (u.isArray(result)) {
                data = result;
            }
            if (result.hasOwnProperty('page') && result.hasOwnProperty('data')) {
                options.page = parseInt(result.page, 10);
                options.totalPages = parseInt(result.totalPages, 10);
                options.total = parseInt(result.total, 10);
                data = result.data;
            }

            settings.keys = u.keys(data[0]);
            debug.log(settings);

            pub.fire("loaded");
        },
        load = function () {
            debug.log("Saga.List.load() -> ", url);
            if (!url) {
                return;
            }
            loader = new Saga.net.Loader({
                method: "post",
                data: options,
                url: url,
                success: function (result) {
                    if (result.hasOwnProperty('error') || result.hasOwnProperty('errors')) {
                        pub.fire("error");
                        return;
                    }
                    loader = null;
                    loadComplete(result);
                }
            });
            loader.execute();
        };
    pub = {
        load: function () {
            load();
        },
        loadNext: function () {
            load();
        },
        loadPrev: function () {
            load();
        },
        url: function (newVal) {
            if (newVal) {
                url = newVal;
            } else {
                return url;
            }
        },
        data: function () {
            return data;
        },
        hasPrev: function () {

        },
        hasNext: function () {

        },
        totalPages: function () {

        },
        page: function () {

        },
        checkbox: function (hasCb, checkboxHandler) {
            if (hasCb) {
                settings.checkbox = Boolean(hasCb);
                if (hasCb && checkboxHandler) {
                    settings.checkboxHandler = checkboxHandler;
                }
            } else {
                return settings.checkbox;
            }
        },
        select: function (hasSelect, headerHandler) {
            // has a select
            /*
            if (hasSelect) {
                settings.select = Boolean(hasSelect);
                if (hasSelect && headerHandler) {
                    settings.headerHandler = headerHandler;
                }
            } else {
                return settings.select;
            }
            */
        },
        selectedItems: function () {

        },
        template: function (model) {
            return getTableTemplate()(model);
        },
        getTableTemplate: function () {
            return getTableTemplate();
        }
    };
    Saga.Util.extend(pub, Saga.Event());
    return pub;
};

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