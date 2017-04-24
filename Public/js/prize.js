$(function(){

	$("#content").window({
		title : '个人经历&emsp;/&emsp;获奖情况',
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
		height : 30,
		plain : true ,
		iconCls : 'icon-add' ,

		onClick : function(){
			$("#add-box").dialog('open') ;
		}
	});

	$("#tools-delete").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			var selected = $("#data-box").datagrid('getSelected') ;
			if ( selected == null ){
				$.messager.alert('提示','请先选中待删除获奖情况！','info') ;
			} else {
				$.messager.confirm('删除提示','您确定要删除这条获奖情况吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/Achievement/Prize/delete' ,
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
		width : 200,
		height : 30,
		label : '活动主题' ,
		labelWidth : 60,
	});

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			loadData(1,$("#search-topic").textbox('getValue').trim()) ;
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
			loadData(1,null) ;
		}
	});

	

	// $("#data-box").datagrid({
	// 	fitColumns : true ,
	// 	singleSelect : true ,
	// 	width:'100%' ,
	// 	url : APP + "/Achievement/Prize/data" ,
	// 	striped : true ,
	// 	checkOnSelect : true ,
	// 	sortName : 'social_date' ,
	// 	loadMsg : '获奖情况加载中。。。' ,
	// 	sortOrder : 'desc' ,
	// 	multiSort : true ,
	// 	remoteSort : true ,
	// 	method : 'POST' ,
	// 	pagination : true ,
	// 	pageSize : 5,
	// 	pageList : [5],
	// 	columns : [[
	// 		{
	// 			field : 'ck' ,
	// 			checkbox : 'true' ,
	// 		},
	// 		{
	// 			field : 'id' ,
	// 			hidden : true,
	// 		},
	// 		{
	// 			field : 'topic' ,
	// 			title : '活动主题' ,
	// 			width : 100 ,
	// 			align : 'center' ,
	// 			halign : 'center' ,
	// 			sortable : true ,
	// 			sortOrder : 'asc' , 
	// 		},
	// 		{
	// 			field : 'location' ,
	// 			title : '地点' ,
	// 			width : 100 ,
	// 			align : 'center' ,
	// 			halign : 'center' ,
	// 			sortable : true ,
	// 			sortOrder : 'asc' , 
	// 		},
	// 		{
	// 			field : 'social_date' ,
	// 			title : '日期' ,
	// 			width : 100 ,
	// 			align : 'center' ,
	// 			halign : 'center' ,
	// 		},
	// 		{
	// 			field : 'note' ,
	// 			title : '备注' ,
	// 			width : 100 ,
	// 			align : 'center' ,
	// 			halign : 'center' ,
	// 			sortable : true ,
	// 			sortOrder : 'desc' , 

	// 			formatter : function(value,row,index){
	// 				if ( ! value ){
	// 					return "无" ;
	// 				} else {
	// 					return value ;
	// 				}
	// 			}
	// 		},
	// 		{
	// 			field : 'file_name' ,
	// 			title : '附件' ,
	// 			width : 100 ,
	// 			align : 'center' ,
	// 			halign : 'center' ,

	// 			formatter : function(value,row,index){
	// 				if ( ! value ){
	// 					return "暂无" ;
	// 				} else {
	// 					return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Prize/' + value + '\')">查看</a>'
	// 				}
	// 			}
	// 		},
	// 	]] ,

	// 	onBeforeLoad : function(){
	// 		$("#tools-detail").linkbutton('enable') ;
	// 		$("#tools-edit").linkbutton('enable') ;
	// 		$("#tools-delete").linkbutton('enable') ;
	// 	} ,

	// 	onLoadSuccess : function(data){
	// 		if ( data.total == 0 ){
	// 			$("#tools-detail").linkbutton('disable') ;
	// 			$("#tools-edit").linkbutton('disable') ;
	// 			$("#tools-delete").linkbutton('disable') ;
	// 			$("#data-box").datagrid('appendRow',{
	// 				topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
	// 			}).datagrid('mergeCells',{
	// 				index : 0,
	// 				field : 'topic' ,
	// 				colspan : 5,
	// 			}) ;
	// 		}
	// 	},

	// 	onBeforeSelect : function(index,row){
	// 		if ( row == $("#data-box").datagrid('getSelected') ){
	// 			$("#data-box").datagrid('clearChecked') ;
	// 			return false ;
	// 		}
	// 	} ,
	// });

	//添加学历信息对话框

	$("#add-form").form({
		url : APP + '/Achievement/Prize/add' ,
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
				var page = $("#page").pagination('options') ;
				loadData(page.pageNumber == 0 ? 1 : page.pageNumber) ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset') ;
				$.messager.alert('提示','获奖信息添加成功！','info') ;
			} else {
				$.messager.alert('提示','获奖信息添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 512,
		height : 330,
		title : '添加获奖情况信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-topic").textbox({
		width : 300,
		height : 30,
		label : '奖&emsp;&emsp;项' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '奖项' ,
	});

	$("#add-prize_img").filebox({
		width : 300,
		height : 30,
		label : '获奖图片' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
		required : true,
		missingMessage : '获奖图片非空' ,
	});

	$("#add-note").textbox({
		width : 300,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
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
			$("#add-form").form('reset') ;
		}
	});


	//编辑学历信息对话框
	$("#edit-box").dialog({
		width : 512,
		height : 330,
		title : '编辑获奖信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		url : APP + '/Achievement/Prize/edit' ,
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
				var prize = find($("#id").val()) ;
				var page = $("#page").pagination('options') ;
				$("#img-dialog img").attr('src',ROOT + '/Uploads/Prize/Img/' + prize.prize_img + '?temp=' + Math.random()) ;
				$("#note").text(prize.note ? prize.note : '暂无备注');
				$(".panel-header-noborder .panel-title").text(prize.topic) ;
				loadData(page.pageNumber) ;
				$.messager.alert('提示','获奖信息更新成功！','info') ;
			} else {
				$.messager.alert('提示','获奖信息更新失败！','info') ;
			}
		}
	});

	$("#edit-topic").textbox({
		width : 300,
		height : 30,
		label : '奖&emsp;&emsp;项' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '奖项' ,
	});

	$("#edit-prize_img").filebox({
		width : 300,
		height : 30,
		label : '获奖图片' ,
		labelWidth : 70,
		prompt : '附件',
		buttonText : '附件' ,
		buttonIcon : 'icon-search' ,
	});

	$("#edit-note").textbox({
		width : 300,
		height : 30,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
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

	$("#page").pagination({
		pageList:[6,8] ,

		onSelectPage : function(pageNumber,pageSize){
			loadData(pageNumber,null) ;
		}
	});

	$("#img-dialog").dialog({
		border : false,
		title : '获奖',
		closed : true,
		headerCls : 'header-cls' ,
	}) ;

	$("#img-edit").linkbutton({
		width : 200,
		height : 40,
		plain : true,
		iconCls : 'icon-edit' ,

		onClick : function(){
			var prize = find($("#id").val()) ;

			$("#edit-form").form('load',{
							'edit-id' :  prize.id,
							'edit-topic' : prize.topic ,
							'edit-note' : prize.note
			});
			$("#edit-box").dialog('open') ;
		}
	});

	$("#img-delete").linkbutton({
		width : 200,
		height : 40,
		plain : true,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$.messager.confirm('提示','确认删除此条获奖信息吗？',function(result){
				if ( result ){
					$.ajax({
						url : APP + '/Achievement/Prize/delete' ,
						method : 'POST' ,
						data : {id:$("#id").val()} ,
						async : false,
						dataType : 'JSON' ,

						success : function(data){
							var page = $("#page").pagination('options') ;
							if ( data ){
								$("#img-dialog").dialog('close') ;
								loadData(page.pageNumber) ;
								$.messager.alert('提示','删除成功','info') ;
							} else{
								$.messager.alert('提示','删除失败','info') ;
							}
						}
					});
				}
			});
		}
	});

	$("#img-close").linkbutton({
		width : 200,
		height : 40,
		plain : true,
		iconCls : 'icon-reload' ,

		onClick : function(){
			$("#img-dialog").dialog('close') ;
		}
	});

	// $(window).resize(function(){
	// 	for ( var i = 0 ; i < 1000 ; i ++ );
	// 	var rows = parseInt($("#content").width() / 260 ) * 2 ;
	// 	alert($("#content").width()) ;
	// 	var pageSize = $("#page").pagination('options').pageSize ;
	// 	if (  rows != pageSize )
	// 		loadData($("#page").pagination('options').pageNumber) ;
	// });

	loadData(1,null) ;
});

