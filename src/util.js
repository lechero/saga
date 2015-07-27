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
			//debug.info("Saga.FloorMap.Animation.angleToPoint()", theta, point1, point2);
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
		call = function (cb) {
			if (cb && typeof (cb) === "function") {
				var arg = Array.prototype.slice.call(arguments, 1);
				try {
					cb.apply(cb, arg);
				} catch (e) {

				}
				//cb(arguments);
			}
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

	pub.call = function () {
		//var arg = Array.prototype.slice.call(arguments, 0);
		call.apply(this, arguments);
	}
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