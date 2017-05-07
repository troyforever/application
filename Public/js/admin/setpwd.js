// $('#setpwd-box').form({
// 	url : APP + '/Login/Password/setpwdDo' ,

// 	onSubmit : function(){
// 		if ( $("#pwd").passwordbox('isValid') && $("#repwd").passwordbox('isValid') && $("#pwd").passwordbox('getValue') == $("#repwd").passwordbox('getValue') ){
// 			return true ;
// 		} else {
// 			$.messager.alert('提示','请输入有效信息!','info') ;
// 			return false ;
// 		}
// 	} ,

// 	success : function(data){
// 		console.log(data) ;
// 		if ( data ){
// 			$.messager.alert('提示','密码更新成功!','info',function(){
// 				window.close() ;
// 			}) ;
// 		} else {
// 			$.messager.alert('提示','密码更新失败','info') ;
// 		}
// 	}
// }) ;
$("#ok").click(function(){
	var pwd = $("#pwd").val().trim();
	var repwd = $("#repwd").val().trim() ;

	if ( pwd != '' && repwd != '' ){
		if ( pwd != repwd)
			$.messager.alert('提示','两次密码不一致!','info') ;
		else {
			$.ajax({
				url : APP + '/Login/Password/setpwdDo' ,
				data : {pwd:pwd,repwd:repwd},
				method : 'POST',
				dataType : 'JSON' ,
				async : false,

				success : function(data){
					if ( data ){
						$.messager.alert('提示','密码更新成功!','info',function(){
								window.location.href= APP + '/Login/Login' ;
							}) ;
						} else {
							$.messager.alert('提示','密码更新失败','info') ;
						}
				}
			});
		}
	} else {
		$.messager.alert('提示','请输入完整信息!','info') ;
	}
});

$("#setpwd").linkbutton({
	width:300,
	iconCls:'icon-ok' ,
	onClick : function() {
		$("#setpwd-box").form('submit') ;
	}
});

$(function(){
	$("#password").val('密码') ;
	$("a").css('outline','none') ;
});
