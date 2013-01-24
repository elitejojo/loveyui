;(function($){
		/**
		  @required  : jquery.js,jquery-ui.js,jquery.mousewheel.js,*.css
 		 */		  
		$.fn.movieScroller = function(options){
			var _default = {
				speed:50//齿轮滚动速度		
			};			
			var _options = $.extend(_default,options||{});
			//初始化滚动条的长度
			var tr_h = $($("#data_table_body").children()[0]).height();
			var m_sroll_h = $(".scroll").height();
			var content_h = $("#data_table_body").outerHeight();
			var container_h = $(".data_table_body").height();
			var trs = $("#data_table_body").children().length;
			if( trs>=2 ){
				$("#data_table_body li:odd").addClass("odd");
			}
			
			if(trs<=5){
				$($(".scroller")[0]).hide();
				$("#data_table_body").width($(this).width());
				return ;
			}else{
				$( "#data_table_body" ).width($(this).width()-15);
				$(".scroller").show();
				$( ".handle" ).height(Math.round(container_h/content_h*m_sroll_h));
			}
			//滚动的最高点
			var min_top = parseInt($($( ".scroll" )[0]).offset().top);
			//滚动的最低点
			var max_top = parseInt($($( ".increase" )[0]).offset().top)-$($( ".handle" )[0]).height();
			//初始化滚动条的拖拽
			$($( ".handle" )[0]).draggable({ axis: "y",containment: "parent",drag:resetPlayPos});
			//拖动事件，修改播放列表的层的显示位置
			function resetPlayPos(){
				var sroll_length = parseInt($($( ".handle" )[0]).offset().top)-min_top;
				sroll_length = Math.round(sroll_length*(content_h/m_sroll_h));
				$("#data_table_body").offset({top:parseInt($($( ".scroller" )[0]).offset().top)-sroll_length});
			}
		
			$("#data_table_body").mousewheel(function(event, delta, deltaX, deltaY){
				var tem_top ;
				if( delta>0 ){
					tem_top = Math.max(parseInt($($( ".handle" )[0]).offset().top)-_options.speed,min_top);
				}else{
					tem_top = Math.min(parseInt($($( ".handle" )[0]).offset().top)+_options.speed,max_top);	
				}
				$(".handle").offset({top:tem_top});	
				resetPlayPos();	
				return false;			
			});	
		}
		})(jQuery);



//页面初始加载
$(document).ready(function(){	
	//设置时间
	initPlayDate();
	//时间选中事件
	initPlayDateTab();
	//影片选中事件
	cinemaSelectedEvent();
	//默认选中第一个影片
	cinemaSelectFirst();
	//展示默认的排片信息
	setPlayList();
	
	var tab_operObj = $(".playList_tab_item");
	$("#playDate_tab").movieTab({syn:true,callBack:tabCallBack,operClass:tab_operObj});
	function tabCallBack(){
		//dealPlayDateEvent();
	}	
	$("#play_list_info").movieScroller();//设置滑动条
	
	//鼠标效果
	$(function(){
	    $(".ui_view_solide").mousemove(function(){
	    	$(this).addClass("hover");
	    	});	
	    $(".ui_view_solide").mouseout(function(){
	    	$(this).removeClass("hover");
	    	});
 	});

	//留言 模块 输入事件	
	$("#replycontent").keyup(function(){
		resetCommentLength();
		validateReplycontent();					
	});
	//修改剩余输入提示
	function resetCommentLength(){
		var content = $.trim($("#replycontent").val());
		$("#comment_length").text(140-parseInt(content.length?content.length:0));
	}
	//留言字数验证
	function validateReplycontent(){
		var content =$("#replycontent").val();
		if(content.length>=140){
			$("#replycontent").val(content.substring(0,140));
			$("#comment_length").text(0);
			}
	}
});


function addComment()
{
	$('#bodyForm').submit();
}

/**
 * 方法名称：初始化日期
 */
function initPlayDate(){
	var cDate = $("#cDate").val();
	if(cDate==='undefined'||cDate==null){
		alert("日期初始化失败!");
		return false;
	}
	var html = '<span id=\"'+getMovieDate(cDate,0,1,0)+'\" class=\"blue\" >'+getMovieDate(cDate,0,2,1)+'&nbsp;今天</span>';
	html=html+'<span id=\"'+getMovieDate(cDate,1,1,0)+'\"  >'+getMovieDate(cDate,1,2,1)+'&nbsp;星期'+getMovieWeek(cDate,1)+'</span>';
	html=html+'<span id=\"'+getMovieDate(cDate,2,1,0)+'\"  >'+getMovieDate(cDate,2,2,1)+'&nbsp;星期'+getMovieWeek(cDate,2)+'</span>';
	$("#playDate_tab").empty();
	$("#playDate_tab").append(html);
}

/**
*@curdate:当天日期
*@n:当天日期的前后N天
*@fm:日期格式1:2013-01-08；2:2013年01月08日
*isShowYEAR:是否显示年份0:显示，1：不显示
*/		
function getMovieDate(curdate,n,fm,isShowYEAR){ 
	var uom = new Date(new Date(curdate.substring(0,4),curdate.substring(5,7)-1,curdate.substring(8,10))-0+n*86400000);
	
	if( fm==1 ){
		if( isShowYEAR==0 ){
			uom = uom.getFullYear() + "-" + (uom.getMonth()+1).toString().fmtWithZero(true) + "-" + uom.getDate().toString().fmtWithZero(true);
		}else{
			uom =  (uom.getMonth()+1).toString().fmtWithZero(true) + "-" + uom.getDate().toString().fmtWithZero(true);
		} 
	}else if(fm==2){
		if( isShowYEAR==0 ){
			uom = uom.getFullYear() + "年" + (uom.getMonth()+1).toString().fmtWithZero(true) + "月" + uom.getDate().toString().fmtWithZero(true)+"日";
		}else{
			uom =  (uom.getMonth()+1).toString().fmtWithZero(true) + "月" + uom.getDate().toString().fmtWithZero(true)+"日";
		}	
	}
	
	return uom; 
} 

