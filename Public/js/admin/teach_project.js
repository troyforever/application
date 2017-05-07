$(function(){

	$("#content").window({
		title : '教学成果&emsp;/&emsp;教学项目',
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
				url : APP + '/Teach/Project/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Teach_Project/File/' + data) ;
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
			var id = $("#search-id").textbox('getValue').trim() ;
			var topic = $("#search-topic").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			var start_date = $("#search-start_date").datebox('getValue').trim();
			$.ajax({
				url : APP + '/Teach/Project/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {id:id,topic:topic,unit:unit,start_date:start_date},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Teach_Project/File/' + data) ;
					} else {
						$.messager.alert('提示','暂无数据导出','info') ;
					}
				}
			});
		}
	});

	$("#download-file").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-download' ,

		onClick : function(){
			var selects = $("#data-box").datagrid('getSelections') ;
			var id = $("#search-id").textbox('getValue').trim() ;
			var topic = $("#search-topic").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			var start_date = $("#search-start_date").datebox('getValue').trim();
			if ( selects.length == 0 ){
				$.messager.confirm('下载提示','确定导出全部附件?',function(result){
					if ( result ){
						$.ajax({
							url : APP + '/Teach/Project/downloadAll' ,
							data : {id:id,topic:topic,unit:unit,start_date:start_date} ,
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Teach_Project/File/' + data) ;
								} else {
									$.messager.alert('提示','暂无附件下载','info') ;
								}
							}
						});
					}
				}) ;
			} else {
				var str = '' ;

				for ( var i = 0 ; i < selects.length ; i ++ ){
					str += selects[i].id + '-' ;
				}

				str = str.substr(0,str.length-1) ;
				
				$.ajax({
					url : APP + '/Teach/Project/downloadSelect' ,
					data : {selects:str} ,
					method : 'POST' ,
					dataType : 'JSON' ,
					async : false,

					success : function(data){
						if ( data ){
							window.open(ROOT + '/Uploads/Teach_Project/File/' + data ) ;
						} else {
							$.messager.alert('下载提示','尚无附件下载','info') ;
						}
					}
				});
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

	//搜索栏

	$("#search-id").textbox({
		width : 150,
		height : 30,
		label : '编号' ,
		labelWidth : 30,
	});

	$("#search-topic").textbox({
		width : 150,
		height : 30,
		label : '课题' ,
		labelWidth : 30,
	});

	$("#search-start_date").datebox({
		width : 160,
		height : 30,
		label : '开始日期' ,
		labelWidth : 60,
		editable : false,
		panelHeight : 250,
		panelWidth : 250
	});

	$("#search-unit").combobox({
		width : 170,
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
				'unit' : $("#search-unit").combobox('getValue').trim(),
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
		width:'100%' ,
		url : APP + "/Teach/Project/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'start_date' ,
		loadMsg : '教学项目信息加载中。。。' ,
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
				field : 'author' ,
				title : '责任人' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Teach_Project/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#data-box").datagrid('appendRow',{
					id : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'id' ,
					colspan : 10,
				}) ;
				$(".pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".pagination").show();
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
		url : APP + '/Teach/Project/add' ,
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
				$.messager.alert('提示','教学项目信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','教学项目信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 612,
		height : 480,
		title : '添加教学项目信息',
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
		missingMessage : '教学项目编号非空' ,
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
		title : '编辑教学项目信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Teach/Project/edit' ,
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
				$.messager.alert('提示','教学项目信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','教学项目信息更新失败！','info') ;
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
		missingMessage : '教学项目编号非空' ,
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
$.messager.confirm('删除提示','您确定要删除这条教学项目吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Teach/Project/delete' ,
						method : 'post' ,
						data : {id:id} ,
						async : false ,
						dataType : 'json' ,

						success : function(data){
							if ( data ){
								$("#data-box").datagrid('reload') ;
								$.messager.alert('提示','教学项目信息删除成功！','info') ;
							} else {
								$.messager.alert('提示','教学项目信息删除失败！','info') ;
							}
						}
					});
					}
				}) ;
}