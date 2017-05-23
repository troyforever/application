$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;专利授权',
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
				url : APP + '/Achievement/Patent/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Patent/File/' + data) ;
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
			var topic = $("#search-topic").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			var application_id = $("#search-application_id").textbox('getValue').trim();
			var auth_id = $("#search-auth_id").textbox('getValue').trim();
			$.ajax({
				url : APP + '/Achievement/Patent/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {topic:topic,unit:unit,application_id:application_id,auth_id:auth_id},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Patent/File/' + data) ;
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
			var topic = $("#search-topic").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			var application_id = $("#search-application_id").textbox('getValue').trim();
			var auth_id = $("#search-auth_id").textbox('getValue').trim();
			
			$.ajax({
							url : APP + '/Achievement/Patent/downloadAll' ,
							data : {topic:topic,unit:unit,application_id:application_id,auth_id:auth_id},
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Patent/File/' + data) ;
								} else {
									$.messager.alert('提示','暂无附件下载','info') ;
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

	$("#search-topic").textbox({
		width : 160,
		height : 30,
		label : '发明名称' ,
		labelWidth : 60,
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

	$("#search-application_id").textbox({
		width : 150,
		height : 30,
		label : '申请号' ,
		labelWidth : 50,
	});

	$("#search-auth_id").textbox({
		width : 150,
		height : 30,
		label : '授权号' ,
		labelWidth : 50,
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
				'unit' : $("#search-unit").combobox('getValue'),
				'application_id' : $("#search-application_id").textbox('getValue').trim(),
				'auth_id' : $("#search-auth_id").textbox('getValue').trim(),
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
		url : APP + "/Achievement/Patent/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'application_date' ,
		loadMsg : '专利授权信息加载中。。。' ,
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
				hidden : true,
			},
			{
				field : 'topic' ,
				title : '发明名称' ,
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
				title : '发明类型' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'author' ,
				title : '第一发明人' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'unit_name' ,
				title : '部门（系）' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'state' ,
				title : '状态' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'application_id' ,
				title : '申请号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'application_date' ,
				title : '申请日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'auth_id' ,
				title : '授权号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 

				formatter : function(value,row,index){
					if ( ! value ){
						return "暂未授权" ;
					} else {
						return value ;
					}
				}
			},
			{
				field : 'auth_date' ,
				title : '授权日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 

				formatter : function(value,row,index){
					if ( ! value ){
						return "暂未授权" ;
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Patent/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#data-box").datagrid('appendRow',{
					topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'topic' ,
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
		url : APP + '/Achievement/Patent/add' ,
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
				$.messager.alert('提示','专利授权信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','专利授权信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 512,
		height : 540,
		title : '添加专利授权信息信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-topic").textbox({
		width : 300,
		height : 30,
		label : '发明名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '发明名称非空' ,
	});

	$("#add-author").textbox({
		width : 300,
		height : 30,
		label : '第一发明人' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '第一发明人非空' ,
	});

	$("#add-other_author").textbox({
		width : 300,
		height : 30,
		label : '其他发明人' ,
		labelWidth : 70,
	});

	$("#add-category").combobox({
		width : 300,
		height : 30,
		label : '类&emsp;&emsp;型' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 70,
		required : true ,
		editable : false,
		data : [
			{
				text : '发明' ,
				value : '1'
			},
			{
				text : '实用新型' ,
				value : '2'
			},
			{
				text : '外观设计' ,
				value : '3'
			}
		],

		value : 1,
	});

	$("#add-state").combobox({
		width : 300,
		height : 30,
		label : '状&emsp;&emsp;态' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 50,
		required : true ,
		editable : false,
		data : [
			{
				text : '已授权-正常' ,
				value : '1'
			},
			{
				text : '审查中-授权' ,
				value : '2'
			}
		],

		value : 1,
	});

	$("#add-application_id").textbox({
		width : 300,
		height : 30,
		label : '申&ensp;请&ensp;号' ,
		labelWidth : 70,

		required : true ,
		missingMessage : '申请号非空' ,
	});

	$("#add-application_date").datebox({
		width : 300,
		height : 30,
		label : '申&ensp;请&ensp;日' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
		required : true,
		value : '2017-1-1' ,
		missingMessage : '申请日期非空' ,
	});

	$("#add-auth_id").textbox({
		width : 300,
		height : 30,
		label : '授&ensp;权&ensp;号' ,
		labelWidth : 70,
	});

	$("#add-auth_date").datebox({
		width : 300,
		height : 30,
		label : '授&ensp;权&ensp;日' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
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

	$("#add-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 512,
		height : 540,
		title : '编辑专利授权信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Achievement/Patent/edit' ,
		onSubmit : function(){
			if ( $("#edit-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整专利授权信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#edit-box").dialog('close') ;
				$("#edit-form").form('reset') ;
				$("#data-box").datagrid('reload') ;
				$.messager.alert('提示','专利授权信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','专利授权信息更新失败！','info') ;
			}
		}
	});

	$("#edit-topic").textbox({
		width : 300,
		height : 30,
		label : '发明名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '发明名称非空' ,
	});

	$("#edit-author").textbox({
		width : 300,
		height : 30,
		label : '第一发明人' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '第一发明人非空' ,
	});

	$("#edit-other_author").textbox({
		width : 300,
		height : 30,
		label : '其他发明人' ,
		labelWidth : 70,
	});

	$("#edit-category").combobox({
		width : 300,
		height : 30,
		label : '类&emsp;&emsp;型' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 70,
		required : true ,
		editable : false,
		data : [
			{
				text : '发明' ,
				value : '1'
			},
			{
				text : '实用新型' ,
				value : '2'
			},
			{
				text : '外观设计' ,
				value : '3'
			}
		],
	});

	$("#edit-state").combobox({
		width : 300,
		height : 30,
		label : '状&emsp;&emsp;态' ,
		labelWidth : 70,
		valueField : 'value',
		textField : 'text' ,
		panelHeight : 50,
		required : true ,
		editable : false,
		data : [
			{
				text : '已授权-正常' ,
				value : '1'
			},
			{
				text : '审查中-授权' ,
				value : '2'
			}
		],
	});

	$("#edit-application_id").textbox({
		width : 300,
		height : 30,
		label : '申&ensp;请&ensp;号' ,
		labelWidth : 70,

		required : true ,
		missingMessage : '申请号非空' ,
	});

	$("#edit-application_date").datebox({
		width : 300,
		height : 30,
		label : '申&ensp;请&ensp;日' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
		required : true,
		value : '2017*-1-1' ,
		missingMessage : '申请日期非空' ,
	});

	$("#edit-auth_id").textbox({
		width : 300,
		height : 30,
		label : '授&ensp;权&ensp;号' ,
		labelWidth : 70,
	});

	$("#edit-auth_date").datebox({
		width : 300,
		height : 30,
		label : '授&ensp;权&ensp;日' ,
		labelWidth : 70,
		editable : false,
		panelHeight : 250,
		panelWidth : 250,
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

	$("#edit-file_name").filebox({
		width : 300,
		height : 30,
		label : '附&emsp;&emsp;件' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});
});

function edit(id){
	$.ajax({
					url : APP + '/Achievement/Patent/find' ,
					data : {id:id} ,
					dataType : 'JSON' ,
					method : 'POST' ,
					async : false,

					success : function(data){
						$("#edit-form").form('load',{
							'edit-id' : data.id ,
							'edit-topic' : data.topic ,
							'edit-author' : data.author ,
							'edit-other_author' : data.other_author ,
							'edit-state' : data.state,
							'edit-category' : data.category ,
							'edit-application_id' : data.application_id ,
							'edit-application_date' : data.application_date ,
							'edit-auth_id' : data.auth_id ,
							'edit-auth_date' : data.auth_date 
						});
					}
				});
				$("#edit-box").dialog('open') ;
}

function remove(id){
	$.messager.confirm('删除提示','您确定要删除这条专利授权信息吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Patent/delete' ,
						method : 'post' ,
						data : {id:id} ,
						async : false ,
						dataType : 'json' ,

						success : function(data){
							if ( data ){
								$("#data-box").datagrid('reload') ;
								$.messager.alert('提示','专利授权信息删除成功！','info') ;
							} else {
								$.messager.alert('提示','专利授权信息删除失败！','info') ;
							}
						}
					});
					}
				}) ;
}