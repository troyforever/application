<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>登录页面</title>
    <link rel="shortcut icon" href="/application/Public/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <!-- EasyUI -->
    <link href="/application/Public/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="/application/Public/easyui/themes/icon.css" rel="stylesheet">
    <link href="/application/Public/css/login.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onresize="resize()" onload="resize()">
    <div id="box">
      <form id="login-box" method="POST">
        <div class="css1">
          <input id="username" name="username" /><br><br><br>
          <input id="password" name="password" />
          <div class="css2">
       		<input id="code" />
       		<img id="recode" title="点击更换验证码" src="/application/index.php/Login/Verify/verify" onclick="changeCode()" />
       	 </div>
        </div>
        <div class="css3">
          <a id="register" href="/application/index.php/Login/Register" target="_blank">注册</a>
          <a id="fgtpwd" href="/application/index.php/Login/Password" target="_blank">忘记密码</a>
          <a id="ok" href="javascript:;" class="pull-right">登录</a>
        </div>
      </form>
    </div>
    <script type="text/javascript">
      var APP = '/application/index.php' ;
    </script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/application/Public/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/application/Public/easyui/jquery.easyui.min.js"></script>
    <script src="/application/Public/js/login.js"></script>
  </body>
</html>