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
			27: "esc",
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
			debug.info("Saga.Keyboard.keyDown() -> ", evt);
			downKeys[evt.keyCode] = true;
			pub.fire("key:down", evt);
			if (usefulKeys.hasOwnProperty(evt.keyCode)) {
				if (downKeys[usefulKeyCodes.shift]) {
					pub.fire("shift:" + usefulKeys[evt.keyCode], evt);
					debug.warn("Saga.Keyboard.keyDown() -> SHIFT + usefulKey: ", usefulKeys[evt.keyCode]);
				} else {
					debug.warn("Saga.Keyboard.keyDown() -> usefulKey: ", usefulKeys[evt.keyCode]);
					pub.fire(usefulKeys[evt.keyCode], evt);
				}
			}
		},
		keyPress = function (evt) {
			debug.info("Saga.Keyboard.keyPress() -> ", evt);
			pub.fire("key:press", evt);
		},
		keyUp = function (evt) {
			debug.info("Saga.Keyboard.keyUp() -> ", evt);
			var key = false;
			if (downKeys.hasOwnProperty(evt.keyCode)) {
				key = downKeys[evt.keyCode];
				delete downKeys[evt.keyCode];
			}
			pub.fire("key:up", {
				key: key,
				evt: evt
			});
		},
		init = function () {
			debug.info("Saga.Keyboard.init()");
			window.onkeydown = keyDown;
			window.onkeypress = keyPress;
			window.onkeyup = keyUp;
		},
		deinit = function () {
			debug.info("Saga.Keyboard.deinit()");
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