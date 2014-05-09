//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map
/*jslint browser:true*/
/*global */

var Saga = (function () {
    "use strict";
    var version = "@VERSION",
        sagaId = "saga",
        doc = document,
        vars = false,
        pub = {
            vars: (function () {
                return vars;
            }())
        };
    try {
        JSON.parse(doc.getElementById(sagaId).innerHTML);
    } catch (err) {
        vars = "NOT_SET";
    }
    return pub;
}());/*jslint browser:true*/
/*global Saga, console, _ */

Saga.Util = (function () {
    "use strict";
    var pub = _,
        hasLala = function () {};
    pub.lala = function () {};

    return pub;
}());/*jslint browser:true*/
/*global Saga, console */

Saga.Debug = (function () {
    "use strict";
    var pub,
        util = Saga.Util,
        levels = ["log", "info", "error", "warn"],
        activeLevels = ["log", "error"],
        timestamp = function () {
            var d = new Date();
            return (d.getUTCHours() + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2) + '.' + ('00' + d.getUTCMilliseconds()).slice(-3));
        },
        log = function () {
            if (util.contains(activeLevels, 'log')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.log.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        info = function () {
            if (util.contains(activeLevels, 'info')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.info.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        error = function () {
            if (util.contains(activeLevels, 'error')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.error.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        },
        warn = function () {
            if (util.contains(activeLevels, 'warn')) {
                var arg = Array.prototype.slice.call(arguments, 0);
                arg.unshift(timestamp() + ": ");
                try {
                    console.warn.apply(console, arg);
                } catch (err) {
                    //console.log("Saga.Debug.log() -> catch", err);
                }
            }
        };
    pub = {
        log: function () {
            log.apply(this, arguments);
        },
        info: function () {
            info.apply(this, arguments);
        },
        error: function () {
            error.apply(this, arguments);
        },
        warn: function () {
            warn.apply(this, arguments);
        },
        levels: function (newLevels) {
            if (newLevels) {
                activeLevels = newLevels;
            } else {
                return activeLevels;
            }
        }
    };
    return pub;
}());/*jslint browser:true*/
/*global Saga*/

Saga.Event = function () {
    "use strict";
    var pub,
        cbs = {},
        off = function (evt, cb) {
            if (typeof cbs[evt] === "undefined") {
                return;
            }
            var l = cbs[evt].length,
                i = l - 1,
                removed = 0;
            if (l > 0) {
                for (i; i >= 0; i -= 1) { //removing all for now
                    if (cbs[evt][i].cb === cb) {
                        cbs[evt].splice(i, 1);
                        removed += 1;
                    }
                }
            }
            return removed;
        },
        offCb = function (e) {
            if (typeof cbs[e.evt] === "undefined") {
                return;
            }
            off(e.evt, e.cb);
        },
        addCb = function (evt, cb, context, amount) {
            if (typeof cbs[evt] === "undefined") {
                cbs[evt] = [];
            }
            var e = {
                'cb': cb,
                'evt': evt,
                'type': amount,
                'context': context
            };
            e.off = function () {
                offCb(e);
            };
            cbs[evt].push(e);
            return e;
        },
        on = function (evt, cb, context) {
            return addCb(evt, cb, context, 0);
        },
        once = function (evt, cb, context) {
            return addCb(evt, cb, context, 1);
        },
        fire = function (evt, data) {
            if (typeof cbs[evt] === "undefined") {
                return;
            }
            var l = cbs[evt].length,
                i = l - 1,
                removed = 0;
            if (l > 0) {
                for (i; i >= 0; i -= 1) {
                    cbs[evt][i].cb(data);
                    if (cbs[evt][i].type === 1) {
                        cbs[evt].splice(i, 1);
                    }
                }
            }
        };

    pub = {
        on: function (evt, cb) {
            return on(evt, cb);
        },
        once: function (evt, cb) {
            return once(evt, cb);
        },
        off: function (evt, cb) {
            return off(evt, cb);
        },
        fire: function (evt, data) {
            fire(evt, data);
        }
    };
    return pub;
};/*jslint browser:true*/
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
                tmpArr,
                prop,

                url,
                method,
                params,
                data = null,
                xmlHttp,

                execute,
                abort,
                timeout,
                abortHandler;
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
            xmlHttp = createXMLHttp(success, error);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        debug.info("Saga.net.Loader -> Success!", xmlHttp.responseText);
                        if (success) {
                            success.call(null, xmlHttp.responseText);
                        }
                    } else {
                        debug.error("Saga.net.Loader -> Error!", xmlHttp.responseText);
                        if (error) {
                            error.call(null, xmlHttp.responseText);
                        }
                    }
                } else {
                    debug.info("Saga.net.Loader -> state(" + xmlHttp.readyState + "/" + xmlHttp.status + ")");
                }
            };

            xmlHttp.ontimeout = function () {
                debug.error("Saga.net.Loader -> Timeout!", xmlHttp.responseText);
                if (error) {
                    error.call(null, xmlHttp.responseText);
                }
            };

            execute = function (params) {
                debug.info("Saga.net.Loader -> execute()", params);
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
                execute: function () {
                    execute();
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
}());/*jslint browser:true*/
/*global Saga, console */

//TODO: use underscore where possible

Saga.Dom = (function () {
    "use strict";
    var pub,
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
        };

    pub = {
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
}());/*jslint browser:true*/
/*global Saga, escape, unescape */

Saga.Browser = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        agent = navigator.userAgent.split(/\s*[;)(]\s*/),
        setCookie = function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
        },
        getCookie = function (c_name) {
            if (document.cookie.length > 0) {
                var c_start, c_end;
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start !== -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end === -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return false;
        };

    pub = {
        setCookie: function (name, value, expiredays) {
            setCookie(name, value, expiredays);
        },
        getCookie: function (name) {
            setCookie(name);
        }
    };
    return pub;
}());/*jslint browser:true*/
/*global Saga*/

