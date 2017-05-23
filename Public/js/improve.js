$(function(){

	$("#content").window({
		title : '个人信息&emsp;/&emsp;进修信息',
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
		width:'100%' ,
		url : APP + "/Experience/Improve/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'end_date' ,
		loadMsg : '进修信息加载中。。。' ,
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
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'topic' ,
				title : '进修主题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
			},
			{
				field : 'unit' ,
				title : '进修单位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'note' ,
				title : '简介' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'location' ,
				title : '地点' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'start_date' ,
				title : '开始时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
			},
			{
				field : 'end_date' ,
				title : '结束时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Improve/' + value + '\')">查看</a>'
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
				$("#data-box").datagrid('appendRow',{
					topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'topic' ,
					colspan : 8,
				}) ;
				$(".datagrid-pager.pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".datagrid-pager.pagination").show();
			}
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
		url : APP + '/Experience/Improve/add' ,
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
				$.messager.alert('提示','进修信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','进修信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 452,
		height : 470,
		title : '添加进修信息信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-topic").textbox({
		width : 300,
		height : 30,
		label : '进修主题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修主题非空' ,
	});

	$("#add-unit").textbox({
		width : 300,
		height : 30,
		label : '进修单位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修单位非空' ,
	});

	$("#add-location").textbox({
		width : 300,
		height : 30,
		label : '地&emsp;&emsp;点' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修地点非空' ,
	});

	$("#add-start_date").datebox({
		width : 300,
		height : 30,
		label : '进修日期' ,
		labelWidth : 70,
		panelWidth : 300,
		panelHeight : 300,
		editable : false,
		required : true,
		missingMessage : '进修日期非空' ,
		value : '2017-1-1' ,
	});

	$("#add-end_date").datebox({
		width : 300,
		height : 30,
		label : '结束日期' ,
		labelWidth : 70,
		panelWidth : 300,
		panelHeight : 300,
		editable : false,
		missingMessage : '结束日期非空' ,
		value : '2017-1-1' ,
	});

	$("#add-note").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '简&emsp;&emsp;介' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '简介非空' ,
	});

	$("#add-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
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
		height : 470,
		title : '编辑进修信息信息',
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
				$.messager.alert('编辑提示','进修信息编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','进修信息编辑失败！','info') ;
			}
		}
	});

	$("#edit-topic").textbox({
		width : 300,
		height : 30,
		label : '进修主题' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修主题非空' ,
	});

	$("#edit-unit").textbox({
		width : 300,
		height : 30,
		label : '进修单位' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修单位非空' ,
	});

	$("#edit-location").textbox({
		width : 300,
		height : 30,
		label : '地&emsp;&emsp;点' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '进修地点非空' ,
	});

	$("#edit-start_date").datebox({
		width : 300,
		height : 30,
		label : '进修日期' ,
		labelWidth : 70,
		panelWidth : 300,
		panelHeight : 300,
		editable : false,
		required : true,
		missingMessage : '进修日期非空' ,
		value : '2017-1-1' ,
	});

	$("#edit-end_date").datebox({
		width : 300,
		height : 30,
		label : '结束日期' ,
		labelWidth : 70,
		panelWidth : 300,
		panelHeight : 300,
		editable : false,
		missingMessage : '结束日期非空' ,
		value : '2017-1-1' ,
	});

	$("#edit-note").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '简&emsp;&emsp;介' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '简介非空' ,
	});

	$("#edit-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
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
				url : APP + '/Experience/Improve/edit' ,
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
					'edit-topic' : row.topic ,
					'edit-unit' : row.unit ,
					'edit-location' : row.location ,
					'edit-start_date' : row.start_date ,
					'edit-end_date' : row.end_date ,
					'edit-note' : row.note
				});

				$("#edit-box").dialog('open') ;
}

function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
			$.messager.confirm('删除提示','您确定要删除这条进修信息吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Experience/Improve/delete' ,
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