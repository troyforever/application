$.extend($.fn.validatebox.defaults.rules, {    
    equals: {    
        validator: function(value,param){    
            return value == $(param[0]).val();    
        },    
        message: '两次输入不一致'   
    },
});

$(function(){
	$("#content").window({
		title : '教师管理&emsp;/&emsp;教师信息',
		fit : true ,
		collapsible : false ,
		minimizable : false ,
		maximizable : false ,
		closable : false ,
		draggable : false ,
		resizable : false ,
	});

	$("#search-tid").textbox({
		width : 150,
		height : 30,
		label : '工号' ,
		labelWidth : 30,
	});

	$("#search-name").textbox({
		width : 150,
		height : 30,
		label : '姓名' ,
		labelWidth : 30,
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
		height : 50,
		plain : true ,
		label : '查询' ,
		iconCls : 'icon-search' ,

		onClick : function(){
			$("#data-box").datagrid('load',{
				'tid' : $("#search-tid").textbox('getValue').trim(),
				'name' : $("#search-name").textbox('getValue').trim(),
				'unit' : $("#search-unit").combobox('getValue')
			}) ;
		}
	});

	$("#search-clear").linkbutton({
		width : 100,
		height : 50,
		plain : true ,
		label : '清空' ,
		iconCls : 'icon-clear' ,
		onClick : function(){
			$("#search-tid").textbox('clear') ;
			$("#search-name").textbox('clear') ;
			$("#search-unit").combobox('clear') ;
			$("#data-box").datagrid('load',{}) ;
		}
	});

	$("#download-all").linkbutton({
		width : 150,
		height : 50,
		plain : true ,
		iconCls : 'icon-all' ,

		onClick : function(){
			var tid = $("#search-tid").textbox('getValue').trim();
			var name = $("#search-name").textbox('getValue').trim();
			var unit = $("#search-unit").combobox('getValue') ;
			$.ajax({
				url : APP + '/Teacher/Teacher/exportAll' ,
				method : 'POST' ,
				async : false,
				dataType : 'JSON' ,
				data : {tid:tid,unit:unit,name:name},

				success : function(data){
					if ( data ){
						window.open(ROOT + '/Uploads/Teacher/File/' + data) ;
					} else {
						$.messager.alert('提示','暂无数据导出','info') ;
					}
				}
			});
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

	$("#data-box").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		// fit : true,
		pagination : true,
		width:'100%' ,
		url : APP + "/Teacher/teacher/data" ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '用户加载中。。。' ,
		remoteSort : true ,
		method : 'POST' ,
		pageSize : 5,
		pageList : [5,10,15,20,25,30],
		columns : [[
			// {
			// 	field : 'ck' ,
			// 	checkbox : 'true' ,
			// },
			{
				field : 'tid' ,
				title : '工号' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'name' ,
				title : '姓名' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			{
				field : 'gender' ,
				title : '性别' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						if ( value == 1 ){
							return "男" ;
						} else {
							return "女" ;
						}
					} else {
						return '-' ;
					}
				}
			},
			// {
			// 	field : 'birth' ,
			// 	title : '生日' ,
			// 	width : 100 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			// {
			// 	field : 'nation' ,
			// 	title : '民族' ,
			// 	width : 50 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			// {
			// 	field : 'outlook' ,
			// 	title : '政治面貌' ,
			// 	width : 70 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter(value,row,index){
			// 		if ( value ){
			// 			return value;
			// 		} else {
			// 			return '-' ;
			// 		}
			// 	}
			// },
			
			{
				field : 'email' ,
				title : '邮箱' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'phone' ,
				title : '联系方式' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit_name' ,
				title : '部门' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			{
				field : 'department_name' ,
				title : '科室(系)' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,

				formatter(value,row,index){
					if ( value ){
						return value;
					} else {
						return '-' ;
					}
				}
			},
			// {
			// 	field : 'roles' ,
			// 	title : '角色' ,
			// 	width : 100 ,
			// 	align : 'center' ,
			// 	halign : 'center' ,

			// 	formatter : function(value,row,index){
			// 		if ( value ){
			// 			var str = '' ;
			// 			for ( var i = 0 ; i < value.length ; i ++ ){
			// 				str += value[i].name + ',' ;
			// 			}

			// 			return str.substr(0,str.length - 1 ) ;
			// 		}
			// 	}
			// },
			{
				field : 'improve' ,
				title : '进修' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return '<a href="javascript:;" onclick="improve(\'' + row.tid +  '\')">进修</a>' ;
				}
			},
			{
				field : 'education' ,
				title : '学历' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return '<a href="javascript:;" onclick="education(\'' + row.tid +  '\')">学历</a>' ;
				}
			},
			{
				field : 'work' ,
				title : '工作' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return '<a href="javascript:;" onclick="work(\'' + row.tid +  '\')">工作</a>' ;
				}
			},
			{
				field : 'title' ,
				title : '职称' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return '<a href="javascript:;" onclick="titleData(\'' + row.tid +  '\')">职称</a>' ;
				}
			},
			{
				field : 'tutor' ,
				title : '导员' ,
				width : 50 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return '<a href="javascript:;" onclick="tutorData(\'' + row.tid +  '\')">导员</a>' ;
				}
			},
			// {
			// 	field : 'add_time' ,
			// 	title : '注册时间' ,
			// 	width : 100 ,
			// 	align : 'center' ,
			// 	halign : 'center' , 
			// },
			{
				field : 'operation' ,
				title : '操作' ,
				width : 150 ,
				align : 'center' ,
				halign : 'center' , 

				formatter : function(value,row,index){
					return "<div class='operation'>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-role\"' onclick='setrole(\"" + row.tid + "\")'>角色</a>" +
							"<a class='easyui-linkbutton' data-options='width:60,plain:true,iconCls:\"icon-password\"' onclick='setpwd(" + row.tid + ")'>重置</a>" +
							"</div>" ;
				}
			}
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#data-box").datagrid('appendRow',{
					tid : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'tid' ,
					colspan : 10,
				}) ;
				$(".pagination").hide();
			} else {
				$.parser.parse($(".operation")) ;
				$(".pagination").show();
			}
		},

		onBeforeSelect : function(index,row){
			if ( row == $("#data-box").datagrid('getSelected') ){
				$("#data-box").datagrid('clearChecked') ;
				return false ;
			}
		}
	});

	//修改密码对话框
	$("#pwd-form").form({
		url : APP + '/Teacher/Teacher/password' ,
		onSubmit : function(){

			if ( $("#pwd-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;

			if ( result ){
				$.messager.alert('提示','密码重置成功！','info') ;
				$("#pwd-box").dialog('close') ;
				$("#pwd-form").form('clear');
			} else {
				$.messager.alert('提示','密码重置失败！','info') ;
			}
		}
	});

	$("#pwd-box").dialog({
		width : 452,
		height : 230,
		title : '重置密码',
		iconCls : 'icon-password' ,
		modal : true ,
		closed : true ,
	});

	$("#pwd-password").passwordbox({
	width:300,
	height:30,
	prompt:'密码',
	label : '密&emsp;&emsp;码',
	labelWidth : 70,
	required : true ,
	validType : 'length[8,20]' ,
	missingMessage : '密码非空' ,
	invalidMessage : '8-20位密码' ,
});

$("#pwd-repassword").passwordbox({
	width:300,
	height:30,
	prompt:'确认密码',
	label : '确认密码',
	labelWidth : 70,
	required : true ,
	validType : "equals['#pwd-password']" ,
	missingMessage : '密码非空' ,
	invalidMessage : '两次密码输入不一致' ,
});



	$("#pwd-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){
			$("#pwd-form").form('submit') ;
		}
	});

	$("#pwd-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#pwd-form").form('reset') ;
			$("#pwd-box").dialog('close') ;
		}
	});

	//配置角色

	$("#role-form").form({
		url : APP + '/Teacher/Teacher/role' ,
		onSubmit : function(){

			if ( $("#role-box").form('validate') ){
				return true ;
			} else {
				$.messager.alert('提示','请输入完整信息!','info') ;
				return false ;
			}
		},

		success : function(data){
			var result = $.parseJSON(data) ;

			if ( result ){
				$.messager.alert('提示','角色配置成功！','info') ;
				$("#data-box").datagrid('reload') ;
				$("#role-box").dialog('close') ;
				$("#role-form").form('clear');
			} else {
				$.messager.alert('提示','角色配置失败！','info') ;
			}
		}
	});

	$("#role-box").dialog({
		width : 452,
		height : 200,
		title : '配置角色',
		iconCls : 'icon-role' ,
		modal : true ,
		closed : true ,
	});

	$("#role").combobox({
		width : 300,
		height : 30,
		label : '授权角色' ,
		panelHeight:'auto',
		// multiple : true,
		// multivalue : true,
		labelWidth : 70,
		textField : 'name',
		valueField : 'id' ,
		url : APP + '/RBAC/Role/getAll' ,
		required : true ,
		editable : false,
		missingMessage : '角色非空' ,

	});

	$("#role-submit").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-ok' ,

		onClick : function(){

			var roles = $("#role").combobox('getValues') ;

			var str = '' ;

			for ( var i = 0 ; i < roles.length ; i ++ ){
				str += roles[i] + ',' ;
			}

			$("#role-form").form('load',{'role-roles':str.substr(0,str.length-1)}) ;
			$("#role-form").form('submit') ;
		}
	});

	$("#role-cancel").linkbutton({
		width : 120,
		height : 30,
		iconCls : 'icon-cancel' ,

		onClick : function(){
			$("#role-form").form('reset') ;
			$("#role-box").dialog('close') ;
		}
	});

	$("#improve-box").dialog({
		width : 712,
		height : 450,
		title : '进修经历',
		iconCls : 'icon-improve' ,
		closed : true,

		buttons : [
			{
				text : '关闭',
				width : 500,
				height : 50,
				iconCls : 'icon-cancel',
				plain : true,

				handler:function(){
					$("#improve-box").dialog('close') ;
				}

			},
		],
	});

	$("#education-box").dialog({
		width : 712,
		height : 450,
		title : '学历信息',
		iconCls : 'icon-education' ,
		closed : true,

		buttons : [
			{
				text : '关闭',
				width : 500,
				height : 50,
				iconCls : 'icon-cancel',
				plain : true,

				handler:function(){
					$("#education-box").dialog('close') ;
				}

			},
		],
	});

	$("#work-box").dialog({
		width : 712,
		height : 450,
		title : '工作经历',
		iconCls : 'icon-work' ,
		closed : true,

		buttons : [
			{
				text : '关闭',
				width : 500,
				height : 50,
				iconCls : 'icon-cancel',
				plain : true,

				handler:function(){
					$("#work-box").dialog('close') ;
				}

			},
		],
	});

	$("#title-box").dialog({
		width : 712,
		height : 450,
		title : '职称经历',
		iconCls : 'icon-title' ,
		closed : true,

		buttons : [
			{
				text : '关闭',
				width : 500,
				height : 50,
				iconCls : 'icon-cancel',
				plain : true,

				handler:function(){
					$("#title-box").dialog('close') ;
				}

			},
		],
	});

	$("#tutor-box").dialog({
		width : 712,
		height : 450,
		title : '导员经历',
		iconCls : 'icon-tutor' ,
		closed : true,

		buttons : [
			{
				text : '关闭',
				width : 500,
				height : 50,
				iconCls : 'icon-cancel',
				plain : true,

				handler:function(){
					$("#tutor-box").dialog('close') ;
				}

			},
		],
	});

	$("#improve-data").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		fit : true,
		url : CONTROLLER + '/getData' ,
		width:'100%' ,
		striped : true ,
		checkOnSelect : true ,
		loadMsg : '进修信息加载中。。。' ,
		method : 'POST' ,

			columns : [[
			{
				field : 'id' ,
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'topic' ,
				title : '进修主题' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
			},
			{
				field : 'unit' ,
				title : '进修单位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'note' ,
				title : '简介' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'location' ,
				title : '地点' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'start_date' ,
				title : '开始时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
			},
			{
				field : 'end_date' ,
				title : '结束时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'asc' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Improve/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#improve-data").datagrid('appendRow',{
					topic : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'topic' ,
					colspan : 7,
				}) ;
			}
		},
	}) ;

	$("#education-data").datagrid({
		fitColumns : true ,
		fit : true,
		singleSelect : true ,
		width:'100%' ,
		url : CONTROLLER + "/getData" ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'graduation_time' ,
		loadMsg : '教育经历加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		columns : [[
			{
				field : 'id' ,
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'school' ,
				title : '院校' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'major' ,
				title : '专业' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'education' ,
				title : '学历' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'degree' ,
				title : '学位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'graduation_time' ,
				title : '毕业日期' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Education/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#education-data").datagrid('appendRow',{
					school : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'school' ,
					colspan : 6,
				}) ;
			}
		},
	});

	$("#work-data").datagrid({
		fitColumns : true ,
		fit : true,
		singleSelect : true ,
		width:'100%' ,
		url : CONTROLLER + '/getData' ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'add_time' ,
		loadMsg : '工作经历加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		columns : [[
			{
				field : 'id' ,
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'job' ,
				title : '职务' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'unit' ,
				title : '工作单位' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'department' ,
				title : '部门' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'section' ,
				title : '科室(系)' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				formatter : function(value,row,index){
					if ( ! value ){
						return "无" ;
					} else {
						return value ;
					}
				}
			},
			{
				field : 'into_date' ,
				title : '入职时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' ,
			},
			{
				field : 'exit_date' ,
				title : '离职时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' ,
				formatter : function(value,row,index){
					if ( ! value ){
						return "无" ;
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Work/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#work-data").datagrid('appendRow',{
					job : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'job' ,
					colspan : 7,
				}) ;
			}
		},
	});

	$("#title-data").datagrid({
		fitColumns : true ,
		singleSelect : true ,
		fit : true,
		width:'100%' ,
		url : CONTROLLER + '/getData' ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'title_time' ,
		loadMsg : '职称经历加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
		columns : [[
			{
				field : 'id' ,
				title : 'id' ,
				hidden : true ,
			},
			{
				field : 'title' ,
				title : '职称' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'title_time' ,
				title : '评定时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' , 
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Title/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				$("#title-data").datagrid('appendRow',{
					title : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'title' ,
					colspan : 3,
				}) ;
			}
		},
	});

	$("#tutor-data").datagrid({
		fitColumns : true ,
		fit : true,
		singleSelect : true ,
		width:'100%' ,
		url : CONTROLLER + '/getData' ,
		striped : true ,
		checkOnSelect : true ,
		sortName : 'add_time' ,
		loadMsg : '导员经历加载中。。。' ,
		sortOrder : 'desc' ,
		multiSort : true ,
		remoteSort : true ,
		method : 'POST' ,
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
				field : 'tutor' ,
				title : '导员职称' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
			},
			{
				field : 'tutor_date' ,
				title : '评定时间' ,
				width : 100 ,
				align : 'center' ,
				halign : 'center' ,
				sortable : true ,
				sortOrder : 'desc' ,
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
						return '<a href="javascript:;" style="text-decoration:none;" onclick="window.open(\'' + ROOT + '/Uploads/Tutor/' + value + '\')">查看</a>'
					}
				}
			},
		]] ,

		onLoadSuccess : function(data){
			if ( data.total == 0 ){
				// $("#tools-edit").linkbutton('disable') ;
				// $("#tools-delete").linkbutton('disable') ;
				$("#tutor-data").datagrid('appendRow',{
					tutor : '<div style="text-align:center;font-size:16px;color:red">暂无相关记录!</div>'
				}).datagrid('mergeCells',{
					index : 0,
					field : 'tutor' ,
					colspan : 3,
				}) ;
			}
		},
	});


});


