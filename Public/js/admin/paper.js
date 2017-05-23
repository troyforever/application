$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;科研论文',
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
				url : APP + '/Achievement/Paper/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Paper/File/' + data) ;
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
			var from = $("#search-from").datebox('getValue').trim();
			var to = $("#search-to").datebox('getValue').trim();
			$.ajax({
				url : APP + '/Achievement/Paper/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {topic:topic,unit:unit,from:from,to:to},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Paper/File/' + data) ;
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
			var from = $("#search-from").datebox('getValue').trim();
			var to = $("#search-to").datebox('getValue').trim();
			// if ( selects.length == 0 ){
			// 	$.messager.confirm('下载提示','确定导出全部附件?',function(result){
			// 		if ( result ){
			// 			$.ajax({
			// 				url : APP + '/Achievement/Paper/downloadAll' ,
			// 				data : {topic:topic,unit:unit,from:from,to:to} ,
			// 				method : 'POST' ,
			// 				dataType : 'JSON' ,
			// 				async : false,

			// 				success : function(data){
			// 					if ( data ){
			// 						window.open(ROOT + '/Uploads/Paper/File/' + data) ;
			// 					} else {
			// 						$.messager.alert('提示','暂无附件下载','info') ;
			// 					}
			// 				}
			// 			});
			// 		}
			// 	}) ;
			// } else {
			// 	var str = '' ;

			// 	for ( var i = 0 ; i < selects.length ; i ++ ){
			// 		str += selects[i].id + '-' ;
			// 	}

			// 	str = str.substr(0,str.length-1) ;
				
			// 	$.ajax({
			// 		url : APP + '/Achievement/Paper/downloadSelect' ,
			// 		data : {selects:str} ,
			// 		method : 'POST' ,
			// 		dataType : 'JSON' ,
			// 		async : false,

			// 		success : function(data){
			// 			if ( data ){
			// 				window.open(ROOT + '/Uploads/Paper/File/' + data ) ;
			// 			} else {
			// 				$.messager.alert('下载提示','尚无附件下载','info') ;
			// 			}
			// 		}
			// 	});
			// }

			$.ajax({
							url : APP + '/Achievement/Paper/downloadAll' ,
							data : {topic:topic,unit:unit,from:from,to:to} ,
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Paper/File/' + data) ;
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
			$("#download-select").linkbutton('disable') ;
		}
	});

	//搜索栏
	$("#search-topic").textbox({
		width : 180,
		height : 30,
		label : '课题' ,
		labelWidth : 30,
	});

	$("#search-unit").combobox({
		width : 180,
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

	$("#search-from").datebox({
		width : 150,
		height : 30,
		label : '日期' ,
		labelWidth : 30,
		panelWidth : 230,
		panelHeight : 250,
	});

	$("#search-to").datebox({
		width : 150,
		height : 30,
		label : '至' ,
		labelWidth : 30,
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
				'unit' : $("#search-unit").combobox('getValue').trim(),
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
		iconCls : 'icon-clear' ,
		onClick : function(){
			$("#search-form").form('clear') ;
			$("#data-box").datagrid('load',{}) ;
		}
	});

	//详情框
	$("#detail-box").dialog({
		title : '科研论文详情信息',
		iconCls : 'icon-detail' ,
		modal : true ,
		closed : true ,
	});

	$("#data-box").datagrid({
		fitColumns : true ,
		width:'100%' ,
		url : APP + "/Achievement/Paper/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'publication_date' ,
		loadMsg : '科研论文信息加载中。。。' ,
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
				title : '课题' ,
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
				field : 'publication' ,
				title : '出版物' ,
				width : 50,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'first_author' ,
				title : '第一作者' ,
				width : 50,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit_name' ,
				title : '部门（系）' ,
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
				sortable : true ,
				sortOrder : 'desc' , 
			},
			{
				field : 'final_index' ,
				title : '论文收录' ,
				width : 25 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'if_num' ,
				title : '影响因子' ,
				width : 25 ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Paper/' + value + '\')">查看</a>'
					}
				}
			},
			{
				field : 'operation' ,
				title : '操作' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-detail\"' onclick='detail(" + row.id + ")'>详情</a>" +
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
});
	

function detail(id){
	$.ajax({
					url : APP + '/Achievement/paper/find' ,
					method : 'POST' ,
					data : { id:id} ,
					dataType : 'JSON' ,
					async : false ,

					success : function(data){
						$("#detail-topic").text(data.topic);
						$("#detail-unit_name").text(data.unit_name);
						$("#detail-first_author").text(data.first_author);
						$("#detail-other_author").text(data.other_author ? data.other_author : '无');
						$("#detail-publication").text(data.publication);
						$("#detail-publication_date").text(data.publication_date);

						$("#detail-final_index").text(data.final_index);
						$("#detail-index_date").text(data.index_date);
						$("#detail-sci_partition").text(data.sci_partition ? data.sci_partition : '无');
						$("#detail-if_num").text(data.if_num);

						$("#detail-abstract").text(data.abstract ? data.abstract : '无');
						$("#detail-keywords").text(data.keywords ? data.keywords : '无');
						$("#detail-note").text(data.note ? data.note : '无');
						if ( data.file_name ){
							$("#detail-file_name").text('点击查看') ;
							$("#detail-file_name").attr('onclick','window.open("' + ROOT + '/Uploads/Paper/' + data.file_name + '")') ;
						} else {
							$("#detail-file_name").text('暂无附件').removeAttr('onclick') ;
						}
					}

				});

				$("#detail-box").dialog('open') ;
}