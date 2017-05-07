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
	$("#download-select").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-select' ,
		disabled : true,

		onClick : function(){
			var selects = $("#data-box").datagrid('getSelections') ;
			var str = '' ;
			for ( var i = 0 ; i < selects.length ; i ++ ){
				str += selects[i].id + '-';
			}
			str = str.substr(0,str.length-1) ;
			
			$.ajax({
				url : APP + '/Teach/Teaching/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Teaching/File/' + data) ;
				}
			});
		}
	});

	$("#download-all").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-all' ,

		onClick : function(){
			var lesson = $("#search-lesson").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue');
			var annual = $("#search-annual").datebox('getValue').trim();
			var classes = $("#search-classes").textbox('getValue').trim();
			$.ajax({
				url : APP + '/Teach/Teaching/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {lesson:lesson,unit:unit,annual:annual,classes:classes},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Teaching/File/' + data) ;
					} else {
						$.messager.alert('提示','暂无数据导出','info') ;
					}
				}
			});
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

	//搜索栏

	$("#search-lesson").textbox({
		width : 150,
		height : 30,
		label : '课程' ,
		labelWidth : 30,
	});

	$("#search-unit").combobox({
		width : 150,
		height : 30,
		label : '部门' ,
		labelWidth : 30,
		url : APP + '/Home/Base/unit' ,
		valueField : 'id' ,
		textField : 'name' ,
		panelWidth : 190,
		panelHeight : 150,
		editable : false ,
	});

	$("#search-annual").combobox({
		width : 150,
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
		width : 150,
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
			$("#data-box").datagrid('load',{
				'lesson' : $("#search-lesson").textbox('getValue').trim(),
				'unit' : $("#search-unit").combobox('getValue'),
				'annual' : $("#search-annual").textbox('getValue').trim(),
				'classes' : $("#search-classes").textbox('getValue').trim()
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
				field : 'name' ,
				title : '授课教师' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit_name' ,
				title : '部门（系）' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
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
				field : 'classes' ,
				title : '教学班级' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'num' ,
				title : '班级人数' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
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
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#data-box").datagrid('appendRow',{
					lesson : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'lesson' ,
					colspan : 8,
				}) ;
				$(".datagrid-pager.pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".datagrid-pager.pagination").show();
			}
		},

		onSelect : function(index,row){
			$("#download-select").linkbutton('enable') ;
		} ,

		onUnselect : function(index,row){
			var selects = $("#data-box").datagrid('getSelections') ;

			if ( selects.length == 0 ){
				$("#download-select").linkbutton('disable') ;
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
		width : 452,
		height : 450,
		title : '添加教学经历信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-lesson").textbox({
		width : 300,
		height : 30,
		label : '课程名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课程名称非空' ,
	});

	$("#add-credit").combobox({
		width : 300,
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
		width : 300,
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

	$("#add-num").numberspinner({
		width : 300,
		height : 30,
		label : '班级人数' ,
		labelWidth : 70,
		min : 0,
		increment : 1,
		value : 50,
	});

	$("#add-annual").combobox({
		width : 300,
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
		width : 300,
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
		width : 300,
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
		width : 452,
		height : 450,
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
		width : 300,
		height : 30,
		label : '课程名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '课程名称非空' ,
	});

	$("#edit-credit").combobox({
		width : 300,
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
		width : 300,
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

	$("#edit-num").numberspinner({
		width : 300,
		height : 30,
		label : '班级人数' ,
		labelWidth : 70,
		min : 0,
		increment : 1,
	});

	$("#edit-annual").combobox({
		width : 300,
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
		width : 300,
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
		width : 300,
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
					'edit-num' : row.num ,
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