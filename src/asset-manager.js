/*jslint browser:true*/
/*global Saga */

Saga.AssetManager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        dom = Saga.Dom,
        assets = false,
        loader = Saga.net.Loader(),
        holders = {},
        settings = function () {
            return {
                'loaded': false,
                'view': false,
                'js': [],
                'html': [],
                'template': false
            };
        },
        getAssetHolder = function (asset) {
            var holder = false;
            if (holders.hasOwnProperty(asset.holder)) {
                holder = holders[asset.holder];
            }
            return holder;
        },
        addJsFile = function (file, cb) {
            var script = document.createElement('script'),
                done = false,
                head = dom.head();
            script.type = "text/javascript";
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                    if (cb) {
                        cb(script);
                    }
                }
            };
            script.src = file;
            head.appendChild(script);

            return script;
        },
        loadHtml = function (file, cb) {
            var loader = new Saga.net.Loader({
                method: "get",
                url: file,
                success: function (result) {
                    if (cb) {
                        cb(result);
                    }
                    loader = null;
                }
            });
            loader.execute();
        },
        loadAssetDone = function (asset, cb) {
            asset.loaded = true;
            pub.fire(asset.name + ":loaded");
            if (cb) {
                cb();
            }
        },
        loadAsset = function (asset, cb) {
            asset.saga.js.push(addJsFile(asset.files.js, function () {
                loadHtml(asset.files.html, function (html) {
                    asset.saga.html.push(html);
                    if (asset.files.hasOwnProperty('template')) { // No idea yet what to do with templates yet ( where to put them, load seperate or as collection etc bler, so assing a template to the asset root for njouw
                        loadHtml(asset.files.template, function (html) {
                            asset.saga.template = html;
                            asset.template = util.template(html);
                            loadAssetDone(asset, cb);
                        });
                    } else {
                        loadAssetDone(asset, cb);
                    }
                });
            }));
        },
        initAssets = function (assets) {
            var asset;
            for (asset in assets) {
                if (assets.hasOwnProperty(asset)) {
                    assets[asset].saga = util.clone(settings());
                    assets[asset].name = asset;
                    assets[asset].id = asset;
                    assets[asset].View = {};
                }
            }
            pub.fire("inited");
        },
        init = function (projectAssets) {
            debug.info("Saga.AssetManager.init -> ", projectAssets);
            assets = projectAssets;
            initAssets(assets);
        },
        remove = function (asset) {
            try {
                asset.View.remove();
                pub.fire(asset.name + ":removed");
            } catch (err) {
                pub.fire(asset.name + ":removed");
                debug.warn("Saga.AssetManager.place('" + asset.name + "') -> No REMOVE");
            }
        },
        hide = function (asset, cb) {
            debug.info("Saga.AssetManager.hide -> ", asset);
            try {
                asset.View.hide(function () {
                    pub.fire(asset.name + ":hidden");
                    remove(asset);
                    if (cb) {
                        cb();
                    }
                });
            } catch (er) {
                pub.fire(asset.name + ":hidden");
                remove(asset);
                if (cb) {
                    cb();
                }
                debug.warn("Saga.AssetManager.place('" + asset.name + "') -> No HIDE");
            }

        },
        place = function (asset) {
            debug.info("Saga.AssetManager.place -> ", asset.id, "in", asset.holder);
            if (!asset.loaded) {
                loadAsset(asset, function () {
                    place(asset);
                });
                return;
            }
            var holder = getAssetHolder(asset);
            if (!holder) {
                holders[asset.holder] = Saga.Holder(asset.holder);
                holder = holders[asset.holder];
            }
            holder.setAsset(asset);

            try {
                asset.View.init();
            } catch (er) {
                debug.warn("Saga.AssetManager.place('" + asset.name + "') -> No INIT");
            }
            pub.fire(asset.name + ":inited");

            try {
                asset.View.show(function () {
                    pub.fire(asset.name + ":shown");
                });
            } catch (err) {
                pub.fire(asset.name + ":shown");
                debug.warn("Saga.AssetManager.place('" + asset.name + "') -> No SHOW");
            }
        },
        show = function (asset) {
            debug.info("Saga.AssetManager.show -> ", asset);
            var holder = getAssetHolder(asset);
            if (holder && holder.asset()) {
                debug.info("Saga.AssetManager.show -> hiding", holder.asset());
                hide(holder.asset(), function () {
                    place(asset);
                });
            } else {
                place(asset);
            }
        };

    pub = {
        init: function (projectAssets) {
            init(projectAssets);
        },
        show: function (asset) {
            show(asset);
        },
        assets: function () {
            return assets;
        }
    };
    util.extend(pub, Saga.Event());
    return pub;
}());