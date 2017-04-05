$(function(){

	$("#content").window({
		title : '个人经历&emsp;/&emsp;职称评选',
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
			if ( $("#data-box").datagrid('getRows').length >= 4 ){
				$.messager.alert('提示','最多四条职称经历！','info') ;
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
				$.messager.alert('提示','请先选中待编辑职称经历！','info') ;
			} else {

				$("#edit-form").form('load',{
					'edit-title' : selected.title ,
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
				$.messager.alert('提示','请先选中待删除职称经历！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条职称经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Title/delete' ,
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
		url : APP + "/Experience/Title/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'from_time' ,
		loadMsg : '职称经历加载中。。。' ,
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
				field : 'title' ,
				title : '职称' ,
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

	//添加职称信息对话框

	$("#add-form").form({
		url : APP + '/Experience/Title/add' ,
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
				$.messager.alert('提示','职称信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','职称信息更新失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 400,
		height : 280,
		title : '添加职称信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-title").combobox({
		width : 260,
		height : 30,
		label : '职&emsp;&emsp;称' ,
		labelWidth : 70,
		editable : false ,
		textField : 'label' ,
		valueField : 'value' ,
		panelHeight : 90,
		data : [
			{
				label : '助教',
				value : '助教'
			},
			{
				label : '讲师',
				value : '讲师'
			},
			{
				label : '副教授',
				value : '副教授'
			},
			{
				label : '教授',
				value : '教授'
			}
		],
	});

	$("#add-from").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '开始日期' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
	});

	$("#add-to").datebox({
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


	//编辑职称信息对话框
	$("#edit-box").dialog({
		width : 400,
		height : 280,
		title : '编辑职称信息',
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
				$.messager.alert('编辑提示','职称经历编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','职称经历编辑失败！','info') ;
			}
		}
	});

	$("#edit-title").combobox({
		width : 260,
		height : 30,
		label : '职&emsp;&emsp;称' ,
		labelWidth : 70,
		editable : false ,
		textField : 'label' ,
		valueField : 'value' ,
		panelHeight : 90,
		data : [
			{
				label : '助教',
				value : '助教'
			},
			{
				label : '讲师',
				value : '讲师'
			},
			{
				label : '副教授',
				value : '副教授'
			},
			{
				label : '教授',
				value : '教授'
			}
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
			$("#edit-form").form('submit',{
				url : APP + '/Experience/Title/edit?id=' + $("#data-box").datagrid('getSelected').id ,
			}).form('clear') ;
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