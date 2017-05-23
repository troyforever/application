$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;科研项目',
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
	// 			$.messager.alert('提示','请先选中待编辑项目管理！','info') ;
	// 		} else {
	// 			$("#edit-form").form('load',{
	// 				'edit-id' : selected.id ,
	// 				'edit-topic' : selected.topic ,
	// 				'edit-author' : selected.author ,
	// 				'edit-other_author' : selected.other_author ,
	// 				'edit-category' : selected.category ,
	// 				'edit-project_sum' : selected.project_sum ,
	// 				'edit-start_date' : selected.start_date ,
	// 				'edit-end_date' : selected.end_date 
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
	// 			$.messager.alert('提示','请先选中待删除项目管理！','info') ;
	// 		} else {
	// 			$.messager.confirm('删除提示','您确定要删除这条项目管理吗？',function(r){
	// 				if ( r ){
	// 					$.ajax({
	// 					url : APP + '/Achievement/Project/delete' ,
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

	$("#search-id").textbox({
		width : 180,
		height : 30,
		label : '编号' ,
		labelWidth : 30,
	});

	$("#search-topic").textbox({
		width : 180,
		height : 30,
		label : '课题' ,
		labelWidth : 30,
	});

	$("#search-start_date").datebox({
		width : 200,
		height : 30,
		label : '开始日期' ,
		labelWidth : 60,
		editable : false,
		panelHeight : 250,
		panelWidth : 250
	});

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'id' : $("#search-id").textbox('getValue').trim(),
				'topic' : $("#search-topic").textbox('getValue').trim(),
				'start_date' : $("#search-start_date").textbox('getValue')
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
		url : APP + "/Achievement/Project/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'start_date' ,
		loadMsg : '科研项目信息加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		pagination : true ,
		pageSize : 5,
		pageList : [5,10,15,20,25,30],
		columns : [[
			// {
			// 	field : 'ck' ,
			// 	checkbox : 'true' ,
			// },
			{
				field : 'id' ,
				title : '编号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'topic' ,
				title : '项目课题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 

				formatter : function(value,row,index){
					return "<span title='" + value + "'>" + value + "</span>" ;
				}
			},
			{
				field : 'category' ,
				title : '来源' ,
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
			},
			{
				field : 'project_sum' ,
				title : '合同金额' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'start_date' ,
				title : '开始日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'end_date' ,
				title : '结束日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 

				formatter : function(value,row,index){
					if ( ! value ){
						return "尚未结束" ;
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Project/' + value + '\')">查看</a>'
					}
				}
			},
			{
				field : 'operation' ,
				title : '操作' ,
				width : 150 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-edit\"' onclick='edit(" + index + ")'>编辑</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-cancel\"' onclick='remove(\"" + row.id + "\")'>删除</a>" +
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
					id : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'id' ,
					colspan : 9,
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
		url : APP + '/Achievement/Project/add' ,
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
				$.messager.alert('提示','科研项目信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','科研项目信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 612,
		height : 480,
		title : '添加科研项目信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-id").textbox({
		width : 400,
		height : 30,
		label : '编&emsp;&emsp;号' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '科研项目编号非空' ,
	});

	$("#add-topic").textbox({
		width : 400,
		height : 30,
		label : '课&emsp;&emsp;题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课题非空' ,
	});

	$("#add-author").textbox({
		width : 400,
		height : 30,
		label : '负&ensp;责&ensp;人' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '责任人非空' ,
	});

	$("#add-other_author").textbox({
		width : 400,
		height : 30,
		label : '参与人员' ,
		labelWidth : 70,
	});

	$("#add-category").combobox({
		width : 240,
		height : 30,
		label : '来&emsp;&emsp;源' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 140,
		required : true ,
		missingMessage : '项目来源非空' ,
		data : [
			{
				text : '国家自然基金' ,
				value : '国家自然基金'
			},
			{
				text : '省自然基金' ,
				value : '省自然基金'
			},
			{
				text : '省自然基金' ,
				value : '省自然基金项'
			},
			{
				text : '973计划' ,
				value : '973计划'
			},
			{
				text : '863计划' ,
				value : '863计划'
			},
			{
				text : '企业项目' ,
				value : '企业项目'
			}
		],
	});

	$("#add-state").combobox({
		width : 156,
		height : 30,
		labelAlign:'right' ,
		label : '状&emsp;&emsp;态' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 70,
		required : true ,
		editable : false,
		data : [
			{
				text : '申报' ,
				value : '申报'
			},
			{
				text : '在研' ,
				value : '在研'
			},
			{
				text : '已结题' ,
				value : '已结题'
			}
		],

		value : '申报',
	});

	$("#add-project_sum").numberspinner({
		width : 400,
		height : 30,
		label : '金额(万)' ,
		labelWidth : 70,
		max : 9999,
		min : 0,
		increment : 1,
		precision : 2,
		value : '10' ,
		required : true ,
	});

	$("#add-start_date").datebox({
		width : 198,
		height : 30,
		label : '开始日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 300,
		panelWidth : 300,
		required : true,
		value : '2017*-1-1' ,
		missingMessage : '开始日期非空' ,
	});

	$("#add-end_date").datebox({
		width : 198,
		height : 30,
		labelAlign : 'right' ,
		label : '结束日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 300,
		panelWidth : 300,
	});

	$("#add-submit").linkbutton({
		width : 150,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#add-form").form('submit') ;
		}
	});

	$("#add-cancel").linkbutton({
		width : 150,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#add-box").dialog('close') ;
		}
	});

	$("#add-file_name").filebox({
		width : 400,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 612,
		height : 480,
		title : '编辑科研项目信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Achievement/Project/edit' ,
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
				$.messager.alert('提示','科研项目信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','科研项目信息更新失败！','info') ;
			}
		}
	});

	$("#edit-id").textbox({
		width : 400,
		height : 30,
		label : '编&emsp;&emsp;号' ,
		labelWidth : 70,
		editable : false,
		required : true ,
		missingMessage : '科研项目编号非空' ,
	});

	$("#edit-topic").textbox({
		width : 400,
		height : 30,
		label : '课&emsp;&emsp;题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课题非空' ,
	});

	$("#edit-author").textbox({
		width : 400,
		height : 30,
		label : '负&ensp;责&ensp;人' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '责任人非空' ,
	});

	$("#edit-other_author").textbox({
		width : 400,
		height : 30,
		label : '参与人员' ,
		labelWidth : 70,
	});

	$("#edit-category").combobox({
		width : 240,
		height : 30,
		label : '来&emsp;&emsp;源' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 140,
		required : true ,
		missingMessage : '项目来源非空' ,
		data : [
			{
				text : '国家自然基金' ,
				value : '国家自然基金'
			},
			{
				text : '省自然基金' ,
				value : '省自然基金'
			},
			{
				text : '省自然基金' ,
				value : '省自然基金项'
			},
			{
				text : '973计划' ,
				value : '973计划'
			},
			{
				text : '863计划' ,
				value : '863计划'
			},
			{
				text : '企业项目' ,
				value : '企业项目'
			}
		],
	});

	$("#edit-state").combobox({
		width : 156,
		height : 30,
		labelAlign:'right' ,
		label : '状&emsp;&emsp;态' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 70,
		required : true ,
		editable : false,
		data : [
			{
				text : '申报' ,
				value : '申报'
			},
			{
				text : '在研' ,
				value : '在研'
			},
			{
				text : '已结题' ,
				value : '已结题'
			}
		],
	});

	$("#edit-project_sum").numberspinner({
		width : 400,
		height : 30,
		label : '金额(万)' ,
		labelWidth : 70,
		max : 9999,
		min : 0,
		increment : 1,
		precision : 2,
		value : '10' ,
		required : true ,
	});

	$("#edit-start_date").datebox({
		width : 198,
		height : 30,
		label : '开始日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 300,
		panelWidth : 300,
		required : true,
		value : '2017*-1-1' ,
		missingMessage : '开始日期非空' ,
	});

	$("#edit-end_date").datebox({
		width : 198,
		height : 30,
		labelAlign : 'right' ,
		label : '结束日期' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 300,
		panelWidth : 300,
	});

	$("#edit-submit").linkbutton({
		width : 150,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit') ;
		}
	});

	$("#edit-cancel").linkbutton({
		width : 150,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#edit-box").dialog('close') ;
		}
	});

	$("#edit-file_name").filebox({
		width : 400,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});
});

function edit(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	$("#edit-form").form('load',{
					'edit-id' : row.id ,
					'edit-topic' : row.topic ,
					'edit-author' : row.author ,
					'edit-other_author' : row.other_author ,
					'edit-category' : row.category ,
					'edit-state' : row.state ,
					'edit-project_sum' : row.project_sum ,
					'edit-start_date' : row.start_date ,
					'edit-end_date' : row.end_date 
				});

				$("#edit-box").dialog('open') ;
				
}

function remove(id){
$.messager.confirm('删除提示','您确定要删除这条科研项目吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Project/delete' ,
						method : 'post' ,
						data : {id:id} ,
						async : false ,
						dataType : 'json' ,

						success : function(data){
							if ( data ){
								$("#data-box").datagrid('reload') ;
								$.messager.alert('提示','科研项目信息删除成功！','info') ;
							} else {
								$.messager.alert('提示','科研项目信息删除失败！','info') ;
							}
						}
					});
					}
				}) ;
}