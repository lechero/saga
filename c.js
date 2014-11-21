/*jslint browser:true*/
/*global console, $ */

var car = (function () {
    "use strict";
    var pub,
        response,
        loadedImages = false,
        images = false,
        indicators = false,
        holderImages = false,
        holderIndicators = false,

        currentImage = 0,
        load = function (cb) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {

                if (xhr.status === 200) {

                    response = JSON.parse(xhr.responseText);
                    loadedImages = response.imgs;

                    if (cb) {
                        cb();
                    }
                }
            };

            xhr.open('GET', 'js/images.json', true);
            xhr.send(null);
        },
        imageLoaded = function () {
            console.log("image loaded");
        },
        update = function () {
            var i = 0,
                l = loadedImages.length;
            for (i; i < l; i += 1) {
                if (currentImage === i) {
                    $(images[i]).addClass("image_active");
                    $(indicators[i]).addClass("active");
                } else {
                    $(images[i]).removeClass("image_active");
                    $(indicators[i]).removeClass("active");
                }
            }
        },
        next = function () {
            currentImage = currentImage + 1;
            if (currentImage > images.length - 1) {
                currentImage = 0;
            }

            update();
        },
        prev = function () {
            currentImage = currentImage - 1;
            if (currentImage < 0) {
                currentImage = images.length - 1;
            }
            update();
        },
        gotoImage = function (evt) {
            var index = parseInt(evt.target.id.replace('img',""),10);
            //console.log("index", index, evt.target);
            
            currentImage = index;
            update();
        },
        init = function () {
            holderImages = document.getElementById('carousel_img_loaded');
            holderIndicators = document.getElementById('holderIndicators');
            var i = 0,
                l = loadedImages.length,
                img,
                indicator;

            indicators = [];
            images = [];

            for (i; i < l; i += 1) {
                // maak de images en gooi ze in de holder
                img = document.createElement('img');
                img.onload = imageLoaded;

                img.src = loadedImages[i].dir;
                holderImages.appendChild(img);

                indicator = document.createElement('li');
                indicator.id = "img" + i;

                indicator.onclick = gotoImage;

                indicators.push(indicator);
                images.push(img);

                holderIndicators.appendChild(indicator);

                if (currentImage === i) {
                    $(img).addClass("image_active");
                    $(indicator).addClass("active");
                }
            }

            $('.arrow_right').on('click', next);
            $('.arrow_left').on('click', prev);
        },

        none;

    pub = {
        load: function (cb) {
            load(cb);
        },
        init: function () {
            init();
        },
        next: function () {
            next();
        },
        prev: function () {
            prev();
        }
    };
    // return the public shizzle
    return pub;
}());