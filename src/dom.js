/*jslint browser:true*/
/*global Saga, console */

//TODO: use underscore where possible

Saga.Dom = (function () {
    "use strict";
    var pub,
        u = Saga.Util,
        debug = Saga.Debug,
        head = document.getElementsByTagName("head")[0] || document.documentElement,
        hasClass = function (element, className) {
            if (element && element.className) {
                return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }
            return false;
        },
        addClass = function (element, className) {
            if (!hasClass(element, className)) {
                element.className += " " + className;
            }
            return true;
        },
        removeClass = function (element, className) {
            if (hasClass(element, className)) {
                element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
            }
            return true;
        },
        getByClassWild = function (className, findIn) {
            var elem = findIn || document,
                elements = elem.getElementsByTagName('*'),
                i = 0,
                l = elements.length,
                results = [];
            for (i; i < l; i += 1) {
                if (hasClass(elements[i], className)) {
                    results.push(elements[i]);
                }
            }
            return results;
        },
        getByClass = function (className, findIn) {
            var results,
                elem = findIn || document;
            if (elem.querySelectorAll) {
                results = elem.querySelectorAll('.' + className);
            } else if (elem.getElementsByClassName) {
                results = elem.getElementsByClassName(className);
            } else {
                getByClassWild(className, findIn);
            }
            return results;
        },
        getById = function (id) {
            return document.getElementById(id);
        },
        elementExists = function (id) {
            if (getById(id) === null) {
                return false;
            }
            return true;
        },
        addCss = function (cssTxt, id) {
            var style = document.createElement("style");
            style.type = "text/css";
            if (id) {
                if (elementExists(id)) {
                    debug.warn("Saga.Dom.addCss(\"" + id + "\"), ID: " + id + " already exists");
                }
                style.id = id;
            }
            if (style.styleSheet) {
                style.styleSheet.cssText = cssTxt;
            } else {
                style.appendChild(document.createTextNode(cssTxt));
            }
            head.appendChild(style);
            return style;
        },
        removeCss = function (id) {
            if (!elementExists(id)) {
                debug.warn("Saga.Dom.removeCss(\"" + id + "\"), ID: " + id + " doesn't exist!");
                return false;
            }
            head.removeChild(getById(id));
            return true;
        },
        addJsFile = function (file, cb, id) {

            var script = document.createElement('script'),
                done = false;
            script.type = "text/javascript";
            if (id) {
                script.id = id;
            }
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
            script.src = file;
            head.appendChild(script);

            return script;
        },
        addJs = function (jsContents, id) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (id) {
                script.id = id;
            }
            try {
                script.appendChild(document.createTextNode(jsContents));
            } catch (e) {
                script.text = jsContents;
            }
            head.appendChild(script);
            return true;
        },
        removeJs = function (id) {
            if (!id) {
                return false;
            }
            try {
                head.removeChild(getById(id));
            } catch (e) {
                return false;
            }
            return true;
        },
        getElementStyle = function (element, styleProp) {
            return (element.currentStyle) ? element.currentStyle[styleProp] : (window.getComputedStyle) ? document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp) : 'unknown';
        },
        addLoadEvent = function (func) {
            var oldonload = window.onload;
            if (typeof window.onload !== 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                };
            }
        },
        // UTILS ? ?!?!? -> copied to animation for now
        capitaliseFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
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
            debug.info("Saga.Dom.setStyles() -> Applying: ", elem, styles);
            u.each(styles, function (value, style) {
                // test
                style = toCamelCase(style);
                debug.info("Saga.Dom.setStyles() -> Applying: ", style, ": ", value);
                elem.style[style] = value;
            });
        };

    pub = {
        transitionStyles: function (props) {
            var types = ['-webkit-transition', '-moz-transition', '-o-transition', '-ms-transition', 'transition'],
                transforms = ['-webkit-transform', '-moz-transform', '-o-transform', '-ms-transition', 'transform'],
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
        transformStyles: function (props) {
            var types = ['-webkit-transform', '-moz-transform', '-o-transform', '-ms-transition', 'transform'],
                styles = {},
                values;
            if (!props.hasOwnProperty("translate3d")) {
                props.translate3d = "0, 0, 0";
            }

            u.each(types, function (type) {
                values = [];
                u.each(props, function (val, prop) {
                    values.push(prop + "(" + val + ")");
                });
                styles[type] = values.join(" ");
            });
            return styles;
        },
        transitionEnd: function () {
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
                        return {
                            end: transEndEventNames[name]
                        };
                    }
                }
            }
            return false;
        },
        setStyles: function (elem, obj, obj2, obj3, obj4) {
            setStyles(elem, obj, obj2, obj3, obj4);
        },
        hasClass: function (element, className) {
            return hasClass(element, className);
        },
        addClass: function (element, className) {
            return addClass(element, className);
        },
        removeClass: function (element, className) {
            return removeClass(element, className);
        },
        getByClass: function (className, findIn) {
            return getByClass(className, findIn);
        },
        getById: function (id) {
            return getById(id);
        },
        elem: function (id) {
            return getById(id);
        },
        elementExists: function (id) {
            return elementExists(id);
        },
        addJsFile: function (file, id) {
            return addJsFile(file, id);
        },
        addJs: function (jsContents, id) {
            return addJs(jsContents, id);
        },
        removeJs: function (id) {
            return removeJs(id);
        },
        addCss: function (cssContents, id) {
            return addCss(cssContents, id);
        },
        removeCss: function (id) {
            return removeCss(id);
        },
        getElementStyle: function (element, styleProp) {
            return getElementStyle(element, styleProp);
        },
        addLoadEvent: function (func) {
            addLoadEvent(func);
        },
        head: function () {
            return head;
        }
    };
    return pub;
}());