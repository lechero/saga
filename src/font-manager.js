/*jslint browser:true*/
/*global Saga, WebFontConfig*/

Saga.FontManager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        fonts = false,
        agent = navigator.userAgent.split(/\s*[;)(]\s*/),
        init = function (projectFonts) {
            fonts = projectFonts;
        },
        load = function (projectFonts) {
            var fontConfig = fonts,
                fontCallbacks = {
                    loading: function () {
                        debug.info("Saga.FontManager.load() -> loading: ");
                    },
                    fontloading: function (fontFamily, fontDescription) {
                        debug.info("Saga.FontManager.load() -> fontloading: ", fontFamily, fontDescription);
                    },
                    fontactive: function (fontFamily, fontDescription) {
                        debug.info("Saga.FontManager.load() -> fontactive: ", fontFamily, fontDescription);
                    },
                    fontinactive: function (fontFamily, fontDescription) {
                        debug.info("Saga.FontManager.load() -> fontinactive: ", fontFamily, fontDescription);
                    },
                    active: function () {
                        debug.info("Saga.FontManager.load() -> active: ");
                        pub.fire("loaded");
                    },
                    inactive: function () {
                        debug.info("Saga.FontManager.load() -> inactive: ");
                    },
                    timeout: 1500
                };
            util.extend(fontConfig, fontCallbacks);

            window.WebFontConfig = fontConfig;

            (function () {
                var wf = document.createElement('script'),
                    s;
                wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                //wf.src = 'libs/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
            }());

        };

    pub = {
        init: function (fonts) {
            init(fonts);
        },
        load: function (fonts) {
            load(fonts);
        }
    };
    util.extend(pub, Saga.Event());
    return pub;
}());