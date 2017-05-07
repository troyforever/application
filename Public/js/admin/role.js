$(function(){

	$("#content").window({
		title : '权限控制&emsp;/&emsp;角色管理',
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

	$("#tools-reload").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			$("#data-box").datagrid('reload') ;
		}
	});

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		fit : true,
		width:'100%' ,
		url : APP + "/RBAC/Role/data" ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '角色加载中。。。' ,
		remoteSort : true ,
		method : 'POST' ,
		pageSize : 5,
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
				field : 'name' ,
				title : '角色名称' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'status' ,
				title : '状态' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				formatter : function(value,row,index){
					if ( value == 1 )
						return "正常" ;
					else 
						return "异常" ;
				}
			},
			{
				field : 'remark' ,
				title : '备注' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 
				formatter : function(value,row,index){
					if ( !value )
						return "无" ;
					else
						return value ;
				}
			},
			{
				field : 'operation' ,
				title : '操作' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:80,plain:true,iconCls:\"icon-node\"' onclick='access(" + index + ")'>配置权限</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-edit\"' onclick='edit(" + index + ")'>编辑</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-cancel\"' onclick='remove(" + index + ")'>删除</a>" +
							"</div>" ;
				}
			}
		]] ,

		onLoadSuccess : function(data){
			$.parser.parse($(".operation")) ;
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
	});

	//添加角色信息对话框
	$("#add-form").form({
		url : APP + '/RBAC/Role/add' ,
		onSubmit : function(){

			if ( $("#add-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;
			if ( result ){
				$("#data-box").datagrid('reload') ;
				$("#add-box").dialog('close') ;
				$("#add-form").form('reset');
				$.messager.alert('提示','角色添加成功！','info') ;
			} else {
				$.messager.alert('提示','角色添加失败！','info') ;
			}
		}
	});

	$("#add-box").dialog({
		width : 452,
		height : 250,
		title : '添加角色信息',
		iconCls : 'icon-add' ,
		modal : true ,
		closed : true ,
	});

	$("#add-name").textbox({
		width : 300,
		height : 30,
		label : '角色名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '角色名称非空' ,
	});

	$("#add-remark").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
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
			$("#add-box").dialog('close') ;
		}
	});


	//编辑角色信息对话框
	$("#edit-box").dialog({
		width : 452,
		height : 250,
		title : '编辑角色信息',
		iconCls : 'icon-edit' ,
		modal : true ,
		closed : true ,
	});

	$("#edit-form").form({
		onSubmit : function(){
			if ( $("#edit-form").form('validate') ){
				return true ;
			} else {
				$.messager.alert('编辑提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = eval('(' + data + ')') ;
			if ( result ) {
				$("#data-box").datagrid('reload') ;
				$.messager.alert('编辑提示','角色编辑成功！','info') ;
			} else {
				$.messager.alert('编辑提示','角色编辑失败！','info') ;
			}
		}
	});

	$("#edit-name").textbox({
		width : 300,
		height : 30,
		label : '角色名称' ,
		labelWidth : 70,
		required : true ,
		missingMessage : '角色名称非空' ,
	});

	$("#edit-remark").textbox({
		width : 300,
		height : 50,
		multiline : true,
		label : '备&emsp;&emsp;注' ,
		labelWidth : 70,
	});

	$("#edit-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#edit-form").form('submit',{
				url : APP + '/RBAC/Role/edit' ,
			}).form('clear') ;
			$("#edit-box").dialog('close') ;
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

	//权限配置框
	$("#access-box").dialog({
		width : 850,
		height : 500,
		title : '权限配置框',
		iconCls : 'icon-node' ,
		modal : true ,
		closed : true ,
	});

	$("#role-close").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#access-box").dialog('close') ;
		}
	});

	$("#role-revent").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-reload' ,

		onClick : function(){
			revent($("#role-revent").attr('value')) ;
		}
	});

	$("#role-submit").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-ok' ,

		onClick : function(){
			
			submit($("#role-submit").attr('value')) ;
		}
	});
});

function edit(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
	
	$("#edit-form").form('load',{
					'edit-id':row.id,
					'edit-name':row.name,
					'edit-remark' : row.remark ,
				});

				$("#edit-box").dialog('open') ;
}

