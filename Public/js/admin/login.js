function changeCode (){
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
			$("#ok").click();
		}
	}) ;

	$("#ok").click(function(){
		var code = $("#code").val().trim();
		var username = $("#username").val().trim();
		var password = $("#password").val().trim();

		if ( code != '' && username != '' && password != '' ){
			if ( checkCode(code) ){
				$.ajax({
					url : APP + '/Login/Login/login' ,
					method : 'POST' ,
					data : {username:username,password:password},
					async : false ,
					dataType : 'JSON' ,

					success : function(data){
						if ( data == 1001 ){
							$.messager.alert('提示','无此用户！','info') ;
						} else if ( data == 1002 ){
							window.location.href= APP ;
						} else if ( data == 1003 ) {
							$.messager.alert('提示','无后台管理权限','info') ;
						} else{
							$.messager.alert('提示','用户名、密码不匹配！','info') ;
						}
					},

					complete : function(){
						$("#code").val('') ;
						changeCode();
					}
				}) ;
			} else {
				$.messager.alert('登录提示','验证码错误!','info') ;
				$("#code").val('') ;
				changeCode();
			}
		} else {
			$.messager.alert('登录提示','请输入完整信息!','info') ;
		}
	});
});