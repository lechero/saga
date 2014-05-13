/*jslint browser:true*/
/*global Saga */

Saga.AssetManager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        dom = Saga.Dom,
        loader = Saga.net.Loader(),
        assets = false,
        holders = {},
        loadStack = [],
        loading = false,
        currentStackAsset = false,
        getHolder = function (name) {
            var holder;
            if (!holders[name]) {
                holders[name] = Saga.Holder(name);
            }
            return holders[name];
        },
        loadJs = function (file, cb) {
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
            var loadOptions = {
                method: "get",
                url: file,
                success: function (result) {
                    if (cb) {
                        cb(result);
                    }
                }
            };
            loader.execute(loadOptions);
        },
        loadStackAsset = function (stackAsset) {
            var items = stackAsset.asset.loadStack(),
                loadNextItem = function () {
                    var item,
                        itemsLeft = u.filter(items, function (item) {
                            return !item.loaded;
                        });
                    if (itemsLeft.length > 0) {
                        item = itemsLeft[0];
                        if (item.type === 'html' || item.type === 'template') {
                            loadHtml(item.file, function (html) {
                                item.loaded = true;
                                item.content = html;
                                loadNextItem();
                            });
                        }
                        if (item.type === 'js') {
                            loadJs(item.file, function (js) {
                                item.loaded = true;
                                item.content = js;
                                loadNextItem();
                            });
                        }
                    } else {
                        stackAsset.done();
                    }
                };
            loadNextItem();
        },
        load = function () {
            debug.info("Saga.AssetManager.load() -> loading: ", loading);
            if (loading) {
                debug.info("Saga.AssetManager.load() -> Already loading, waiting...", currentStackAsset);
                return;
            }
            if (loadStack.length > 0) {
                loading = true;
                currentStackAsset = loadStack[0];
                loadStack.shift();
                loadStackAsset(currentStackAsset);
            } else {
                debug.info("Saga.AssetManager.load() -> Nothing else to load");
            }
        },
        loadAssetDone = function (asset, cb) {
            loading = false;
            asset.loadComplete();
            pub.fire(asset.name + ":loaded");
            if (cb) {
                cb();
            }
            load();
        },
        loadAsset = function (asset, cb) {
            debug.info("Saga.AssetManager.loadAsset() -> ", asset);
            if (asset.loaded()) {
                loadAssetDone(asset, cb);
                return;
            }
            loadStack.push({
                'asset': asset,
                'done': function () {
                    debug.info("Saga.AssetManager.loadAsset() -> Load Done ", asset);
                    loadAssetDone(asset, cb);
                }
            });
            load();
        },
        initAssets = function (assets) {
            debug.info("Saga.AssetManager.initAssets() -> ", assets);
            u.each(assets, function (assetInfo, name) {
                u.extend(assetInfo, Saga.Asset(name, assetInfo));
                assetInfo.Holder = getHolder(assetInfo.holder);
            });
            pub.fire("inited");
        },
        init = function (projectAssets, holders) {
            debug.info("Saga.AssetManager.init() -> ", projectAssets);
            if (holders) {
                u.each(holders, function (holder, name) {
                    holders[holder] = getHolder(holder);
                    holders[name] = holders[holder]; // So The holder can be referenced with the given name
                });
            }
            assets = projectAssets;
            initAssets(assets);
        },
        remove = function (asset) {
            debug.info("Saga.AssetManager.remove() -> ", asset);
            try {
                asset.View.remove();
                pub.fire(asset.name + ":removed");
            } catch (err) {
                pub.fire(asset.name + ":removed");
                debug.warn("Saga.AssetManager.remove('" + asset.name + "') -> No REMOVE");
            }
            asset.Js().parentNode.removeChild(asset.Js());
        },
        hide = function (asset, cb) {
            debug.info("Saga.AssetManager.hide() -> ", asset);
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
            debug.info("Saga.AssetManager.place -> ", asset.name, "in", asset.holder, asset.Holder);
            if (!asset.loaded()) {
                loadAsset(asset, function () {
                    place(asset);
                });
                return;
            }
            if (!asset.Holder) {
                asset.Holder = getHolder(asset.holder);
            }

            asset.Holder.place(asset);
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
            debug.info("Saga.AssetManager.show -> ", asset, asset.Holder);

            if (asset.Holder && asset.Holder.asset()) {
                debug.info("Saga.AssetManager.show -> hiding", asset.Holder.asset());
                hide(asset.Holder.asset(), function () {
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
    u.extend(pub, Saga.Event());
    return pub;
}());