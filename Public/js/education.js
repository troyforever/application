$(function(){

	$("#content").window({
		title : '个人经历&emsp;/&emsp;教育经历',
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
			if ( $("#data-box").datagrid('getRows').length >= 5 ){
				$.messager.alert('提示','最多五条教育经历！','info') ;
			} else
				$("#add-box").dialog('open') ;
		}
	});

	$("#tools-edit").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-edit' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待编辑教育经历！','info') ;
			} else {

				$("#edit-form").form('load',{
					'edit-school' : selected.school ,
					'edit-degree' : selected.degree ,
					'edit-from' : selected.from_time ,
					'edit-to' : selected.to_time
				});

				$("#edit-box").dialog('open') ;
				
			}
		}
	});

	$("#tools-delete").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待删除教育经历！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条教育经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Education/delete' ,
						method : 'post' ,
						data : {id:selected.id} ,
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
		width:'100%' ,
		url : APP + "/Experience/Education/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'from_time' ,
		loadMsg : '教育经历加载中。。。' ,
		sortOrder : 'asc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
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
				field : 'school' ,
				title : '毕业院校' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'degree' ,
				title : '学位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'from_time' ,
				title : '开始日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'to_time' ,
				title : '结束日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
		]] ,
	});

	//添加学历信息对话框

	$("#add-form").form({
		url : APP + '/Experience/Education/add' ,
		onSubmit : function(){

			if ( $("#add-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			if ( data != 'false' ){
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#school").textbox('clear');
				$.messager.alert('提示','教育信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','教育信息更新失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 400,
		height : 330,
		title : '添加学历信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#school").textbox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;校' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '就读学校非空' ,
	});

	$("#degree").combobox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;历' ,
		labelWidth : 70,
		editable : false ,
		textField : 'label' ,
		valueField : 'value' ,
		panelHeight : 115,
		data : [
			{
				label : '专科',
				value : '专科'
			},
			{
				label : '本科',
				value : '本科'
			},
			{
				label : '硕士',
				value : '硕士'
			},
			{
				label : '博士',
				value : '博士'
			},
			{
				label : '其它',
				value : '其它'
			},
		],
	});

	$("#from").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '开始日期' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
	});

	$("#to").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '结束日期' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
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
			$("#school").textbox('clear') ;
			$("#add-box").dialog('close') ;
		}
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 400,
		height : 330,
		title : '编辑学历信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Experience/Education/edit?id=1' ,
		
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
				$.messager.alert('编辑提示','教育经历编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','教育经历编辑失败！','info') ;
			}
		}
	});

	$("#edit-school").textbox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;校' ,
		labelWidth : 70,
	});

	$("#edit-degree").combobox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;历' ,
		labelWidth : 70,
		textField : 'label' ,
		valueField : 'value' ,
		editable : false ,
		panelHeight : 115,
		data : [
			{
				label : '专科',
				value : '专科'
			},
			{
				label : '本科',
				value : '本科'
			},
			{
				label : '硕士',
				value : '硕士'
			},
			{
				label : '博士',
				value : '博士'
			},
			{
				label : '其它',
				value : '其它'
			},
		],
	});

	$("#edit-from").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '开始日期' ,
		labelWidth : 70,
		editable : false ,
	});

	$("#edit-to").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '结束日期' ,
		labelWidth : 70,
		editable : false ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit').form('clear') ;
			$("#edit-box").dialog('close') ;
		}
	});

	$("#edit-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#edit-form").form('clear') ;
			$("#edit-box").dialog('close') ;
		}
	});
});