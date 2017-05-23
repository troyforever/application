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
		title : '权限控制&emsp;/&emsp;用户管理',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

	//tools
	$("#tools-add").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-add' ,

		onClick : function(){
			$("#add-box").dialog('open') ;
		}
	});

	$("#tools-reload").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			$("#data-box").datagrid('reload') ;
		}
	});

	$("#data-box").datagrid({
		fitColumns : true ,
		fit : true,
		singleSelect : true ,
		fit : true,
		width:'100%' ,
		url : APP + "/RBAC/Users/data1" ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '用户加载中。。。' ,
		remoteSort : true ,
		method : 'POST' ,
		// pageSize : 5,
		// pageList : [5],
		columns : [[
			// {
			// 	field : 'ck' ,
			// 	checkbox : 'true' ,
			// },
			{
				field : 'tid' ,
				title : '账号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'roles' ,
				title : '角色' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter : function(value,row,index){
					if ( value.length == 0 ){
						return "无" ;
					} else {
						var str = '' ;
						for ( var i = 0 ; i < value.length ; i ++ ){
							str += value[i].name + ',' ;
						}

						return str.substr(0,str.length - 1 ) ;
					}
				}
			},
			{
				field : 'email' ,
				title : '邮箱' ,
				width : 100 ,
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
				field : 'state' ,
				title : '状态' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 

				formatter(value,row,index){
					if ( value == 1 ){
						return "正常" ;
					} else {
						return '异常' ;
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
							"<a class='easyui-linkbutton' data-options='width:80,plain:true,iconCls:\"icon-role\"' onclick='setrole(\"" + row.tid + "\")'>配置角色</a>" +
							"<a class='easyui-linkbutton' data-options='width:80,plain:true,iconCls:\"icon-edit\"' onclick='edit(" + index + ")'>编辑</a>" +
							"<a class='easyui-linkbutton' data-options='width:80,plain:true,iconCls:\"icon-password\"' onclick='setpwd(" + row.tid + ")'>重置密码</a>" +
							"</div>" ;
				}
			}
		]] ,

		onLoadSuccess : function(data){
			$.parser.parse($(".operation")) ;
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
	});

	//添加用户信息对话框
	$("#add-form").form({
		url : APP + '/RBAC/Users/add' ,
		onSubmit : function(){

			if ( $("#add-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;
			if ( result == 1001 ){
				$.messager.alert('提示','该账号已被注册！','info') ;
			} else if ( result == 1002 ){
				$.messager.alert('提示','该邮箱已被注册！','info') ;
			} else if ( result == 1003 ){
				$.messager.alert('提示','该联系方式已被注册！','info') ;
			} else if ( result ) {
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset');
				$.messager.alert('提示','账号注册成功！','info') ;
			} else {
				$.messager.alert('提示','账号注册失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 452,
		height : 400,
		title : '添加用户信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-tid").textbox({
		width : 300,
		height : 30,
		label : '用户账户' ,
		labelWidth : 70,
		iconCls : 'icon-account',
		required : true ,
		missingMessage : '用户账户非空' ,
	});


	$("#add-email").textbox({
		width : 300,
		height : 30,
		label : '邮&emsp;&emsp;箱' ,
		iconCls : 'icon-email' ,
		labelWidth : 70,
		required : true,
		validType : 'email' ,
		missingMessage : '邮箱非空' ,
		invalidMessage : '邮箱无效' ,
	});

	$("#add-phone").textbox({
		width : 300,
		height : 30,
		label : '联系方式' ,
		iconCls : 'icon-phone' ,
		labelWidth : 70,
		required : true,
		validType : 'length[11,11]' ,
		missingMessage : '联系方式非空' ,
		invalidMessage : '无效联系方式' ,
	});

	$("#add-role").combobox({
		width : 300,
		height : 30,
		label : '授权角色' ,
		panelHeight:'auto',
		// multiple : true,
		// multivalue : true,
		labelWidth : 70,
		textField : 'name',
		valueField : 'id' ,
		url : APP + '/RBAC/Role/getAll' ,
		required : true ,
		editable : false,

	});

	$("#add-password").passwordbox({
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

$("#add-repassword").passwordbox({
	width:300,
	height:30,
	prompt:'确认密码',
	label : '确认密码',
	labelWidth : 70,
	required : true ,
	validType : "equals['#add-password']" ,
	missingMessage : '密码非空' ,
	invalidMessage : '两次密码输入不一致' ,
});



	$("#add-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			var roles = $("#add-role").combobox('getValues') ;

			var str = '' ;

			for ( var i = 0 ; i < roles.length ; i ++ ){
				str += roles[i] + ',' ;
			}

			$("#add-form").form('load',{'roles':str.substr(0,str.length-1)}) ;
			$("#add-form").form('submit') ;
		}
	});

	$("#add-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#add-form").form('reset') ;
			$("#add-box").dialog('close') ;
		}
	});


	//编辑用户信息对话框
	$("#edit-box").dialog({
		width : 452,
		height : 260,
		title : '编辑用户信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		onSubmit : function(){
			if ( $("#edit-form").form('validate') ){
				return true ;
			} else {
				$.messager.alert('编辑提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = eval('(' + data + ')') ;

			if ( result == 1001 ) {
				$.messager.alert('编辑提示','该邮箱已被注册！','info') ;
			} else if ( result == 1002 ) {
				$.messager.alert('编辑提示','该联系方式已被注册！','info') ;
			} else if ( result ){
				$.messager.alert('编辑提示','编辑成功！','info') ;
				$("#data-box").datagrid('reload') ;
				$("#edit-box").dialog('close') ;
			} else {
				$.messager.alert('编辑提示','编辑失败！','info') ;
			}
		}
	});

	$("#edit-tid").textbox({
		width : 300,
		height : 30,
		label : '用户账户' ,
		labelWidth : 70,
		disabled : true,
		iconCls : 'icon-account',
		required : true ,
		missingMessage : '用户账户非空' ,
	});


	$("#edit-email").textbox({
		width : 300,
		height : 30,
		label : '邮&emsp;&emsp;箱' ,
		iconCls : 'icon-email' ,
		labelWidth : 70,
		required : true,
		validType : 'email' ,
		missingMessage : '邮箱非空' ,
		invalidMessage : '邮箱无效' ,
	});

	$("#edit-phone").textbox({
		width : 300,
		height : 30,
		label : '联系方式' ,
		iconCls : 'icon-phone' ,
		labelWidth : 70,
		required : true,
		validType : 'length[11,11]' ,
		missingMessage : '联系方式非空' ,
		invalidMessage : '无效联系方式' ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/RBAC/Users/edit' ,
			}) ;
		}
	});

	$("#edit-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#edit-form").form('reset') ;
			$("#edit-box").dialog('close') ;
		}
	});

	//修改密码对话框
	$("#pwd-form").form({
		url : APP + '/RBAC/Users/password' ,
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
		url : APP + '/RBAC/Users/role' ,
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
		// multiple : true,
		// multivalue : true,
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
		url : APP + '/RBAC/Users/getRoles' ,
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

function edit(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	
	$("#edit-form").form('load',{
					'id':row.tid,
					'edit-tid':row.tid,
					'edit-email' : row.email ,
					'edit-phone' : row.phone ,
				});

				$("#edit-box").dialog('open') ;
}