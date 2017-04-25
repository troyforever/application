$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入不一致'   
    },
});

$("#register-box").form({}) ;

$("#box").dialog({
	title:'注册',
	iconCls:'icon-register',
	width:500,
	height:450,

	draggable:false,
	resizable:false,
	closable:false,
});

$("#username").numberbox({
	width:300,
	height:30,
	type:'text',
	prompt:'工号',
	label : '工&emsp;&emsp;号',
	iconCls : 'icon-account',
	labelWidth : 80,
	required : true ,
	validType : 'length[10,10]' ,
	missingMessage : '工号非空' ,
	invalidMessage : '10位数字工号' ,
});

$("#phone").numberbox({
	width:300,
	height:30,
	type:'text',
	prompt:'联系方式',
	label : '联系方式',
	iconCls : 'icon-phone',
	labelWidth : 80,
	required : true ,
	validType : 'length[11,11]' ,
	missingMessage : '联系方式非空' ,
	invalidMessage : '11位手机号' ,
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
	invalidMessage : '请输入合法邮箱' ,
});

$("#pwd").passwordbox({
	width:300,
	height:30,
	prompt:'密码',
	label : '密&emsp;&emsp;码',
	labelWidth : 80,
	required : true ,
	validType : 'length[8,80]' ,
	missingMessage : '密码非空' ,
	invalidMessage : '8-20位密码' ,
});

$("#repwd").passwordbox({
	width:300,
	height:30,
	prompt:'确认密码',
	label : '确认密码',
	labelWidth : 80,
	required : true ,
	validType : "equals['#pwd']" ,
	missingMessage : '密码非空' ,
	invalidMessage : '两次输入不一致' ,
});

$("#register").linkbutton({
	width:150,
	iconCls:'icon-ok' ,

	onClick : function () {
		$("#register-box").form('submit',{

			url :  APP + '/Login/Register/register' ,

			onSubmit : function (){
				if ( $("#username").numberbox('isValid') && $("#phone").numberbox("isValid") && $("#email").textbox('isValid') && $("#pwd").passwordbox('isValid')
					&& $("#repwd").passwordbox('isValid') && $("#code").textbox('isValid') ){
					if ( checkCode($("#code").val()) ){
						changeCode() ;
						return true ;
					} else {
						$.messager.alert('提示', '验证码不正确！', 'info') ;
						changeCode() ;
						$("#code").next('span').find('input').focus() ;
						return false ;
					} 
				} else {
					$.messager.alert('提示', '请输入完整信息！', 'info') ;
					changeCode() ;
					return false ;
				}
			} ,

			success : function(data){
				if ( data == 1001 ){
					$.messager.alert('提示', '用户名已存在，注册失败！', 'info') ;
				}else if ( data == 1002){
					$.messager.alert('提示', '手机号已被注册，请重新填写！', 'info') ;
				}else if ( data == 1003 ) {
					$.messager.alert('提示', '邮箱已被注册，请重新填写！', 'info') ;
				}else if ( data == 1000 ){
					$.messager.alert('提示', '恭喜您，注册成功，点击确定跳转至登录页面', 'info',function(){
						window.opener.location.reload();
						window.close();
						// window.location.href= APP + '/Login/login' ;
					}) ;
				}else{
					$.messager.alert('提示', '注册失败！', 'info') ;
				}

			} ,
		});
	}
});

$("#login").linkbutton({
	width:100,
	iconCls : 'icon-login' ,
	plain : true ,
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
	invalidMessage : '' ,
}) ;

$(function(){
	$("#password").val('密码') ;
	$("a").css('outline','none') ;
});

function resize(){

	$("#box").dialog('center') ;
}

function changeCode (){
	$("#code").textbox('clear') ;
	$("#recode").attr('src',APP + '/login/Verify/verify?temp=' + Math.random() ) ;
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