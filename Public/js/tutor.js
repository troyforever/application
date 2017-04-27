$(function(){

	$("#content").window({
		title : '个人信息&emsp;/&emsp;导员经历',
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
	// 			$.messager.alert('提示','请先选中待编辑导员经历！','info') ;
	// 		} else {

	// 			$("#edit-form").form('load',{
	// 				'edit-unit' : selected.unit ,
	// 				'edit-job' : selected.job ,
	// 				'edit-length' : selected.length
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
	// 			$.messager.alert('提示','请先选中待删除导员经历！','info') ;
	// 		} else {
	// 			$.messager.confirm('删除提示','您确定要删除这条导员经历吗？',function(r){
	// 				if ( r ){
	// 					$.ajax({
	// 					url : APP + '/Experience/Tutor/delete' ,
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
		url : APP + "/Experience/Tutor/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'add_time' ,
		loadMsg : '导员经历加载中。。。' ,
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
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'tutor' ,
				title : '导员职称' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'tutor_date' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Tutor/' + value + '\')">查看</a>'
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
					tutor : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'tutor' ,
					colspan : 4,
				}) ;
				$(".datagrid-pager.pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".datagrid-pager.pagination").show();
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

	//添加学历信息对话框

	$("#add-form").form({
		url : APP + '/Experience/Tutor/add' ,
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
		height : 260,
		title : '添加导员经历信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-tutor").combobox({
		width : 300,
		height : 30,
		label : '导员职称' ,
		panelHeight : 50,
		labelWidth : 70,
		required : true ,
		missingMessage : '导员职称非空' ,

		data : [
			{
				text : '硕导',
				value : '硕导'
			},
			{
				text : '博导',
				value : '博导'
			}
		],
	});

	$("#add-tutor_date").datebox({
		width : 300,
		height : 30,
		label : '评定时间' ,
		labelWidth : 70,
		required : true ,
		panelHeight : 300,
		panelWidth : 300,
		missingMessage : '评定时间非空' ,
		value : '2017-1-1'
	});

	$("#add-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		prompt : '选择附件' ,
		labelWidth : 70,
		buttonIcon : 'icon-file' ,
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
			$("#add-form").textbox('reset') ;
			$("#add-box").dialog('close') ;
		}
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 452,
		height : 260,
		title : '编辑导员经历信息',
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
				$.messager.alert('编辑提示','导员经历编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','导员经历编辑失败！','info') ;
			}
		}
	});

	$("#edit-tutor").combobox({
		width : 300,
		height : 30,
		label : '导员职称' ,
		panelHeight : 50,
		labelWidth : 70,
		required : true ,
		missingMessage : '导员职称非空' ,

		data : [
			{
				text : '硕导',
				value : '硕导'
			},
			{
				text : '博导',
				value : '博导'
			}
		],
	});

	$("#edit-tutor_date").datebox({
		width : 300,
		height : 30,
		label : '评定时间' ,
		labelWidth : 70,
		required : true ,
		panelHeight : 300,
		panelWidth : 300,
		missingMessage : '评定时间非空' ,
	});

	$("#edit-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		prompt : '选择附件' ,
		labelWidth : 70,
		buttonIcon : 'icon-file' ,
		buttonText : '附件' ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/Experience/Tutor/edit' ,
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
					'edit-tutor' : row.tutor ,
					'edit-tutor_date' : row.tutor_date ,
				});

				$("#edit-box").dialog('open') ;
}

function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
			$.messager.confirm('删除提示','您确定要删除这条导员经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Tutor/delete' ,
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