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

            cube.style.perspective = perspective.toFixed(0) + "px";
            cube.style.webkitPerspective = perspective + "px";
            cube.style.mozPerspective = perspective + "px";

            rect = cube.getClientRects()[0];

            offsetX = (rect.width - size) * 0.5; // * distanceFactor;
            offsetY = (rect.height - size) * 0.5;

            depth = offsetX;

            //////debug.log("Saga.Panorama.update()", yaw, pitch);

            if (pitch > maxTop) {
                pitch = maxTop;
            }
            if (pitch < maxBottom) {
                pitch = maxBottom;
            }

            transform = "translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (rotation + angleOffset).toFixed(1) + "deg) translateX(" + offsetX + "px) translateY(" + offsetY + "px)";

            offs = "translateX(" + offsetX + "px) translateY(" + offsetY + "px) translateZ(" + (distance * distanceFactor) + "px) rotateX(" + pitch.toFixed(1) + "deg) rotateZ(0.1deg) rotateY(" + (yaw + angleOffset).toFixed(1) + "deg) ";


            //////////debug.error("offs", offs);
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

        },
        pause = function () {
            ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.pause()", tween, oTween);
            if (tween) {
                tween.pause();
                ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.pause() !!!! Done!!!", tween, tween.paused());
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

            zoomUpdate(obj);

            oTween = TweenLite.to(center, time, {
                css: {
                    autoAlpha: obj.opacityTo
                },
                ease: Linear.easeNone
            });

            ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomIn() TWEEEN START");
            tween = TweenLite.to(obj, time, {
                distance: obj.distanceTo,
                ease: Linear.easeNone,
                onUpdate: function () {
                    ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomIn() TWEEEN", tween.paused());
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

            ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut()");
            zoomUpdate(obj);

            oTween = TweenLite.to(center, time, {
                css: {
                    autoAlpha: obj.opacityTo
                },
                ease: Linear.easeNone,
                onComplete: cb
            });
            ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut() TWEEEN START");
            tween = TweenLite.to(obj, time, {
                distance: obj.distanceTo,
                ease: Linear.easeNone,
                onUpdate: function () {
                    ////debug.error(containerDiv.id + " -> " + "Saga.Panorama.zoomOut() TWEEEN", tween.paused());
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
                    //////////debug.error("rotatePanorama", obj.rotateY, obj.rotateYFrom, obj.rotateYTo);
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

                    ////////debug.error("PANORAMA ", container.id, ie, rect, size, distance, distanceFactor);

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


                    ////////debug.error("offs", offs);

                    u.each(drawnFaces, function (face) {
                        transform = offs + " " + getFaceTransformIe(face.id);

                        face.style.transform = transform;
                        face.style.mozTransform = transform;
                        face.style.webkitTransform = transform;

                    });

                };

            tween = TweenLite.to(obj, duration / 1000, {
                rotateY: obj.rotateYTo,
                ease: Linear.easeNone,
                onUpdate: rotatePanorama,
                onComplete: cb
            });
        },
        rotate = function (deg, duration, cb) {

            //debug.error("ROTATE : ", yaw, " to ", deg);

            pitch = defaultPitch;
            if (ie) {
                rotateIe(deg, duration, cb);
                return;
            }
            //////debug.error("rotate");
            var obj = {
                    rotateY: yaw,
                    rotateYFrom: yaw,
                    rotateYTo: u.getShortestRotation(yaw, deg)
                },
                rotatePanorama = function () {
                    ////debug.warn("rotatePanorama", yaw, obj.rotateY);
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

                    offsetX = (rect.width - size) * 0.5; // * distanceFactor;
                    offsetY = (rect.height - size) * 0.5;

                    depth = offsetX;

                    //////debug.log("Saga.Panorama.update()", yaw, pitch);

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
            //////debug.info("Saga.Panorama.buildFaceIe()", face, url);
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
            //////debug.info("Saga.Panorama.buildFace()", face, url);
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
        load = function (pano, angle, cb) {
            panoImg = pano;
            //////////debug.error("Saga.Panorama.load()", "yaw:" + yaw, "pano: " + pano, "angle: " + angle, "angleOffset: " + angleOffset);
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

            ////debug.warn("Saga.Panorama.load()", "yaw:" + yaw, "YAW SET");

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
            ////debug.error("Saga.Panorama.init() -> container: ", options);

            cube = document.getElementById("PanoramaCube123" + container.id) || document.createElement("div");
            cube.id = "PanoramaCube123" + container.id;

            if (!ie) {
                cube.style.transformStyle = "preserve-3d";
                cube.style.mozTransformStyle = "preserve-3d";
                cube.style.webkitTransformStyle = "preserve-3d";
            }

            cube.innerHTML = "";
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
        addClicks = function () {
            //debug.error("addClicks !!!!", cube);
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

        rect = cube.getClientRects()[0];

        offsetX = (rect.width - size) * 0.5; //+50; // * distanceFactor;
        offsetY = (rect.height - size) * 0.5; //+50;

        if (pitch > maxTop) {
            pitch = maxTop;
        }
        if (pitch < maxBottom) {
            pitch = maxBottom;
        }

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

        ////////debug.error("Saga.Panorama.update()", "id", cube.id, "styles", cube.style, "cube", cube, "rect", rect, "distance", distance, "distanceFactor", distanceFactor, "offsetX", offsetX, "offsetY", offsetY, "size", size);

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

        //////debug.log("UPDATE: "+offsetX+","+offsetY+" -> "+pitch+","+yaw+":"+transform);
    };
    options = u.extend(options, opts);

    onUp = function (evt) {
        //////debug.log("Saga.Panorama.onUp()", pub.info());
        cube.removeEventListener("mousemove", onMove);
        cube.removeEventListener("mouseup", onUp);
        cube.removeEventListener("touchmove", onMove);
        cube.removeEventListener("touchend", onUp);

        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };
    onDown = function (evt) {
        //debug.log("Saga.Panorama.onDown()", evt.type);
        if (evt.type === "touchstart") {
            ////debug.log("Saga.Panorama.onDown()", "TOUCH");
            cube.addEventListener("touchmove", onMove);
            cube.addEventListener("touchend", onUp);
        } else {
            ////debug.log("Saga.Panorama.onDown()", "CLICK");
            cube.addEventListener("mousemove", onMove);
            cube.addEventListener("mouseup", onUp);
        }

        var rect = cube.getClientRects()[0];
        if ((evt.hasOwnProperty('targetTouches') || evt.targetTouches) && evt.targetTouches.length > 0) {
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
            x,
            y,
            deltax,
            deltay;

        x = evt.pageX;
        y = evt.pageY;
        if ((evt.hasOwnProperty('targetTouches') || evt.targetTouches) && evt.targetTouches.length > 0) {
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
        //////////debug.error("Saga.Panorama.onMove() -> updating");
        update();


        lastPosition = [x, y];
        evt.stopPropagation();
        evt.preventDefault();
        return false;
    };

    ////debug.log("Panorama - SAGA", container);
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
            //////////debug.error("Saga.Panorama.pub.update() -> updating");
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
            ////////debug.error("Saga.Panorama.pub.setDistance() -> updating", factor);
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
        rotateY: function () {
            return yaw.toFixed(1);
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