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
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待查看论文信息！','info') ;
			} else {
				$.ajax({
					url : APP + '/Achievement/paper/find' ,
					method : 'POST' ,
					data : { id:selected.id} ,
					dataType : 'JSON' ,
					async : false ,

					success : function(data){
						$("#detail-topic").text(data.topic);
						$("#detail-first_author").text(data.first_author);
						$("#detail-other_author").text(data.other_author ? data.other_author : '无');
						$("#detail-publication").text(data.publication);
						$("#detail-publication_date").text(data.publication_date);

						$("#detail-final_index").text(data.final_index);
						$("#detail-index_date").text(data.index_date);
						$("#detail-sci_partition").text(data.sci_partition ? data.sci_partition : '无');
						$("#detail-if").text(data.if);

						$("#detail-abstract").text(data.abstract ? data.abstract : '无');
						$("#detail-keywords").text(data.keywords ? data.keywords : '无');
						$("#detail-note").text(data.note ? data.note : '无');
						if ( data.file_name ){
							$("#detail-file_name").text('点击查看') ;
							$("#detail-file_name").attr('onclick','window.open("' + ROOT + '/Uploads/Paper/' + data.file_name + '")') ;
						} else {
							$("#detail-file_name").text('暂无附件').removeAttr('onclick') ;
						}
						// $("#edit-form").form('load',{
						// 	'edit-id' : data.id,
						// 	'edit-topic' : data.topic ,
						// 	'edit-first_author' : data.first_author ,
						// 	'edit-other_author' : data.other_author ,
						// 	'edit-publication' : data.publication,
						// 	'edit-publication_date' : data.publication_date,

						// 	'edit-final_index' : data.final_index ,
						// 	'edit-index_date' : data.index_date ,
						// 	'edit-sci_partition' : data.sci_partition ,
						// 	'edit-unit' : data.unit_id ,

						// 	'edit-abstract' : data.abstract,
						// 	'edit-keywords' : data.keywords,
						// 	'edit-note' : data.note,
						// });
					}

				});

				$("#detail-box").dialog('open') ;
			}
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
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待编辑论文信息！','info') ;
			} else {
				$.ajax({
					url : APP + '/Achievement/paper/find' ,
					method : 'POST' ,
					data : { id:selected.id} ,
					dataType : 'JSON' ,
					async : false ,

					success : function(data){

						$("#edit-form").form('load',{
							'edit-id' : data.id,
							'edit-topic' : data.topic ,
							'edit-first_author' : data.first_author ,
							'edit-other_author' : data.other_author ,
							'edit-publication' : data.publication,
							'edit-publication_date' : data.publication_date,

							'edit-final_index' : data.final_index ,
							'edit-index_date' : data.index_date ,
							'edit-sci_partition' : data.sci_partition ,
							'edit-unit' : data.unit_id ,

							'edit-abstract' : data.abstract,
							'edit-keywords' : data.keywords,
							'edit-note' : data.note,
						});
					}

				});

				$("#edit-box").dialog('open') ;
			}
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
		width : 180,
		height : 30,
		label : '课题' ,
		labelWidth : 30,
	});

	$("#search-from").datebox({
		width : 200,
		height : 30,
		label : '发表日期' ,
		labelWidth : 60,
		panelWidth : 230,
		panelHeight : 250,
	});

	$("#search-to").datebox({
		width : 160,
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
		sortName : 'publication_date' ,
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
				field : 'publication' ,
				title : '出版物' ,
				width : 50,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'publication_date' ,
				title : '发表时间' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'final_index' ,
				title : '论文收录' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'if' ,
				title : '影响因子' ,
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
				formatter : function(value,row,index){
					if ( ! value ){
						return "暂无" ;
					} else {
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Paper/' + value + '\')">查看</a>'
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
					colspan : 6,
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

	$("#detail-box").dialog({
		title : '论文详情信息',
		iconCls : 'icon-more' ,
		modal : true ,
		closed : true ,
	});

	//基本信息
	$("#add-topic").textbox({
		width : 400,
		height : 30,
		label : '文&ensp;章&ensp;名' ,
		labelWidth : 100,
		required : true,
		missingMessage : '文章名非空' ,
	});

	$("#add-first_author").textbox({
		width : 400,
		height : 30,
		label : '第一作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '第一作者非空' ,
	});

	$("#add-other_author").textbox({
		width : 400,
		height : 30,
		label : '其它作者' ,
		labelWidth : 100,
	});

	$("#add-publication").textbox({
		width : 400,
		height : 30,
		label : '发表刊物' ,
		labelWidth : 100,
		required : true,
		missingMessage : '发表刊物非空' ,
	});

	$("#add-publication_date").datebox({
		width : 400,
		height : 30,
		label : '发表时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#add-base-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
			
		}
	});

	$("#add-base-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',1);
		}
	});

	//检索信息
	$("#add-final_index").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '最终收录' ,
		labelWidth : 100,
		panelHeight : 135,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : 'SSCI' ,
		required : true,
		missingMessage : '检索信息非空' ,
	});

	$("#add-index_date").datebox({
		width : 400,
		height : 30,
		label : '检索时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#add-sci_partition").textbox({
		width : 400,
		height : 30,
		label : 'SCI&ensp;分区' ,
		labelWidth : 100,
	});

	$("#add-if").numberspinner({
		width : 400,
		height : 30,
		label : '影响因子' ,
		labelWidth : 100,
		min : 0,
		max : 10,
		value : 5.0,
		increment : 0.1,
		precision : 2,
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

	$("#add-index-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',0) ;
		}
	});

	$("#add-index-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',2);
		}
	});

	//详细信息
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
		prompt : '论文附件',
		buttonText : '论文附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#add-detail-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',1) ;
		}
	});

	$("#add-detail-next").linkbutton({
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
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#add-form").form('clear') ;
		}
	});

	$("#add-submit").linkbutton({
		width : 200,
		height : 30,
		iconCls : 'icon-ok' ,

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
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset') ;
				$("#data-box").datagrid('reload') ;
				$.messager.alert('提示','论文信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','论文信息更新失败！','info') ;
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
		label : '文&ensp;章&ensp;名' ,
		labelWidth : 100,
		required : true,
		missingMessage : '文章名非空' ,
	});

	$("#edit-first_author").textbox({
		width : 400,
		height : 30,
		label : '第一作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '第一作者非空' ,
	});

	$("#edit-other_author").textbox({
		width : 400,
		height : 30,
		label : '其它作者' ,
		labelWidth : 100,
	});

	$("#edit-publication").textbox({
		width : 400,
		height : 30,
		label : '发表刊物' ,
		labelWidth : 100,
		required : true,
		missingMessage : '发表刊物非空' ,
	});

	$("#edit-publication_date").datebox({
		width : 400,
		height : 30,
		label : '发表时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#edit-base-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,
		disabled : true,

		onClick : function(){
			
		}
	});

	$("#edit-base-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',1);
		}
	});

	//检索信息
	$("#edit-final_index").combobox({
		width : 400,
		height : 30,
		editable : false,
		label : '最终收录' ,
		labelWidth : 100,
		panelHeight : 135,
		url : PUBLIC + '/js/index.json' ,
		valueField : 'value' ,
		textField : 'text' ,
		value : 'SSCI' ,
		required : true,
		missingMessage : '检索信息非空' ,
	});

	$("#edit-index_date").datebox({
		width : 400,
		height : 30,
		label : '检索时间' ,
		labelWidth : 100,
		panelWidth : 250,
		panelHeight : 250,
		editable : false,
		value : '2017-1-1' ,
	});

	$("#edit-sci_partition").textbox({
		width : 400,
		height : 30,
		label : 'SCI&ensp;分区' ,
		labelWidth : 100,
	});

	$("#edit-if").numberspinner({
		width : 400,
		height : 30,
		label : '影响因子' ,
		labelWidth : 100,
		min : 0,
		max : 10,
		value : 5.0,
		increment : 0.1,
		precision : 2,
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
		value : '1' ,
	});

	$("#edit-index-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',0) ;
		}
	});

	$("#edit-index-next").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',2);
		}
	});

	//详细信息
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

	$("#edit-note").textbox({
		width : 400,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 100,
	});

	$("#edit-file_name").filebox({
		width : 400,
		height : 30,
		label : '论文附件' ,
		labelWidth : 100,
		prompt : '论文附件',
		buttonText : '论文附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#edit-detail-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',1) ;
		}
	});

	$("#edit-detail-next").linkbutton({
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
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#edit-form").form('clear') ;
		}
	});

	$("#edit-submit").linkbutton({
		width : 200,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit') ;
		}
	});
});