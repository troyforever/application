$(function(){

	$("#content").window({
		title : '教学成果&emsp;/&emsp;教学经历',
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
	// 			$.messager.alert('提示','请先选中待编辑教学经历！','info') ;
	// 		} else {

	// 			$("#edit-form").form('load',{
	// 				'edit-lesson' : selected.lesson ,
	// 				'edit-credit' : selected.credit ,
	// 				'edit-quality' : selected.quality ,
	// 				'edit-annual' : selected.annual,
	// 				'edit-term' : selected.term,
	// 				'edit-classes' : selected.classes
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
	// 			$.messager.alert('提示','请先选中待删除教学经历！','info') ;
	// 		} else {
	// 			$.messager.confirm('删除提示','您确定要删除这条教学经历吗？',function(r){
	// 				if ( r ){
	// 					$.ajax({
	// 					url : APP + '/Teach/Teaching/delete' ,
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

	$("#search-lesson").textbox({
		width : 180,
		height : 30,
		label : '课程' ,
		labelWidth : 30,
	});

	$("#search-annual").combobox({
		width : 180,
		height : 30,
		label : '年度' ,
		labelWidth : 30,
		panelHeight : 115,
		editable : false ,
		textField : 'annual' ,
		valueField : 'value' ,
		url : PUBLIC + '/js/annual.json' ,
	});

	$("#search-classes").textbox({
		width : 180,
		height : 30,
		label : '班级' ,
		labelWidth : 30,
	});

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{}) ;
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
		url : APP + "/Teach/Teaching/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'annual' ,
		loadMsg : '教学经历加载中。。。' ,
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
				field : 'lesson' ,
				title : '课程' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'credit' ,
				title : '学分' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'quality' ,
				title : '性质' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'annual' ,
				title : '年度' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'term' ,
				title : '学期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'classes' ,
				title : '教学班级' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
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
					lesson : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'lesson' ,
					colspan : 7,
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
		url : APP + '/Teach/Teaching/add' ,
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
				$("#add-lesson").textbox('clear');
				$("#add-classes").textbox('clear');
				$.messager.alert('提示','教学信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','教学信息更新失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 400,
		height : 400,
		title : '添加教学经历信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-lesson").textbox({
		width : 260,
		height : 30,
		label : '课程名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课程名称非空' ,
	});

	$("#add-credit").combobox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;分' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'credit' ,
		url : PUBLIC + '/js/credit.json' ,
		panelHeight : 160,
		required : true ,
		editable : false,
	});

	$("#add-quality").combobox({
		width : 260,
		height : 30,
		panelHeight : 70,
		label : '课程性质' ,
		labelWidth : 70,
		editable : false ,
		textField : 'quality' ,
		valueField : 'value' ,
		data : [
			{
				quality : '必修',
				value : '必修',
			},
			{
				quality : '选修',
				value : '选修'
			},
			{
				quality : '校选',
				value : '校选'
			}
		] ,
		required : true ,
	});

	$("#add-annual").combobox({
		width : 260,
		height : 30,
		label : '年&emsp;&emsp;度' ,
		labelWidth : 70,
		panelHeight : 115,
		editable : false ,
		textField : 'annual' ,
		valueField : 'value' ,
		value : '2016-2017' ,
		url : PUBLIC + '/js/annual.json' ,
		required : true ,
	});

	$("#add-term").combobox({
		width : 260,
		height : 30,
		panelHeight : 50,
		label : '学&emsp;&emsp;期' ,
		labelWidth : 70,
		textField : 'term' ,
		valueField : 'value' ,
		value : 1,
		editable : false ,
		data : [
			{
				term : '1' ,
				value : '1'
			},
			{
				term : '2',
				value : '2'
			}
		] ,
		required : true ,
	});

	$("#add-classes").textbox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '教学班级' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '教学班级非空' ,
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
		height : 400,
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
				$.messager.alert('编辑提示','教学经历编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','教学经历编辑失败！','info') ;
			}
		}
	});

	$("#edit-lesson").textbox({
		width : 260,
		height : 30,
		label : '课程名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课程名称非空' ,
	});

	$("#edit-credit").combobox({
		width : 260,
		height : 30,
		label : '学&emsp;&emsp;分' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'credit' ,
		url : PUBLIC + '/js/credit.json' ,
		panelHeight : 160,
		required : true ,
		editable : false,
	});

	$("#edit-quality").combobox({
		width : 260,
		height : 30,
		panelHeight : 70,
		label : '课程性质' ,
		labelWidth : 70,
		editable : false ,
		textField : 'quality' ,
		valueField : 'value' ,
		data : [
			{
				quality : '必修',
				value : '必修',
			},
			{
				quality : '选修',
				value : '选修'
			},
			{
				quality : '校选',
				value : '校选'
			}
		] ,
		required : true ,
	});

	$("#edit-annual").combobox({
		width : 260,
		height : 30,
		label : '年&emsp;&emsp;度' ,
		labelWidth : 70,
		panelHeight : 115,
		editable : false ,
		textField : 'annual' ,
		valueField : 'value' ,
		url : PUBLIC + '/js/annual.json' ,
		required : true ,
	});

	$("#edit-term").combobox({
		width : 260,
		height : 30,
		panelHeight : 50,
		label : '学&emsp;&emsp;期' ,
		labelWidth : 70,
		textField : 'term' ,
		valueField : 'value' ,
		editable : false ,
		data : [
			{
				term : '1' ,
				value : '1'
			},
			{
				term : '2',
				value : '2'
			}
		] ,
		required : true ,
	});

	$("#edit-classes").textbox({
		width : 260,
		height : 30,
		panelWidth : 250,
		label : '教学班级' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '教学班级非空' ,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/Teach/Teaching/edit' ,
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

	$("#edit-form").form('load',{
					'edit-id' : row.id ,
					'edit-lesson' : row.lesson ,
					'edit-credit' : row.credit ,
					'edit-quality' : row.quality ,
					'edit-annual' : row.annual,
					'edit-term' : row.term,
					'edit-classes' : row.classes
				});

				$("#edit-box").dialog('open') ;
}

function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;

	$.messager.confirm('删除提示','您确定要删除这条教学经历吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Teach/Teaching/delete' ,
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