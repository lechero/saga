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

Saga.List = function (urlJson) {
    "use strict";
    var pub,
        data = false,
        debug = Saga.Debug,
        u = Saga.Util,
        d = Saga.Dom,
        id = u.uniqueId("sl"),
        url = urlJson || false,
        loader = Saga.net.Loader(),
        template = false,
        settings = {
            'keys': false,
            'checkbox': false,
            'checkboxHandler': false,
            'headerHandler': false
        },
        options = {
            'page': 1,
            'totalPages': 1,
            'total': 1,
            'amount': 4,
            'order': 'desc',
            'orderField': ""
        },
        addClick = function (checkbox) {
            checkbox.onclick = function () {};
        },
        addClicks = function () {
            var cbs = u.getByClass(id + 'cb');
            u.each(cbs, function (checkbox) {
                addClick(checkbox);
            });
        },
        getTableTemplate = function () {
            var i = 0,
                l = settings.keys.length,
                tableRow = "",
                compiled;
            template = '<table class="table table-striped">';
            template += '<thead>';
            template += '<tr>';
            if (settings.checkbox) {
                template += '<th><input type="checkbox" id="' + id + 'cb"></th>';
                tableRow += '<td><input type="checkbox" id="' + id + 'cb<%= i %>" class="' + id + 'cb"></td>';
            }
            for (i; i < l; i += 1) {
                template += '<th>' + settings.keys[i] + '</th>';
                tableRow += '<td><%= row.' + settings.keys[i] + ' %></td>';
            }
            template += '</thead>';
            template += '</tr>';
            template += '<tbody>';
            template += '<% var i=0; _.each(rows, function(row){ %>';
            template += '<tr>' + tableRow + '</tr>';
            template += '<% i += 1; }); %>';
            template += '</tbody>';
            template += '</table>';

            compiled = u.template(template);

            return compiled;
        },
        loadComplete = function (result) {
            result = JSON.parse(result);
            if (u.isArray(result)) {
                data = result;
            }
            if (result.hasOwnProperty('page') && result.hasOwnProperty('data')) {
                options.page = parseInt(result.page, 10);
                options.totalPages = parseInt(result.totalPages, 10);
                options.total = parseInt(result.total, 10);
                data = result.data;
            }

            settings.keys = u.keys(data[0]);
            debug.log(settings);

            pub.fire("loaded");
        },
        load = function () {
            debug.log("Saga.List.load() -> ", url);
            if (!url) {
                return;
            }
            loader = new Saga.net.Loader({
                method: "post",
                data: options,
                url: url,
                success: function (result) {
                    if (result.hasOwnProperty('error') || result.hasOwnProperty('errors')) {
                        pub.fire("error");
                        return;
                    }
                    loader = null;
                    loadComplete(result);
                }
            });
            loader.execute();
        };
    pub = {
        load: function () {
            load();
        },
        loadNext: function () {
            load();
        },
        loadPrev: function () {
            load();
        },
        url: function (newVal) {
            if (newVal) {
                url = newVal;
            } else {
                return url;
            }
        },
        data: function () {
            return data;
        },
        hasPrev: function () {

        },
        hasNext: function () {

        },
        totalPages: function () {

        },
        page: function () {

        },
        checkbox: function (hasCb, checkboxHandler) {
            if (hasCb) {
                settings.checkbox = Boolean(hasCb);
                if (hasCb && checkboxHandler) {
                    settings.checkboxHandler = checkboxHandler;
                }
            } else {
                return settings.checkbox;
            }
        },
        select: function (hasSelect, headerHandler) {
            // has a select
            /*
            if (hasSelect) {
                settings.select = Boolean(hasSelect);
                if (hasSelect && headerHandler) {
                    settings.headerHandler = headerHandler;
                }
            } else {
                return settings.select;
            }
            */
        },
        selectedItems: function () {

        },
        template: function (model) {
            return template(model);
        },
        getTableTemplate: function () {
            return getTableTemplate();
        }
    };
    Saga.Util.extend(pub, Saga.Event());
    return pub;
};

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