$(function(){

	$("#content").window({
		title : '教学成果&emsp;/&emsp;著作信息',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

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
				url : APP + '/Teach/Book/exportSelect' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {selects:str},

				success : function(data){
					window.open(ROOT + '/Uploads/Book/File/' + data) ;
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
			var title = $("#search-title").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			$.ajax({
				url : APP + '/Teach/Book/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {title:title,unit:unit},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Book/File/' + data) ;
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
			var title = $("#search-title").textbox('getValue').trim() ;
			var unit = $("#search-unit").combobox('getValue').trim() ;
			
			$.ajax({
							url : APP + '/Teach/Book/downloadAll' ,
							data : {title:title,unit:unit},
							method : 'POST' ,
							dataType : 'JSON' ,
							async : false,

							success : function(data){
								if ( data ){
									window.open(ROOT + '/Uploads/Book/File/' + data) ;
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

	$("#search-title").textbox({
		width : 180,
		height : 30,
		label : '题名' ,
		labelWidth : 40,
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

	$("#search-ok").linkbutton({
		width : 70,
		height : 30,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'title' : $("#search-title").textbox('getValue').trim(),
				'unit' : $("#search-unit").combobox('getValue'),
				
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
			$("#download-select").linkbutton('disable') ;
			$("#data-box").datagrid('load',{}) ;
		}
	});

	

	$("#data-box").datagrid({
		fitColumns : true ,
		width:'100%' ,
		url : APP + "/Teach/Book/data" ,
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
				field : 'title' ,
				title : '著作名' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' , 
			},
			{
				field : 'author' ,
				title : '第一作者' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit_name' ,
				title : '部门（系）' ,
				width : 50 ,
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
				title : '出版日期' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Teach/' + value + '\')">查看</a>'
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
					title : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'title' ,
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


	$("#detail-box").dialog({
		title : '著作详情信息',
		iconCls : 'icon-detail' ,
		modal : true ,
		closed : true ,
	});
});

function detail(id){
	$.ajax({
					url : APP + '/Teach/Book/find' ,
					method : 'POST' ,
					data : { id:id} ,
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
							$("#detail-file_name").attr('onclick','window.open("' + ROOT + '/Uploads/Teach/' + data.file_name + '")') ;
						} else {
							$("#detail-file_name").text('暂无附件').removeAttr('onclick') ;
						}
					}

				});

				$("#detail-box").dialog('open') ;
}