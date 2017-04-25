<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>个人信息</title>
    <link rel="shortcut icon" href="/application/Public/favicon.ico" mce_href="/favicon.ico" type="image/x-icon">
    <!-- EasyUI -->
    <link href="/application/Public/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="/application/Public/easyui/themes/icon.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body onresize="resize()" onload="resize()">
    <div id="content">
      <form id="info-box" method="POST">
      <input id="uid" name="uid" style="width:300px" data-options="value:'<?php echo session('tid') ?>'"><br><br>
      <input id="name" name="name" style="width:300px" data-options="value:'<?php echo $name ?>'"><br><br>
      <select id="gender" name="gender" style="width:300px" data-options="value:'<?php echo $gender != null ? $gender : 1 ?>'">
        <option value='1'>男</option>
        <option value='0'>女</option>
      </select><br><br>
      <input id="birth" name="birth" style="width:300px" data-options="value:'<?php echo $birth != null ? $birth : '1980-1-1' ?>'"><br><br>
      <input id="nation" name="nation" style="width:300px" data-options="value:'<?php echo $nation != null ? $nation : '汉族' ?>'"><br><br>
      <input id="outlook" name="outlook" style="width:300px" data-options="value:'<?php echo $outlook != null ? $outlook : '群众' ?>'"><br><br>
      <input id="unit" name="unit" style="width:300px" data-options="value:<?php echo $unitid != null ? $unitid : 1 ?>"><br><br>
      <input id="department" name="department" style="width:300px" data-options="value:<?php echo $departmentid != null ? $departmentid : 1 ?>"><br><br>
      <a id="cancel" style="float:right">刷新</a>
      <a id="submit">提交</a>
      </form>
    </div>
    <script type="text/javascript">
      var PUBLIC = "/application/Public" ;
      var APP = "/application/index.php" ;
      var init = "<?php echo $departmentid != null ? $departmentid : 1 ?>" ;
      var showMsg = "<?php echo $id == null ? 1 : 0 ?>" ;
      var flag = true ;
    </script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/application/Public/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/application/Public/easyui/jquery.easyui.min.js"></script>
    <script src="/application/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script src="/application/Public/js/info.js"></script>
  </body>
</html>