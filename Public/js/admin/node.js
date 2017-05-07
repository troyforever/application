$(function(){

	$("#content").window({
		title : '权限控制&emsp;/&emsp;节点管理',
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
		singleSelect : true ,
		fit : true,
		width:'100%' ,
		url : APP + "/RBAC/Node/data" ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '节点加载中。。。' ,
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
				field : 'id' ,
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'name' ,
				title : '节点名称' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter : function(value,row,index){
					if ( row.level == 1 )
						return "<span style='color:red'>" + value + "</span>" ;
					if ( row.level == 2 )
						return "<span style='color:blue;'>" + value + "</span>" ;
					if ( row.level == 3 )
						return "<span style='color:black;'>" + value + "</span>" ;
				} 
			},
			{
				field : 'title' ,
				title : '节点标题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'sort' ,
				title : '优先级' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 
			},
			{
				field : 'pid' ,
				title : 'pid' ,
				hidden : true ,
			},
			{
				field : 'level' ,
				title : '节点类型' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter : function(value,row,index){
					if ( value == 1 )
						return "<span style='color:red'>应用</span>" ;
					if ( value == 2 )
						return "<span style='color:blue;'>模块</span>" ;
					if ( value == 3 )
						return "<span style='color:black;'>子菜单</span>" ;
				} 
			},
			{
				field : 'remark' ,
				title : '备注' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 
				formatter : function(value,row,index){
					if ( !value )
						return "无" ;
					else
						return value ;
				}
			},
			{
				field : 'operation' ,
				title : '操作' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-edit\"' onclick='edit(" + index + ")'>编辑</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-cancel\"' onclick='remove(" + index + ")'>删除</a>" +
							"</div>" ;
				}
			}
		]] ,

		onLoadSuccess : function(data){
			$.parser.parse($(".operation")) ;
			$("#data-box").datagrid('appendRow',{}) ;
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
	});

	//添加节点信息对话框
	$("#add-form").form({
		url : APP + '/RBAC/Node/add' ,
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
			if ( result ){
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset');
				$.messager.alert('提示','导员信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','导员信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 452,
		height : 420,
		title : '添加节点信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-name").textbox({
		width : 300,
		height : 30,
		label : '节点名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '节点名称非空' ,
	});

	$("#add-title").textbox({
		width : 300,
		height : 30,
		label : '节点标题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '节点标题非空' ,
	});

	$("#add-sort").numberspinner({
		width : 300,
		height : 30,
		label : '优&ensp;先&ensp;级' ,
		min : 1,
		max : 20,
		value : 1,
		labelWidth : 70,
		required : true ,
		missingMessage : '优先级非空' ,
	});

	$("#add-level").combobox({
		width : 300,
		height : 30,
		label : '节点类型' ,
		panelHeight : 'auto',
		labelWidth : 70,
		textField : 'text',
		valueField : 'value' ,
		required : true ,
		editable : false,
		missingMessage : '节点类型非空' ,

		data : [
			{
				text : '应用',
				value : 1,
			},
			{
				text : '模块',
				value : 2,
			},
			{
				text : '子菜单',
				value : 3,
			}
		],
		value : 3,

		onChange : function(newValue, oldValue){
			$("#add-pid").combobox('enable') ;
			$("#add-pid").combobox('clear') ;
			if ( newValue == 1 ){
				$("#add-pid").combobox('disable') ;
			} else if ( newValue == 2 ) {
				$("#add-pid").combobox('reload',APP + '/RBAC/Node/getParent?pid=1');
			} else {
				$("#add-pid").combobox('reload',APP + '/RBAC/Node/getParent?pid=2');
			}
		}
	});

	$("#add-pid").combobox({
		width : 300,
		height : 30,
		label : '父&ensp;节&ensp;点' ,
		panelHeight : 'auto',
		labelWidth : 70,
		textField : 'title',
		valueField : 'id' ,
		required : true ,
		editable : false,
		missingMessage : '节点类型非空' ,
		url : APP + '/RBAC/Node/getParent' ,

		onLoadSuccess : function(){
			$("#add-pid").combobox('select',$("#add-pid").combobox('getData')[0]['id']) ;
		}
	});

	$("#add-remark").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
	});



	$("#add-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
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


	//编辑节点信息对话框
	$("#edit-box").dialog({
		width : 452,
		height : 420,
		title : '编辑节点信息',
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
			if ( result ) {
				$("#data-box").datagrid('reload') ;
				$.messager.alert('编辑提示','节点编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','节点编辑失败！','info') ;
			}
		}
	});

	$("#edit-name").textbox({
		width : 300,
		height : 30,
		label : '节点名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '节点名称非空' ,
	});

	$("#edit-title").textbox({
		width : 300,
		height : 30,
		label : '节点标题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '节点标题非空' ,
	});

	$("#edit-sort").numberspinner({
		width : 300,
		height : 30,
		label : '优&ensp;先&ensp;级' ,
		min : 1,
		max : 20,
		value : 1,
		labelWidth : 70,
		required : true ,
		missingMessage : '优先级非空' ,
	});

	$("#edit-level").combobox({
		width : 300,
		height : 30,
		label : '节点类型' ,
		panelHeight : 'auto',
		labelWidth : 70,
		textField : 'text',
		valueField : 'value' ,
		required : true ,
		editable : false,
		missingMessage : '节点类型非空' ,

		data : [
			{
				text : '应用',
				value : 1,
			},
			{
				text : '模块',
				value : 2,
			},
			{
				text : '子菜单',
				value : 3,
			}
		],
		value : 3,

		onChange : function(newValue, oldValue){
			$("#edit-pid").combobox('enable') ;
			$("#edit-pid").combobox('clear') ;
			if ( newValue == 1 ){
				$("#edit-pid").combobox('disable') ;
			} else if ( newValue == 2 ) {
				$("#edit-pid").combobox('reload',APP + '/RBAC/Node/getParent?pid=1');
			} else {
				$("#edit-pid").combobox('reload',APP + '/RBAC/Node/getParent?pid=2');
			}
		}
	});

	$("#edit-pid").combobox({
		width : 300,
		height : 30,
		label : '父&ensp;节&ensp;点' ,
		panelHeight : 'auto',
		labelWidth : 70,
		textField : 'title',
		valueField : 'id' ,
		required : true ,
		editable : false,
		missingMessage : '节点类型非空' ,
		url : APP + '/RBAC/Node/getParent' ,

		onLoadSuccess : function(){
			$("#edit-pid").combobox('select',$("#edit-pid").combobox('getData')[0]['id']) ;
		}
	});

	$("#edit-remark").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/RBAC/Node/edit' ,
			}).form('clear') ;
			$("#edit-box").dialog('close') ;
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
});

function edit(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	
	$("#edit-form").form('load',{
					'edit-id':row.id,
					'edit-name':row.name,
					'edit-title' : row.title ,
					'edit-sort' : row.sort ,
					'edit-pid' : row.pid ,
					'edit-level' : row.level ,
					'edit-remark' : row.remark ,
				});

				$("#edit-box").dialog('open') ;
}

function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
			$.messager.confirm('删除提示','您确定要删除这条节点吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/RBAC/Node/delete' ,
						method : 'post' ,
						data : {id:row.id} ,
						async : false ,
						dataType : 'json' ,

						success : function(data){
							if ( data ){
								$("#data-box").datagrid('reload') ;
								$.messager.alert('提示','删除成功！','info') ;
							} else {
								$.messager.alert('提示','删除失败！','info') ;
							}
						}
					});
					}
				}) ;
}