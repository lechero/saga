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
    var pub,
        version = "@VERSION",
        id = "saga",
        doc = document || false,
        vars = false,
        init = function () {
            try {
               
                vars = JSON.parse(doc.getElementById(id).innerHTML);
               
            } catch (err) {
                vars = "NOT_SET";
            }
        };

    pub = {
        vars: function () {
            return vars
        }
    };

    init();
    //console.error("!!!!!!!!!!!!!1", vars);
    return pub;
}());
/*jslint browser:true*/
/*global Saga, console, _ */

Saga.Util = (function () {
    "use strict";
    var pub = _,
        objectSize = function (obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size += 1;
                }
            }
            return size;
        },
        fileExtension = function (str) {
            //var re = /(?:\.([^.]+))?$/;
            return str.substr(str.lastIndexOf('.') + 1);
            //return re.exec(str);
        },
        xElem = function (x, obj) {
            var i = 0,
                n;
            for (n in obj) {
                if (obj.hasOwnProperty(n)) {
                    if (i === x) {
                        return obj[n];
                    }
                    i += 1;
                }
            }
            return false;
        },
        angleToPoint = function (point1, point2) {
            var dy = point1.y - point2.y,
                dx = point1.x - point2.x,
                theta = Math.atan2(dy, dx);
            theta *= 180 / Math.PI; // rads to degs
            //
            return theta;
        },
        getShortestRotation = function (fromAngle, toAngle) {
            var oppositeAngle = 0,
                diff1 = 0, // difference current angle to new angle
                diff2 = 0; // difference current angle to opposite angle

            if (toAngle > fromAngle) {
                oppositeAngle = toAngle - 360;
            } else {
                oppositeAngle = toAngle + 360;
            }

            diff1 = Math.abs(toAngle - fromAngle);
            diff2 = Math.abs(oppositeAngle - fromAngle);
            if (diff2 < diff1) {
                toAngle = oppositeAngle;
            }

            return toAngle;
        },
        syntaxHighlight = function (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        },
        getHigher = function (col, prefix) {
            var arr = [];
            if (!prefix) {
                prefix = "";
            }
            if (pub.isEmpty(col)) {
                return prefix + "0";
            }
            pub.each(col, function (el) {
                arr.push(parseInt(el.id.replace(prefix, ""), 10));
            });
            if (arr.length <= 0) {
                return prefix + "0";
            }
            if (prefix + String(Math.max.apply(null, arr) + 1) === prefix + "NaN") {
                return prefix + "0";
            }

            return prefix + String(Math.max.apply(null, arr) + 1);
        };
    pub.fileExtension = function (str) {
        return fileExtension(str);
    };

    pub.xElem = function (x, obj) {
        return xElem(x, obj);
    }

    pub.syntaxHighlight = function (json) {
        return syntaxHighlight(json);
    };

    pub.objectSize = function (obj) {
        return objectSize(obj);
    };

    pub.angleToPoint = function (point1, point2) {
        return angleToPoint(point1, point2);
    };

    pub.getShortestRotation = function (fromAngle, toAngle) {
        return getShortestRotation(fromAngle, toAngle);
    };

    pub.getHigher = function (col, prefix) {
        return getHigher(col, prefix);
    };

    return pub;
}());
/*jslint browser:true*/
/*global Saga, console */

Saga.Debug = (function () {
    "use strict";
    var pub,
        util = Saga.Util,
        outputDiv = false,
        levels = ["log", "info", "error", "warn", "trace"],
        activeLevels = ["log", "info", "warn", "error"],
        timestamp = function () {
            var d = new Date();
            return (d.getUTCHours() + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2) + '.' + ('00' + d.getUTCMilliseconds()).slice(-3));
        },
        output = function (type) {
            //return;
            if (util.contains(activeLevels, type)) {
                var arg = Array.prototype.slice.call(arguments, 1);
                arg.unshift(timestamp() + ": ");
                try {
                    console[type].apply(console, arg);
                } catch (err) {
                    console[type](arg.join(", "));
                }
                if (outputDiv) {
                    outputDiv.innerHTML = outputDiv.innerHTML + '<br>' + JSON.stringify(arg); // JSON.stringify(arg) + "<br>" + outputDiv.innerHTML;
                }
            } else {
                console.log("No contains");
            }
        },
        trace = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('trace');
            output.apply(this, arg);
        },
        log = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('log');
            output.apply(this, arg);
        },
        info = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('info');
            output.apply(this, arg);
        },
        error = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('error');
            output.apply(this, arg);
        },
        warn = function () {
            var arg = Array.prototype.slice.call(arguments, 0);
            arg.unshift('warn');
            output.apply(this, arg);
        };

    if (Function.prototype.bind && window.console && typeof console.log === "object") {
        //http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
        console.log("debug reset console");
        levels.forEach(function (method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
    }

    //console.log("debug")


    /*
    if (Function.prototype.bind && window.console && typeof console.log == "object") {
        util.each(levels,function(method){
            console[method] = this.bind(console[method], console);
        })
    }


    if (Function.prototype.bind && window.console && typeof console.log == "object") {
    ["log",
        "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"
    ].forEach(function (method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
    }

    */
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
        },
        div: function (val) {
            if (arguments.length > 0) {
                outputDiv = val;
            }
            return outputDiv;
        }
    };
    return pub;
}());
/*jslint browser:true*/
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
        kill = function () { // removes all listeners !!!!
            cbs = {};
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
                    if (cbs[evt][i] && cbs[evt][i].type === 1) {
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
        },
        kill: function () {
            kill();
        }
    };
    return pub;
};
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

            if(options){
                initOptions(options);
            }
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
                }
                /* else {
                    
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
                //
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
                //
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
            //
            u.each(styles, function (value, style) {
                // test
                style = toCamelCase(style);
                //
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

            if (elem && elem.hasOwnProperty("style") && elem.style.hasOwnProperty("transform")) {
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
            
            u.each(styles, function (value, style) {

                elem.style[style] = value;
                
            });
        },
        animationCss3 = function () {
            var pub,
                tEnd = transitionEnd(),
                set = function (elem, props) {
                    
                    setStyles(elem, props);
                },
                to = function (elem, props, time, cb) {
                    

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
/*jslint browser:true*/
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
        getCookie = function (c_name) { // have to find who to credit for this
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
        },
        isIE: function () {
            var myNav = navigator.userAgent.toLowerCase(),
                ie = (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1], 10) : false;
            if (myNav.indexOf("trident") > -1){
                ie = true;
            }
            
          //  alert(myNav+"\n"+ie);
            //alert(myNav);
            return ie;
        }
    };
    return pub;
}());
/*jslint browser:true*/
/*global Saga*/

