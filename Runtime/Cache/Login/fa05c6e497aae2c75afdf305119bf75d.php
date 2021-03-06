<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>激活页面</title>
    <link rel="shortcut icon" href="/application/Public/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <!-- EasyUI -->
    <link href="/application/Public/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="/application/Public/easyui/themes/icon.css" rel="stylesheet">
    <link href="/application/Public/css/activate.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onresize="resize()">
    <div id="box">
      <form id="login-box" method="POST">
        <div class="css1">
          <div class="css5">
            激活码即将发送至您的邮箱：<br>
            <p class="css6"><?php echo $email ?></p>
          </div>
          <input id="username" value="<?php echo session('register.tid') ?>" />
          <div class="css2">
       		<input id="code" />
       		<a id="recode"><span id="num"></span><span id="text">发送激活码</span></a>
       	 </div>
        </div>
        <div class="css3">
          <a id="activate" href="javascript:;" class="pull-right">激活</a>
        </div>
      </form>
    </div>
    <script type="text/javascript">
      var APP = "/application/index.php" ;
    </script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/application/Public/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/application/Public/easyui/jquery.easyui.min.js"></script>
    <script src="/application/Public/js/activate.js"></script>
  </body>
</html>