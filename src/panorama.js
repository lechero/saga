/*jslint browser:true*/
/*global App, Saga*/
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
        /*
        WEST = "_3",
        NORTH = "_4",
        EAST = "_1",
        SOUTH = "_2",
        TOP = "_5",
        BOTTOM = "_6",
        */
        WEST = "_4",
        NORTH = "_1",
        EAST = "_2",
        SOUTH = "_3",

        TOP = "_5",
        BOTTOM = "_6",


        maxTop = 5,
        maxBottom = -5,


        debug = Saga.Debug,
        d = Saga.Dom,
        u = Saga.Util,

        rotationOffset = 0,

        pitch = 0.1,
        yaw = 0,
        perspective = opts.perspective || 300,
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
        onMove,
        onUp,
        onDown,

        distanceFactor = 1,

        lastPosition = false,
        center,
        transitionTime = function (elem, duration, ease) {
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
        },
        fadeIn = function (time) {
            transitionTime(center, time);
            center.style.opacity = 1;
        },
        fadeOut = function (time) {
            transitionTime(center, time);
            center.style.opacity = 0;
        },
        zoom = function (factor, duration, opacity) {
            if (duration || duration === 0) {
                transitionTime(center, duration);
            }

            distanceFactor = factor;
            if (opacity || opacity === 0) {
                center.style.opacity = opacity;
            }
            update();
        },
        rotate = function (deg, duration) {
            var distance = perspective,
                rect,
                offsetX,
                offsetY,
                transform;

            //deg = -deg;
            // u.getShortestRotation(angle, u.angleToPoint(point1, point2))
            //debug.error("Saga.Panorama.rotate() -> time: " + yaw, deg, u.getShortestRotation(yaw, deg));
            if (duration || duration === 0) {
                transitionTime(center, duration);
            }

            yaw = u.getShortestRotation(yaw, deg); //+ rotationOffset;
            pitch = 0;
            update();

            /*
            cube.style.perspective = perspective.toFixed(0) + "px";
            cube.style.webkitPerspective = perspective + "px";
            cube.style.mozPerspective = perspective + "px";

            rect = cube.getClientRects()[0];
            offsetX = (rect.width - size) * 0.5;
            offsetY = (rect.height - size) * 0.5;
            transform = "translateZ(" + distance + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateY(" + deg + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";
            center.style.transform = transform;
            center.style.webkitTransform = transform;
            center.style.mozTransform = transform;

            pub.fire("rotate", {
                distance: distance,
                rotateX: pitch.toFixed(1),
                rotateY: deg,
                yaw: yaw.toFixed(1)
            });
            */
        },
        buildFace = function (face, url, cb) {
            // debug.log("Saga.Panorama.buildFace()", face, url);
            var element = document.createElement("div"),
                halfsize,
                transform,
                img,
                scale = " scaleY(-1)";
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

            element.style.position = "absolute";
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = size + "px";
            element.style.height = size + "px";
            element.style.transform = transform;
            element.style.mozTransform = transform;
            element.style.webkitTransform = transform;

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
            //debug.error("Saga.Panorama.load()", "yaw:" + yaw, "pano: " + pano, "angle: " + angle, "angleOffset: " + angleOffset);
            transitionTime(center, 0);
            var done = 0,
                loadDone = function () {
                    done += 1;
                    if (done === 6) {
                        //debug.error("Saga.Panorama.load(), DONE!!!", pano, "yaw:" + yaw);
                        if (cb) {
                            cb();
                        }
                    }
                };

            if (angle || angle === 0) {
                yaw = angle;
            }

            buildFace("front", pano + WEST + extension, loadDone);
            buildFace("left", pano + SOUTH + extension, loadDone);
            buildFace("right", pano + NORTH + extension, loadDone);
            buildFace("top", pano + TOP + extension, loadDone);
            buildFace("bottom", pano + BOTTOM + extension, loadDone);
            buildFace("back", pano + EAST + extension, loadDone);

            /*
            buildFace("front", pano + EAST + extension, loadDone);
            buildFace("left", pano + NORTH + extension, loadDone);
            buildFace("right", pano + SOUTH + extension, loadDone);
            buildFace("top", pano + TOP + extension, loadDone);
            buildFace("bottom", pano + BOTTOM + extension, loadDone);
            buildFace("back", pano + WEST + extension, loadDone);
*/
            update();

            /*
            buildFace("front", pano + SOUTH + ".jpg", loadDone);
            buildFace("left", pano + EAST + ".jpg", loadDone);
            buildFace("right", pano + WEST + ".jpg", loadDone);
            buildFace("top", pano + TOP + ".jpg", loadDone);
            buildFace("bottom", pano + BOTTOM + ".jpg", loadDone);
            buildFace("back", pano + NORTH + ".jpg", loadDone);
            */
            pub.fire("load", {
                distance: perspective,
                rotateX: pitch.toFixed(1),
                rotateY: yaw.toFixed(1)
            });
            /*
            buildFace("front", pano + NORTH + ".jpg");
            buildFace("left", pano + WEST + ".jpg");
            buildFace("right", pano + EAST + ".jpg");
            buildFace("top", pano + TOP + ".jpg");
            buildFace("bottom", pano + BOTTOM + ".jpg");
            buildFace("back", pano + SOUTH + ".jpg");
            */
            /*
            buildFace("front", App.FRONT);
            buildFace("left", App.LEFT);
            buildFace("right", App.RIGHT);
            buildFace("top", App.TOP);
            buildFace("bottom", App.BOTTOM);
            buildFace("back", App.BACK);
            */
        },

        init = function () {
            debug.log("Saga.Panorama.init() -> container: ", container);
            cube = document.createElement("div");
            cube.id = "PanoramaCube123";
            //container = document.getElementById(container); // bler
            container.appendChild(cube);
            var rect = cube.getClientRects()[0];

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

            //cube.style.backgroundColor = options.backgroundColor || "black";
            cube.style.position = "relative";
            cube.style.overflow = "hidden";
            /*
            cube.addEventListener("mousedown", onDown);
            cube.addEventListener("touchstart", onDown);
*/
            lastPosition = [0, 0];

            center = document.createElement("div");
            center.className = "cubemapcenter";
            cube.appendChild(center);
            center.style.transformStyle = "preserve-3d";
            center.style.mozTransformStyle = "preserve-3d";
            center.style.webkitTransformStyle = "preserve-3d";
            center.style.width = "100%";
            center.style.height = "100%";

            update();
        },

        //        http://stackoverflow.com/questions/3432446/how-to-read-individual-webkit-transform-values-in-javascript
        //        
        //        // Suppose the transformed element is called "cover".
        //        var element = document.getElementById('cover');
        //        computedStyle = window.getComputedStyle(element, null); // "null" means this is not a pesudo style.
        //        // You can retrieve the CSS3 matrix string by the following method.
        //        var matrix = computedStyle.getPropertyValue('transform')
        //            || computedStyle.getPropertyValue('-moz-transform')
        //            || computedStyle.getPropertyValue('-webkit-transform')
        //            || computedStyle.getPropertyValue('-ms-transform')
        //            || computedStyle.getPropertyValue('-o-transform');
        //
        //        // Parse this string to obtain different attributes of the matrix.
        //        // This regexp matches anything looks like this: anything(1, 2, 3, 4, 5, 6);
        //        // Hence it matches both matrix strings:
        //        // 2d: matrix(1,2,3,4,5,6)
        //        // 3d: matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
        //        var matrixPattern = /^\w*\((((\d+)|(\d*\.\d+)),\s*)*((\d+)|(\d*\.\d+))\)/i;
        //        var matrixValue = [];
        //        if (matrixPattern.test(matrix)) { // When it satisfy the pattern.
        //            var matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
        //            console.log(matrixCopy);
        //            matrixValue = matrixCopy.split(/\s*,\s*/);
        //        }
        /*
 matrix3d(
     0.653719, 0.00114096, -0.756737, 0, 
     -0.00174533,  0.999998, 0, 0, 
     0.756736, 0.00132075, 0.65372, 0, 
     -36.3971,-121.064, 242.377, 1
 )
*/
        parseMatrix = function (matrixString) {
            var c = matrixString.split(/\s*[(),]\s*/).slice(1, -1),
                matrix;

            if (c.length === 6) {
                // 'matrix()' (3x2)
                matrix = {
                    m11: +c[0],
                    m21: +c[2],
                    m31: 0,
                    m41: +c[4],
                    m12: +c[1],
                    m22: +c[3],
                    m32: 0,
                    m42: +c[5],
                    m13: 0,
                    m23: 0,
                    m33: 1,
                    m43: 0,
                    m14: 0,
                    m24: 0,
                    m34: 0,
                    m44: 1
                };
            } else if (c.length === 16) {
                // matrix3d() (4x4)
                matrix = {
                    m11: +c[0],
                    m21: +c[4],
                    m31: +c[8],
                    m41: +c[12],
                    m12: +c[1],
                    m22: +c[5],
                    m32: +c[9],
                    m42: +c[13],
                    m13: +c[2],
                    m23: +c[6],
                    m33: +c[10],
                    m43: +c[14],
                    m14: +c[3],
                    m24: +c[7],
                    m34: +c[11],
                    m44: +c[15]
                };

            } else {
                // handle 'none' or invalid values.
                matrix = {
                    m11: 1,
                    m21: 0,
                    m31: 0,
                    m41: 0,
                    m12: 0,
                    m22: 1,
                    m32: 0,
                    m42: 0,
                    m13: 0,
                    m23: 0,
                    m33: 1,
                    m43: 0,
                    m14: 0,
                    m24: 0,
                    m34: 0,
                    m44: 1
                };
            }
            return matrix;
        },
        getTransformValues = function (tString) {
            //debug.error("Panorama - SAGA", "getTransformValues", tString);
            var transformString = tString,
                tArray,
                angleX,
                angleY,
                angleZ;
            transformString = transformString.replace("matrix3d", "");
            transformString = transformString.replace("(", "");
            transformString = transformString.replace(")", "");
            tArray = transformString.split(",");


            //rotate(Xdeg) = matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);


            //var rotationX = Math.acos(matrix.a) * (180/Math.PI);
            //var rotationY = Math.asin(matrix.b) * (180/Math.PI);

            angleX = Math.round(Math.acos(tArray[0]) * (180 / Math.PI));
            angleY = Math.round(Math.asin(tArray[1]) * (180 / Math.PI));
            angleZ = Math.round(Math.atan(tArray[2]) * (180 / Math.PI));
            // var angle = Math.round(Math.asin(b) * (180/Math.PI));

            debug.error("Panorama - SAGA", "getTransformValues", tArray, tArray.length, angleX, angleY, angleZ, angleOffset);
            return angleY - angleOffset;
        },
        getTransform = function () {
            var style = window.getComputedStyle(center),
                transform,
                matrix,
                rotateY,
                rotateX,
                rotateZ,
                rotate;
            transform = style.getPropertyValue("-webkit-transform") ||
                style.getPropertyValue("-moz-transform") ||
                style.getPropertyValue("-ms-transform") ||
                style.getPropertyValue("-o-transform") ||
                style.getPropertyValue("transform") || false;

            matrix = parseMatrix(transform);
            rotateY = Math.asin(-matrix.m13);
            if (Math.cos(rotateY) !== 0) {
                rotateX = Math.atan2(matrix.m23, matrix.m33);
                rotateZ = Math.atan2(matrix.m12, matrix.m11);
            } else {
                rotateX = Math.atan2(-matrix.m31, matrix.m22);
                rotateZ = 0;
            }

            rotate = {
                x: rotateX * (180 / Math.PI),
                y: rotateY * (180 / Math.PI),
                z: rotateZ * (180 / Math.PI)
            };

            return rotate;
            //debug.error("Panorama - SAGA", "ffTest", matrix, rotate);
            //getTransformValues(transform);
        },
        pause = function () {

            var style = window.getComputedStyle(center),
                transform,
                opacity = 0,
                elem = center,
                duration = 0,
                ease = "linear",
                angleY,
                rotate;


            transform = style.getPropertyValue("-webkit-transform") ||
                style.getPropertyValue("-moz-transform") ||
                style.getPropertyValue("-ms-transform") ||
                style.getPropertyValue("-o-transform") ||
                style.getPropertyValue("transform") || false;

            rotate = getTransform(transform);

            debug.error("Panorama - SAGA", "PAUSE", rotate, angleOffset);
            angleY = rotate.y - angleOffset;

            opacity = style.opacity;

            if (transform) {
                elem.style.WebkitTransitionDuration = duration;
                elem.style.MozTransitionDuration = duration;
                elem.style.OTransitionDuration = duration;
                elem.style.msTransitionDuration = duration;
                elem.style.KhtmlTransitionDuration = duration;
                elem.style.TransitionDuration = duration;

                elem.style.opacity = opacity;

                elem.style.WebkitTransitionTimingFunction = ease;
                elem.style.MozTransitionTimingFunction = ease;
                elem.style.OTransitionTimingFunction = ease;
                elem.style.msTransitionTimingFunction = ease;
                elem.style.KhtmlTransitionTimingFunction = ease;
                elem.style.TransitionTimingFunction = ease;

                elem.style.webkitTransform = transform;
                elem.style.mozTransform = transform;
                elem.style.oTransform = transform;
                elem.style.khtmlTransform = transform;
                elem.style.transform = transform;

                elem.style.WebkitTransitionProperty = "-webkit-transform, opacity";
                elem.style.MozTransitionProperty = "-moz-transform, opacity";
                elem.style.OTransitionProperty = "-o-transform, opacity";
                elem.style.msTransitionProperty = "-ms-transform, opacity";
                elem.style.KhtmlTransitionProperty = "-khtml-transform, opacity";
                elem.style.TransitionProperty = "transform, opacity";
            }

            return angleY;
        },
        resume = function () {

        },
        addClicks = function () {
            cube.addEventListener("mousedown", onDown);
            cube.addEventListener("touchstart", onDown);
        },
        removeClicks = function () {
            cube.removeEventListener("mousedown", onDown);
            cube.removeEventListener("touchstart", onDown);
        };


    update = function () {
        //debug.log("Saga.Panorama.update()");
        //var perspective = this.perspective;
        //perspective = 100 / Math.atan(0.0174532925 * this.fov);
        var distance = perspective,
            rect,
            offsetX,
            offsetY,
            transform;
        /*
            if (!rect) {
                //debug.error("Saga.Panorama.update() -> no rectangle!!!");
                return;
            }
            */
        //trace(perspective+" / ");
        cube.style.perspective = perspective.toFixed(0) + "px";
        cube.style.webkitPerspective = perspective + "px";
        cube.style.mozPerspective = perspective + "px";

        rect = cube.getClientRects()[0];

        debug.log("Saga.Panorama.update()", cube, rect);

        offsetX = (rect.width - size) * 0.5; // * distanceFactor;
        offsetY = (rect.height - size) * 0.5;

        depth = offsetX;

        debug.log("Saga.Panorama.update()", yaw, pitch);

        if (pitch > maxTop) {
            pitch = maxTop;
        }
        if (pitch < maxBottom) {
            pitch = maxBottom;
        }
        ////debug.error("pano update rect: ", rect, offsetX, offsetY, pitch, yaw);
        transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";
        center.style.transform = transform;
        center.style.webkitTransform = transform;
        center.style.mozTransform = transform;

        //tfTest();

        pub.fire("update", {
            distance: distance,
            rotateX: pitch.toFixed(1),
            rotateY: yaw.toFixed(1),
            angleOffset: angleOffset
        });

        //debug.log("UPDATE: "+offsetX+","+offsetY+" -> "+pitch+","+yaw+":"+transform);
    };
    options = u.extend(options, opts);

    onUp = function (evt) {
        //debug.log("Saga.Panorama.onUp()", pub.info());
        cube.removeEventListener("mousemove", onMove);
        cube.removeEventListener("mouseup", onUp);
        cube.removeEventListener("touchmove", onMove);
        cube.removeEventListener("touchend", onUp);

        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };
    onDown = function (evt) {
        //debug.log("Saga.Panorama.onDown()");
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

        //debug.log("move x,y: " + x + "," + y + " : " + deltax + "," + deltay + " : " + yaw + "," + pitch);
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

    debug.log("Panorama - SAGA", container);
    pub = {
        pause: function (time) {
            return pause(time);
        },
        resume: function (time) {
            resume(time);
        },
        fadeIn: function (time) {
            fadeIn(time);
        },
        fadeOut: function (time) {
            fadeOut(time);
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
        rotate: function (deg, duration) {
            rotate(deg, duration);
        },
        zoom: function (deg, duration, opacity) {
            zoom(deg, duration, opacity);
        },
        rotation: function () {
            return parseFloat(yaw.toFixed(1));
        },
        container: function () {
            return container;
        },
        update: function () {
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