Saga.Holder = function (holderDivName) {
    "use strict";
    var pub,
        asset = false,
        divName = holderDivName,
        div = false,
        debug = Saga.Debug,
        d = Saga.Dom,
        place = function (newAsset) {
            asset = newAsset;
            
            div = document.getElementById(divName);
            div.innerHTML = asset.Html();

            d.head().appendChild(asset.Js());
            
            //debug.error("Saga.Holder.place() PLACED", newAsset);

            return true;
        },
        
        setAsset = function (newAsset) {
            asset = newAsset;
            div = document.getElementById(divName);
            div.innerHTML = asset.saga.html[0];
            return true;
        },
        remove = function () {
            div.innerHTML = "";
            asset = false;
        };

    pub = {
        remove: function () {
            remove();
        },
        place: function (asset) {
            place(asset);
        },
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
};
/*jslint browser:true*/
/*global Saga*/

Saga.Asset = function (assetName, assetInfo) {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        name = assetName,
        loaded = false,
        view = {},
        holder = false,
        content = {},

        loadStack = [],
        stackObj = function (type, file, prop) {
            return {
                'type': type,
                'file': file,
                'loaded': false,
                'content': false,
                'prop': prop
            };
        },
        
        addLoad = function (type, obj) {
            if (u.isString(obj)) {
                content[type] = false;
                loadStack.push(stackObj(type, obj, ""));
            } else {
                content[type] = {};
                if (u.isArray(obj)) {
                    content[type] = [];
                }
                u.each(obj, function (file, prop) {
                    content[type][prop] = false;
                    loadStack.push(stackObj(type, file, prop));
                });
            }
        },
        init = function (info) {
            
            if (!assetInfo.hasOwnProperty('files')) {
                debug.error("Saga.Asset.init('" + name + "') -> No content found, exiting");
                return;
            }
            if (!assetInfo.files.hasOwnProperty('js') && !assetInfo.files.hasOwnProperty('html')) {
                debug.error("Saga.Asset.init('" + name + "') -> No Javascript or Html found, exiting");
                return;
            }
            if (assetInfo.files.hasOwnProperty('html')) {
                addLoad('html', assetInfo.files.html);
            }
            if (assetInfo.files.hasOwnProperty('js')) {
                addLoad('js', assetInfo.files.js);
            }
            if (assetInfo.files.hasOwnProperty('template')) {
                addLoad('template', assetInfo.files.template);
            }
        },
        loadComplete = function () {
            //alert("ASSET loadComplete:" + JSON.stringify(loadStack));
            //alert("1:" +JSON.stringify(loadStack));
            u.each(loadStack, function (item) {
                if (item.type === "template") {
                    if (item.prop === "") {
                        content.template = u.template(item.content);
                    } else {
                        content.template[item.prop] = u.template(item.content);
                    }
                } else {
                    if (item.prop === "") {
                        content[item.type] = item.content;
                    } else {
                        content[item.type][item.prop] = item.content;
                    }
                }
            });
            //alert("2:" +JSON.stringify(content));
            loaded = true;
        };

    init(assetInfo);

    pub = {
        init: function (assetInfo) {
            init(assetInfo);
        },
        loadStack: function (val) {
            if (arguments.length > 0) {
                loadStack = val; // IE?!?!?1
            }
            return loadStack;
        },
        loadComplete: function () {
            loadComplete();
        },
        Template: function () {
            return content.template;
        },
        Html: function () {
            return content.html;
        },
        Js: function () {
            return content.js;
        },
        View: view,
        Holder: holder,
        name: (function () {
            return name;
        }()),
        loaded: function () {
            return loaded;
        }
    };
    return pub;
};
/*jslint browser:true*/
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
        hashVars = false, // ? ?
        getHash = function () {
            return window.location.hash.replace("#", "");
        },
        getHashParts = function (hash) {
            return hash.split("/");
            /*
            var hash = window.location.hash.replace("#", "");
            return hash.split("/");
            */
        },
        hashChange = function (newHash) {
            

            hashParts = getHashParts(newHash);
            if (baseHash !== hashParts[0]) {
                baseHash = hashParts[0];
                if (routes.hasOwnProperty(baseHash)) {
                    routes[baseHash]();
                } else {
                    routes['default']();
                }
                pub.fire("base:changed");
            } else {
                pub.fire("vars:changed", hashParts.slice(1));
            }

            hash = newHash;

            pub.fire("changed");
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
            
            window.location.hash = page;
        };

    pub = {
        init: function (routes) {
            init(routes);
        },
        hashVars: function () {
            return getHashParts(window.location.hash.replace("#", "")).slice(1);
        },
        page: function () {
            return baseHash;
        },
        showPage: function (page) {
            showPage(page);
        }
    };

    util.extend(pub, Saga.Event());

    return pub;
}());
/*jslint browser:true*/
/*global Saga */

Saga.StackLoader = function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        dom = Saga.Dom,
        u = Saga.Util,
        loader = Saga.net.Loader(),
        loading = false,
        loaded = {},
        stack = [],
        load,
        loadItem,
        loadItemDone,
        loadCss = function (file, cb) {
            var node = document.createElement("link");
            node.onload = function () {
                if (cb) {
                    cb(node);
                }
            };
            node.setAttribute("rel", "stylesheet");
            node.setAttribute("type", "text/css");
            node.setAttribute("href", file);
        },
        loadImage = function (file, cb) {
            var img = document.createElement('img');
            img.onload = function () {
                if (cb) {
                    cb(img);
                }
            };
            img.src = file;
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
                    /*
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                    */
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
        };

    loadItemDone = function () {
        var item = stack[0];
        stack.shift();
        loading = false;
        loadItem();
        pub.fire("loaded", {
            url: item,
            length: stack.length
        });
    };

    loadItem = function () {
        //
        if (loading) {
            
            return;
        }

        if (stack.length <= 0) {
            
            // event?@?!!?!
            return;
        }

        loading = true;

        var file,
            ext;
        //
        if (u.isFunction(stack[0])) { // callback
            stack[0]();
            loadItemDone();
        } else {
            file = stack[0];
            ext = u.fileExtension(file);
            if (ext === "js" || ext === "jst") {
                loadJs(file, function (script) {
                    loaded[file] = script;
                    loadItemDone();
                });
            } else if (ext === "png" || ext === "gif" || ext === "jpg" || ext === "jpeg" || ext === "svg") {
                loadImage(file, function (img) {
                    loaded[file] = img;
                    loadItemDone();
                });
            } else if (ext === "html") {
                loadHtml(file, function (text) {
                    loaded[file] = text;
                    loadItemDone();
                });
            } else if (ext === "css") {
                loadCss(file, function (node) {
                    loaded[file] = node;
                    loadItemDone();
                });
            }
        }
    };

    load = function (stuff, cb) { // collection of urls
        //
        if (u.isString(stuff)) {
            stack.push(stuff);
        } else {
            u.each(stuff, function (item) {
                stack.push(item);
            });
        }
        stack.push(cb);
        loadItem();
    };

    pub = {
        load: function () {
            load.apply(this, arguments);
        },
        dir: function () {
            return loaded;
        }
    };
    u.extend(pub, Saga.Event());
    return pub;
};
/*jslint browser:true*/
/*global Saga */

