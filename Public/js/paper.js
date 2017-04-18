$(function(){

	$("#content").window({
		title : '成果管理&emsp;/&emsp;论文信息',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

	$("#tools-detail").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-more' ,

		onClick : function(){
			$("#add-box").dialog('open') ;
		}
	});

	//tools
	$("#tools-add").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-add' ,

		onClick : function(){
			$("#add-box").dialog('open') ;
		}
	});

	$("#tools-edit").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-edit' ,

		onClick : function(){
			$("#edit-box").dialog('open') ;
			// var selected = $("#data-box").datagrid('getSelected') ;
			// if ( selected == null ){
			// 	$.messager.alert('提示','请先选中待编辑论文信息！','info') ;
			// } else {

			// 	$("#edit-form").form('load',{
			// 		'edit-lesson' : selected.lesson ,
			// 		'edit-credit' : selected.credit ,
			// 		'edit-quality' : selected.quality ,
			// 		'edit-annual' : selected.annual,
			// 		'edit-term' : selected.term,
			// 		'edit-classes' : selected.classes
			// 	});

			// 	$("#edit-box").dialog('open') ;
				
			// }
		}
	});

	$("#tools-delete").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待删除论文信息！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条论文信息吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Paper/delete' ,
						method : 'post' ,
						data : {id:selected.id} ,
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
		}
	});

	$("#tools-import").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-tip' ,

		onClick : function(){
			alert('input') ;
		}
	});

	$("#tools-export").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-redo' ,

		onClick : function(){
			// alert('export') ;
			window.open(UPLOADS + '/3295c76acbf4caaed33c36b1b5fc2cb1.pdf');
		}
	});

	$("#tools-reload").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			$("#data-box").datagrid('reload') ;
		}
	});

	//搜索栏

	$("#search-topic").textbox({
		width : 140,
		height : 30,
		label : '课题' ,
		labelWidth : 30,
	});

	$("#search-author").textbox({
		width : 140,
		height : 30,
		label : '作者' ,
		labelWidth : 30,
	});

	$("#search-from").datebox({
		width : 160,
		height : 30,
		label : '发表日期' ,
		labelWidth : 60,
		panelWidth : 230,
		panelHeight : 250,
	});

	$("#search-to").datebox({
		width : 120,
		height : 30,
		label : '至' ,
		labelWidth : 20,
		panelWidth : 230,
		panelHeight : 250,
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
				'author' : $("#search-author").textbox('getValue').trim(),
				'from' : $("#search-from").datebox('getValue').trim(),
				'to' : $("#search-to").datebox('getValue').trim()
			}) ;
		}
	});

	$("#search-clear").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '清空' ,
		iconCls : 'icon-cancel' ,
		onClick : function(){
			$("#search-form").form('clear') ;
			$("#data-box").datagrid('load',{
				'topic' : '',
				'author' : '',
				'from' : '',
				'to' : ''
			}) ;
		}
	});

	

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		width:'100%' ,
		url : APP + "/Achievement/Paper/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'publish_date' ,
		loadMsg : '论文信息加载中。。。' ,
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
				field : 'topic' ,
				title : '课题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'all_author' ,
				title : '所有作者' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'science_category' ,
				title : '学科门类' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'final_index' ,
				title : '最终收录' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'score' ,
				title : '业绩分' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'project_source' ,
				title : '项目来源' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'page_type' ,
				title : '版面' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'publish_date' ,
				title : '出版日期' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'file_name' ,
				title : '论文附件' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				formatter: function(value,row,index){
					if (value){
						return "<a href='" + UPLOADS + "/" + value + ".pdf' target='_blank' style='color:blue'>附件</a>";
					} else {
						return '暂无';
					}
				}
			}
		]] ,

		onBeforeLoad : function(){
			$("#tools-detail").linkbutton('enable') ;
			$("#tools-edit").linkbutton('enable') ;
			$("#tools-delete").linkbutton('enable') ;
		} ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#tools-detail").linkbutton('disable') ;
				$("#tools-edit").linkbutton('disable') ;
				$("#tools-delete").linkbutton('disable') ;
				$("#data-box").datagrid('appendRow',{
					topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'topic' ,
					colspan : 8,
				}) ;
			}
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		} ,
	});

	//添加论文信息对话框
	$("#add-form").form({
		url : APP + '/Achievement/Paper/add' ,
		onSubmit : function(){
			return true ;
			if ( $("#add-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data);
			if ( result ){
				$.messager.alert('提示','论文信息新增成功！','info') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset') ;
				$("#data-box").datagrid('reload') ;
			} else {
				$.messager.alert('提示','论文信息新增失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		title : '添加论文信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	//基本信息
	$("#add-topic").textbox({
		width : 400,
		height : 30,
		label : '课&emsp;&emsp;题' ,
		labelWidth : 100,
		required : true,
		missingMessage : '论文主题非空' ,
	});

	$("#add-abstract").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '摘&emsp;&emsp;要' ,
		labelWidth : 100,
	});

	$("#add-keywords").textbox({
		width : 400,
		height : 30,
		label : '关&ensp;键&ensp;字' ,
		labelWidth : 100,
	});

	$("#add-is_translation").combobox({
		width : 400,
		height : 30,
		label : '是否译文' ,
		labelWidth : 100,
		panelHeight : 50,
		editable : false,
		textField : 'text',
		valueField : 'value' ,
		value : 1,
		data : [
			{
				text : '否' ,
				value : 1
			},
			{
				text : '是' ,
				value : 2
			}
		] ,
	});
	
	$("#add-publication").textbox({
		width : 400,
		height : 30,
		label : '发表刊物' ,
		labelWidth : 100,
		required : true,
		missingMessage : '发表刊物非空' ,
	});

	$("#add-publish_date").datebox({
		width : 400,
		height : 30,
		label : '发表时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#add-info-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
			
		}
	});

	$("#add-info-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',1);
		}
	});

	//作者信息
	$("#add-first_author").textbox({
		width : 400,
		height : 30,
		label : '第一作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '第一作者非空' ,
	});

	$("#add-first_author_type").combobox({
		width : 400,
		height : 30,
		editable : false,
		panelHeight : 50,
		label : '作者类型' ,
		labelWidth : 100,
		textField : 'text',
		valueField : 'value' ,
		value : '1' ,
		data : [
			{
				text : '老师' ,
				value : 1
			},
			{
				text : '学生' ,
				value : 2
			}
		],
	});

	$("#add-correspondence_author").textbox({
		width : 400,
		height : 30,
		label : '通讯作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '通讯作者非空' ,
	});

	$("#add-other_author").textbox({
		width : 400,
		height : 30,
		label : '其它作者' ,
		labelWidth : 100,
	});

	$("#add-all_author").textbox({
		width : 400,
		height : 30,
		label : '全部作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '全部作者非空' ,
	});

	$("#add-enter_people").textbox({
		width : 400,
		height : 30,
		label : '录&ensp;入&ensp;人' ,
		labelWidth : 100,
		required : true,
		missingMessage : '录入人非空' ,
	});

	$("#add-author-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',0) ;
		}
	});

	$("#add-author-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',2);
		}
	});

	//论文分类
	$("#add-paper_page").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/paper_page.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '版&emsp;&emsp;面' ,
		labelWidth : 100,
		panelHeight : 160,
		editable : false ,
		value : '正刊' ,
	});

	$("#add-paper_type").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/paper_type.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '类&emsp;&emsp;型' ,
		labelWidth : 100,
		panelHeight : 90,
		editable : false ,
		value : '1' ,
	});

	$("#add-prime_subject").textbox({
		width : 400,
		height : 30,
		label : '第一学科' ,
		labelWidth : 100,
		required : true,
		missingMessage : '第一学科非空' ,
	});

	$("#add-science_category").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/science_category.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '学科门类' ,
		labelWidth : 100,
		panelHeight : 150,
		editable : false ,
		value : '1' ,
	});

	$("#add-project_source").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/project_source.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '项目来源' ,
		labelWidth : 100,
		panelHeight : 100,
		editable : false ,
		value : 1,
	});

	$("#add-category-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',1) ;
		}
	});

	$("#add-category-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',3);
		}
	});
	
	//论文收录
	$("#add-data_source").tagbox({
		width : 300,
		height : 30,
		editable : false,
		label : '数据来源' ,
		labelWidth : 100,
		panelHeight : 155,
		prompt : '多选',
		url : PUBLIC + '/js/data_source.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		hasDownArrow : true,
	});

	$("#add-index_type").tagbox({
		width : 300,
		height : 30,
		editable : false,
		label : '论文收录' ,
		prompt : '多选',
		labelWidth : 100,
		panelHeight : 155,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		hasDownArrow : true,
	});

	$("#add-sci_partition").textbox({
		width : 400,
		height : 30,
		valueField : 'value' ,
		textField : 'text' ,
		label : 'SCI&ensp;分区' ,
		labelWidth : 100,
	});

	$("#add-final_index").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '最终收录' ,
		labelWidth : 100,
		panelHeight : 155,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : 'SSCI' ,
		required : true,
		missingMessage : '最终收录非空' ,
	});

	$("#add-index_year").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '收录年份' ,
		labelWidth : 100,
		panelHeight : 130,
		url : PUBLIC + '/js/year.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : '2017' ,
	});

	$("#add-index-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',2) ;
		}
	});

	$("#add-index-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',4);
		}
	});

	//附加信息
	$("#add-audit_state").combobox({
		width : 400,
		height : 30,
		label : '审核状态' ,
		labelWidth : 100,
		panelHeight : 70,
		textField : 'text',
		valueField : 'value' ,
		editable : false,
		value : '1' ,
		data : [
			{
				text : '学校通过' ,
				value : 1
			},
			{
				text : '学校不通过' ,
				value : 2
			},
			{
				text : '其它' ,
				value : 3
			},
		],
	});

	$("#add-audit_date").datebox({
		width : 400,
		height : 30,
		label : '审核时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#add-audit_year").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '审核年份' ,
		labelWidth : 100,
		panelHeight : 140,
		url : PUBLIC + '/js/year.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : 5,
	});

	$("#add-score").numberbox({
		width : 400,
		height : 30,
		label : '绩&ensp;效&ensp;分' ,
		labelWidth : 100,
		min : 0,
		max : 1000,
		value : 100,
		required : true,
		missingMessage : '绩效分非空' ,
	});

	$("#add-unit").combobox({
		width : 400,
		height : 30,
		url : APP + '/Home/Base/unit' ,
		valueField : 'id' ,
		textField : 'name' ,
		label : '所属单位' ,
		value : 1,
		labelWidth : 100,
		panelHeight : 130,
		editable : false ,
		value : '1' ,
	});

	$("#add-note").textbox({
		width : 400,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 100,
	});

	$("#add-file_name").filebox({
		width : 400,
		height : 30,
		label : '论文附件' ,
		labelWidth : 100,
		prompt : '限制上传pdf文件',
		buttonText : '选择论文附件' ,
		buttonIcon : 'icon-search' ,
		accept : 'application/pdf' ,
	});

	$("#edit-file_name").filebox({
		width : 400,
		height : 30,
		label : '论文附件' ,
		labelWidth : 100,
		prompt : '限制上传pdf文件',
		buttonText : '选择论文附件' ,
		buttonIcon : 'icon-search' ,
		accept : 'application/pdf' ,
	});

	$("#add-note-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',3) ;
		}
	});

	$("#add-note-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
		}
	});

	$("#add-cancel").linkbutton({
		width : 200,
		height : 30,

		onClick : function(){
			$("#add-form").form('clear') ;
		}
	});

	$("#add-submit").linkbutton({
		width : 200,
		height : 30,

		onClick : function(){
			$("#add-form").form('submit') ;
		}
	});

	//编辑论文信息对话框
	$("#edit-form").form({
		url : APP + '/Achievement/Paper/edit' ,
		onSubmit : function(){

			if ( $("#edit-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			if ( data != 'false' ){
				// $("#data-box").datagrid('reload') ;
				// $("#edit-box").dialog('close') ;
				// $("#edit-lesson").textbox('clear');
				// $("#edit-classes").textbox('clear');
				$.messager.alert('提示','教学信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','教学信息更新失败！','info') ;
			}
		}
	});

	$("#edit-box").dialog({
		title : '编辑论文信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	//基本信息
	$("#edit-topic").textbox({
		width : 400,
		height : 30,
		label : '课&emsp;&emsp;题' ,
		labelWidth : 100,
	});

	$("#edit-abstract").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '摘&emsp;&emsp;要' ,
		labelWidth : 100,
	});

	$("#edit-keywords").textbox({
		width : 400,
		height : 30,
		label : '关&ensp;键&ensp;字' ,
		labelWidth : 100,
	});

	$("#edit-is_translation").combobox({
		width : 400,
		height : 30,
		label : '是否译文' ,
		labelWidth : 100,
		panelHeight : 50,
		editable : false,
		textField : 'text',
		valueField : 'value' ,
		value : '否',
		data : [
			{
				text : '否' ,
				value : 0
			},
			{
				text : '是' ,
				value : 1
			}
		] ,
	});
	
	$("#edit-publication").textbox({
		width : 400,
		height : 30,
		label : '发表刊物' ,
		labelWidth : 100,
	});

	$("#edit-publish_date").datebox({
		width : 400,
		height : 30,
		label : '发表时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#edit-info-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
			
		}
	});

	$("#edit-info-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',1);
		}
	});

	//作者信息
	$("#edit-first_author").textbox({
		width : 400,
		height : 30,
		label : '第一作者' ,
		labelWidth : 100,
	});

	$("#edit-first_author_type").combobox({
		width : 400,
		height : 30,
		editable : false,
		panelHeight : 50,
		label : '作者类型' ,
		labelWidth : 100,
		textField : 'text',
		valueField : 'value' ,
		value : '老师' ,
		data : [
			{
				text : '老师' ,
				value : '老师' 
			},
			{
				text : '学生' ,
				value : '学生'
			}
		],
	});

	$("#edit-correspondence_author").textbox({
		width : 400,
		height : 30,
		label : '通讯作者' ,
		labelWidth : 100,
	});

	$("#edit-other_author").textbox({
		width : 400,
		height : 30,
		label : '其它作者' ,
		labelWidth : 100,
	});

	$("#edit-all_author").textbox({
		width : 400,
		height : 30,
		label : '全部作者' ,
		labelWidth : 100,
	});

	$("#edit-enter_people").textbox({
		width : 400,
		height : 30,
		label : '录&ensp;入&ensp;人' ,
		labelWidth : 100,
	});

	$("#edit-author-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',0) ;
		}
	});

	$("#edit-author-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',2);
		}
	});

	//论文分类
	$("#edit-paper_page").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/paper_page.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '版&emsp;&emsp;面' ,
		labelWidth : 100,
		panelHeight : 160,
		editable : false ,
	});

	$("#edit-paper_type").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/paper_type.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '类&emsp;&emsp;型' ,
		labelWidth : 100,
		panelHeight : 90,
		editable : false ,
		value : 1,
	});

	$("#edit-prime_subject").textbox({
		width : 400,
		height : 30,
		label : '第一学科' ,
		labelWidth : 100,
	});

	$("#edit-science_category").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/science_category.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '学科门类' ,
		labelWidth : 100,
		panelHeight : 150,
		editable : false ,
	});

	$("#edit-project_source").combobox({
		width : 400,
		height : 30,
		url : PUBLIC + '/js/project_source.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		label : '项目来源' ,
		labelWidth : 100,
		panelHeight : 70,
		editable : false ,
		value : '1' ,
	});

	$("#edit-category-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',1) ;
		}
	});

	$("#edit-category-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',3);
		}
	});
	
	//论文收录
	$("#edit-data_source").tagbox({
		width : 300,
		height : 30,
		editable : false,
		label : '数据来源' ,
		labelWidth : 100,
		panelHeight : 155,
		prompt : '多选',
		url : PUBLIC + '/js/data_source.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		hasDownArrow : true,
	});

	$("#edit-index_type").tagbox({
		width : 300,
		height : 30,
		editable : false,
		label : '论文收录' ,
		prompt : '多选',
		labelWidth : 100,
		panelHeight : 155,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		hasDownArrow : true,
	});

	$("#edit-sci_partition").textbox({
		width : 400,
		height : 30,
		valueField : 'value' ,
		textField : 'text' ,
		label : 'SCI&ensp;分区' ,
		labelWidth : 100,
	});

	$("#edit-final_index").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '最终收录' ,
		labelWidth : 100,
		panelHeight : 155,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : '1' ,
	});

	$("#edit-index_year").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '收录年份' ,
		labelWidth : 100,
		panelHeight : 155,
		url : PUBLIC + '/js/year.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : 5,
	});

	$("#edit-index-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',2) ;
		}
	});

	$("#edit-index-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',4);
		}
	});

	//附加信息
	$("#edit-audit_state").combobox({
		width : 400,
		height : 30,
		label : '审核状态' ,
		labelWidth : 100,
		panelHeight : 70,
		textField : 'text',
		valueField : 'value' ,
		editable : false,
		value : '学校通过' ,
		data : [
			{
				text : '学校通过' ,
				value : '学校通过'
			},
			{
				text : '学校不通过' ,
				value : '学校不通过'
			},
			{
				text : '其它' ,
				value : '其它'
			},
		],
	});

	$("#edit-audit_date").datebox({
		width : 400,
		height : 30,
		label : '审核时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#edit-audit_year").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '审核年份' ,
		labelWidth : 100,
		panelHeight : 140,
		url : PUBLIC + '/js/year.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : '2017' ,
	});

	$("#edit-score").numberbox({
		width : 400,
		height : 30,
		label : '绩&ensp;效&ensp;分' ,
		labelWidth : 100,
		min : 0,
		max : 1000,
	});

	$("#edit-unit").combobox({
		width : 400,
		height : 30,
		url : APP + '/Home/Base/unit' ,
		valueField : 'id' ,
		textField : 'name' ,
		label : '所属单位' ,
		value : 1,
		labelWidth : 100,
		panelHeight : 130,
		editable : false ,
	});

	$("#edit-note").textbox({
		width : 400,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 100,
	});

	$("#edit-note-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',3) ;
		}
	});

	$("#edit-note-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
		}
	});

	$("#edit-cancel").linkbutton({
		width : 200,
		height : 30,

		onClick : function(){
			$("#edit-form").form('clear') ;
		}
	});

	$("#edit-submit").linkbutton({
		width : 200,
		height : 30,

		onClick : function(){
			alert('submit') ;
		}
	});
});