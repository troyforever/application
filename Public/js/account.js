$("#content").dialog({
	border : false ,
	noheader : true ,
	shadow : false ,
});

$("#uid").textbox({
	height : 30,
	editable : false ,
	readonly : true ,
	label : '工&emsp;&emsp;号' ,
	labelWidth : 80,
});

$("#phone").textbox({
	height : 30,
	label : '联系方式' ,
	labelWidth : 80,
});

$("#email").textbox({
	height : 30,
	label : '邮&emsp;&emsp;箱' ,
	iconCls : 'icon-edit' ,
	labelWidth : 80,
	editable : false ,
});


$("#state").textbox({
	height : 30,
	label : '账户状态' ,
	labelWidth : 80,
	iconCls : 'icon-ok' ,
	readonly : true ,
	value : '正常' ,
});

$("#time").textbox({
	height : 30,
	label : '注册时间' ,
	labelWidth : 80,
	readonly : true ,
});
 
$("#submit").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-ok' ,
}) ;

$("#cancel").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-reload' ,
}) ;

function resize() {
	$("#content").dialog('center');
}

$(function(){
	$(".icon-edit").attr('title','点击编辑邮箱') ;
	$(".icon-edit").on('click',function(){

	})
});