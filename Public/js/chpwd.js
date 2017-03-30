$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入不一致'   
    },
});

$("#content").dialog({
	noheader : true ,
	border : false ,
	shadow : false ,
}) ;

$("#pwd").passwordbox({
	height : 30 ,
	label : '旧&ensp;密&ensp;码' ,
	labelWidth : 80 ,
	required : true ,
	validType : 'length[8,20]' ,
	missingMessage : '密码不能为空' ,
	invalidMessage : '密码长度8-20位' ,

}) ;

$("#newpwd").passwordbox({
	height : 30 ,
	label : '新&ensp;密&ensp;码' ,
	labelWidth : 80 ,
	required : true ,
	validType : 'length[8,20]' ,
	missingMessage : '密码不能为空' ,
	invalidMessage : '密码长度8-20位' ,
}) ;

$("#repwd").passwordbox({
	height : 30 ,
	label : '确认密码' ,
	labelWidth : 80 ,
	required : true ,
	validType : 'equals["#newpwd"]' ,
	missingMessage : '密码不能为空' ,
	invalidMessage : '两次输入不一致' ,
}) ;

$("#submit").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-ok' ,

	onClick : function(){
		if ( $("#pwd").passwordbox('isValid') && $("#newpwd").passwordbox('isValid') 
			&& $("#repwd").passwordbox('isValid') ){

			var pwd = $("#pwd").passwordbox('getValue') ;
			var newpwd = $("#newpwd").passwordbox('getValue') ;
			var repwd = $("#repwd").passwordbox('getValue') ;
			$.ajax({
				url : APP + '/Home/Account/chpwdDo' ,
				type : 'POST' ,
				async : false ,
				dataType : 'json' ,
				data : {pwd:pwd, newpwd:newpwd, repwd:repwd} ,

				beforeSend : function(){
					$("#submit").linkbutton('disable') ;
				} ,

				success : function(data){
					if ( data == 1001 ){
						$.messager.alert('提示','密码更新成功','info') ;
					} else if ( data == 1002 ){
						$.messager.alert('提示','密码更新失败','info') ;
					} else if ( data == 1003 ) {
						$.messager.alert('提示','原密码不匹配','info') ;
					} else {
						$.messager.alert('提示','未知错误','info') ;
					}
				} ,
				complete : function () {
					$("#pwd").passwordbox('clear') ;
					$("#newpwd").passwordbox('clear') ;
					$("#repwd").passwordbox('clear') ;
					$("#submit").linkbutton('enable') ;
				}
			}) ;
		} else {
			$.messager.alert('提示','请输入有效信息!','info') ;
		}
	}
}) ;

$("#cancel").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-cancel' ,
	
	onClick : function() {
		$("#pwd").passwordbox('clear') ;
		$("#newpwd").passwordbox('clear') ;
		$("#repwd").passwordbox('clear') ;
	} ,
}) ;

function resize(){
	$("#content").dialog("center") ;
}