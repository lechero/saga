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

    debug.log("Saga.Slider(" + id + ")");


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
        debug.log("OFFSET", rangeWidth, rangeLeft);
        debug.log("POSt", e.pageX, e.layerX);
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
        debug.log("OFFSET", rangeWidth, rangeLeft);
        debug.log("POSt", e.pageX, e.layerX);
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