function loadData(page,topic){
	var rows = parseInt($("#content").width() / 260 ) * 2 ;
	$.ajax({
		url : APP + '/Achievement/Prize/data' ,
		method : 'POST' ,
		data : {page:page,rows:rows,topic:topic} ,
		async : false,
		dataType : 'JSON' ,

		success : function(data){

			$("#prize").empty();

			if ( data.rows.length != 0 ){

				for ( var i = 0 ; i < data.rows.length ; i ++ ){
					var str = '<div class="prize-item">'+
								'<img id="' + data.rows[i].id + '" src="' + ROOT + '/Uploads/Prize/Img/' + data.rows[i].prize_img + '?temp=' + Math.random() + '" alt="图片无法显示" title="' + data.rows[i].topic + '"  />'+
								'</div>';

					$("#prize").append(str);
				}

				$(".prize-item img").click(function(){
						var prize = find(this.id) ;
						$("#img-dialog img").attr('src',this.src) ;
						$("#img-dialog").dialog('open');
						$("#note").text(prize.note ? prize.note : '暂无备注');
						$(".panel-header-noborder .panel-title").text(prize.topic) ;
						$("#id").val(prize.id) ;
				});
				

				$("#page").pagination('refresh',{
					total : data.total ,
					pageNumber : page,
					pageSize : rows
				});

				$("#page").show();
			} else {
				$("#page").hide();
				$("#prize").append('<h2 style="text-align:center">暂无获奖记录,<a href="javascript:;" onclick="javascript:$(\'#add-box\').dialog(\'open\')">点击添加</a></h2>')
			}
		}
	});
}

function find(id){
	var result ;
	$.ajax({
		url : APP + '/Achievement/Prize/find' ,
		method : 'POST' ,
		data : {id:id},
		async :false ,
		dataType : 'JSON' ,

		success : function(data) {
			result  = data ;
		},
	});
	return result ;
}