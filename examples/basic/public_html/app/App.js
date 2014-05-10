/*jslint browser:true*/
/*global Saga, App, TweenLite*/


(function () {
    "use strict";
    var root = this,
        setup = {
            Holders: { // you could define holders here, not mandatory
                Menu: 'holderMenu',
                Content: 'holderContent' // for pishti
            },
            Assets: {
                Home: {
                    files: {
                        html: 'app/html/home.html',
                        js: 'app/js/home.js'
                    },
                    holder: 'holderContent'
                },
                About: {
                    files: {
                        html: 'app/html/about.html',
                        js: 'app/js/about.js'
                    },
                    holder: 'holderContent'
                },
                List: {
                    files: {
                        html: 'app/html/list.html',
                        js: 'app/js/list.js',
                        template: 'app/html/list.template.html'
                    },
                    holder: 'holderContent'
                },
                Menu: {
                    files: {
                        html: 'app/html/menu.html',
                        js: 'app/js/menu.js'
                    },
                    holder: 'holderMenu'
                }
            },
            Fonts: {
                google: {
                    //families: ['Droid Sans', 'Droid Serif', 'Aclonica', 'Acme', 'Alegreya']
                    families: ['Aclonica', 'Alegreya']
                }
                /*,
                custom: {
                    families: ["helveticaneue", "helveticaneue-light", "helveticaneue-bold"],
                    urls: ["app/css/helveticaneue.css"]
                }*/
            },
            Routes: {
                'default': function () {
                    Saga.Route.showPage("home");
                },
                'home': function () {
                    Saga.AssetManager.show(App.Assets.Home);
                },
                'list': function () {
                    Saga.AssetManager.show(App.Assets.List);
                },
                'about': function () {
                    Saga.AssetManager.show(App.Assets.About);
                }
            }
        };

    // Set project namespace
    root.App = setup;

    Saga.Dom.addLoadEvent(function () {
        App.Manager.init();
    });
}.call(this));


App.Manager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        keyboard = Saga.Keyboard,
        startSite = function () {
            Saga.AssetManager.once("Menu:shown", function () {
                Saga.Route.init(App.Routes);
            });
            Saga.AssetManager.show(App.Assets.Menu);
        },
        loadFonts = function () {
            Saga.FontManager.init(App.Fonts);
            Saga.FontManager.once('loaded', function () {
                debug.log("App.Manager.loadFonts() -> Saga.FontManager.on('loaded')");
                startSite();
            });
            Saga.FontManager.load();
        },
        initComplete = function () {
            debug.log("App.Manager.initComplete()");
            startSite();
        },
        init = function () {
            debug.levels(["log", "info", "error", "warn"]);
            debug.log("App.Manager.init()");
            Saga.AssetManager.on("inited", function () {
                //initComplete();
                loadFonts();
            });
            Saga.AssetManager.init(App.Assets);

            keyboard.init();
        };

    pub = {
        init: function () {
            init();
        }
    };
    return pub;
}());

App.Model = (function () {
    "use strict";
    var pub,
        users = [
            {
                "id": 1,
                "name": "Lecherito Fuentastico",
                "first_name": "Lecherito",
                "last_name": "Fuentastico"
            },
            {
                "id": 2,
                "name": "Caballero Condorito",
                "first_name": "Caballero",
                "last_name": "Condorito"
            }
        ];

    pub = {
        users: function (newUsers) {
            if (newUsers) {
                users = newUsers;
                pub.fire("users:changed");
            } else {
                return users;
            }
        }
    };

    Saga.Util.extend(pub, Saga.Event());
    return pub;
}());

App.SimpleAnimation = (function () {
    "use strict";
    var speed = 0.5,
        genContentInit = function (div, cb) {
            TweenLite.set(div, {
                css: {
                    autoAlpha: 0
                }
            });
            if (cb) {
                cb();
            }
        },
        genContentShow = function (div, cb) {
            var opts = {
                css: {
                    autoAlpha: 1
                }
            };
            if (cb) {
                opts.onComplete = cb;
            }
            TweenLite.to(div, speed, opts);
        },
        genContentHide = function (div, cb) {
            var opts = {
                css: {
                    autoAlpha: 0
                }
            };
            if (cb) {
                opts.onComplete = cb;
            }
            TweenLite.to(div, speed, opts);
        },
        genContentRemove = function (div, cb) {

        },
        pub = {
            genContentHide: function (div, cb) {
                genContentHide(div, cb);
            },
            genContentInit: function (div, cb) {
                genContentInit(div, cb);
            },
            genContentShow: function (div, cb) {
                genContentShow(div, cb);
            }
        };
    return pub;
}());

App.SimpleView = function (asset) {
    "use strict";
    var view,
        div,
        debug = Saga.Debug,
        e = Saga.Dom.getById,
        viewInit = function (cb) {
            debug.log("SimpleView ->" + asset.id + ".init()");
            div = e(asset.name);
            App.SimpleAnimation.genContentInit(div, cb);
        },
        viewShow = function (cb) {
            debug.log("SimpleView ->" + asset.id + ".show()");
            App.SimpleAnimation.genContentShow(div, cb);
        },
        viewHide = function (cb) {
            debug.log("SimpleView ->" + asset.id + ".hide()");
            App.SimpleAnimation.genContentHide(div, cb);
        },
        viewRemove = function () {
            debug.log("SimpleView ->" + asset.id + ".remove()");
        };

    view = {
        init: function (completeCallback) {
            viewInit(completeCallback);
        },
        show: function (completeCallback) {
            viewShow(completeCallback);
        },
        hide: function (completeCallback) {
            viewHide(completeCallback);
        },
        remove: function () {
            viewRemove();
        }
    };
    return view;
};