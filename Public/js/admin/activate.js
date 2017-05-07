$("#box").dialog({
	title:'账号激活',
	iconCls:'icon-man',
	width:500,
	height:400,

	draggable:false,
	resizable:false,
	closable:false,
});

$("#username").textbox({
	width:300,
	height:30,
	type:'text',
	editable : false ,
	prompt:'工号',
	label : '工&emsp;&emsp;号',
	labelWidth : 80
});

$("#code").textbox({
	width : 190,
	height : 30,
	prompt : '激活码' ,
	label : '激&ensp;活&ensp;码' ,
	labelWidth : 80 ,
	required : true ,
	missingMessage : '' ,
}) ;

$("#recode").linkbutton({
	width : 100,
	height : 30,
	id : 'recode' ,
	plain : true ,
	onClick : function () {
		$.ajax({
			url : APP + '/Login/Activate/sendMail' ,
			method : 'post' ,
			dataType : 'json' ,
			async : false ,
			success : function (data){
				if (data){
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
							$("#text").text('发送激活码') ;
							clearInterval(fun) ;
						}
					},1000);
				} else {
					$.messager.alert('提示','验证码发送失败！','info') ;
				}
			}
		}) ;
	}
}) ;


$("#activate").linkbutton({
	width:300,
	noborder : true ,
	iconCls:'icon-ok' ,
	onClick : function(){
		$("#activate").linkbutton('disable') ;
		var code = $('#code').textbox('getValue') ;
		$.ajax({
			url : APP + '/Login/Activate/activate' ,
			method : 'post' ,
			async : false ,
			data : {code:code} ,
			dataType : 'json' ,

			success : function (data) {

				if ( data == 1001){
					window.location.href= APP + '/Login/Register' ;
				} else if ( data == 1002){
					$.messager.alert('提示','账号激活成功！','info',function(){
						window.location.href= APP + '/Login/Login' ;
					}) ;
				} else if ( data == 1003){
					$.messager.alert('提示','账号激活失败，请稍后再试！','info') ;
				} else {
					$("#activate").linkbutton('enable') ;
					$.messager.alert('提示','激活码不匹配！','info') ;
				}
			}
		});
	}
});

function resize(){

	$("#box").dialog('center') ;
};

$(function(){
	$("a").css('outline','none') ;
});