/**//*将一位数字格式化成两位,如:9to09*/
String.prototype.fmtWithZero=function(isFmtWithZero){return(isFmtWithZero&&this.length==1)?"0"+this:this;}

/**
*@curdate:当前日期
*@n:当前日期的前后几天
*@return:返回星期
*/
function getMovieWeek(curdate,n){
	var uom = new Date(new Date(curdate.substring(0,4),curdate.substring(5,7)-1,curdate.substring(8,10))-0+n*86400000);
	var weekArray = ["日","一","二","三","四","五","六"];
	return weekArray[uom.getDay()];	
}

//日期的选中事件
function initPlayDateTab(){
	var dates = $("#playDate_tab span");
	for(var i = 0 ; i < dates.length ; i++)
	{
		$(dates[i]).click(function(){
			$("#playDate_tab span").removeClass("gray");
			$("#playDate_tab span").removeClass("blue");
			$("#playDate_tab span").addClass("gray");
			$(this).addClass("blue");
			 setPlayList();
		});
	}
}

//影片选中事件
function cinemaSelectedEvent(){
	var movies = $("#movieList_span a");
	for(var i = 0 ; i < movies.length ; i++)
	{
		$(movies[i]).click(function(){
			$("#movieList_span a").removeClass("select");
			$(this).addClass("select");
			
			//显示选中的影片
			var movieList= $("dl[name=dl_movie_info]");
			var movieIndex=null;
			for(var i=0; i < movieList.length ; i++ )
			{
				if(""+$(movieList[i]).attr("movieno") == "" + $(this).attr("movieno"))
				{
					movieIndex = i;
				}
				$(movieList[i]).hide();
			}
			$(movieList[movieIndex]).show();
			//排片列表生成
			setPlayList();
		});
	}
}

//默认选中第一个影片
function cinemaSelectFirst(){
	var movies = $("#movieList_span a");
	$("#movieList_span a").removeClass("select");
	$(movies[0]).addClass("select");
	//显示第一个影片
	var movieList= $("dl[name=dl_movie_info]");
	var movieIndex=null;
	for(var i=0; i < movieList.length ; i++ )
	{
		if(""+$(movieList[i]).attr("movieno") == "" + $(movies[0]).attr("movieno"))
		{
			movieIndex = i;
		}
		$(movieList[i]).hide();
	}
	$(movieList[movieIndex]).show();
}

//排片列表生成
function setPlayList(){
	var sysPath = $("#sysPath").val();
	var date = $("#playDate_tab .blue").attr("id");
	var cinemano = $("#cinemaNo").val();
	var filmNo = $("#movieList_span .select").attr("movieno");
	$.ajax({
		type:'get',
		url:sysPath+'\/'+filmNo+'\/'+date+'\/'+cinemano,
		data:"",
	 	success:initPlayLisTable,
		error:function(){
			alert("系统繁忙，稍后再试");
		}			
	});
}

//排片列表异步数据解析
function initPlayLisTable(dataArray){
	 if( dataArray=='undefined'||dataArray==null||dataArray.length==0 )
	 {
		 var html ='<li ><span style=\"margin-top:50px;float:none\" >影院当前还没有更新排片！..你可以: <a class=\"c_red pl4\" href=\"movie.html\">选择其他影院或其他日期</span></li>';
		$("#data_table_body").empty().append(html);
		$("#play_list_info").movieScroller();//设置滑动条
		return ;
	 }else{
		var html = "";
		for( var i = 0 ; i < dataArray.length ; i++ )
		{
			var info = dataArray[i];
 			html = html+'<li>';
			html = html+'<span class=\"w86\" >'+info.featureTime+'</span>';
			html = html+'<span class=\"w110\">'+info.copyLanguage+'&nbsp;'+info.copyType+'</span>';
			html = html+'<span class=\"w110\">'+info.hallName+'</span>';
			html = html+'<span class=\"w110\">(<s>'+info.standPric+'</s>)'+'<b class=\"c_red pl4\">'+info.aPrice+'</b>'+'</span>';
			html = html+'<span class=\"w130\">'+info.explain+'</span>';
			html = html+'<span class=\"w170\"><a style=\"margin-top:13px\" class=\"select_btn\" href=\"cinema\/'+info.featureAppNo+'\/'+info.aPrice+'\/planSite.html\">选座购票</a></span>';
			html = html+'</li>';
		}
		$("#data_table_body").empty().append(html);
		$("#play_list_info").movieScroller();//设置滑动条
	 }
}

//iframe 自适应高度
function SetWinHeight(obj)
{
	var win=obj;
	if (document.getElementById)
	{
		if (win && !window.opera)
		{
			if (win.contentDocument && win.contentDocument.body.offsetHeight)
			win.height = win.contentDocument.body.offsetHeight;
			else if(win.Document && win.Document.body.scrollHeight)
			win.height = win.Document.body.scrollHeight;
		}
	}
}
