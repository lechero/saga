/*jslint browser:true*/
/*global Saga, console */

//TODO: use underscore where possible

Saga.Dom = (function () {
    "use strict";
    var pub,
        u = Saga.Util,
        debug = Saga.Debug,
        head = document.getElementsByTagName("head")[0] || document.documentElement,
        prefixBrowser = ["webkit", "moz", "MS", "o", ""],
        //line.getAttributeNS(null, "class"
        hasClassNS = function (element, className) {
            var classes = element.getAttributeNS(null, "class") || "";
            if (element && classes) {
                return classes.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }
            return false;
        },
        hasClass = function (element, className) {
            if (element && element.className) {
                return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
            }
            return false;
        },
        addClassNs = function (element, className) {
            try {
                var classes = element.getAttributeNS(null, "class") || "";
                if (!hasClassNS(element, className)) {
                    classes += " " + className;
                    element.setAttributeNS(null, "class", classes);
                }
            } catch (e) {
                //debug.warn("Saga.Dom.addClassNs(\"" + element + "\"), Class: " + className + " ERROR", e);
            }
        },
        addClass = function (element, className) {
            //console.trace("addClass", element, className);
            if (!hasClass(element, className)) {
                element.className += " " + className;
            }
            return true;
        },
        removeClassNs = function (element, className) {
            try {
                var classes = element.getAttributeNS(null, "class") || "";
                if (hasClassNS(element, className)) {
                    classes = classes.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
                    element.setAttributeNS(null, "class", classes);
                }
            } catch (e) {
                //debug.warn("Saga.Dom.removeClassNs(\"" + element + "\"), Class: " + className + " ERROR", e);
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
        addCssFile = function (file, id) {
            var link = document.createElement('link');
            if (id) {
                link.id = id;
            }
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = file;
            link.media = 'all';
            head.appendChild(link);
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
        setInputData = function (formClass, data, container) {
            debug.info("Saga.Dom.setInputData() -> ", formClass, container, data);
            var fields = getByClass(formClass),
                fieldsTotal = fields.length,
                i = 0;

            for (i; i < fieldsTotal; i += 1) {
                //console.log(fields[i].name+" / "+data[fields[i].name]);
                if ((data[fields[i].name] || data[fields[i].name] === "") && fields[i].type !== "file") {
                    fields[i].value = data[fields[i].name];
                }
            }
            //        }
        },
        getInputData = function (fieldClassName, findIn, man, incAll) { // check for all fields except file
            var data = {},
                files = {},
                fields = getByClass(fieldClassName, findIn),
                gotFields = {},
                fieldsTotal = fields.length,
                i = 0,
                valid = true,
                mandatory = false,
                includeAll,
                invalidVar = true,
                isInvalidVar = function (invalidVar) {
                    return fields[i].value === invalidVar;
                };

            if (incAll) {
                includeAll = incAll;
            } else {
                includeAll = true;
            }
            if (man) {
                mandatory = man;
            }


            for (i; i < fieldsTotal; i += 1) {
                if (fields[i].type !== "file" && fields[i].type !== "radio") {

                    //debug.error("DOM INPUT",fields[i],fields[i].name);

                    removeClass(fields[i], "error");
                    if (mandatory[fields[i].name] && fields[i].value === "") {
                        addClass(fields[i], "error");
                        valid = false;
                    }
                    if (mandatory[fields[i].name].no) {
                        invalidVar = u.find(mandatory[fields[i].name].no, isInvalidVar);
                        if (invalidVar) {
                            addClass(fields[i], "error");
                            valid = false;
                        }
                    }
                    if (includeAll || (!includeAll && fields[i].value !== "")) {
                        data[fields[i].name] = fields[i].value;
                        gotFields[fields[i].name] = fields[i];
                        //}
                    }
                    //debug.error("DOM INPUT END ",fields[i],fields[i].name);
                }
                if (fields[i].type === "radio" && fields[i].checked) {
                    if (mandatory[fields[i].name] && fields[i].value === "") {
                        addClass(fields[i], "error");
                        valid = false;
                    }
                    if (includeAll || (!includeAll && fields[i].value !== "")) {
                        data[fields[i].name] = fields[i].value;
                        gotFields[fields[i].name] = fields[i];
                    }
                }

                if (fields[i].value !== "" && fields[i].type === "file") {
                    //if(!includeAll && fields[i].value !== ""){
                    files[fields[i].name] = fields[i];
                    //}
                }

            }
            return {
                'valid': valid,
                'data': data,
                'fields': gotFields,
                'files': files
            };
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
        getClickXY = function (evt, scale) {
            var scaleFactor = 1,
                xy = {
                    x: evt.layerX,
                    y: evt.layerY
                };

            if (scale) {
                scaleFactor = scale;
            }

            if (navigator.userAgent.toLowerCase().indexOf('firefox') <= -1) {
                //debug.error("NO FF");
                if (!evt) {
                    evt = window.event;
                }
                xy.x = Math.round(xy.x / scaleFactor);
                xy.y = Math.round(xy.y / scaleFactor);
                debug.info("Scale Adjusting x,y position !!", scaleFactor);
            }
            return xy;
        },
        mouseCoords = function (evt) {
            if (evt.pageX || evt.pageY) {
                return {
                    x: evt.pageX,
                    y: evt.pageY
                };
            }
            return {
                x: evt.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: evt.clientY + document.body.scrollTop - document.body.clientTop
            };
        },
        /*
        animationstart	animationstart	webkitAnimationStart	oanimationstart	MSAnimationStart
        animationiteration	animationiteration	webkitAnimationIteration	oanimationiteration	MSAnimationIteration
        animationend	animationend	webkitAnimationEnd	oanimationend	MSAnimationEnd

        Webkit browsers (Chrome, Safari) use webkitTransitionEnd
        Firefox uses transitionend
        IE9+ uses msTransitionEnd
        Opera uses oTransitionEnd

        */
        bindEvent = function (el, eventName, eventHandler) {
            if (el.addEventListener) {
                el.addEventListener(eventName, eventHandler, false);
            } else if (el.attachEvent) {
                debug.log("Saga.Dom.bindEvent() -> ", eventName, 'on' + eventName);
                el.attachEvent('on' + eventName, eventHandler);
            }
        },
        prefixedEvent = function (element, type, callback, all) {
            var p = 0,
                l = prefixBrowser.length,
                fired = false,
                endCb = function () {
                    if (!fired) {
                        fired = true;
                        callback();
                    }
                };
            for (p; p < l; p += 1) {
                if (!prefixBrowser[p]) {
                    type = type.toLowerCase();
                }
                //element.addEventListener(prefixBrowser[p] + type, endCb, false);
                bindEvent(element, prefixBrowser[p] + type, callback);
            }
        },
        transitionEnd = function (elem, cb) {
            var fired = false;
            prefixedEvent(elem, "TransitionEnd", cb);

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
                //debug.info("Saga.Dom.setStyles() -> Applying: ", style, ": ", value);
                elem.style[style] = value;
            });
        };

    pub = {
        mouseCoords: function (evt) {
            return mouseCoords(evt);
        },
        getClickXY: function (evt, scale) {
            return getClickXY(evt, scale);
        },
        setInputData: function (formClass, data, container) {
            return setInputData(formClass, data, container);
        },
        getInputData: function (fieldClassName, findIn, man, incAll) {
            return getInputData(fieldClassName, findIn, man, incAll);
        },
        /*
      
        */
        setOrigin: function (elem, point) {
            var transformOrigin = point.x + "px " + point.y + "px";
            debug.warn("Saga.FloorMap.Floor.setOrigin()", elem, point, transformOrigin);
            elem.style.WebkitTransformOrigin = transformOrigin;
            elem.style.MozTransformOrigin = transformOrigin;
            elem.style.OTransformOrigin = transformOrigin;
            elem.style.msTransformOrigin = transformOrigin;
            elem.style.KhtmlTransformOrigin = transformOrigin;
            elem.style.TransformOrigin = transformOrigin;
        },
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
            /*
            if (!props.hasOwnProperty("translate3d")) {
                props.translate3d = "0, 0, 0";
            }
        */
            u.each(types, function (type) {
                values = [];
                u.each(props, function (val, prop) {
                    values.push(prop + "(" + val + ")");
                });
                styles[type] = values.join(" ");
            });
            return styles;
        },
        prefixedEvent: function (element, type, callback) {
            return prefixedEvent(element, type, callback);
        },
        transitionEnd: function (elem, cb) {
            return transitionEnd(elem, cb);
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
        addClassNS: function (element, className) {
            return addClassNs(element, className);
        },
        removeClass: function (element, className) {
            return removeClass(element, className);
        },
        removeClassNS: function (element, className) {
            return removeClassNs(element, className);
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
        addCssFile: function (file, id) {
            addCssFile(file, id);
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