Saga.Holder = function (holderDivName) {
    "use strict";
    var pub,
        asset = false,
        divName = holderDivName,
        div = false,
        debug = Saga.Debug,
        setAsset = function (newAsset) {
            asset = newAsset;
            div = document.getElementById(divName);
            div.innerHTML = asset.saga.html[0];
            return true;
        };

    pub = {
        asset: function () {
            return asset;
        },
        div: function () {
            return div;
        },
        setAsset: function (asset) {
            return setAsset(asset);
        }
    };
    return pub;
};/*jslint browser:true*/
/*global Saga */

Saga.Route = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        routes = false,
        hash = false,
        hashParts = false,
        baseHash = false,
        hashVars = false,// ? ?
        getHash = function () {
            return window.location.hash.replace("#", "");
        },
        getHashParts = function () {
            var hash = window.location.hash.replace("#", "");
            return hash.split("/");
        },
        hashChange = function (newHash) {
            debug.info("Saga.Route.hashChange('" + newHash + "'), from '" + hash + "'");
            hash = newHash;
            hashParts = getHashParts();
            baseHash = hashParts[0];
            if (routes.hasOwnProperty(baseHash)) {
                routes[baseHash]();
            } else {
                routes['default']();
            }
        },
        init = function (projectRoutes) {
            routes = projectRoutes;
            hash = getHash();
            if (window.hasOwnProperty('onhashchange')) {
                window.onhashchange = function () {
                    hashChange(getHash());
                };
            } else {
                window.setInterval(function () {
                    if (getHash() !== hash) {
                        hashChange(getHash());
                    }
                }, 100);
            }
            hashChange(hash);
        },
        showPage = function (page) {
            debug.info("Saga.Route.showPage('" + page + "')");
            window.location.hash = page;
        };

    pub = {
        init: function (routes) {
            init(routes);
        },
        showPage: function (page) {
            showPage(page);
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
}());/*jslint browser:true*/
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
                    /*
                    try {
                        asset.View.remove();
                        pub.fire(asset.name + ":removed");
                    } catch (err) {
                        pub.fire(asset.name + ":removed");
                        debug.warn("Saga.AssetManager.place('" + asset.name + "') -> No REMOVE");
                    }
                    */
                    //place(asset);
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
}());/*jslint browser:true*/
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
                //wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.src = 'libs/webfont.js';
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
}());/*jslint browser:true*/
/*global Saga*/

Saga.Keyboard = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        util = Saga.Util,
        usefulKeys = {
            39: "right",
            40: "down",
            37: "left",
            38: "up",
            32: "space",
            13: "enter"
        },
        keyDown = function (evt) {
            debug.info("Saga.Keyboard.keyDown() -> ", evt);
            pub.fire("key:down", evt);
            if (usefulKeys.hasOwnProperty(evt.keyCode)) {
                pub.fire(usefulKeys[evt.keyCode], evt);
                debug.warn("Saga.Keyboard.keyDown() -> usefulKey: ", usefulKeys[evt.keyCode]);
            }
        },
        keyPress = function (evt) {
            debug.info("Saga.Keyboard.keyPress() -> ", evt);
            pub.fire("key:press", evt);
        },
        keyUp = function (evt) {
            debug.info("Saga.Keyboard.keyUp() -> ", evt);
            pub.fire("key:up", evt);
        },
        init = function () {
            debug.info("Saga.Keyboard.init()");
            window.onkeydown = keyDown;
            window.onkeypress = keyPress;
            window.onkeyup = keyUp;
        },
        deinit = function () {
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null;
        };

    pub = {
        init: function () {
            init();
        },
        deinit: function () {
            deinit();
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
}());