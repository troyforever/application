	$("#box").dialog({
		title:'登录',
		iconCls:'icon-login',
		width:500,
		height:350,
		shadow : false,

		draggable:false,
		resizable:false,
		closable:false,
	});

	$("#login-box").form({
		url : APP + '/Login/Login/login' ,

		onSubmit : function (){
			if ( $("#username").numberbox('isValid') && $("#password").passwordbox('isValid') && $("#code").textbox('isValid')){
				if ( !checkCode($("#code").textbox('getValue')) ){
					changeCode();
					$.messager.alert('提示','验证码错误','info') ;
					return false ;
				} else{
					return true ;
				}
			} else
			{
				$.messager.alert('提示','请输入正确信息！','info') ;
				return false ;
			}
		} ,

		success : function (data){
			if ( data == 1001 ){
				$('#username').numberbox('clear') ;
				$('#password').passwordbox('clear') ;
				$.messager.alert('提示','无此用户！','info') ;
				changeCode() ;
			} else if ( data == 1002 ){
				window.location.href= APP ;
			// } else if ( data == 1004 ) {
			// 	window.location.href= APP + '/Login/Activate' ;
			} else{
				$('#password').passwordbox('clear') ;
				$.messager.alert('提示','用户名、密码不匹配！','info') ;
				changeCode();
			}
		}
	}) ;

	$("#username").numberbox({
		width:300,
		height:30,
		type:'text',
		prompt:'工号',
		iconCls:'icon-account',
		label : '工&emsp;&emsp;号' ,
		labelWidth : 80 ,
		required : true ,
		validType : 'length[10,10]' ,
		missingMessage : '工号非空' ,
		invalidMessage : '10位数工号' ,
	});

	$("#password").passwordbox({
		width:300,
		height:30,
		prompt:'密码',
		label : '密&emsp;&emsp;码' ,
		labelWidth : 80,
		required : true ,
		validType : 'length[8,20]' ,
		missingMessage : '密码非空' ,
		invalidMessage : '8-20位密码' ,
	});

	$("#ok").linkbutton({
		width:120,
		iconCls:'icon-ok' ,
		onClick : function(){
			$("#login-box").form('submit') ;
			changeCode() ;
		}
	});

	$("#register").linkbutton({
		width:70,
		iconCls : 'icon-register',
		plain : true ,
	});

	$("#fgtpwd").linkbutton({
		width:80,
		iconCls : 'icon-password' ,
		plain : true ,
	});

	$("#code").textbox({
		width : 200,
		height : 30,
		max : 9999 ,
		prompt : '验证码' ,
		label : '验&ensp;证&ensp;码' ,
		iconCls : 'icon-code',
		labelWidth : 80,
		required : true ,
		missingMessage : '' ,
		invalidMessage : '' ,
	}) ;

	function changeCode (){
		$("#code").textbox('clear') ;
		$("#recode").attr('src',APP + '/login/Verify/verify?temp=' + Math.random()) ;
	}

	function checkCode(code){

		var result = false ;

		$.ajax({
			url : APP + '/Login/Verify/check' ,
			method : 'post' ,
			async : false ,
			dataType : 'json' ,
			data : {code : code},

			success : function(data){
				result = data ;
			}
		}) ;
		return result ;
	}

$(function(){

	$("a").css('outline','none') ;

	$(document).on('keyup',function(e){
		if ( e.keyCode == 13 ){
			$("#login-box").form('submit') ;
		}
	}) ;
});

function resize(){

	var width = ($('body').width() - $(".panel.window").width()) / 2;
	var height = ($(window).height() - $(".panel.window").outerHeight()) / 2;

	width = width >= 0 ? width : 0;
	height = height >= 0 ? height : 25;
	
	$(".panel.window").css('position','absolute');
	$(".panel.window").css('top','0px');
	$(".panel.window").css('left','0px');

	$(".panel.window").css('margin',height + 'px ' + width + 'px') ;
}