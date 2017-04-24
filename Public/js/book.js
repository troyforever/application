$(function(){

	$("#content").window({
		title : '成果管理&emsp;/&emsp;著作信息',
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
		iconCls : 'icon-detail' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待查看著作信息！','info') ;
			} else {
				$.ajax({
					url : APP + '/Achievement/Book/find' ,
					method : 'POST' ,
					data : { id:selected.id} ,
					dataType : 'JSON' ,
					async : false ,

					success : function(data){
						$("#detail-title").text(data.title);
						$("#detail-author").text(data.author);
						$("#detail-other_author").text(data.other_author ? data.other_author : '无');
						$("#detail-publication").text(data.publication);
						$("#detail-publication_date").text(data.publication_date);
						$("#detail-price").text(data.price);

						$("#detail-abstract").text(data.abstract ? data.abstract : '无');
						$("#detail-aim_user").text(data.aim_user ? data.aim_user : '无');
						$("#detail-note").text(data.note ? data.note : '无');
						if ( data.file_name ){
							$("#detail-file_name").text('点击查看') ;
							$("#detail-file_name").attr('onclick','window.open("' + ROOT + '/Uploads/Book/' + data.file_name + '")') ;
						} else {
							$("#detail-file_name").text('暂无附件').removeAttr('onclick') ;
						}
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
				$.messager.alert('提示','请先选中待编辑著作信息！','info') ;
			} else {
				$.ajax({
					url : APP + '/Achievement/Book/find' ,
					method : 'POST' ,
					data : { id:selected.id} ,
					dataType : 'JSON' ,
					async : false ,

					success : function(data){

						$("#edit-form").form('load',{
							'edit-id' : data.id,
							'edit-title' : data.title ,
							'edit-author' : data.author ,
							'edit-other_author' : data.other_author ,
							'edit-publication' : data.publication,
							'edit-publication_date' : data.publication_date,
							'edit-price' : data.price,

							'edit-abstract' : data.abstract,
							'edit-aim_user' : data.aim_user,
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
				$.messager.alert('提示','请先选中待删除著作信息！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条著作信息吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Book/delete' ,
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

	$("#search-title").textbox({
		width : 180,
		height : 30,
		label : '题名' ,
		labelWidth : 40,
	});

	$("#search-publication_date").numberspinner({
		width : 200,
		height : 30,
		label : '出版年份' ,
		labelWidth : 60,
		min : 2000,
		max : 2017,
		increment : 1,
	});

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'title' : $("#search-title").textbox('getValue').trim(),
				'year' : $("#search-publication_date").numberspinner('getValue'),
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
			$("#data-box").datagrid('load',{
				'title' : '',
				'year' : '',
			}) ;
		}
	});

	

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		width:'100%' ,
		url : APP + "/Achievement/Book/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'publication_date' ,
		loadMsg : '著作信息加载中。。。' ,
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
				field : 'title' ,
				title : '课题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'price' ,
				title : '定价' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'publication' ,
				title : '出版单位' ,
				width : 50,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'publication_date' ,
				title : '年份' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'file_name' ,
				title : '附件' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				formatter : function(value,row,index){
					if ( ! value ){
						return "暂无" ;
					} else {
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Book/' + value + '\')">查看</a>'
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
					title : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'title' ,
					colspan : 5,
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

	//添加著作信息对话框
	$("#add-form").form({
		url : APP + '/Achievement/Book/add' ,
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
				$.messager.alert('提示','著作信息新增成功！','info') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset') ;
				$("#data-box").datagrid('reload') ;
			} else {
				$.messager.alert('提示','著作信息新增失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		title : '添加著作信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#detail-box").dialog({
		title : '著作详情信息',
		iconCls : 'icon-detail' ,
		modal : true ,
		closed : true ,
	});

	//基本信息
	$("#add-title").textbox({
		width : 400,
		height : 30,
		label : '题&emsp;&emsp;名' ,
		labelWidth : 100,
		required : true,
		missingMessage : '题名非空' ,
	});

	$("#add-author").textbox({
		width : 400,
		height : 30,
		label : '责任作者' ,
		labelWidth : 100,
		required : true,
		missingMessage : '责任非空' ,
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
		label : '出版单位' ,
		labelWidth : 100,
		required : true,
		missingMessage : '出版单位非空' ,
	});

	$("#add-publication_date").numberspinner({
		width : 400,
		height : 30,
		label : '出版年份' ,
		labelWidth : 100,
		min : 2000,
		max : 2017,
		enable :false,
		value : 2017,
		increment : 1,
	});

	$("#add-price").numberspinner({
		width : 400,
		height : 30,
		label : '定&emsp;&emsp;价' ,
		labelWidth : 100,
		min : 0,
		precision : 1,
		value : 50,
		increment : 1,
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

	//详细信息
	$("#add-abstract").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '摘&emsp;&emsp;要' ,
		labelWidth : 100,
	});

	$("#add-aim_user").textbox({
		width : 400,
		height : 30,
		label : '适用读者' ,
		labelWidth : 100,
	});

	$("#add-note").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 100,
	});

	$("#add-file_name").filebox({
		width : 400,
		height : 30,
		label : '著作附件' ,
		labelWidth : 100,
		prompt : '著作附件',
		buttonText : '著作附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#add-detail-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#add-tabs").tabs('select',0) ;
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
	




	//编辑著作信息对话框
	$("#edit-form").form({
		url : APP + '/Achievement/Book/edit' ,
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
				$.messager.alert('提示','著作信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','著作信息更新失败！','info') ;
			}
		}
	});

	$("#edit-box").dialog({
		title : '编辑著作信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	//基本信息
	$("#edit-title").textbox({
		width : 400,
		height : 30,
		label : '题&emsp;&emsp;名' ,
		labelWidth : 100,
		required : true,
		missingMessage : '题名非空' ,
	});

	$("#edit-author").textbox({
		width : 400,
		height : 30,
		label : '责任作者' ,
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

	$("#edit-publication_date").numberspinner({
		width : 400,
		height : 30,
		label : '出版年份' ,
		labelWidth : 100,
		min : 2000,
		max : 2017,
		value : 2017,
		increment : 1,
	});

	$("#edit-price").numberspinner({
		width : 400,
		height : 30,
		label : '定&emsp;&emsp;价' ,
		labelWidth : 100,
		min : 0,
		precision : 1,
		value : 50,
		increment : 1,
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

	//详细信息
	$("#edit-abstract").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '摘&emsp;&emsp;要' ,
		labelWidth : 100,
	});

	$("#edit-aim_user").textbox({
		width : 400,
		height : 30,
		label : '适用读者' ,
		labelWidth : 100,
	});

	$("#edit-note").textbox({
		width : 400,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 100,
	});

	$("#edit-file_name").filebox({
		width : 400,
		height : 30,
		label : '著作附件' ,
		labelWidth : 100,
		prompt : '著作附件',
		buttonText : '著作附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#edit-detail-prev").linkbutton({
		width : 250,
		height : 40,
		plain : true,

		onClick : function(){
			$("#edit-tabs").tabs('select',0) ;
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