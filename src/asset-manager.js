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
        loadJs = function (file, cb) {
            debug.info("Saga.AssetManager.loadJs() ", file);
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
            debug.info("Saga.AssetManager.loadHtml() ", file, loadOptions);
            loader.execute(loadOptions);
        },
        loadStackAsset = function (stackAsset) {
            debug.info("Saga.AssetManager.loadStackAsset() ", stackAsset);
            var items = stackAsset.asset.loadStack(),
                loadNextItem = function () {
                    var item,
                        itemsLeft = u.filter(items, function (item) {
                            return !item.loaded;
                        });
                    debug.info("Saga.AssetManager.loadStackAsset() -> loadNextItem()", items, " -> itemsLeft: ", itemsLeft);
                    if (itemsLeft.length > 0) {
                        item = itemsLeft[0];
                        debug.info("Saga.AssetManager.loadStackAsset() -> loadNextItem()", item, "!!!!! ");
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
                        stackAsset.cb();
                    }
                };
            debug.info("Saga.AssetManager.loadStackAsset() -> items ", items);
            loadNextItem();
        },
        load = function () {
            debug.info("Saga.AssetManager.load() -> loadStack ", loadStack);
            if (loading) {
                debug.info("Saga.AssetManager.load() -> Already loading, waiting...", currentStackAsset);
                return;
            }
            if (loadStack.length > 0) {
                currentStackAsset = loadStack[0];
                loadStack.shift();
                debug.info("Saga.AssetManager.load() -> loading ", currentStackAsset);
                loadStackAsset(currentStackAsset);
            }
        },
        loadAssetDone = function (asset, cb) {
            //asset.loade = true; // scope problem !!!
            asset.loadComplete();
            pub.fire(asset.name + ":loaded");
            if (cb) {
                cb();
            }
        },
        loadAsset = function (asset, cb) {
            debug.info("Saga.AssetManager.loadAsset() -> ", asset);
            if (asset.loaded()) {
                loadAssetDone(asset, cb);
                return;
            }

            loadStack.push({
                'asset': asset,
                'cb': function () {
                    debug.info("Saga.AssetManager.loadAsset() -> Load Done ", asset);
                    loadAssetDone(asset, cb);
                }
            });
            load();
            /*
            asset.saga.js.push(addJsFile(asset.files.js, function () {
                loadHtml(asset.files.html, function (html) {
                    asset.saga.html.push(html);
                    if (asset.files.hasOwnProperty('template')) { // No idea yet what to do with templates yet ( where to put them, load seperate or as collection etc bler, so assing a template to the asset root for njouw
                        loadHtml(asset.files.template, function (html) {
                            asset.saga.template = html;
                            asset.template = u.template(html);
                            loadAssetDone(asset, cb);
                        });
                    } else {
                        loadAssetDone(asset, cb);
                    }
                });
            }));
            */
        },
        initAssets = function (assets) {
            debug.info("Saga.AssetManager.initAssets() -> ", assets);
            u.each(assets, function (assetInfo, name) {
                u.extend(assetInfo, Saga.Asset(name, assetInfo));
            });
            pub.fire("inited");
        },
        init = function (projectAssets) {
            debug.info("Saga.AssetManager.init() -> ", projectAssets);
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
                if (!holders[asset.holder]) {
                    holders[asset.holder] = Saga.Holder(asset.holder);
                }
                asset.Holder = holders[asset.holder];
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
            /*
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
            */
        },
        show = function (asset) {
            debug.info("Saga.AssetManager.show -> ", asset);
            if (asset.Holder && asset.Holder.asset()) {
                debug.info("Saga.AssetManager.show -> hiding", asset.Holder.asset());
                hide(asset.Holder.asset(), function () {
                    place(asset);
                });
            } else {
                place(asset);
            }
            /*
            var holder = getAssetHolder(asset);
            if (holder && holder.asset()) {
                debug.info("Saga.AssetManager.show -> hiding", holder.asset());
                hide(holder.asset(), function () {
                    place(asset);
                });
            } else {
                place(asset);
            }
            */
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