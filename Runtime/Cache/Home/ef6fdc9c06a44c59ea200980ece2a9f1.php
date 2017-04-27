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
  <body style="min-width:1000px">
    <div id="box">
      <div data-options="region:'north'" class="nav-top" style="height: 50px;overflow:hidden">
        <img src="/application/Public/images/logo.png" style="width:500px;height:50px"/>
        <div id="nav-btn" style="float : right;margin-right:50px; line-height:50px;">
          <!--<a id="admin">后台管理</a>-->
          <a id="user" style="font-weight:bold"><?php echo session('tid') ?></a>
          <a id="logout">注销</a>
        </div>
        <div id="menu" data-options="width:150,itemHeight:30">
          <div data-options="iconCls:'icon-account'" onclick="$('#account').click();">账号信息</div>   
          <div data-options="iconCls:'icon-info'" onclick="$('#info').click();">基本信息</div> 
          <div data-options="iconCls:'icon-password'" onclick="$('#chpwd').click();">修改密码</div>   
          <div class="menu-sep"></div>  
          <div data-options="iconCls:'icon-logout'" onclick="$('#logout').click();">注销</div>   
        </div>
      </div>
      <div data-options="region:'south'" class="nav-bottom" style="height: 40px;overflow:hidden">
        <div class="copy">CopyRight © <a href="http://cs.ujs.edu.cn" style="text-decoration: none;color:black" target="_blank">江苏大学计算机科学与通信工程学院</a></div>
      </div>
      <div data-options="region:'west',title:'功能菜单',hideCollapsedContent:false,expandMode:'dock'" style="width: 200px;overflow:hidden">
    		<div id="nagivator">
          <div title="科研成果" style="overflow:hidden">
            <a class="nav" id="paper" href="javascript:;"></a>
            <a class="nav" id="science" href="javascript:;"></a>
            <a class="nav" id="patent" href="javascript:;"></a>
            <a class="nav" id="prize" href="javascript:;"></a>
            <a class="nav" id="social" href="javascript:;"></a>
          </div>

          <div title="教学成果" style="overflow:hidden">
            <a class="nav" id="teach_paper" href="javascript:;"></a>
            <a class="nav" id="teach_science" href="javascript:;"></a>
            <a class="nav" id="book" href="javascript:;"></a>
            <a class="nav" id="teaching" href="javascript:;"></a>
          </div>

          <div title="个人信息" style="overflow:hidden">
            <a class="nav" id="degree" href="javascript:;"></a>
            <a class="nav" id="job" href="javascript:;"></a>
            <a class="nav" id="position" href="javascript:;"></a>
            <a class="nav" id="tutor" href="javascript:;"></a>
          </div>

    			<div title="账号管理" style="overflow:hidden">
    		    <a class="nav" id="account" href="javascript:;"></a>
            <a class="nav" id="info" href="javascript:;"></a>
            <a class="nav" id="chpwd" href="javascript:;"></a>
          </div>
    		</div>
	  </div>
      <div data-options="region:'center',minWidth:800">
        <div id="content">
          <div data-options="title:'欢迎页',iconCls:'icon-home'"></div>
        </div>
        <div id="tabmenu">
          <div data-options="iconCls:'icon-close_current'" name="close_current">关闭当前</div>   
          <div data-options="iconCls:'icon-close_other'" name="close_other">关闭其它</div> 
          <div data-options="iconCls:'icon-close_all'" name="close_all">关闭全部</div>   
          <div class="menu-sep"></div>  
          <div data-options="iconCls:'icon-close_left'" name="close_left">关闭左侧</div>
          <div data-options="iconCls:'icon-close_right'" name="close_right">关闭右侧</div>
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