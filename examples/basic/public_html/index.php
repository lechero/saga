<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Saga (PHP) - 2014 - sagajs.com - fuentastic - FACE!</title>

    <link href="/app/css/app.css" rel="stylesheet">

    <!-- Extra Libraries for project -->
    <script src="/libs/gs/TweenLite.min.js"></script>
    <script src="/libs/gs/plugins/CSSPlugin.min.js"></script>

    <!-- Saga Build 
    <script id="saga" src="libs/saga.js"></script>
    -->
    <!-- Saga Minified 
    <script id="saga" src="libs/saga-min.js"></script>
    -->

    <!-- Saga Files -> notice dependency on underscore  -->
    <script id="saga" src="/libs/underscore-min.js"></script>
    <script src="/libs/saga/saga.js"></script>
    <script src="/libs/saga/util.js"></script>
    <script src="/libs/saga/debug.js"></script>
    <script src="/libs/saga/event.js"></script>
    <script src="/libs/saga/net.js"></script>
    <script src="/libs/saga/dom.js"></script>
    <script src="/libs/saga/browser.js"></script>
    <script src="/libs/saga/holder.js"></script>
    <script src="/libs/saga/asset.js"></script>
    <script src="/libs/saga/route.js"></script>
    <script src="/libs/saga/asset-manager.js"></script>
    <script src="/libs/saga/font-manager.js"></script>
    <script src="/libs/saga/keyboard.js"></script>
   
    <!-- Project Files -->
    <script src="/app/AppRoute.js"></script>
</head>

<body>
    <?php 
        print_r($_GET);
    ?>
    <div id="form">
        <div class="holderMenu" id="holderMenu"></div>
        <div class="holderContent" id="holderContent"></div>
    </div>
</body>

</html>