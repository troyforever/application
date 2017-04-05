<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>主页</title>
    <link rel="shortcut icon" href="/application/Public/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <!-- EasyUI -->
    <link href="/application/Public/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="/application/Public/easyui/themes/icon.css" rel="stylesheet">
    <link href="/application/Public/css/main.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="font-size:20px">
    <div id="box">
      <div data-options="region:'north'" style="height: 70px">
        <a id="logout" class="easyui-linkbutton" style="float:right" onclick="javascript:window.location.href='/application/index.php/Login/Login/logout'">注销</a>
      </div>
      <div data-options="region:'south'" style="height: 70px"></div>
      <div data-options="region:'west',title:'功能菜单',hideCollapsedContent:false,expandMode:'dock'" style="width: 200px">
    		<div id="nagivator">
          <div title="成果管理">
            <a class="nav" id="paper" href="javascript:;"></a>
            <a class="nav" id="book" href="javascript:;"></a>
            <a class="nav" id="science" href="javascript:;"></a>
            <a class="nav" id="patent" href="javascript:;"></a>
            <a class="nav" id="prize" href="javascript:;"></a>
            <a class="nav" id="social" href="javascript:;"></a>
          </div>

          <div title="个人经历">
            <a class="nav" id="degree" href="javascript:;"></a>
            <a class="nav" id="job" href="javascript:;"></a>
            <a class="nav" id="position" href="javascript:;"></a>
            <a class="nav" id="teaching" href="javascript:;"></a>
          </div>

    			<div title="账号管理">
    		<a class="nav" id="account" href="javascript:;"></a>
            <a class="nav" id="info" href="javascript:;"></a>
            <a class="nav" id="chpwd" href="javascript:;"></a>
          </div>
    		</div>
	  </div>
      <div data-options="region:'center',minWidth:800">
        <div id="content">
          <div data-options="title:'欢迎页'"></div>
        </div>
      </div>
    </div>
    <script type="text/javascript">
      var APP = "/application/index.php" ;
    </script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/application/Public/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/application/Public/easyui/jquery.easyui.min.js"></script>
    <script src="/application/Public/js/main.js"></script>
  </body>
</html>