$(function(){

	$("#content").window({
		title : '科研成果&emsp;/&emsp;获奖信息',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

	//搜索栏

	$("#search-topic").textbox({
		width : 150,
		height : 30,
		label : '获奖主题' ,
		labelWidth : 60,
	});

	$("#search-unit").combobox({
		width : 150,
		height : 30,
		label : '部门' ,
		labelWidth : 30,
		url : APP + '/Home/Base/unit' ,
		valueField : 'id' ,
		textField : 'name' ,
		panelWidth : 190,
		panelHeight : 'auto',
		editable : false ,
	});


	$("#search-ok").linkbutton({
		width : 100,
		height : 40,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			loadData(1,$("#search-topic").textbox('getValue').trim(),$("#search-unit").combobox('getValue')) ;
		}
	});

	$("#search-clear").linkbutton({
		width : 100,
		height : 40,
		plain : true ,
		label : '清空' ,
		iconCls : 'icon-clear' ,
		onClick : function(){
			$("#search-form").form('clear') ;
			loadData(1,null,null) ;
		}
	});


	$("#tools-reload").linkbutton({
		width : 100,
		height : 40,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			loadData(1,null,null) ;
		}
	});

	$("#page").pagination({
		height : 50,
		pageList:[6,8,10,12] ,

		onSelectPage : function(pageNumber,pageSize){
			loadData(pageNumber,null,null) ;
		}
	});

	$("#img-dialog").dialog({
		border : false,
		title : '获奖',
		closed : true,
		headerCls : 'header-cls' ,
	}) ;

	$("#img-close").linkbutton({
		width : 150,
		height : 40,
		plain : true,
		iconCls : 'icon-logout' ,

		onClick : function(){
			$("#img-dialog").dialog('close') ;
		}
	});

	$("#img-note").linkbutton({
		width : 150,
		height : 40,
		plain : true,
		iconCls : 'icon-file' ,

		onClick : function(){
			var prize = find($("#id").val()) ;
			if ( prize.file_name ){
				window.open(ROOT + '/Uploads/Prize/' + prize.file_name) ;
			} else {
				$.messager.alert('提示','暂无附件','info') ;
			}
		}
	});

	loadData(1,null,null) ;
});

function loadData(page,topic,unit){
	var rows = parseInt($("#content").width() / 260 ) * 2 ;
	$.ajax({
		url : APP + '/Achievement/Prize/data' ,
		method : 'POST' ,
		data : {page:page,rows:rows,topic:topic,unit:unit} ,
		async : false,
		dataType : 'JSON' ,

		success : function(data){

			$("#prize").empty();

			if ( data.rows.length != 0 ){

				for ( var i = 0 ; i < data.rows.length ; i ++ ){
					var str = '<div class="prize-item">'+
								'<img id="' + data.rows[i].id + '" src="' + ROOT + '/Uploads/Prize/Img/' + data.rows[i].prize_img + '?temp=' + Math.random() + '" alt="图片无法显示" title="' + data.rows[i].name + ' - ' + data.rows[i].topic + '"  />'+
								'</div>';

					$("#prize").append(str);
				}

				$(".prize-item img").click(function(){
						var prize = find(this.id) ;
						$("#img-dialog img").attr('src',this.src) ;
						$("#img-dialog").dialog('open');
						$("#note").text(prize.note ? prize.note : '暂无备注');
						$(".header-cls.panel-header-noborder .panel-title").text(prize.name + ' - ' + prize.topic + ' - ' + prize.level + ' ( ' + prize.unit + ' ' + prize.prize_date + ' 颁发 )') ;
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
				$("#prize").append('<h2 style="text-align:center">暂无获奖信息,<a href="javascript:;" onclick="javascript:$(\'#add-box\').dialog(\'open\')">点击添加</a></h2>')
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