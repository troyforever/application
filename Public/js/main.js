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

$("#logout").linkbutton({
	width : 80,
	height : 30,
	plain : true,
	iconCls : 'icon-logout' ,

	onClick : function(){
		window.location.href= APP + '/Login/Login/logout' ;
	}
}) ;

$("#admin").linkbutton({
	width : 80,
	height : 30,
	plain : true,
	iconCls : 'icon-admin' ,
}) ;

$("#paper").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'论文',
	iconCls : 'icon-paper' ,

	onClick : function(){
		addTab('论文', APP + '/Achievement/Paper') ;
	}
});

$("#book").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'著作',
	iconCls : 'icon-book',

	onClick : function(){
		addTab('著作', APP + '/Achievement/Book') ;
	}
});

$("#science").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'项目',
	iconCls : 'icon-project',
	
	onClick : function(){
		addTab('项目', APP + '/Achievement/Project') ;
	}
});

$("#patent").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'专利',
	iconCls : 'icon-patent',

	onClick : function(){
		addTab('专利',APP + '/Achievement/Patent') ;
	}
});

$("#prize").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'获奖情况',
	iconCls : 'icon-prize',

	onClick : function(){
		addTab('获奖情况', APP + '/Achievement/Prize') ;
	}
});

$("#social").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'社会活动',
	iconCls : 'icon-social',

	onClick : function(){
		addTab('社会活动', APP + '/Achievement/Social') ;
	}
});


$("#degree").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教育经历',
	iconCls : 'icon-education',

	onClick : function(){
		addTab('教育经历', APP + '/Experience/Education') ;
	}
});

$("#job").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'工作经历',
	iconCls : 'icon-work',

	onClick : function(){
		addTab('工作经历', APP + '/Experience/Work');
	}
});

$("#position").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'职称评选',
	iconCls : 'icon-title',

	onClick : function(){
		addTab('职称评选', APP + '/Experience/Title') ;
	}
});

$("#teaching").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教学经历',
	iconCls : 'icon-teaching' ,

	onClick : function(){
		addTab('教学经历', APP + '/Experience/Teaching') ;
	}
});

$("#account").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'账号信息',
	iconCls : 'icon-account',

	onClick : function() {
		addTab('账号信息', APP + '/Home/Account/account') ;
	}
});

$("#info").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-info',
	text:'个人信息',

	onClick : function() {
		addTab('个人信息', APP + '/Home/Account/info') ;
	}
});

$("#chpwd").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-password',
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