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


$(document).ready(function(){
	//设置时间
	initPlayDate();
	//初始化区
	
	//设置影院选中状态
	initCinemaSelected();
	//区域选中事件
	areaSelectEvent();
	//影院选中
	cinemaSelectedEvent();
	//异步获取数据
	setPlayList();
});


/**//*将一位数字格式化成两位,如:9to09*/
String.prototype.fmtWithZero=function(isFmtWithZero){return(isFmtWithZero&&this.length==1)?"0"+this:this;}
	
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
	}	else{
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

function initPlayDate(){
	var cDate = $("#cDate").val();
	if(cDate==='undefined'||cDate==null){
	alert("日期初始化失败!");
	return false;
	}
	var html = '<span id=\"'+getMovieDate(cDate,0,1,0)+'\" class=\"blue\"  >'+getMovieDate(cDate,0,2,1)+'&nbsp;今天</span>';
	html=html+'<span id=\"'+getMovieDate(cDate,1,1,0)+'\"  >'+getMovieDate(cDate,1,2,1)+'&nbsp;星期'+getMovieWeek(cDate,1)+'</span>';
	html=html+'<span id=\"'+getMovieDate(cDate,2,1,0)+'\"  >'+getMovieDate(cDate,2,2,1)+'&nbsp;星期'+getMovieWeek(cDate,2)+'</span>';
	$("#playDate_tab").empty();
	$("#playDate_tab").append(html);
	initPlayDateTab();
}

function initPlayDateTab(){
	var playDate_tab_operObj = $(".playDate_tab_item");
	$("#playDate_tab").movieTab({syn:false,callBack:callBack,operClass:playDate_tab_operObj});	
	function callBack(){
		setPlayList();
		//areaSelectEvent();
		//cinemaSelectedEvent();
	}
}

//初始化默认显示的影院信息
function initCinemaSelected(){
	$($("#areas a")[0]).addClass("select");
	var selectedArea = $("#areas a.select");
	if( selectedArea=='undefinded'||selectedArea==null ){
		return ;
	}
	var areaId = selectedArea.attr("id");
	var cinemas = $("#cinemas a");
	var selected = false;
	for( var j = 0 ; j < cinemas.length ; j++ ){
		$(cinemas[j]).removeClass("select");
		if($(cinemas[j]).attr("area")==areaId){
			$(cinemas[j]).show();
			if(!selected){
				$(cinemas[j]).addClass("select");
				selected = true;
			}
		}else{
			$(cinemas[j]).hide();
		}
	}
}

//地区选中事件
function areaSelectEvent(){
	var areas = $("#areas a");
	var cinemas = $("#cinemas a");
	for(var i = 0 ; i < areas.length; i++){
		$(areas[i]).click(function(){
			var id = $(this).attr("id");
			$("#areas a").removeClass("select");
			$(this).addClass("select");
			var selected = false;
			for( var j = 0 ; j < cinemas.length ; j++ ){
				if($(cinemas[j]).attr("area")==id){
					$(cinemas[j]).show();
					if(!selected){
						$(cinemas[j]).addClass("select");
						selected = true;
					}else{
						$(cinemas[j]).removeClass("select");
					}
				}else{
					$(cinemas[j]).hide();
					$(cinemas[j]).removeClass("select");
				}
			}
			setPlayList();
		});
	}	
	//cinemaSelectedEvent();
}

//影院选中事件
function cinemaSelectedEvent(){
	var cinemas = $("#cinemas a");
	for(var i = 0 ; i < cinemas.length ; i++){
		$(cinemas[i]).click(function(){
			$("#cinemas a").removeClass("select");
			$(this).addClass("select");
			setPlayList();
		});
	}
}


//排片列表生成
function setPlayList(){
	var sysPath = $("#sysPath").val();
	var filmNo = $("#filmNo").val();
	var date = $("#playDate_tab .blue").attr("id");
	var areaNo = $("#areas .select").attr("id");
	var cinemano= null;
	var cinemaList = $("#cinemas .select");
	for(var i=0; i < cinemaList.length;i++){
		if($($("#cinemas .select")[i]).is(":visible")){
			cinemano = $($("#cinemas .select")[i]).attr("cinemano");
		}
	}
	
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
	if( dataArray=='undefined'||dataArray==null||dataArray.length==0 ){
		var html ='<li><span colspan=\"10\">影院当前还没有更新排片！..你可以: <a class=\"c_red pl4\" href=\"movie.html\">选择其他影院或其他日期</span></li>';
		$("#data_table_body").empty().append(html);
		return ;
	}else{
		$("#play_list").show();
		var html = "";
		for( var i = 0 ; i < dataArray.length ; i++ ){
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

//留言输入事件	
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


