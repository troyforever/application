$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入不一致'   
    },
});

$(function(){
	$("#content").window({
		title : '教师管理&emsp;/&emsp;教师信息',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

	$("#search-tid").textbox({
		width : 150,
		height : 30,
		label : '工号' ,
		labelWidth : 30,
	});

	$("#search-name").textbox({
		width : 150,
		height : 30,
		label : '姓名' ,
		labelWidth : 30,
	});

	$("#search-unit").combobox({
		width : 150,
		height : 30,
		label : '部门' ,
		labelWidth : 30,
		url : APP + '/Home/Base/unit' ,
		valueField : 'id' ,
		textField : 'name' ,
		panelWidth : 190,
		panelHeight : 'auto',
		editable : false ,
	});

	$("#search-ok").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'tid' : $("#search-tid").textbox('getValue').trim(),
				'name' : $("#search-name").textbox('getValue').trim(),
				'unit' : $("#search-unit").combobox('getValue')
			}) ;
		}
	});

	$("#search-clear").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		label : '清空' ,
		iconCls : 'icon-clear' ,
		onClick : function(){
			$("#search-tid").textbox('clear') ;
			$("#search-name").textbox('clear') ;
			$("#search-unit").combobox('clear') ;
			$("#data-box").datagrid('load',{}) ;
		}
	});

	$("#tools-reload").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			$("#data-box").datagrid('reload') ;
		}
	});

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		fit : true,
		width:'100%' ,
		url : APP + "/Teacher/teacher/data" ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '用户加载中。。。' ,
		remoteSort : true ,
		method : 'POST' ,
		pageSize : 5,
		pageList : [5],
		columns : [[
			{
				field : 'ck' ,
				checkbox : 'true' ,
			},
			{
				field : 'tid' ,
				title : '工号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'name' ,
				title : '姓名' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			{
				field : 'gender' ,
				title : '性别' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						if ( value == 1 ){
							return "男" ;
						} else {
							return "女" ;
						}
					} else {
						return '-' ;
					}
				}
			},
			// {
			// 	field : 'birth' ,
			// 	title : '生日' ,
			// 	width : 100 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			// {
			// 	field : 'nation' ,
			// 	title : '民族' ,
			// 	width : 50 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			// {
			// 	field : 'outlook' ,
			// 	title : '政治面貌' ,
			// 	width : 70 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			
			{
				field : 'email' ,
				title : '邮箱' ,
				width : 150 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'phone' ,
				title : '联系方式' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit_name' ,
				title : '部门' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			{
				field : 'department_name' ,
				title : '科室(系)' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			{
				field : 'roles' ,
				title : '角色' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter : function(value,row,index){
					if ( value ){
						var str = '' ;
						for ( var i = 0 ; i < value.length ; i ++ ){
							str += value[i].name + ',' ;
						}

						return str.substr(0,str.length - 1 ) ;
					}
				}
			},
			{
				field : 'add_time' ,
				title : '注册时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 
			},
			{
				field : 'operation' ,
				title : '操作' ,
				width : 150 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-role\"' onclick='setrole(\"" + row.tid + "\")'>角色</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-password\"' onclick='setpwd(" + row.tid + ")'>重置</a>" +
							"</div>" ;
				}
			}
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#data-box").datagrid('appendRow',{
					tid : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'tid' ,
					colspan : 10,
				}) ;
				$(".pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".pagination").show();
			}
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
	});

	//修改密码对话框
	$("#pwd-form").form({
		url : APP + '/Teacher/Teacher/password' ,
		onSubmit : function(){

			if ( $("#pwd-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;

			if ( result ){
				$.messager.alert('提示','密码重置成功！','info') ;
				$("#pwd-box").dialog('close') ;
				$("#pwd-form").form('clear');
			} else {
				$.messager.alert('提示','密码重置失败！','info') ;
			}
		}
	});

	$("#pwd-box").dialog({
		width : 452,
		height : 230,
		title : '重置密码',
		iconCls : 'icon-password' ,
		modal : true ,
		closed : true ,
	});

	$("#pwd-password").passwordbox({
	width:300,
	height:30,
	prompt:'密码',
	label : '密&emsp;&emsp;码',
	labelWidth : 70,
	required : true ,
	validType : 'length[8,20]' ,
	missingMessage : '密码非空' ,
	invalidMessage : '8-20位密码' ,
});

$("#pwd-repassword").passwordbox({
	width:300,
	height:30,
	prompt:'确认密码',
	label : '确认密码',
	labelWidth : 70,
	required : true ,
	validType : "equals['#pwd-password']" ,
	missingMessage : '密码非空' ,
	invalidMessage : '两次密码输入不一致' ,
});



	$("#pwd-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#pwd-form").form('submit') ;
		}
	});

	$("#pwd-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#pwd-form").form('reset') ;
			$("#pwd-box").dialog('close') ;
		}
	});

	//配置角色

	$("#role-form").form({
		url : APP + '/Teacher/Teacher/role' ,
		onSubmit : function(){

			if ( $("#role-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;

			if ( result ){
				$.messager.alert('提示','角色配置成功！','info') ;
				$("#data-box").datagrid('reload') ;
				$("#role-box").dialog('close') ;
				$("#role-form").form('clear');
			} else {
				$.messager.alert('提示','角色配置失败！','info') ;
			}
		}
	});

	$("#role-box").dialog({
		width : 452,
		height : 200,
		title : '配置角色',
		iconCls : 'icon-role' ,
		modal : true ,
		closed : true ,
	});

	$("#role").combobox({
		width : 300,
		height : 30,
		label : '授权角色' ,
		panelHeight:'auto',
		multiple : true,
		multivalue : true,
		labelWidth : 70,
		textField : 'name',
		valueField : 'id' ,
		url : APP + '/RBAC/Role/getAll' ,
		required : true ,
		editable : false,
		missingMessage : '角色非空' ,

	});

	$("#role-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){

			var roles = $("#role").combobox('getValues') ;

			var str = '' ;

			for ( var i = 0 ; i < roles.length ; i ++ ){
				str += roles[i] + ',' ;
			}

			$("#role-form").form('load',{'role-roles':str.substr(0,str.length-1)}) ;
			$("#role-form").form('submit') ;
		}
	});

	$("#role-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#role-form").form('reset') ;
			$("#role-box").dialog('close') ;
		}
	});
});

function setpwd(tid){

	$("#pwd-form").form('load',{'id':tid}) ;

	$("#pwd-box").dialog('open') ;
}

function setrole(tid){

	$("#role-form").form('reset') ;

	var roles = new Array() ;

	$.ajax({
		url : APP + '/Teacher/Teacher/getRoles' ,
		method : 'POST' ,
		data : {id:tid} ,
		dataType : 'JSON' ,
		async : false,

		success : function(data){
			for ( var i = 0 ; i < data.length ; i ++ ){
				roles[i] = data[i].role_id ;
			}
		}
	}) ;


	$("#role-form").form('load',{'id':tid}) ;

	$("#role").combobox('setValues',roles) ;

	$("#role-box").dialog('open') ;
}