$(function(){
	$("#content").window({
		title : '教学成果&emsp;/&emsp;教学论文',
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
				url : APP + '/Teach/Paper/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Teach_Paper/File/' + data) ;
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
				url : APP + '/Teach/Paper/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {topic:topic,unit:unit,from:from,to:to},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Teach_Paper/File/' + data) ;
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
			
			$.ajax({
							url : APP + '/Teach/Paper/downloadAll' ,
							data : {topic:topic,unit:unit,from:from,to:to} ,
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Teach_Paper/File/' + data) ;
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
				'unit' : $("#search-unit").combobox('getValue'),
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

	

	$("#data-box").datagrid({
		fitColumns : true ,
		width:'100%' ,
		url : APP + "/Teach/Paper/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'publication_date' ,
		loadMsg : '教学论文信息加载中。。。' ,
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
				width : 50 ,
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
				field : 'if_num' ,
				title : '影响因子' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Teach_Paper/' + value + '\')">查看</a>'
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