function remove(index){
	var row = $("#data-box").datagrid('getRows')[index] ;
			$.messager.confirm('删除提示','您确定要删除这条角色吗？',function(r){
					if ( r ){
						$.ajax({
						url : APP + '/RBAC/Role/delete' ,
						method : 'post' ,
						data : {id:row.id} ,
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


function access(index){

	var row = $("#data-box").datagrid('getRows')[index] ;

	var id = row.id ;

	var data = getAccess(id) ;

	$("#role-name").text(row.name) ;

	$("#access-box").dialog('open') ;
			
			$("#set-box").empty();
			
			for ( var i = 0 ; i < data.length ; i ++ ){
				if ( data[i].level == 1 ){
					$("#set-box").append('<p  class="app"><input type="checkbox" id="' + data[i].id + '" level="1" name="access" /><label style="color:red">[应用]</label> <span value="' + data[i].id + '">' + data[i].title + '</span></p>') ;

					for ( var j = 0 ; j < data.length ; j ++ ){
						if ( data[j].level == 2 && data[j].pid == data[i].id ){
							$("#set-box").append('<p  class="module"><input type="checkbox" id="' + data[j].id + '" aid="' + data[i].id + '" level="2" name="access" /><label style="color:blue">[模块]</label> <span value="' + data[j].id + '">' + data[j].title + '</span></p>') ;
							// $("#set-box").append('<p class="sub-start sub"></p>');
							var str = '<div style="margin-left:40px">' ;
							for ( var k = 0 ; k < data.length ; k ++ ){
								if ( data[k].level == 3 && data[k].pid == data[j].id ){
									str += '<p class="sub"><input type="checkbox" id="' + data[k].id + '" aid="' + data[i].id + '" mid="' + data[j].id + '" level="3" name="access" /><label style="color:gray">[子菜单]</label> <span value="' + data[k].id + '">' + data[k].title + '</span></p>' ;
									// $("#set-box").append() ;
								}
							}
							str += '</div>' ;
							$("#set-box").append(str) ;
						}
					}
				}
			}

			$('p span').click(function(e){

				var id = $(e.target).attr('value') ;

				$("#" + id ).click() ;
			});

			$("input[name='access'][name='access']").change(function(e){

				var level = $(e.target).attr('level') ;// 1-应用 2-模块 3-子菜单

				var id = $(e.target).attr('id') ;	//当前checkbox id

				var state = $(e.target).is(':checked') ; //点击后选中状态

				if ( level == 1 ){

					if ( state ){
						//设置子项全部选中
						$("input[aid='"+id+"']").prop('checked',true) ;
					} else {
						//设置子项全部取消选中
						$("input[aid='"+id+"']").removeAttr('checked') ;
					}

				} else if ( level == 2 ) {
					if ( state ){
						//设置子项全部选中
						$("input[mid='"+id+"']").prop('checked',true) ;
						//设置应用选中
						var aid = $(e.target).attr('aid') ;
						$("#" + aid).prop('checked',true) ;
					} else {
						//设置子项全部取消选中
						$("input[mid='"+id+"']").removeAttr('checked') ;
						//获取应用id
						var aid = $(e.target).attr('aid') ;
						//获取应用下所有勾选的模块
						var modules = $("input[aid='" + aid + "']:checked") ;
						//没有模块被勾选，则取消勾选该应用
						if ( modules.length == 0 ){
							$("#" + aid).removeAttr('checked') ;
						}
					}
				} else {
					if ( state ){
						//设置应用选中
						var aid = $(e.target).attr('aid') ;
						$("#" + aid).prop('checked',true) ;
						//设置模块选中
						var mid = $(e.target).attr('mid') ;
						$("#" + mid).prop('checked',true) ;
					} else {
						//设置子项全部取消选中
						var mid = $(e.target).attr('mid') ;

						var subs = $("input[mid='" + mid + "']:checked") ;

						if ( subs.length == 0 ){
							$("#" + mid).removeAttr('checked') ;

							var aid = $(e.target).attr('aid') ;

							var modules = $("input[aid='" + aid + "']:checked") ;

							if ( modules.length == 0 ){
								$("#" + aid).removeAttr('checked') ;
							}
						}
					}
				}
			});

			$("#role-revent").attr('value',id) ;
			$("#role-submit").attr('value',id) ;

			revent(id) ;
}

function revent(id){
	var data = getAccess(id) ;

	$("input[name='access']").removeAttr('checked');

	for ( var i = 0 ; i < data.length ; i ++ ){
		if ( data[i].access ){
			$("#" + data[i].id ).prop('checked',true) ;
		}
	}
}

function submit(id){
	var access = $("input[name='access']:checked") ;

	var str = '' ;

	for ( var i = 0 ; i < access.length ; i ++ ){
		str += access[i].id + ',' ;
	}

	str = str.substr(0,str.length-1) ;
	
	$.ajax({
		url : APP + '/RBAC/Role/setAccess' ,
		data : {id:id,str:str} ,
		method : 'POST' ,
		async : false,
		dataType : 'JSON' ,

		success : function(data){
			if ( data ){
				$.messager.alert('提示','角色权限配置成功！','info') ;
			} else {
				$.messager.alert('提示','角色权限配置失败！','info') ;
			}
		}
	});
}

function getAccess(id){
	var result ;
	$.ajax({
		url : APP + '/RBAC/Role/getAccess' ,
		method : 'POST' ,
		data : {id:id} ,
		dataType : 'JSON' ,
		async : false ,

		success : function(data){
			result = data ;
		}
	});
	return result ;
}