$("#box").layout({
	fit:true ,
}) ;

$("#nagivator").accordion({
	fit:true,
	border:false,
	headerCls:'panel-header',
}) ;

$("#content").tabs({
	fit:true,
	tabWidth:100,
});

$("#paper").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'论文',
});

$("#book").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'著作',
});

$("#science").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'科学研究',
});

$("#patent").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'专利获取',
});

$("#prize").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'获奖情况',
});

$("#social").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'社会活动',
});


$("#degree").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教育经历',

	onClick : function(){
		addTab('教育经历', APP + '/Experience/Education') ;
	}
});

$("#job").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'工作经历',

	onClick : function(){
		addTab('工作经历', APP + '/Experience/Work');
	}
});

$("#position").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'职称评选',
});

$("#teaching").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教学情况',
});

$("#account").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-edit',
	text:'账号信息',

	onClick : function() {
		addTab('账号信息', APP + '/Home/Account/account') ;
	}
});

$("#info").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-man',
	text:'个人信息',

	onClick : function() {
		addTab('个人信息', APP + '/Home/Account/info') ;
	}
});

$("#chpwd").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-reload',
	text:'修改密码',

	onClick : function() {
		addTab('修改密码', APP + '/Home/Account/chpwd') ;
	}
});

$(function(){
	$("#box").layout('resize') ;
	$("a.nav").css('outline','none') ;
	$(document).on('keyup',function(e){
		if ( e.keyCode == 87 && e.altKey ){
			closeCurrentTab();
		} else {
			e.returnValue = false ;
			return false ;
		}
	});

	$("ul.tabs").on('dblclick',function(){
		closeCurrentTab();
	}) ;
});

function closeCurrentTab(){
	var title = $(".tabs-selected").text() ;
	if ( title != '欢迎页' ){
		$("#content").tabs('close',title) ;
	}
}

$("a.nav").on('click',function(){
	$("a.nav").css('background','') ;
	$(this).css('background','#b7d2ff') ;
}) ;

function addTab(title,url) {
	if ( $("#content").tabs('exists',title) ){
		$("#content").tabs('select',title) ;
	} else {
		var content = '<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:99%;"></iframe>';
		$("#content").tabs('add',{
			title : title,
			closable : true ,
			content : content ,
		})
	}
}