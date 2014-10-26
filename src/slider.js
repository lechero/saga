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
            //if (e.hasOwnProperty('layerX')) {
            if (e.layerX) {
                if (down) {
                    //debug.error("!!",e.layerX, (e.layerX - draggerWidth))
                    var newX = e.layerX - draggerWidth;
                    dragger.style.left = e.layerX - draggerWidth + 'px';

                    if (newX < 0) {
                        newX = 0;
                    }
                    if (newX > rangeWidth - (draggerWidth)) {
                        newX = rangeWidth - (draggerWidth);
                    }
                    //if (newX >= (0) && newX <= rangeWidth - (draggerWidth)) {
                    dragger.style.left = newX + "px";
                    currentX = newX;
                    if (typeof onDrag === "function") {
                        onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
                    }
                }
            }
            /*else if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
                dragger.style.left = e.pageX - rangeLeft - draggerWidth + 'px';
                if (typeof onDrag === "function") {
                    //onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
                    onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth)));
                }
            }*/
        },
        mouseMove = function (e) {
            var newX = Number(touchStart.currentX) + e.pageX - touchStart.x;
            //debug.error("mm", touchStart.currentX, e.pageX, touchStart.x, e.pageX - touchStart.x, newX, rangeWidth);


            if (newX < 0) {
                newX = 0;
            }
            if (newX > rangeWidth - (draggerWidth)) {
                newX = rangeWidth - (draggerWidth);
            }
            //if (newX >= (0) && newX <= rangeWidth - (draggerWidth)) {
            dragger.style.left = newX + "px";
            currentX = newX;
            if (typeof onDrag === "function") {
                onDrag(Math.round((newX / (rangeWidth - draggerWidth)) * 100) / 100);
            }
            //}

            //dragger.style.left
        },
        mouseUp = function () {
            down = false;
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
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
        if (e.target === dragger) {
            touchStart.currentX = dragger.style.left.replace("px", "");
            touchStart.x = e.pageX;
            touchStart.y = e.pageY;
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