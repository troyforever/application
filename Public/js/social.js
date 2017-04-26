$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;社会活动',
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

	// $("#tools-edit").linkbutton({
	// 	width : 150,
	// 	height : 50,
	// 	plain : true ,
	// 	iconCls : 'icon-edit' ,

	// 	onClick : function(){
	// 		var selected = $("#data-box").datagrid('getSelected') ;
	// 		if ( selected == null ){
	// 			$.messager.alert('提示','请先选中待编辑社会活动！','info') ;
	// 		} else {
	// 			console.log(selected) ;
	// 			$("#edit-form").form('load',{
	// 						'edit-id' : selected.id ,
	// 						'edit-topic' : selected.topic ,
	// 						'edit-location' : selected.location ,
	// 						'edit-social_date' : selected.social_date,
	// 						'edit-note' : selected.note
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
	// 			$.messager.alert('提示','请先选中待删除社会活动！','info') ;
	// 		} else {
	// 			$.messager.confirm('删除提示','您确定要删除这条社会活动吗？',function(r){
	// 				if ( r ){
	// 					$.ajax({
	// 					url : APP + '/Achievement/Social/delete' ,
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

	//搜索栏

	$("#search-topic").textbox({
		width : 200,
		height : 30,
		label : '活动主题' ,
		labelWidth : 60,
	});

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'topic' : $("#search-topic").textbox('getValue').trim(),
			}) ;
		}
	});

	$("#search-clear").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '清空' ,
		iconCls : 'icon-clear' ,
		onClick : function(){
			$("#search-form").form('clear') ;
			$("#data-box").datagrid('load',{}) ;
		}
	});

	

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		width:'100%' ,
		url : APP + "/Achievement/Social/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'social_date' ,
		loadMsg : '社会活动信息加载中。。。' ,
		sortOrder : 'desc' ,
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
				hidden : true,
			},
			{
				field : 'topic' ,
				title : '活动主题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'location' ,
				title : '地点' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'social_date' ,
				title : '日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'note' ,
				title : '备注' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 

				formatter : function(value,row,index){
					if ( ! value ){
						return "无" ;
					} else {
						return value ;
					}
				}
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Social/' + value + '\')">查看</a>'
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
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-cancel\"' onclick='remove(" + row.id + ")'>删除</a>" +
							"</div>" ;
				}
			}
		]] ,

		// onBeforeLoad : function(){
		// 	$("#tools-detail").linkbutton('enable') ;
		// 	$("#tools-edit").linkbutton('enable') ;
		// 	$("#tools-delete").linkbutton('enable') ;
		// } ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				// $("#tools-detail").linkbutton('disable') ;
				// $("#tools-edit").linkbutton('disable') ;
				// $("#tools-delete").linkbutton('disable') ;
				$("#data-box").datagrid('appendRow',{
					topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'topic' ,
					colspan : 6,
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
		} ,
	});

	//添加学历信息对话框

	$("#add-form").form({
		url : APP + '/Achievement/Social/add' ,
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
				$("#add-form").form('reset') ;
				$.messager.alert('提示','社会活动信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','社会活动信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 512,
		height : 370,
		title : '添加社会活动信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-topic").textbox({
		width : 300,
		height : 30,
		label : '活动主题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '活动主题非空' ,
	});

	$("#add-location").textbox({
		width : 300,
		height : 30,
		label : '地&emsp;&emsp;点' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '活动地点非空' ,
	});

	$("#add-social_date").datebox({
		width : 300,
		height : 30,
		label : '活动日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
		required : true,
		value : '2017-1-1' ,
		missingMessage : '活动日期非空' ,
	});

	$("#add-note").textbox({
		width : 300,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
	});


	$("#add-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
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


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 512,
		height : 370,
		title : '编辑经过经历信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Achievement/Social/edit' ,
		onSubmit : function(){
			if ( $("#edit-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#edit-box").dialog('close') ;
				$("#edit-form").form('reset') ;
				$("#data-box").datagrid('reload') ;
				$.messager.alert('提示','社会活动信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','社会活动信息更新失败！','info') ;
			}
		}
	});

	$("#edit-topic").textbox({
		width : 300,
		height : 30,
		label : '活动主题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '活动主题非空' ,
	});

	$("#edit-location").textbox({
		width : 300,
		height : 30,
		label : '地&emsp;&emsp;点' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '活动地点非空' ,
	});

	$("#edit-social_date").datebox({
		width : 300,
		height : 30,
		label : '活动日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
		required : true,
		value : '2017-1-1' ,
		missingMessage : '活动日期非空' ,
	});

	$("#edit-note").textbox({
		width : 300,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
	});


	$("#edit-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit') ;
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
							'edit-id' : row.id ,
							'edit-topic' : row.topic ,
							'edit-location' : row.location ,
							'edit-social_date' : row.social_date,
							'edit-note' : row.note
				});
				$("#edit-box").dialog('open') ;
}

function remove(id){
	$.messager.confirm('删除提示','您确定要删除这条社会活动信息吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Social/delete' ,
						method : 'post' ,
						data : {id:id} ,
						async : false ,
						dataType : 'json' ,

						success : function(data){
							if ( data ){
								$("#data-box").datagrid('reload') ;
								$.messager.alert('提示','社会活动信息删除成功！','info') ;
							} else {
								$.messager.alert('提示','社会活动信息删除失败！','info') ;
							}
						}
					});
					}
				}) ;
}