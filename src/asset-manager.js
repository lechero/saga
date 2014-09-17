/*jslint browser:true*/
/*global Saga */

Saga.AssetManager = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        dom = Saga.Dom,
        assets = false,
        templates = false,
        holders = {},
        loadManager = Saga.LoadManager,
        getHolder = function (name) {
            var holder;
            if (!holders[name]) {
                holders[name] = Saga.Holder(name);
            }
            return holders[name];
        },
        loadAssetDone = function (asset, cb) {
            //alert("loadAssetDone: " + JSON.stringify(asset.loadStack()));
            asset.loadComplete();
            //alert("loadAssetDone: " + JSON.stringify(asset.stack()));
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

            var stack = asset.loadStack(),
                urls = u.map(stack, function (item) {
                    return item.file;
                });

            loadManager.load(urls, function () {
                
                u.each(stack, function (item,id) { // TODO: IE loss of reference!?!?!?!
                    stack[id].loaded = true;
                    stack[id].content = loadManager.dir()[item.file];
                    /*
                    item.loaded = true;
                    item.content = loadManager.dir()[item.file];
                    */
                });
                // TODO: Figure out weirdness , references of stack in asset is lost? !?!?! why?! setting now but LAAAAMEEE 
                asset.loadStack(stack); // -> i am totally missing something 
                //alert("loadAsset: " + JSON.stringify(stack));
                loadAssetDone(asset, cb);
            });
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

            try {
                asset.Js().parentNode.removeChild(asset.Js());
            } catch (errr) {
                //pub.fire(asset.name + ":removed");
                //debug.warn("Saga.AssetManager.remove('" + asset.name + "') -> No REMOVE");
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
        },
        initTemplates = function (tmpls, cb) {
            templates = tmpls;
            var urls = u.values(templates);

            loadManager.load(urls, function () {
                u.each(templates, function (item, name) {
                    templates[name] = u.template(loadManager.dir()[item]);
                    //item.content = loadManager.dir()[item];
                });
                if (cb) {
                    //templates
                    cb(templates);
                }
                /*
                u.each(stack, function (item) {
                    item.loaded = true;
                    item.content = loadManager.dir()[item.file];
                });
                //loadAssetDone(asset, cb);
                */
            });
        };

    pub = {
        initTemplates: function (templates, cb) {
            initTemplates(templates, cb);
        },
        init: function (projectAssets) {
            init(projectAssets);
        },
        hide: function (asset, cb) {
            hide(asset, cb);
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