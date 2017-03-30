<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>账号信息</title>

    <!-- EasyUI -->
    <link href="/application/Public/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="/application/Public/easyui/themes/icon.css" rel="stylesheet">
    <link href="/application/Public/css/account.css" rel="stylesheet">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onresize="resize()" onload="resize()">
    <div id="content">
      <input id="uid" style="width:300px" data-options="value:'<?php echo $tid ?>'"><br><br>
      <input id="phone" style="width:300px" data-options="value:'<?php echo $phone ?>'"><br><br>
      <input id="email" style="width:300px" data-options="value:'<?php echo $email ?>'"><br><br>
      <input id="state" style="width:300px"><br><br>
      <input id="time" style="width:300px" data-options="value:'<?php echo $time ?>'"><br><br><br>
      <a id="submit">提交</a>
      <a id="cancel" style="float:right">重置</a>
    </div>
    <script type="text/javascript">
      var APP = "/application/index.php" ;
      var PUBLIC = "/application/Public" ;
    </script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/application/Public/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/application/Public/easyui/jquery.easyui.min.js"></script>
    <script src="/application/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script src="/application/Public/js/account.js"></script>
  </body>
</html>