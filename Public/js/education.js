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
					'edit-major' : selected.major ,
					'edit-degree' : selected.degree ,
					'edit-graduation_time' : selected.graduation_time ,
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
						dataType : 'JSON' ,

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
		sortName : 'graduation_time' ,
		loadMsg : '教育经历加载中。。。' ,
		sortOrder : 'desc' ,
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
				title : '院校' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'major' ,
				title : '专业' ,
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
				field : 'graduation_time' ,
				title : '毕业日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'file_name' ,
				title : '附件' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter : function(value,row,index){
					if ( ! value ){
						return "暂无" ;
					} else {
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Education/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#tools-edit").linkbutton('disable') ;
				$("#tools-delete").linkbutton('disable') ;
				$("#data-box").datagrid('appendRow',{
					school : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'school' ,
					colspan : 5,
				}) ;
			}
		},

		onBeforeLoad : function(){
			$("#tools-edit").linkbutton('enable') ;
			$("#tools-delete").linkbutton('enable') ;
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
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
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#school").textbox('clear') ;
				$("#major").textbox('clear') ;
				$("#file_name").filebox('clear') ;
				$.messager.alert('提示','教育信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','教育信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 400,
		height : 350,
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

	$("#major").textbox({
		width : 260,
		height : 30,
		label : '专&emsp;&emsp;业' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '专业非空' ,
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
		required : true ,
		value : '本科' ,
		data : [
			{
				label : '专科',
				value : '专科'
			},
			{
				label : '本科' ,
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

	$("#graduation_time").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		panelHeight : 250,
		label : '毕业时间' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
		value : '2017-1-1' ,
	});

	$("#file_name").filebox({
		width : 260,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		buttonIcon : 'icon-search' ,
		buttonText : '附件' ,
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
		height : 350,
		title : '编辑学历信息',
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
			var result = $.parseJSON(data) ;
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
		required : true ,
		missingMessage : '就读学校非空' ,
	});

	$("#edit-major").textbox({
		width : 260,
		height : 30,
		label : '专&emsp;&emsp;业' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '专业非空' ,
	});

	$("#edit-degree").combobox({
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

	$("#edit-graduation_time").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		panelHeight : 250,
		label : '毕业时间' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
	});

	$("#edit-file_name").filebox({
		width : 260,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		buttonIcon : 'icon-search' ,
		buttonText : '附件' ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/Experience/Education/edit?id=' + $("#data-box").datagrid('getSelected').id ,
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