Saga.LoadManager = (function () {
    "use strict";
    var pub = {},
        u = Saga.Util;
    u.extend(pub, Saga.StackLoader());
    return pub;
}());
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
            
            if (asset.loaded()) {
                loadAssetDone(asset, cb);
                return;
            }

            var stack = asset.loadStack(),
                urls = u.map(stack, function (item) {
                    return item.file;
                });

            loadManager.load(urls, function () {

                u.each(stack, function (item, id) { // TODO: IE loss of reference!?!?!?!
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
            
            u.each(assets, function (assetInfo, name) {
                u.extend(assetInfo, Saga.Asset(name, assetInfo));
                assetInfo.Holder = getHolder(assetInfo.holder);
            });
            pub.fire("inited");
        },
        init = function (projectAssets, holders) {
            
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
            
            try {
                asset.View.remove();
                pub.fire(asset.name + ":removed");
            } catch (err) {
                pub.fire(asset.name + ":removed");
                
            }

            


            try {
                asset.Holder.remove();
                //pub.fire(asset.name + ":removed");
                
            } catch (err) {
                //pub.fire(asset.name + ":removed");
                
            }

            try {
                asset.Js().parentNode.removeChild(asset.Js());
                
            } catch (errr) {
                //pub.fire(asset.name + ":removed");
                
            }

        },
        hide = function (asset, cb) {
            
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
                
            }
        },
        place = function (asset) {
            
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
                //
                asset.View.init();
                //
            } catch (er) {
                
            }
            pub.fire(asset.name + ":inited");

            try {
                asset.View.show(function () {
                    pub.fire(asset.name + ":shown");
                });
            } catch (err) {
                pub.fire(asset.name + ":shown");
                
            }
        },
        show = function (asset) {
            

            if (asset.Holder && asset.Holder.asset()) {
                
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
/*jslint browser:true*/
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
                        
                    },
                    fontloading: function (fontFamily, fontDescription) {
                        
                    },
                    fontactive: function (fontFamily, fontDescription) {
                        
                    },
                    fontinactive: function (fontFamily, fontDescription) {
                        
                    },
                    active: function () {
                        
                        pub.fire("loaded");
                    },
                    inactive: function () {
                        
                    },
                    timeout: 1500
                };
            util.extend(fontConfig, fontCallbacks);

            window.WebFontConfig = fontConfig;

            (function () {
                var wf = document.createElement('script'),
                    s;
                wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                //wf.src = 'libs/webfont.js';
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
}());
/*jslint browser:true*/
/*global Saga*/

Saga.Keyboard = (function () {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        usefulKeys = { // firefox tested
            39: "right",
            40: "down",
            37: "left",
            38: "up",
            32: "space",
            13: "enter",
            46: "delete",
            61: "plus",
            173: "min",
            16: "shift",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            48: "0",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z"
        },
        usefulKeyCodes = u.invert(usefulKeys),
        downKeys = {},
        keyDown = function (evt) {
            
            downKeys[evt.keyCode] = true;
            pub.fire("key:down", evt);
            if (usefulKeys.hasOwnProperty(evt.keyCode)) {
                pub.fire(usefulKeys[evt.keyCode], evt);
                
                if (downKeys[usefulKeyCodes.shift]) {
                    pub.fire("shift:" + usefulKeys[evt.keyCode], evt);
                    
                }
            }
        },
        keyPress = function (evt) {
            
            pub.fire("key:press", evt);
        },
        keyUp = function (evt) {
            
            if (downKeys.hasOwnProperty(evt.keyCode)) {
                delete downKeys[evt.keyCode];
            }
            pub.fire("key:up", evt);
        },
        init = function () {
            
            window.onkeydown = keyDown;
            window.onkeypress = keyPress;
            window.onkeyup = keyUp;
        },
        deinit = function () {
            
            window.onkeydown = null;
            window.onkeypress = null;
            window.onkeyup = null;
            pub.kill(); // removes all listeners from keyboard -> Saga.Event
        };

    pub = {
        init: function () {
            init();
        },
        deinit: function () {
            deinit();
        }
    };

    u.extend(pub, Saga.Event());

    return pub;
}());
/*jslint browser:true*/
/*global Saga*/

Saga.Graph = function (m) {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        map = m,
        extractKeys = function (obj) {
            return u.keys(obj);
        },
        sorter = function (a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        findPaths = function (map, start, end, infinity) {
            infinity = infinity || Infinity;

            var costs = {},
                open = {
                    '0': [start]
                },
                predecessors = {},
                keys,
                addToOpen = function (cost, vertex) {
                    var key = String(cost);
                    if (!open[key]) {
                        open[key] = [];
                    }
                    open[key].push(vertex);
                },

                key,
                bucket,
                node,
                currentCost,
                adjacentNodes,

                vertex,

                cost,
                totalCost,
                vertexCost;

            costs[start] = 0;

            while (open) {
                if (!(keys = u.keys(open)).length) {
                    break;
                }

                keys.sort(sorter);

                key = keys[0];
                bucket = open[key];
                node = bucket.shift();
                currentCost = parseFloat(key);
                adjacentNodes = map[node] || {};

                if (!bucket.length) {
                    delete open[key];
                }

                for (vertex in adjacentNodes) {
                    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                        cost = adjacentNodes[vertex];
                        totalCost = cost + currentCost;
                        vertexCost = costs[vertex];

                        if ((vertexCost === undefined) || (vertexCost > totalCost)) {
                            costs[vertex] = totalCost;
                            addToOpen(totalCost, vertex);
                            predecessors[vertex] = node;
                        }
                    }
                }
            }

            if (costs[end] === undefined) {
                return null;
            } else {
                return predecessors;
            }

        },
        extractShortest = function (predecessors, end) {
            var nodes = [],
                u = end,
                predecessor;

            while (u) {
                nodes.push(u);
                predecessor = predecessors[u];
                u = predecessors[u];
            }

            nodes.reverse();
            return nodes;
        },
        findShortestPath = function (map, nodes) {
            var start = nodes.shift(),
                end,
                predecessors,
                path = [],
                shortest;

            while (nodes.length) {
                end = nodes.shift();
                predecessors = findPaths(map, start, end);

                if (predecessors) {
                    shortest = extractShortest(predecessors, end);
                    if (nodes.length) {
                        path.push.apply(path, shortest.slice(0, -1));
                    } else {
                        return path.concat(shortest);
                    }
                } else {
                    return null;
                }
                start = end;
            }
        };

    pub = {
        findShortestPath: function (start, end) {
            return findShortestPath(map, [start, end]);
        }
    };

    return pub;
};
/*jslint browser:true*/
/*global App, Saga, TweenLite, Linear*/
/*
App.RIGHT = "test0001.jpeg";
App.LEFT = "test0003.jpeg";
App.TOP = "test0004.jpeg";
App.BOTTOM = "test0005.jpeg";
App.FRONT = "test0000.jpeg";
App.BACK = "test0002.jpeg";
*/
Saga.Panorama = function (containerDiv, opts) {
    "use strict";
    var pub,
        extension = ".jpg",
        mediaBase = "media/",

        tween = false,
        oTween = false,

        WEST = "_4",
        NORTH = "_1",
        EAST = "_2",
        SOUTH = "_3",
        TOP = "_5",
        BOTTOM = "_6",


        /*
        WEST = "_2",
        NORTH = "_3",
        EAST = "_4",
        SOUTH = "_1",
        TOP = "_5",
        BOTTOM = "_6",
        */
        maxTop = 5,
        maxBottom = -5,


        debug = Saga.Debug,
        d = Saga.Dom,
        u = Saga.Util,

        rotationOffset = 0,

        defaultPitch = 0, //0.1,
        pitch = 0, //0.1,
        yaw = 0,
        perspective = opts.perspective || 300,
        ie = opts.ie || false,
        speed = 0.25,
        faces = {},
        size = 512,
        angleOffset = 0,
        border_margin = 0.4,
        options = {},
        container = containerDiv,
        cube,

        depth = -120,

        panoImg = false,

        update,
        updateFaces,
        onMove,
        onUp,
        onDown,

        drawnFaces = [],

        distanceFactor = 1,

        lastPosition = false,
        center,
        transitionTime = function (elem, duration, ease) {
            return;
            /*
            duration = duration + "ms";
            elem.style.WebkitTransitionDuration = duration;
            elem.style.MozTransitionDuration = duration;
            elem.style.OTransitionDuration = duration;
            elem.style.msTransitionDuration = duration;
            elem.style.KhtmlTransitionDuration = duration;
            elem.style.TransitionDuration = duration;

            ease = "linear";
            elem.style.WebkitTransitionTimingFunction = ease;
            elem.style.MozTransitionTimingFunction = ease;
            elem.style.OTransitionTimingFunction = ease;
            elem.style.msTransitionTimingFunction = ease;
            elem.style.KhtmlTransitionTimingFunction = ease;
            elem.style.TransitionTimingFunction = ease;

            elem.style.WebkitTransitionProperty = "-webkit-transform, opacity";
            elem.style.MozTransitionProperty = "-moz-transform, opacity";
            elem.style.OTransitionProperty = "-o-transform, opacity";
            elem.style.msTransitionProperty = "-ms-transform, opacity";
            elem.style.KhtmlTransitionProperty = "-khtml-transform, opacity";
            elem.style.TransitionProperty = "transform, opacity";
            */
        },
        fadeIn = function (time) {
            transitionTime(center, time);
            center.style.opacity = 1;
        },
        fadeOut = function (time) {
            transitionTime(center, time);
            center.style.opacity = 0;
        },
        getFaceTransformIe = function (face) {

            var border_margin_ie = 0.5, //rot = "rotateY(200deg) rotateX(10deg) ",
                transform = "",
                halfsize = size * 0.5 - border_margin_ie,
                scale = " scaleY(-1)";

            //halfsize = halfsize + 20;

            switch (face) {
            case 'front':
                transform = "translateZ(-" + halfsize.toFixed(1) + "px) rotateY(0deg) rotateX(180deg)" + scale;
                break;
            case 'left':
                transform = "translateX(-" + halfsize.toFixed(1) + "px) rotateY(90deg) rotateX(180deg)" + scale;
                break;
            case 'right':
                transform = "translateX(" + halfsize.toFixed(1) + "px) rotateY(-90deg) rotateX(180deg)" + scale;
                break;
            case 'top':
                transform = "translateY(-" + halfsize.toFixed(1) + "px) rotateX(90deg)" + " rotateZ(90deg) scaleY(-1) scaleX(1)";
                break;
            case 'bottom':
                transform = "translateY(" + halfsize.toFixed(1) + "px) rotateX(-90deg)" + " rotateZ(90deg) scaleY(1) scaleX(-1)";
                break;
            case 'back':
                transform = "translateZ(" + halfsize.toFixed(1) + "px) rotateX(180deg) rotateY(180deg)" + scale;
                break;
            default:
                throw "wrong face";
            }

            return transform;
        },
        zoomUpdate = function (obj) { // rewrite so can be used with rotation
            var distance = perspective,
                distanceFactor = obj.distance || 1,
                rect,
                offsetX,
                offsetY,
                rotation = obj.rotateY || yaw,
                transform,
                offs;

            yaw = rotation;

            //debug.error("zoomUpdate", tween, tween.paused);

            cube.style.perspective = perspective.toFixed(0) + "px";
            cube.style.webkitPerspective = perspective + "px";
            cube.style.mozPerspective = perspective + "px";



            rect = cube.getClientRects()[0];


            offsetX = (rect.width - size) * 0.5; // * distanceFactor;
            offsetY = (rect.height - size) * 0.5;

            depth = offsetX;

            ////

            if (pitch > maxTop) {
                pitch = maxTop;
            }
            if (pitch < maxBottom) {
                pitch = maxBottom;
            }

            transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (rotation + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

            offs = "translateX(" + offsetX + "px) translateY(" + offsetY + "px) translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) ";


            ////////debug.error("offs", offs);
            if (ie) {
                u.each(drawnFaces, function (face) {
                    transform = offs + " " + getFaceTransformIe(face.id);

                    face.style.transform = transform;
                    face.style.mozTransform = transform;
                    face.style.webkitTransform = transform;

                });
            } else {

                center.style.transform = transform;
                center.style.webkitTransform = transform;
                center.style.mozTransform = transform;
            }



            //center.style.opacity = obj.opacity;

            ////


        },
        pause = function () {
            //debug.error(containerDiv.id + " -> " + "Saga.Panorama.pause()", tween, oTween);
            if (tween) {
                tween.pause();
                //debug.error(containerDiv.id + " -> " + "Saga.Panorama.pause() !!!! Done!!!", tween, tween.paused());
            }

            return yaw;
        },
        zoomIn = function (duration, cb) {

            var obj = {
                    opacity: 0.5,
                    opacityFrom: 0,
                    opacityTo: 1,
                    distance: 0.5,
                    distanceFrom: 0.5,
                    distanceTo: 1
                },
                time = duration / 1000;

            /*
            TweenLite.set(center, {
                css: {
                    autoAlpha: obj.opacity
                }
            });
            */

            ////debug.error("zoomIn: ", time);

            //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomIn()");
            zoomUpdate(obj);

            oTween = TweenLite.to(center, time, {
                css: {
                    autoAlpha: obj.opacityTo
                },
                ease: Linear.easeNone
            });

            //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomIn() TWEEEN START");
            tween = TweenLite.to(obj, time, {
                distance: obj.distanceTo,
                ease: Linear.easeNone,
                onUpdate: function () {
                    //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomIn() TWEEEN", tween.paused());
                    if (!tween.paused()) {
                        zoomUpdate(obj);
                    }
                },
                onComplete: cb
            });
        },
        zoomOut = function (duration, cb) {


            var obj = {
                    opacity: 1,
                    opacityFrom: 1,
                    opacityTo: 0,
                    distance: 1,
                    distanceFrom: 1,
                    distanceTo: 2
                },
                time = duration / 1000;

            TweenLite.set(center, {
                css: {
                    autoAlpha: obj.opacity
                }
            });

            //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut()");
            zoomUpdate(obj);

            oTween = TweenLite.to(center, time, {
                css: {
                    autoAlpha: obj.opacityTo
                },
                ease: Linear.easeNone,
                onComplete: cb
            });
            //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut() TWEEEN START");
            tween = TweenLite.to(obj, time, {
                distance: obj.distanceTo,
                ease: Linear.easeNone,
                onUpdate: function () {
                    //debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut() TWEEEN", tween.paused());
                    if (!tween.paused()) {
                        zoomUpdate(obj);
                    }

                }
            });
        },
        rotateIe = function (deg, duration, cb) {
            var distance = perspective,
                rect,
                offsetX,
                offsetY,
                transform,
                rot,
                offs,
                obj = {
                    rotateY: yaw,
                    rotateYFrom: yaw,
                    rotateYTo: u.getShortestRotation(yaw, deg)
                },
                rotatePanorama = function () {
                    ////////debug.error("rotatePanorama", obj.rotateY, obj.rotateYFrom, obj.rotateYTo);
                    var distance = perspective,
                        rect,
                        offsetX,
                        offsetY,
                        rotation = obj.rotateY,
                        transform;

                    yaw = rotation;

                    cube.style.perspective = perspective.toFixed(0) + "px";
                    cube.style.webkitPerspective = perspective + "px";
                    cube.style.mozPerspective = perspective + "px";

                    rect = cube.getClientRects()[0];

                    //////debug.error("PANORAMA ", container.id, ie, rect, size, distance, distanceFactor);

                    offsetX = (rect.width - size) * 0.5; // * distanceFactor;
                    offsetY = (rect.height - size) * 0.5;

                    depth = offsetX;

                    if (pitch > maxTop) {
                        pitch = maxTop;
                    }
                    if (pitch < maxBottom) {
                        pitch = maxBottom;
                    }

                    //distance = 20;

                    offs = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

                    offs = "translateX(" + offsetX + "px) translateY(" + offsetY + "px) translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) ";


                    //////debug.error("offs", offs);

                    u.each(drawnFaces, function (face) {
                        transform = offs + " " + getFaceTransformIe(face.id);

                        face.style.transform = transform;
                        face.style.mozTransform = transform;
                        face.style.webkitTransform = transform;

                    });

                    /*
                    transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (rotation + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

                    center.style.transform = transform;
                    center.style.webkitTransform = transform;
                    center.style.mozTransform = transform;
                    */
                };

            tween = TweenLite.to(obj, duration / 1000, {
                rotateY: obj.rotateYTo,
                ease: Linear.easeNone,
                onUpdate: rotatePanorama,
                onComplete: cb
            });
        },
        rotate = function (deg, duration, cb) {

            debug.error("ROTATE : ", yaw, " to ", deg);

            pitch = defaultPitch;
            if (ie) {
                rotateIe(deg, duration, cb);
                return;
            }
            ////debug.error("rotate");
            var obj = {
                    rotateY: yaw,
                    rotateYFrom: yaw,
                    rotateYTo: u.getShortestRotation(yaw, deg)
                },
                rotatePanorama = function () {
                    //
                    if (tween.paused()) {
                        return;
                    }

                    var distance = perspective,
                        rect,
                        offsetX,
                        offsetY,
                        rotation = obj.rotateY,
                        transform;

                    yaw = rotation;

                    cube.style.perspective = perspective.toFixed(0) + "px";
                    cube.style.webkitPerspective = perspective + "px";
                    cube.style.mozPerspective = perspective + "px";

                    rect = cube.getClientRects()[0];

                    ////

                    //////debug.error("PANORAMA ", container.id, ie, rect, size, distance, distanceFactor);

                    offsetX = (rect.width - size) * 0.5; // * distanceFactor;
                    offsetY = (rect.height - size) * 0.5;

                    depth = offsetX;

                    ////

                    if (pitch > maxTop) {
                        pitch = maxTop;
                    }
                    if (pitch < maxBottom) {
                        pitch = maxBottom;
                    }

                    transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (rotation + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

                    center.style.transform = transform;
                    center.style.webkitTransform = transform;
                    center.style.mozTransform = transform;
                };

            tween = TweenLite.to(obj, duration / 1000, {
                rotateY: obj.rotateYTo,
                ease: Linear.easeNone,
                onUpdate: rotatePanorama,
                onComplete: cb
            });

            return;
        },

        buildFaceIe = function (face, url, cb) {
            ////
            var element = document.createElement("div"),
                halfsize,
                transform,
                img,
                scale = " scaleY(-1)",
                distance = perspective,
                rect,
                offsetX,
                offsetY,
                rot,
                offs;

            element.id = face;
            drawnFaces.push(element);
            element.className = "cubemapface " + face + "face";
            center.appendChild(element);

            halfsize = size * 0.5 - border_margin;

            cube.style.perspective = perspective.toFixed(0) + "px";
            cube.style.webkitPerspective = perspective + "px";
            cube.style.mozPerspective = perspective + "px";

            rect = cube.getClientRects()[0];

            offsetX = (rect.width - size) * 0.5; // * distanceFactor;
            offsetY = (rect.height - size) * 0.5;

            depth = offsetX;

            if (pitch > maxTop) {
                pitch = maxTop;
            }
            if (pitch < maxBottom) {
                pitch = maxBottom;
            }

            pitch = 0;

            offs = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

            transform = offs + " " + getFaceTransformIe(face);

            element.style.position = "absolute";
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = size + "px";
            element.style.height = size + "px";

            element.style.transformOrigin = "50% 50% 0";
            element.style.mozTransformOrigin = "50% 50% 0";
            element.style.msTransformOrigin = "50% 50% 0";
            element.style.webkitTransformOrigin = "50% 50% 0";

            element.style.transform = transform;
            element.style.mozTransform = transform;
            element.style.msTransform = transform;
            element.style.webkitTransform = transform;

            //element.style.border = "1px solid red";
            //create image
            img = document.createElement('img');

            img.onload = function () {
                this.width = size;
                this.height = size;
                if (cb) {
                    cb();
                }
            };

            img.src = mediaBase + "pano/512/" + url;

            element.appendChild(img);

            //store
            if (faces[face]) {
                faces[face].parentNode.removeChild(faces[face]);
            }
            faces[face] = element;
        },
        buildFace = function (face, url, cb) {
            ////
            var element = document.createElement("div"),
                halfsize,
                transform,
                img,
                scale = " scaleY(-1) scaleZ(1)";
            element.className = "cubemapface " + face + "face";
            center.appendChild(element);

            // translateY(-255.6px) rotateX(90deg) rotateY(180deg) rotateZ(90deg) scaleY(-1) scaleX(-1);

            halfsize = size * 0.5 - border_margin;

            //depth = "-" + halfsize.toFixed(1);

            transform = "";
            switch (face) {
            case 'front':
                transform = "translateZ(-" + halfsize.toFixed(1) + "px) rotateY(0deg) rotateX(180deg)" + scale;
                break;
            case 'left':
                transform = "translateX(-" + halfsize.toFixed(1) + "px) rotateY(90deg) rotateX(180deg)" + scale;
                break;
            case 'right':
                transform = "translateX(" + halfsize.toFixed(1) + "px) rotateY(-90deg) rotateX(180deg)" + scale;
                break;
            case 'top':
                transform = "translateY(-" + halfsize.toFixed(1) + "px) rotateX(90deg)" + " rotateZ(90deg) scaleY(-1) scaleX(1) scaleZ(1)";
                break;
            case 'bottom':
                transform = "translateY(" + halfsize.toFixed(1) + "px) rotateX(-90deg)" + " rotateZ(90deg) scaleY(1) scaleX(-1) scaleZ(1)";
                break;
            case 'back':
                transform = "translateZ(" + halfsize.toFixed(1) + "px) rotateX(180deg) rotateY(180deg)" + scale;
                break;
            default:
                throw "wrong face";
            }

            //element.style.backfaceVisibility = "hidden";
            element.style.position = "absolute";
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = size + "px";
            element.style.height = size + "px";
            element.style.transform = transform;
            // element.style.mozTransform = transform;
            element.style.webkitTransform = transform;

            //element.style.border = "1px solid red";

            //create image
            img = document.createElement('img');

            //console.error("!" + url)



            img.onload = function () {
                this.width = size;
                this.height = size;
                if (cb) {
                    cb();
                }
            };

            img.src = mediaBase + "pano/512/" + url;

            element.appendChild(img);

            //store
            if (faces[face]) {
                faces[face].parentNode.removeChild(faces[face]);
            }
            faces[face] = element;
        },
        load = function (pano, angle, cb) {
            panoImg = pano;
            ////////debug.error("Saga.Panorama.load()", "yaw:" + yaw, "pano: " + pano, "angle: " + angle, "angleOffset: " + angleOffset);
            transitionTime(center, 0);
            var done = 0,
                loadDone = function () {
                    done += 1;
                    if (done === 6) {
                        if (cb) {
                            cb();
                        }
                    }
                },
                buildFunction = buildFace;

            if (ie) {
                buildFunction = buildFaceIe;
            }


            if (angle || angle === 0) {
                yaw = angle;
            }

            //

            TweenLite.set(center, {
                css: {
                    autoAlpha: 1
                }
            });

            buildFunction("front", pano + WEST + extension, loadDone);
            buildFunction("left", pano + SOUTH + extension, loadDone);
            buildFunction("right", pano + NORTH + extension, loadDone);
            buildFunction("top", pano + TOP + extension, loadDone);
            buildFunction("bottom", pano + BOTTOM + extension, loadDone);
            buildFunction("back", pano + EAST + extension, loadDone);

            update();

            pub.fire("load", {
                distance: perspective,
                rotateX: pitch.toFixed(1),
                rotateY: yaw.toFixed(1)
            });

        },

        init = function () {
            //debug.error("Saga.Panorama.init() -> container: ", options);

            cube = document.getElementById("PanoramaCube123" + container.id) || document.createElement("div");
            cube.id = "PanoramaCube123" + container.id;

            if (!ie) {
                cube.style.transformStyle = "preserve-3d";
                cube.style.mozTransformStyle = "preserve-3d";
                cube.style.webkitTransformStyle = "preserve-3d";
            }

            cube.innerHTML = "";
            container.appendChild(cube);

            ////debug.error("Saga.Panorama.init() -> container: CUBE ADDED ", cube.id);

            var rect = cube.getClientRects()[0];

            ////debug.error("Saga.Panorama.init() -> container: CUBE RECTS ", cube.id, rect);

            if (options.width) {
                cube.style.width = options.width + "px";
            } else {
                cube.style.width = rect.width + "px";
            }
            if (options.height) {
                cube.style.height = options.height + "px";
            } else {
                cube.style.height = rect.height + "px";
            }
            if (options.size) {
                size = options.size;
            }

            cube.style.position = "relative";
            cube.style.overflow = "hidden";

            lastPosition = [0, 0];

            center = document.createElement("div");
            center.id = "PanoramaCenter" + container.id;
            center.className = "cubemapcenter";
            cube.appendChild(center);

            if (!ie) {
                center.style.transformStyle = "preserve-3d";
                center.style.mozTransformStyle = "preserve-3d";
                center.style.webkitTransformStyle = "preserve-3d";
            } else {
                center.style.perspective = perspective.toFixed(0) + "px";
                center.style.webkitPerspective = perspective + "px";
                center.style.mozPerspective = perspective + "px";
            }

            center.style.width = "100%";
            center.style.height = "100%";

        },
        /*getFaceTransform = function (face) {
            var rot = "rotateY(200deg) rotateX(10deg) ",
                transform = "",
                halfsize = size * 0.5 - border_margin,
                scale = " scaleY(-1)";
            switch (face) {
            case 'front':
                transform = "translateZ(-" + halfsize.toFixed(1) + "px) rotateY(0deg) rotateX(180deg)" + scale;
                break;
            case 'left':
                transform = "translateX(-" + halfsize.toFixed(1) + "px) rotateY(90deg) rotateX(180deg)" + scale;
                break;
            case 'right':
                transform = "translateX(" + halfsize.toFixed(1) + "px) rotateY(-90deg) rotateX(180deg)" + scale;
                break;
            case 'top':
                transform = "translateY(-" + halfsize.toFixed(1) + "px) rotateX(90deg)" + " rotateZ(90deg) scaleY(-1) scaleX(1)";
                break;
            case 'bottom':
                transform = "translateY(" + halfsize.toFixed(1) + "px) rotateX(-90deg)" + " rotateZ(90deg) scaleY(1) scaleX(-1)";
                break;
            case 'back':
                transform = "translateZ(" + halfsize.toFixed(1) + "px) rotateX(180deg) rotateY(180deg)" + scale;
                break;
            default:
                throw "wrong face";
            }

            return transform;
        },*/
        addClicks = function () {
            cube.addEventListener("mousedown", onDown);
            cube.addEventListener("touchstart", onDown);
        },
        removeClicks = function () {
            cube.removeEventListener("mousedown", onDown);
            cube.removeEventListener("touchstart", onDown);
        };


    updateFaces = function () {
        var distance = perspective,
            rect,
            offsetX,
            offsetY,
            transform,
            rot,
            offs,
            per = "perspective(" + perspective.toFixed(0) + "px) ";

        /*
        cube.style.perspective = perspective.toFixed(0) + "px";
        cube.style.webkitPerspective = perspective + "px";
        cube.style.mozPerspective = perspective + "px";
*/
        rect = cube.getClientRects()[0];

        offsetX = (rect.width - size) * 0.5; //+50; // * distanceFactor;
        offsetY = (rect.height - size) * 0.5; //+50;

        /*
        offsetX = (rect.width) - size * 0.5; //+50; // * distanceFactor;
        offsetY = (rect.height) - size * 0.5; //+50;
        */
        //depth = offsetX;

        if (pitch > maxTop) {
            pitch = maxTop;
        }
        if (pitch < maxBottom) {
            pitch = maxBottom;
        }

        //////debug.error("Saga.Panorama.updateIe()", "id", cube.id, "styles", cube.style, "cube", cube, "rect", rect, "distance", distance, "distanceFactor", distanceFactor, "offsetX", offsetX, "offsetY", offsetY, "size", size);

        //offs = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";


        offs = "translateX(" + offsetX + "px) translateY(" + offsetY + "px) translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) ";


        u.each(drawnFaces, function (face) {
            transform = offs + "  " + getFaceTransformIe(face.id);

            face.style.transform = transform;
            face.style.mozTransform = transform;
            face.style.webkitTransform = transform;

        });
    };

    update = function () {
        if (pitch > maxTop) {
            pitch = maxTop;
        }
        if (pitch < maxBottom) {
            pitch = maxBottom;
        }

        if (ie) {
            updateFaces();

            pub.fire("update", {
                distance: perspective,
                rotateX: pitch.toFixed(1),
                rotateY: yaw.toFixed(1),
                angleOffset: angleOffset
            });
            return;
        }

        var distance = perspective,
            rect,
            offsetX,
            offsetY,
            transform;

        //trace(perspective+" / ");
        cube.style.perspective = perspective.toFixed(0) + "px";
        cube.style.webkitPerspective = perspective + "px";
        cube.style.mozPerspective = perspective + "px";

        rect = cube.getClientRects()[0];



        offsetX = (rect.width - size) * 0.5; // * distanceFactor;
        offsetY = (rect.height - size) * 0.5;

        depth = offsetX;

        //////debug.error("Saga.Panorama.update()", "id", cube.id, "styles", cube.style, "cube", cube, "rect", rect, "distance", distance, "distanceFactor", distanceFactor, "offsetX", offsetX, "offsetY", offsetY, "size", size);

        transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";
        center.style.transform = transform;
        center.style.webkitTransform = transform;
        //center.style.mozTransform = transform;

        //tfTest();

        pub.fire("update", {
            distance: distance,
            rotateX: pitch.toFixed(1),
            rotateY: yaw.toFixed(1),
            angleOffset: angleOffset
        });

        ////
    };
    options = u.extend(options, opts);

    onUp = function (evt) {
        ////
        cube.removeEventListener("mousemove", onMove);
        cube.removeEventListener("mouseup", onUp);
        cube.removeEventListener("touchmove", onMove);
        cube.removeEventListener("touchend", onUp);

        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };
    onDown = function (evt) {
        ////
        if (evt.type === "touchstart") {
            cube.addEventListener("touchmove", onMove);
            cube.addEventListener("touchend", onUp);
        } else {
            cube.addEventListener("mousemove", onMove);
            cube.addEventListener("mouseup", onUp);
        }

        var rect = cube.getClientRects()[0];
        if (evt.hasOwnProperty('targetTouches') && evt.targetTouches.length > 0) {
            lastPosition = [evt.targetTouches[0].pageX - rect.left, evt.targetTouches[0].pageY - rect.top];
        } else {
            lastPosition = [evt.pageX - rect.left, evt.pageY - rect.top];
        }

        //

        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };
    onMove = function (evt) {
        var rect = cube.getClientRects()[0],
            x, // = evt.targetTouches[0].pageX - rect.left,
            y, // = evt.targetTouches[0].pageY - rect.top,
            //x = evt.pageX - rect.left,
            //y = evt.pageY - rect.top,
            deltax, // = x - lastPosition[0],
            deltay; // = y - lastPosition[1];

        x = evt.pageX;
        y = evt.pageY;
        if (evt.hasOwnProperty('targetTouches') && evt.targetTouches.length > 0) {
            x = evt.targetTouches[0].pageX;
            y = evt.targetTouches[0].pageY;
        }
        x = x - rect.left;
        y = y - rect.top;

        deltax = x - lastPosition[0];
        deltay = y - lastPosition[1];

        yaw -= deltax * speed;
        pitch += deltay * speed;

        ////
        ////////debug.error("Saga.Panorama.onMove() -> updating");
        update();

        /*
        that.fov += deltay * that.speed;
        if(this.fov < 45) this.fov = 45;
        else if(this.fov > 100) this.fov = 100;
        */

        lastPosition = [x, y];
        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };

    //
    pub = {
        pause: function (time) {
            return pause(time);
        },
        div: function () {
            return center;
        },
        addClicks: function () {
            addClicks();
        },
        removeClicks: function () {
            removeClicks();
        },
        init: function (opts) {
            init(opts);
        },
        load: function (pano, angle, cb) {
            load(pano, angle, cb);
        },
        rotate: function (deg, duration, cb) {
            rotate(deg, duration, cb);
        },
        zoomIn: function (duration, cb) {
            zoomIn(duration, cb);
        },
        zoomOut: function (duration, cb) {
            zoomOut(duration, cb);
        },
        rotation: function () {
            return parseFloat(yaw.toFixed(1));
        },
        container: function () {
            return container;
        },
        update: function () {
            ////////debug.error("Saga.Panorama.pub.update() -> updating");
            update();
        },
        setRotationOffset: function (offset) {
            //angleOffset = 0;
            angleOffset = offset || 0;
        },
        getRotationOffset: function () {
            return angleOffset;
        },
        getHalfSize: function () { //dep
            return depth;
        },
        noAnimation: function () {
            transitionTime(center, 0);
        },
        setDistance: function (factor) { // setter for zoom
            //////debug.error("Saga.Panorama.pub.setDistance() -> updating", factor);
            distanceFactor = factor;
            update();
        },
        panoImg: function () {
            return panoImg;
        },
        info: function () {
            return {
                'yaw': yaw,
                'pitch': pitch
            };
        },
        mediaBase: function (val) {
            if (arguments.length > 0) {
                mediaBase = val;
            }
            return mediaBase;
        }
    };

    u.extend(pub, Saga.Event());

    return pub;
};
/*jslint browser:true*/
/*global Saga*/

Saga.Slider = function (id, onDrag, percentage) {
    "use strict";
    var debug = Saga.Debug,
        range = document.getElementById(id),
        dragger = range.children[0],
        draggerWidth = 10, // width of your dragger
        down = false,
        rangeWidth,
        rangeLeft,
        currentX = 0,
        touchStart = {
            currentX: dragger.style.left,
            x: 0,
            y: 0
        },
        updateDragger = function (e) {
            debug.error("updateDragger", e, e.layerX);
            if (e.layerX) {
                if (down) {
                    var newX = e.layerX - draggerWidth;
                    dragger.style.left = e.layerX - draggerWidth + 'px';

                    if (newX < 0) {
                        newX = 0;
                    }
                    if (newX > rangeWidth - (draggerWidth)) {
                        newX = rangeWidth - (draggerWidth);
                    }
                    dragger.style.left = newX + "px";
                    currentX = newX;
                    if (typeof onDrag === "function") {
                        onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
                    }
                }
            }
        },
        mouseMove = function (e) {
            var newX = Number(touchStart.currentX) + e.pageX - touchStart.x;

            if (newX < 0) {
                newX = 0;
            }
            if (newX > rangeWidth - (draggerWidth)) {
                newX = rangeWidth - (draggerWidth);
            }
            dragger.style.left = newX + "px";
            currentX = newX;
            if (typeof onDrag === "function") {
                onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
            }
        },
        mouseUp = function () {
            down = false;
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        },
        updateDraggerTouch = function (e) {

            var touch = e.touches[0],
                rect = range.getBoundingClientRect(),
                newX;

            debug.error("updateDragger", rect);
            //if (e.layerX) {
            if (down) {
                newX = touch.pageX - rect.left - draggerWidth;
                dragger.style.left = newX + 'px';

                debug.error("NEW X 1: ", newX);

                if (newX < 0) {
                    newX = 0;
                }
                if (newX > rangeWidth - (draggerWidth)) {
                    newX = rangeWidth - (draggerWidth);
                }

                debug.error("NEW X 2: ", newX);
                dragger.style.left = newX + "px";
                currentX = newX;
                if (typeof onDrag === "function") {
                    onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
                }
            }
            //}
        },
        touchMove = function (e) {
            var newX = Number(touchStart.currentX) + e.pageX - touchStart.x;

            if (newX < 0) {
                newX = 0;
            }
            if (newX > rangeWidth - (draggerWidth)) {
                newX = rangeWidth - (draggerWidth);
            }
            dragger.style.left = newX + "px";
            currentX = newX;
            if (typeof onDrag === "function") {
                onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
            }
        },
        touchUp = function () {
            down = false;
            document.removeEventListener("touchmove", touchMove);
            document.removeEventListener("touchend", touchUp);
        };

    


    dragger.style.width = draggerWidth + 'px';
    dragger.style.left = -draggerWidth + 'px';



    //dragger.style.marginLeft = (draggerWidth / 2) + 'px';

    rangeWidth = range.offsetWidth;
    rangeLeft = range.offsetLeft;

    if (percentage) {
        dragger.style.left = Math.round(rangeWidth * percentage) + 'px';
    }

    debug.error("NEW SLIDER");

    range.addEventListener("touchstart", function (e) {
        debug.error("RANGE TOUCH START", e, e.target, range);
        var touch = e.touches[0];
        if (e.target === dragger) {
            touchStart.currentX = dragger.style.left.replace("px", "");
            touchStart.x = touch.pageX;
            touchStart.y = touch.pageY;
            document.addEventListener("touchmove", touchMove);
            document.addEventListener("touchend", touchUp);
        }
        if (e.target !== range) {
            debug.error("TARGET AINT RANGE");
            return;
        }

        rangeWidth = this.offsetWidth;
        rangeLeft = this.offsetLeft;
        down = true;
        /*
        
        
        */
        updateDraggerTouch(e);
        return false;
    });

    range.addEventListener("mousedown", function (e) {

        if (e.target === dragger) {
            touchStart.currentX = dragger.style.left.replace("px", "");
            touchStart.x = e.pageX;
            touchStart.y = e.pageY;
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
        if (e.target !== range) {
            return;
        }

        rangeWidth = this.offsetWidth;
        rangeLeft = this.offsetLeft;
        down = true;
        /*
        
        
        */
        updateDragger(e);
        return false;
    });
    /*
    document.addEventListener("mousemove", updateDragger);
    document.addEventListener("mouseup", function () {
        down = false;
    });
    */
};