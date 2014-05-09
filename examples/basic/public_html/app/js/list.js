/*jslint browser:true*/
/*global App, Saga*/

/*
<ol>
	<% _.each(users, function(user){ %> 
	<li>
		<%= user.id %> <%= user.first_name %> <%= user.last_name %>
	</li>
	<% }); %>
</ol>
*/

(function (asset) {
    "use strict";
    var div,
        debug = Saga.Debug,
        e = Saga.Dom.getById,
        u = Saga.Util,
        list = Saga.List("/albatros/sites/question_admin/site/data/qs.php"),
        addClicks = function () {
            e("btnLoadList").onclick = function () {
                list.load();
            };
            /*
            e("listContainer").innerHTML = asset.template({
                users: App.Model.users()
            });
            */
        },
        loadList = function () {
            list.checkbox(true, function (row) {

            });

            list.on("loaded", function () {
                Saga.Dom.elem("listContainer").innerHTML = list.template({
                    rows: list.data()
                });
                /*
                Saga.Dom.elem("listContainer").innerHTML = u.template(list.getTableTemplate(), {
                    rows: list.data()
                });
                */
            });
            list.load();
        },
        init = function () {
            debug.log(asset.id + ".init()");
            div = e(asset.name);
            loadList();
            //addClicks();
        },
        simpleInit;

    Saga.Util.extend(asset.View, App.SimpleView(asset));

    simpleInit = asset.View.init;
    asset.View.init = function () {
        simpleInit();
        init();
    };
}(App.Assets.List));