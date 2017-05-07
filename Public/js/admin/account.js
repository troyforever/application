$("#content").dialog({
	border : false ,
	noheader : true ,
	shadow : false ,
});

$("#account-box").form({
	url : APP + '/Account/Account/accountDo' ,
	
	onSubmit : function(){
		if ( $("#phone").textbox('isValid') && $("#email").textbox('isValid') ){
			return true ;
		} else {
			$.messager.alert('提示','请输入有效信息！','warning') ;
			return false ;
		}
	},

	success : function(data){
		if ( data ){
			$.messager.alert('提示','账户信息更新成功！','info') ;
		} else {
			$.messager.alert('提示','账户信息更新失败！','info') ;
		}
	}
}) ;


$("#uid").textbox({
	height : 30,
	editable : false ,
	readonly : true ,
	iconCls : 'icon-account' ,
	label : '帐&emsp;&emsp;号' ,
	labelWidth : 80,
});

$("#phone").textbox({
	height : 30,
	label : '联系方式' ,
	iconCls : 'icon-phone' ,
	labelWidth : 80,
	required : true,
	validType : 'length[11,11]' ,
	missingMessage : '联系方式非空' ,
	invalidMessage : '无效联系方式' ,
});

$("#email").textbox({
	height : 30,
	label : '邮&emsp;&emsp;箱' ,
	iconCls : 'icon-email' ,
	labelWidth : 80,
	required : true,
	validType : 'email' ,
	missingMessage : '邮箱非空' ,
	invalidMessage : '邮箱无效' ,
});


$("#state").textbox({
	height : 30,
	label : '账户状态' ,
	labelWidth : 80,
	iconCls : 'icon-state' ,
	readonly : true ,
	value : '正常' ,
});

$("#time").textbox({
	height : 30,
	label : '注册时间' ,
	labelWidth : 80,
	readonly : true ,
	iconCls : 'icon-date' ,
});
 
$("#submit").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-ok' ,

	onClick : function(){
		$("#account-box").form('submit') ;
	}

}) ;

$("#cancel").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-reload' ,

	onClick : function(){
		window.location.reload();
	}
}) ;

function resize() {
	$("#content").dialog('center');
}

$(function(){
	$("#check-box").dialog('center') ;
	$(".icon-edit").attr('title','点击编辑邮箱') ;
	$(".icon-edit").on('click',function(){
		// alert('gg') ;
	})
});