$(function(){

	$("#content").window({
		title : '个人经历&emsp;/&emsp;工作经历',
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

	$("#tools-edit").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-edit' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待编辑工作经历！','info') ;
			} else {

				$("#edit-form").form('load',{
					'edit-unit' : selected.unit ,
					'edit-job' : selected.job ,
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
				$.messager.alert('提示','请先选中待删除工作经历！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条工作经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Work/delete' ,
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
		url : APP + "/Experience/Work/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'from_time' ,
		loadMsg : '工作经历加载中。。。' ,
		sortOrder : 'asc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		pagination : true ,
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
				field : 'unit' ,
				title : '工作单位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'job' ,
				title : '职位' ,
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
		url : APP + '/Experience/Work/add' ,
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
				$("#add-unit").textbox('clear');
				$("#add-job").textbox('clear');
				$.messager.alert('提示','工作信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','工作信息更新失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 400,
		height : 330,
		title : '添加工作经历信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-unit").textbox({
		width : 260,
		height : 30,
		label : '工作单位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '工作单位非空' ,
	});

	$("#add-job").textbox({
		width : 260,
		height : 30,
		label : '职&emsp;&emsp;位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '职位非空' ,
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
			$("#add-unit").textbox('clear') ;
			$("#add-job").textbox('clear') ;
			$("#add-box").dialog('close') ;
		}
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 400,
		height : 330,
		title : '编辑经过经历信息',
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
				$.messager.alert('编辑提示','工作经历编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','工作经历编辑失败！','info') ;
			}
		}
	});

	$("#edit-unit").textbox({
		width : 260,
		height : 30,
		label : '工作单位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '工作单位非空' ,
	});

	$("#edit-job").textbox({
		width : 260,
		height : 30,
		label : '职&emsp;&emsp;位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '工作经历非空' ,
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
				url : APP + '/Experience/Work/edit?id=' + $("#data-box").datagrid('getSelected').id ,
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