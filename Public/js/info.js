$("#info-box").form({
	url : APP + '/Home/Account/infoDo' ,
	onSubmit : function(){
		if ( ! $("#name").textbox('isValid') ){
			$.messager.alert('提示','请输入完整信息!','warning') ;
			return false ;
		}
	},

	success : function(data){
		if(data) {
			$.messager.alert('提示','个人信息更新成功！','info') ;
		} else {
			$.messager.alert('提示','个人信息更新失败！','info') ;
		}
	}
});

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

$("#name").textbox({
	height : 30,
	label : '姓&emsp;&emsp;名' ,
	labelWidth : 80,
	required : true ,
	validType : 'length[1,5]' ,
	missingMessage : '姓名非空' ,
	invalidMessage : '无效姓名输入' ,
});

$("#gender").combobox({
	height : 30,
	label : '性&emsp;&emsp;别' ,
	labelWidth : 80,
	panelHeight : 50,
	editable : false ,
});

$("#birth").datebox({
	height : 30,
	label : '出生日期' ,
	labelWidth : 80,
	editable : false ,
	currentText : '今天' ,
	closeText : '关闭' ,
	panelWidth : 210 ,
});

$("#nation").combobox({
	height : 30,
	url : PUBLIC + '/js/nation.json' ,
	label : '民&emsp;&emsp;族' ,
	labelWidth : 80,
	panelHeight : 150,
	editable : false ,
}) ;

$("#outlook").combobox({
	height : 30,
	url : PUBLIC + '/js/outlook.json' ,
	label : '政治面貌' ,
	labelWidth : 80,
	panelHeight : 120,
	editable : false ,
}) ;

$("#unit").combobox({
	height : 30,
	url : APP + '/Home/Base/unit' ,
	valueField : 'id' ,
	textField : 'name' ,
	label : '单&emsp;&emsp;位' ,
	labelWidth : 80,
	panelHeight : 150,
	editable : false ,

	onLoadSuccess : function () {
		var unitId = $("#unit").combobox('getValue') ;
	} ,

	onChange : function() {
		var unitId = $("#unit").combobox('getValue') ;
		flag = false ;
		$("#department").combobox('reload',APP + '/Home/Base/department?unitId=' + unitId) ;
	} ,
}) ;


$("#department").combobox({
	height : 30,
	url : APP + '/Home/Base/department?unitId=' + $("#unit").combobox('getValue') ,
	valueField : 'id' ,
	textField : 'name' ,
	label : '部&emsp;&emsp;门' ,
	labelWidth : 80,
	panelHeight : 150,
	editable : false ,

	onLoadSuccess : function(){
		if ( ! flag ){
			$("#department").combobox('select',$("#department").combobox('getData')[0].id) ;
		} else {
			$("#department").combobox('select',init) ;
		}
	}
}) ;

$("#state").textbox({
	height : 30,
	label : '账户状态' ,
	labelWidth : 80,
	iconCls : 'icon-ok' ,
	readonly : true ,
	value : '正常' ,
});

$("#submit").linkbutton({
	width : 140,
	height : 30 ,
	iconCls : 'icon-ok' ,

	onClick : function(){
		$("#info-box").form('submit') ;
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