this["JST"] = this["JST"] || {};

this["JST"]["example/public_html/app/html/about.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="About" class="Asset">\r\n    <div class="box">\r\n        <h1>About</h1>\r\n         <hr>\r\n         <h2>Buttons - yep bootstrap theme ripsoffs</h2>\r\n         <p>\r\n            <button class="btn btn-lg btn-default" type="button">Default</button>\r\n            <button class="btn btn-lg btn-primary" type="button">Primary</button>\r\n            <button class="btn btn-lg btn-success" type="button">Success</button>\r\n            <button class="btn btn-lg btn-info" type="button">Info</button>\r\n            <button class="btn btn-lg btn-warning" type="button">Warning</button>\r\n            <button class="btn btn-lg btn-danger" type="button">Danger</button>\r\n            <button class="btn btn-lg btn-link" type="button">Link</button>\r\n        </p>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["example/public_html/app/html/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="Home" class="Asset">\r\n    <div class="box">\r\n        <h1>Home</h1>\r\n        <div id="btnStartCountdown" class="btn btn-default">Start Countdown</div>\r\n        <div id="btnStopCountdown" class="btn btn-default">Stop Countdown</div>\r\n        <h1><div id="timeContainer" class="label label-primary"></div></h1>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["example/public_html/app/html/list.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="List" class="Asset">\r\n    <div class="box">\r\n        <h1>List</h1>\r\n        <div id="listContainer"></div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["example/public_html/app/html/list.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ol>\r\n\t';
 _.each(users, function(user){ ;
__p += ' \r\n\t<li>\r\n\t\t' +
((__t = ( user.id )) == null ? '' : __t) +
' ' +
((__t = ( user.first_name )) == null ? '' : __t) +
' ' +
((__t = ( user.last_name )) == null ? '' : __t) +
'\r\n\t</li>\r\n\t';
 }); ;
__p += '\r\n</ol>';

}
return __p
};

this["JST"]["example/public_html/app/html/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="Menu" class="Asset">\r\n    <h1 id="menuHeader">Saga</h1>\r\n    <div id="btnHome" class="btn btn-primary">HOME</div>\r\n    <div id="btnAbout" class="btn btn-primary">ABOUT</div>\r\n    <div id="btnList" class="btn btn-primary">LIST</div>\r\n</div>';

}
return __p
};