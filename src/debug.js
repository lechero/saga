/*jslint browser:true*/
/*global Saga, console */

/*
TODO: add "trace" function
TODO: add "image" function
https://github.com/adriancooney/console.image/blob/master/console.image.js
*/

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
		},
		initNoDebug = function (level) {
			Saga.NoDebug[level] = function () {};
		};

	if (Function.prototype.bind && window.console && typeof console.log === "object") {
		//http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
		console.log("debug reset console");
		levels.forEach(function (method) {
			console[method] = this.bind(console[method], console);
		}, Function.prototype.call);
	}


	Saga.NoDebug = {};
	util.each(levels, initNoDebug);

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