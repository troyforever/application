$(function(){

	$("#content").window({
		title : '个人信息&emsp;/&emsp;职称评选',
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

	// $("#tools-edit").linkbutton({
	// 	width : 150,
	// 	height : 50,
	// 	plain : true ,
	// 	iconCls : 'icon-edit' ,

	// 	onClick : function(){
	// 		var selected = $("#data-box").datagrid('getSelected') ;
	// 		if ( selected == null ){
	// 			$.messager.alert('提示','请先选中待编辑职称经历！','info') ;
	// 		} else {

	// 			$("#edit-form").form('load',{
	// 				'edit-title' : selected.title ,
	// 				'edit-from' : selected.from_time ,
	// 				'edit-to' : selected.to_time
	// 			});

	// 			$("#edit-box").dialog('open') ;
				
	// 		}
	// 	}
	// });

	// $("#tools-delete").linkbutton({
	// 	width : 150,
	// 	height : 50,
	// 	plain : true ,
	// 	iconCls : 'icon-cancel' ,

	// 	onClick : function(){
	// 		var selected = $("#data-box").datagrid('getSelected') ;
	// 		if ( selected == null ){
	// 			$.messager.alert('提示','请先选中待删除职称经历！','info') ;
	// 		} else {
	// 			$.messager.confirm('删除提示','您确定要删除这条职称经历吗？',function(r){
	// 				if ( r ){
	// 					$.ajax({
	// 					url : APP + '/Experience/Title/delete' ,
	// 					method : 'post' ,
	// 					data : {id:selected.id} ,
	// 					async : false ,
	// 					dataType : 'json' ,

	// 					success : function(data){
	// 						if ( data ){
	// 							$("#data-box").datagrid('reload') ;
	// 							$.messager.alert('提示','删除成功！','info') ;
	// 						} else {
	// 							$.messager.alert('提示','删除失败！','info') ;
	// 						}
	// 					}
	// 				});
	// 				}
	// 			}) ;
	// 		}
	// 	}
	// });

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
		sortName : 'title_time' ,
		loadMsg : '职称经历加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		columns : [[
			// {
			// 	field : 'ck' ,
			// 	checkbox : 'true' ,
			// },
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
				field : 'title_time' ,
				title : '评定时间' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Title/' + value + '\')">查看</a>'
					}
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
			if ( data.total == 0 ){
				// $("#tools-edit").linkbutton('disable') ;
				// $("#tools-delete").linkbutton('disable') ;
				$("#data-box").datagrid('appendRow',{
					title : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'title' ,
					colspan : 4,
				}) ;
			} else {
				$.parser.parse($(".operation")) ;
			}
		},

		// onBeforeLoad : function(){
		// 	$("#tools-edit").linkbutton('enable') ;
		// 	$("#tools-delete").linkbutton('enable') ;
		// },

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
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
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset') ;
				$.messager.alert('提示','职称信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','职称信息添加失败！','info') ;
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
		value : '讲师' ,
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

	$("#add-title_time").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		panelHeight : 250,
		label : '评定日期' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
		value : '2017-1-1' ,
	});

	$("#add-file_name").filebox({
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
			var result = $.parseJSON(data) ;
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

	$("#edit-title_time").datebox({
		width : 260,
		height : 30,
		panelWidth : 250,
		panelHeight : 250,
		label : '评定日期' ,
		labelWidth : 70,
		editable : false ,
		required : true ,
		value : '2017-1-1' ,
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
				url : APP + '/Experience/Title/edit' ,
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

function edit(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	console.log(row) ;
	$("#edit-form").form('load',{
					'edit-id' : row.id,
					'edit-title' : row.title ,
					'edit-title_time' : row.title_time ,
					
				});

				$("#edit-box").dialog('open') ;
}


function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	$.messager.confirm('删除提示','您确定要删除这条职称经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Title/delete' ,
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