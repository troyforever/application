$("#box").dialog({
	title:'找回密码',
	iconCls:'icon-password',
	width:500,
	height:270,

	draggable:false,
	resizable:false,
	closable:false,
});

$("#email").textbox({
	width:300,
	height:30,
	type:'text',
	prompt:'邮箱',
	label : '邮&emsp;&emsp;箱',
	iconCls : 'icon-email',
	labelWidth : 80,
	required : true ,
	validType : 'email' ,
	missingMessage : '邮箱非空' ,
	invalidMessage : '邮箱格式不正确' ,
});


$("#setpwd").linkbutton({
	width:300,
	iconCls:'icon-ok' ,

	onClick : function(){
		if ( $("#email").textbox('isValid') && $("#code").textbox('isValid') && checkMail() ){
			var code = $("#code").textbox('getValue') ;
			var email = $("#email").textbox('getValue') ;
			$.ajax({
				url : APP + '/Login/Password/verify' ,
				method : 'post' ,
				data : {code:code,email:email} ,
				dataType : 'json' ,
				async : false ,

				success : function (data){
					if ( data ){
						window.location.href= APP + '/Login/Password/setpwd' ;
					} else {
						$.messager.alert('提示','验证失败！','info') ;
					}
				}
			});
		} else {
			$.messager.alert('提示','请输入完整信息','info') ;
		}
	}
});

$("#code").textbox({
	width : 190,
	height : 30,
	max : 9999 ,
	prompt : '验证码' ,
	label : '验&ensp;证&ensp;码' ,
	iconCls : 'icon-code',
	labelWidth : 80 ,
	required : true ,
	missingMessage : '' ,
}) ;

$("#recode").linkbutton({
	width : 100,
	height : 30,
	plain : true ,

	onClick : function(){

		if ( $("#email").textbox('isValid') ){
			if ( checkMail() ){
				var email = $("#email").textbox('getValue') ;
				$.ajax({
					url : APP + '/Login/Password/sendMail' ,
					method : 'post' ,
					dataType : 'json' ,
					data : {email:email} ,
					async : false ,

					beforeSend : function(){
						$("#recode").linkbutton('disable') ;
							var time = 60 ;
							var fun = setInterval(function(){
								if ( time > 0 ){
									time -- ;
									$("#num").text(time) ;
									$("#text").text('s 重新发送') ;
								} else {
									$("#recode").linkbutton('enable') ;
									$("#num").text('') ;
									$("#text").text('发送验证码') ;
									clearInterval(fun) ;
								}
							},1000);
					},

					success : function (data){
						if (data){
							
						} else {
							$.messager.alert('提示','验证码发送失败！','info') ;
						}
					}
				}) ;
			} else {
				$.messager.alert('提示','该邮箱尚未被注册','info') ;
			}

		} else {
			$.messager.alert('提示','请输入正确格式邮箱！','info') ;
		}
	}
}) ;

$(function(){
	$("#password").val('密码') ;
	$("a").css('outline','none') ;
});

function resize(){

	$("#box").dialog('center') ;
}

function checkMail(){
	var result = false ;
	var email = $("#email").textbox('getValue') ;
	$.ajax({
		url : APP + '/Login/Password/checkMail' ,
		method : 'post' ,
		data : {email:email} ,
		dataType : 'json' ,
		async : false ,
		success : function (data){
			result = data ;
		}
	}) ;
	return result ;
}