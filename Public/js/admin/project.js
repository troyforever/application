$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;科研项目',
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
				url : APP + '/Achievement/Project/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Project/File/' + data) ;
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
				url : APP + '/Achievement/Project/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {id:id,topic:topic,unit:unit,start_date:start_date},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Project/File/' + data) ;
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
							url : APP + '/Achievement/Project/downloadAll' ,
							data : {id:id,topic:topic,unit:unit,start_date:start_date} ,
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Project/File/' + data) ;
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
					url : APP + '/Achievement/Project/downloadSelect' ,
					data : {selects:str} ,
					method : 'POST' ,
					dataType : 'JSON' ,
					async : false,

					success : function(data){
						if ( data ){
							window.open(ROOT + '/Uploads/Project/File/' + data ) ;
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

	$("#search-start_date").datebox({
		width : 160,
		height : 30,
		label : '开始日期' ,
		labelWidth : 60,
		editable : false,
		panelHeight : 250,
		panelWidth : 250
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
				'unit' : $("#search-unit").textbox('getValue').trim(),
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
		url : APP + "/Achievement/Project/data" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'start_date' ,
		loadMsg : '科研项目信息加载中。。。' ,
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
				field : 'author' ,
				title : '责任人' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Project/' + value + '\')">查看</a>'
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
});
