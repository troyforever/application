function checkMail(){
	var result = false ;
	var email = $("#email").val().trim();
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

$("#recode").click(function(){
	var email = $("#email").val().trim();

	if ( email != '' ){
			if ( checkMail() ){
							var time = 60 ;
							var fun = setInterval(function(){
								if ( time > 0 ){
									time -- ;
									$("#recode").attr('value',time + 's 重新发送') ;
									$("#recode").attr('disabled','disabled') ;
								} else {
									$("#recode").removeAttr('disabled') ;
									$("#recode").attr('value','发送') ;
									clearInterval(fun) ;
								}
							},1000);
				
				$.ajax({
					url : APP + '/Login/Password/sendMail' ,
					method : 'post' ,
					dataType : 'json' ,
					data : {email:email} ,
					async : false ,

					success : function (data){
						if (data){

						} else {
							clearInterval(fun) ;
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
});

$("#ok").click(function(){
	var email = $("#email").val().trim();
	var code = $("#code").val().trim() ;

	if ( email != '' && code != '' && checkMail() ){

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
});

$(function(){
	$("#password").val('密码') ;
	$("a").css('outline','none') ;
});

