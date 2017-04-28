$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入不一致'   
    },
});

$('#setpwd-box').form({
	url : APP + '/Login/Password/setpwdDo' ,

	onSubmit : function(){
		if ( $("#pwd").passwordbox('isValid') && $("#repwd").passwordbox('isValid') && $("#pwd").passwordbox('getValue') == $("#repwd").passwordbox('getValue') ){
			return true ;
		} else {
			$.messager.alert('提示','请输入有效信息!','info') ;
			return false ;
		}
	} ,

	success : function(data){
		console.log(data) ;
		if ( data ){
			$.messager.alert('提示','密码更新成功!','info',function(){
				window.close() ;
			}) ;
		} else {
			$.messager.alert('提示','密码更新失败','info') ;
		}
	}
}) ;

$("#box").dialog({
	title:'重置密码',
	iconCls:'icon-man',
	width:500,
	height:300,

	shadow : false,
	draggable:false,
	resizable:false,
	closable:false,
});

$("#pwd").passwordbox({
	width:300,
	height:30,
	prompt:'密码',
	label : '密&emsp;&emsp;码',
	labelWidth : 80,
	required : true ,
	validType : 'length[8,20]' ,
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
	invalidMessage : '两次密码输入不一致' ,
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