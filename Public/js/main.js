$("#box").layout({
	fit:true ,
}) ;

$("#nagivator").accordion({
	width : 200,
	multiple : true,
	border:false,
	selected : 0,
	headerCls:'panel-header',
}) ;

$("#content").tabs({
	fit:true,
	tabWidth:100,
});

$("#logout").linkbutton({
	width : 80,
	height : 46,
	plain : true,
	iconCls : 'icon-logout' ,

	onClick : function(){
		window.location.href= APP + '/Login/Login/logout' ;
	}
}) ;

$("#menu").menu({
});

$("#user").menubutton({
	width : 80,
	height : 46,
	plain : true,
	hasDownArrow : false,
	iconCls : 'icon-username' ,
	menu : '#menu',

	onClick : function(){
	}
}) ;

$("#help").linkbutton({
	width : 80,
	height : 46,
	plain : true,
	iconCls : 'icon-help' ,

	onClick : function(){
		$("#tip").tooltip('show') ;
	}
}).tooltip({
	content: '<div style="width:300px;height:80px;margin-left:20px"><p>1. <code>Alt + W</code> - 关闭<strong>当前</strong>选项卡</p>' + 
			 '<p>2. <strong>双击</strong>选项卡标题栏 - 关闭<strong>当前</strong>选项卡</p>'+
			 '<p>3. <strong>右击</strong>选项卡标题栏 - 触发选项卡<strong>上下文菜单</strong></p></div>',
}) ;

$("#admin").linkbutton({
	width : 80,
	height : 46,
	plain : true,
	iconCls : 'icon-admin' ,
}) ;

//科研成果
$("#paper").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'科研论文',
	iconCls : 'icon-paper' ,

	onClick : function(){
		addTab('科研论文', APP + '/Achievement/Paper','icon-paper') ;
	}
});


$("#science").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'科研项目',
	iconCls : 'icon-project',
	
	onClick : function(){
		addTab('科研项目', APP + '/Achievement/Project','icon-project') ;
	}
});

$("#patent").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'专利授权',
	iconCls : 'icon-patent',

	onClick : function(){
		addTab('专利授权',APP + '/Achievement/Patent','icon-patent') ;
	}
});

$("#prize").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'获奖信息',
	iconCls : 'icon-prize',

	onClick : function(){
		addTab('获奖信息', APP + '/Achievement/Prize','icon-prize') ;
	}
});

$("#social").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'社会活动',
	iconCls : 'icon-social',

	onClick : function(){
		addTab('社会活动', APP + '/Achievement/Social','icon-social') ;
	}
});

//教学成果
$("#teach_paper").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教学论文',
	iconCls : 'icon-teach_paper' ,

	onClick : function(){
		addTab('教学论文', APP + '/Teach/Paper','icon-teach_paper') ;
	}
});


$("#teach_science").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教学项目',
	iconCls : 'icon-teach_project',
	
	onClick : function(){
		addTab('教学项目', APP + '/Teach/Project','icon-teach_project') ;
	}
});

$("#book").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'著作信息',
	iconCls : 'icon-book',

	onClick : function(){
		addTab('著作信息', APP + '/Teach/Book','icon-book') ;
	}
});

$("#teaching").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教学经历',
	iconCls : 'icon-teaching' ,

	onClick : function(){
		addTab('教学经历', APP + '/Teach/Teaching','icon-teaching') ;
	}
});

//个人信息
$("#degree").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'教育经历',
	iconCls : 'icon-education',

	onClick : function(){
		addTab('教育经历', APP + '/Experience/Education','icon-education') ;
	}
});

$("#job").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'工作经历',
	iconCls : 'icon-work',

	onClick : function(){
		addTab('工作经历', APP + '/Experience/Work','icon-work');
	}
});

$("#position").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'职称评选',
	iconCls : 'icon-title',

	onClick : function(){
		addTab('职称评选', APP + '/Experience/Title','icon-title') ;
	}
});

$("#tutor").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'导员经历',
	iconCls : 'icon-tutor',

	onClick : function(){
		addTab('导员经历', APP + '/Experience/Tutor','icon-tutor') ;
	}
});

//账号管理
$("#account").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	text:'账号信息',
	iconCls : 'icon-account',

	onClick : function() {
		addTab('账号信息', APP + '/Home/Account/account','icon-account') ;
	}
});

$("#info").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-info',
	text:'基本信息',

	onClick : function() {
		addTab('基本信息', APP + '/Home/Account/info','icon-info') ;
	}
});

$("#chpwd").linkbutton({
	plain:true,
	width:'100%',
	height:40,
	iconCls:'icon-password',
	text:'修改密码',

	onClick : function() {
		addTab('修改密码', APP + '/Home/Account/chpwd','icon-password') ;
	}
});

$("#tabmenu").menu({
	width : 150,
	itemHeight : 30,

	onClick : function(item){
		if ( item.name == 'close_current' ){
			closeCurrentTab();
		} else if ( item.name == 'close_all' ){
			var tabs = $('#content').tabs('tabs');
			for ( var i = tabs.length - 1 ; i > 0 ; i -- ){
				var index = $("#content").tabs('getTabIndex',tabs[i]);
				$("#content").tabs('close',index) ;
			}
		} else if ( item.name == 'close_other'){
			var tabs = $('#content').tabs('tabs');
			var current = $("#content").tabs('getSelected') ;
			var currentIndex = $("#content").tabs('getTabIndex',current) ;

			for ( var i = tabs.length - 1 ; i > 0 ; i -- ){
				if ( i != currentIndex ){
					var index = $("#content").tabs('getTabIndex',tabs[i]);
					$("#content").tabs('close',index) ;
				}
			}

			$("#content").tabs('select',1) ;
		} else if ( item.name == 'close_left' ){
			var tabs = $('#content').tabs('tabs');
			var current = $("#content").tabs('getSelected') ;
			var currentIndex = $("#content").tabs('getTabIndex',current) ;
			for ( var i = currentIndex - 1 ; i > 0 ; i -- ){
				var index = $("#content").tabs('getTabIndex',tabs[i]);
				$("#content").tabs('close',index) ;
			}

			$("#content").tabs('select',1) ;
		} else if ( item.name == 'close_right'){
			var tabs = $('#content').tabs('tabs');
			var current = $("#content").tabs('getSelected') ;
			var currentIndex = $("#content").tabs('getTabIndex',current) ;

			for ( var i = tabs.length - 1 ; i > currentIndex ; i -- ){
				var index = $("#content").tabs('getTabIndex',tabs[i]);
				$("#content").tabs('close',index) ;
			}
		}
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

	$("ul.tabs").on('contextmenu',function(e){
		e.preventDefault();
        $('#tabmenu').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
	});

	$(".panel-header.accordion-header").height('16px') ;
	$("#nagivator").accordion('select',1) ;
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

function addTab(title,url,icon) {
	if ( $("#content").tabs('exists',title) ){
		$("#content").tabs('select',title) ;
	} else {
		var content = '<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:99%;"></iframe>';
		$("#content").tabs('add',{
			title : title,
			icon:icon,
			closable : true ,
			content : content ,
		})
	}
}