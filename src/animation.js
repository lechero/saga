/*jslint browser:true*/
/*global Saga*/

Saga.Animation = (function () {
    "use strict";
    var pub,
        u = Saga.Util,
        debug = Saga.Debug,
        animations = [],
        animationCore,
        prefix = ['-webkit-', '-moz-', '-o-', '-ms-', ''],
        transitionTypes = ['-webkit-transition', '-moz-transition', '-o-transition', '-ms-transition', 'transition'],
        transformTypes = ['-webkit-transform', '-moz-transform', '-o-transform', '-ms-transform', 'transform'],
        transformTemplate = "",
        transformProperties = [
            "none",
            "matrix",
            "matrix3d",
            "translate",
            "translate3d",
            "matrix",
            "matrix3d",
            "translate",
            "translate3d",
            "translateX",
            "translateY",
            "translateZ",
            "scale",
            "scale3d",
            "scaleX",
            "scaleY",
            "scaleZ",
            "rotate",
            "rotate3d",
            "rotateX",
            "rotateY",
            "rotateZ",
            "skew",
            "skewX",
            "skewY",
            "perspective",
            "initial",
            "inherit"
        ],
        noCamel = [
            "transform-origin"
        ],
        toCamelCase = function (str) {
            if (str.charAt(0) === "-") {
                return str;
            }
            var nr = 0,
                parts = str.split("-"),
                newParts = u.map(parts, function (part) {
                    if (nr === 0) {
                        nr += 1;
                        return part;
                    }
                    if (part === "") { // troubles, check for starting with - ?? mayb <- it fuckes le transform , grrr
                        debug.warn("Something is starting with a -");
                    }
                    return part.charAt(0).toUpperCase() + part.slice(1);
                });
            return newParts.join("");
        },
        transitionEnd = function () {
            var name,
                el = document.createElement('bootstrap'),
                transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd otransitionend',
                    'transition': 'transitionend'
                };

            for (name in transEndEventNames) {
                if (transEndEventNames.hasOwnProperty(name)) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }
            }
            return false;
        },
        transitionStyles = function (props) {
            var types = ['-webkit-transition', '-moz-transition', '-o-transition', '-ms-transition', 'transition'],
                transforms = ['-webkit-transform', '-moz-transform', '-o-transform', '-ms-transform', 'transform'],
                styles = {},
                values;
            u.each(types, function (type, index) {
                values = [];
                u.each(props, function (val, prop) {
                    if (prop === "transform") {
                        prop = transforms[index];
                    }
                    values.push(prop + " " + val);
                });
                styles[type] = values.join(", ");
            });
            return styles;
        },
        transformStyles = function (props, elem) {
            var transformStyles = {},
                styles = {},
                tmp;

            if (elem) { //&& elem.hasOwnProperty("style") && elem.style.hasOwnProperty("transform")) {
                if (elem.style.transform !== "") {
                    u.each(elem.style.transform.split(" "), function (val) {
                        tmp = val.split("(");
                        transformStyles[tmp[0]] = val;
                    });
                }
            }
            if (!transformStyles.hasOwnProperty("translate3d")) { // force 3d 
                transformStyles.translate3d = "translate3d(0, 0, 0)";
            }
            u.each(props, function (val, prop) {
                if (transformProperties.hasOwnProperty(prop)) {
                    transformStyles[prop] = prop + "(" + val + ")";
                } else {
                    /*
                    if (!noCamel.hasOwnProperty(prop)) {
                        prop = toCamelCase(prop);
                    }
                    */
                    if (prop === "transform-origin") {
                        styles.webkitTransformOrigin = val;
                        styles.MozTransformOrigin = val;
                        styles.msTransformOrigin = val;
                        styles.OTransformOrigin = val;
                        styles.transformOrigin = val;
                        
                        /*
                        elem.style.webkitTransformOrigin = "0px 0px";
                        elem.style.MozTransformOrigin = "0px 0px";
                        elem.style.msTransformOrigin = "0px 0px";
                        elem.style.OTransformOrigin = "0px 0px";
                        elem.style.transformOrigin = "0px 0px";
                        */
                        /*
                        debug.error("transform-origin", prop, val)
                        u.each(prefix, function (prfx) {
                            styles[prfx + "transform-origin"] = val;
                        });
                        
                        debug.error(styles);
                        */
                    } else {
                        styles[prop] = val;
                    }
                }
            });
            transformStyles = u.toArray(transformStyles).join(" ");
            u.each(transformTypes, function (type) {
                styles[type] = transformStyles;
            });
            return styles;
        },
        setStyles = function (elem, obj, obj2, obj3, obj4) { /// ugly -> rewrite to check arguments, but i need it njouw
            var styles = obj || {};
            if (obj2) {
                u.extend(styles, obj2);
            }
            if (obj3) {
                u.extend(styles, obj3);
            }
            if (obj4) {
                u.extend(styles, obj4);
            }

            styles = transformStyles(styles, elem);
            debug.info("Saga.Dom.setStyles() -> Applying: ", elem, styles);
            u.each(styles, function (value, style) {

                elem.style[style] = value;
                debug.info("Saga.Dom.setStyles() -> Applying: ", style, value);
            });
        },
        animationCss3 = function () {
            var pub,
                tEnd = transitionEnd(),
                set = function (elem, props) {
                    debug.warn("set", elem, props);
                    setStyles(elem, props);
                },
                to = function (elem, props, time, cb) {
                    debug.warn("to", elem, props, time);

                    var transStyles = {},
                        tEndListener;
                    u.each(props, function (val, prop) {
                        if (transformProperties.hasOwnProperty(prop)) {
                            prop = "transform";
                        }
                        transStyles[prop] = time + "ms";
                    });

                    transStyles = transitionStyles(transStyles);
                    setStyles(elem, transStyles);

                    if (cb) {
                        tEndListener = function (evt) {
                            elem.removeEventListener(tEnd, tEndListener);
                            cb();
                        };
                        if (tEnd) {
                            elem.addEventListener(tEnd, tEndListener);
                        } else {
                            cb();
                        }
                    }
                    u.defer(function () {
                        setStyles(elem, props);
                    });
                };

            pub = {
                set: function (elem, props, time, cb) {
                    set(elem, props, time, cb);
                },
                to: function (elem, props, time, cb) {
                    to(elem, props, time, cb);
                }
            };

            return pub;
        };

    noCamel = u.object(noCamel, noCamel);
    transformProperties = u.object(transformProperties, transformProperties);
    animationCore = animationCss3();

    pub = {
        set: function () {
            animationCore.set.apply(this, arguments);
        },
        to: function () {
            animationCore.to.apply(this, arguments);
        }
    };

    return pub;
}());