/*jslint browser:true*/
/*global Saga,ActiveXObject */

Saga.net = (function () {
    "use strict";
    var pub,
        util = Saga.Util,
        createXMLHttp = function () {
            if (typeof XMLHttpRequest !== undefined) {
                return new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'],
                    xmlHttp,
                    i;
                for (i = 0; i < ieXMLHttpVersions.length; i += 1) {
                    try {
                        xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
                        return xmlHttp;
                    } catch (e) {}
                }

            }
        },

        getUrlString = function (obj) {
            var narr = [],
                prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    narr.push(prop + "=" + obj[prop]);
                }
            }
            return narr.join("&");
        },

        loader = function (loaderOptions) {
            var pub,
                success,
                error,
                options = loaderOptions,
                debug = Saga.Debug,
                start,
                duration,
                response,

                url,
                method,
                params,
                data = null,
                xmlHttp,

                execute,
                abort,
                timeout,
                abortHandler,
                initOptions = function (options) {
                    if (options) {
                        if (options.url) {
                            url = options.url;
                        }

                        if (options.success) {
                            success = options.success;
                        }
                        if (options.error) {
                            error = options.error;
                        }
                        if (options.abort) {
                            abortHandler = options.abort;
                        }
                        if (options.timeout) {
                            timeout = options.timeout;
                        }
                        if (options.data) {
                            if (util.isString(options.data)) {
                                data = options.data;
                            } else {
                                data = getUrlString(options.data);
                            }
                        }
                        method = options.method || "get";
                    }
                };

            initOptions(options);
            
            xmlHttp = createXMLHttp(success, error);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        response = xmlHttp.responseText;
                        duration = (new Date().getTime()) - start;
                        try {
                            response = JSON.parse(response);
                        } catch (er) {
                            //ebug.warn("Saga.net.Loader -> Success, but couldn't parse JSON!", er);
                        }
                        /*
                        debug.warn("Saga.net.Loader -> Success!", {
                            'duration': duration,
                            'state': xmlHttp.readyState,
                            'response': response
                        });
                        */
                        if (success) {
                            success.call(null, xmlHttp.responseText);
                        }
                    } else {
                        debug.error("Saga.net.Loader -> Error!", xmlHttp.responseText);
                        if (error) {
                            error.call(null, xmlHttp.responseText);
                        }
                    }
                }/* else {
                    debug.warn("Saga.net.Loader -> state(" + xmlHttp.readyState + "/" + xmlHttp.status + ")");
                }*/
            };

            xmlHttp.ontimeout = function () {
                debug.error("Saga.net.Loader -> Timeout!", xmlHttp.responseText);
                if (error) {
                    error.call(null, xmlHttp.responseText);
                }
            };

            execute = function (options) {
                initOptions(options);
                debug.warn("Saga.net.Loader -> execute()", url, options);
                start = new Date().getTime();
                xmlHttp.open(method, url, true);
                if (String(method) === "post") {
                    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }
                if (timeout) {
                    xmlHttp.timeout = timeout;
                }
                xmlHttp.send(data);
            };

            abort = function (params) {
                if (xmlHttp.abort) {
                    xmlHttp.abort();
                    abortHandler();
                }
            };

            pub = {
                execute: function (options) {
                    execute(options);
                },
                abort: function () {
                    abort();
                },
                url: function (newUrl) {
                    if (newUrl) {
                        url = newUrl;
                    } else {
                        return url;
                    }
                },
                headers: function () {
                    return xmlHttp.getAllResponseHeaders();
                }
            };

            return pub;
        },



        iframePoster = function (options) {
            var success, error, url, params, iframe, form, execute, getResponse,
                data = null,
                files = null;
            // TODO: sanitize data

            if (options) {
                if (options.url) {
                    url = options.url;
                }
                if (options.success) {
                    success = options.success;
                }
                if (options.error) {
                    error = options.error;
                }
                if (options.data) {
                    data = options.data;
                }
                if (options.files) { // expecting elements ( file)
                    files = options.files;
                }
            }

            form = document.createElement("form");
            form.method = "post";
            form.enctype = "multipart/form-data";

            iframe = document.createElement('iframe');
            iframe.frameBorder = "no";
            iframe.style.width = "1px";
            iframe.style.height = "1px";
            iframe.style.position = "absolute";
            iframe.style.top = "-1000px";
            iframe.style.left = "-1000px";

            execute = function () {

                form.action = url;
                form.innerHTML = "";
                var elem,
                    inputname;

                if (data) {
                    for (inputname in data) {
                        if (data.hasOwnProperty(inputname)) {
                            if (data[inputname].textarea === true) {

                                elem = document.createElement("textarea");
                                elem.name = inputname;
                                //elem.type = "text";
                                elem.value = data[inputname].value;
                                form.appendChild(elem);
                            } else {
                                elem = document.createElement("input");
                                elem.name = inputname;
                                elem.type = "text";
                                elem.value = data[inputname];
                                form.appendChild(elem);
                            }
                        }
                    }
                }

                if (files) {
                    for (inputname in files) {
                        if (files.hasOwnProperty(inputname)) {
                            elem = files[inputname].cloneNode(1);
                            elem.name = inputname;
                            form.appendChild(elem);
                        }
                    }
                }

                iframe.onload = function () {
                    iframe.contentDocument.documentElement.appendChild(form);
                    iframe.onload = function () {
                        iframe.onload = null;
                        var response = iframe.contentWindow.document.body.innerHTML,
                            pos;

                        if (response.substr(0, 4) === "<pre") {
                            pos = String(response).indexOf(">");
                            if (pos > -1) {
                                response = response.substr((pos + 1));
                            }
                        }

                        if (response.substr(0, 5) === "<pre>") {
                            response = response.substr(5);
                        }

                        if (response.substr(response.length - 6, 6) === "</pre>") {
                            response = response.substr(0, response.length - 6);
                        }

                        iframe.parentNode.removeChild(iframe);

                        if (success) {
                            success.call(null, response);
                        }
                    };
                    form.submit();
                };
                iframe.src = "about:blank";
                document.body.appendChild(iframe);
            };

            return {
                execute: function () {
                    execute();
                }
            };
        };

    pub = {
        Loader: loader,
        IframePoster: iframePoster
    };

    return pub;
}());