function improve(tid){
	$("#improve-data").datagrid('load',{
		'model' : 'Improve',
		'tid' : tid
	});
	$("#improve-box").dialog('open') ;
}

function education(tid){
	$("#education-data").datagrid('load',{
		'model' : 'Education' ,
		'tid' : tid
	});
	$("#education-box").dialog('open') ;
}

function work(tid){
	$("#work-data").datagrid('load',{
		'model' : 'Work' ,
		'tid' : tid
	});
	$("#work-box").dialog('open') ;
}

function titleData(tid){
	$("#title-data").datagrid('load',{
		'model' : 'Title' ,
		'tid' : tid
	});
	$("#title-box").dialog('open') ;
}

function tutorData(tid){
	$("#tutor-data").datagrid('load',{
		'model' : 'Tutor' ,
		'tid' : tid
	});
	$("#tutor-box").dialog('open') ;
}

function setpwd(tid){

	$("#pwd-form").form('load',{'id':tid}) ;

	$("#pwd-box").dialog('open') ;
}

function setrole(tid){

	$("#role-form").form('reset') ;

	var roles = new Array() ;

	$.ajax({
		url : APP + '/Teacher/Teacher/getRoles' ,
		method : 'POST' ,
		data : {id:tid} ,
		dataType : 'JSON' ,
		async : false,

		success : function(data){
			for ( var i = 0 ; i < data.length ; i ++ ){
				roles[i] = data[i].role_id ;
			}
		}
	}) ;


	$("#role-form").form('load',{'id':tid}) ;

	$("#role").combobox('setValues',roles) ;

	$("#role-box").dialog('open') ;
}