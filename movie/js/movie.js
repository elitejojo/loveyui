//-----------------------------------------------------------------------------------------
//detail.aspx  和 coming_detail.aspx页面公用JS
//-----------------------------------------------------------------------------------------
function ShowOtherFilms(){
    $("#div_OtherFilms").show();
    $("#div_OtherFilms").hover (
	    function(){$("#div_OtherFilms").show();},
	    function(){$("#div_OtherFilms").hide();}
	); 
}

function HideOtherFilms(){$("#div_OtherFilms").hide();}  

function ChangeTabList(obj,divobj){
    $("#div_TabList .sel").removeClass();
    $("#"+obj).addClass("sel");
     
    $("#div_TabItems div[id]").hide();
    $("#" + divobj).show();
    if(divobj == "div_SeatCinema"){
        $("#div_SeatCinemaList").show();
    }else if(divobj == "div_FilmPicture"){
        $("#div_FilmPicture div[id]").show();
    }else if(divobj == "div_FilmVideo"){
        $("#div_FilmVideo div[id]").show();
    }else if(divobj == "div_FilmComment"){
        $("#div_FilmComment div[id]").show();
        $("#div_MoreFilmComment").show(); 
    }
}

function ShowAddComment(){
    $("#div_TabList .sel").removeClass();
    $("#tab_FilmComments").addClass("sel");
    
    $("#div_TabItems div[id]").hide();
    $("#div_FilmComment").show(); 
    $("#div_FilmComment div[id]").show();
    $("#div_MoreFilmComment").hide(); 
    window.location.hash = "AddFilmComment";         
}

function ShowMoreFilmComment(){
    $("#div_TopFilmComment").hide();
    $("#div_MoreFilmComment").show(); 
    $("#div_MoreFilmCommentItem").show(); 
}

$(function(){
	$("#pic_spec_list").jdMarquee({
		deriction:"right",
		width:550,
		height:66,
		step:2,
		speed:4,
		delay:5,
		control:true,
		_front:"#pic_spec_right",
		_back:"#pic_spec_left"
	});
	$("#pic_spec_list img").bind("mouseover",function(){
		var src=$(this).attr("src");
		$("#pic_spec_n1 img").eq(0).attr({
			src:src.replace("\/n5\/","\/n1\/"),
			jqimg:src.replace("\/n5\/","\/n0\/")
		});
		$(this).css({"border":"2px solid #ff6600","padding":"1px"});
	}).bind("mouseout",function(){
	    $(this).css({"border":"none","padding":"2px"});
	});		
	
	$("#video_spec_list").jdMarquee({
		deriction:"right",
		width:550,
		height:110,
		step:2,
		speed:4,
		delay:5,
		control:true,
		_front:"#video_spec_right",
		_back:"#video_spec-left"
	});
	$("#video_spec_list img").bind("mouseover",function(){ 
		$(this).css({"border":"2px solid #ff6600","padding":"1px"});
	}).bind("mouseout",function(){
		$(this).css({"border":"none","padding":"2px"});
	}).bind("onclick",function(){
	    var videosrc=$(this).attr("videosrc");
		$("#video_spec_n1 object").eq(0).attr({
			data:videosrc.replace("\/n5\/","\/n1\/"),
			jqimg:videosrc.replace("\/n5\/","\/n0\/")
		});
	}); 
})
  
//------------------------------------------------------------------------------------------
//detail.aspx页面JS
//------------------------------------------------------------------------------------------ 
function ShowCinemaByTicketType(ticketType){ 
    if(ticketType==1){ //tickettype=1 表示选座票
        $("#div_SeatCinema").show();
        $("#div_SeatCinemaList").show();
        $("#div_CommonTicketCinema").hide(); 
    }else{             //否则表示通兑票
        $("#div_SeatCinema").hide();
        $("#div_CommonTicketCinema").show();
        $("#div_CommonTicketCinemaList").show();
    }
}

function ShowSeatCinemaArea(obj,areaNo){
    if(areaNo == "all"){
        $("#dd_SeatCinema a").show();                   //显示所有影院
        $("#dd_SeatCinema a").removeAttr("class");      //将影院样式清除
        $("#dd_SeatCinema a").first().addClass("sel");  //为区域的第一个影院添加选中样式
    }else{
        $("#dd_SeatCinema a").hide();                   //隐藏所有影院 
        $("#dd_SeatCinema a").removeAttr("class");      //移除该区域的选中影院样式
        $("#dd_SeatCinema a[areano='"+areaNo+"']").show();//显示指定区域的影院                
        $("#dd_SeatCinema a[areano='"+areaNo+"']").first().addClass("sel");//为该区域的第一个影院添加选中样式
    }
    
    $("#dd_SeatCinemaArea a").removeClass();//清除所有区域选中样式
    $(obj).addClass("sel");   //为选中区域添加样式 
    
    ShowUserSelectSeatCinema();
}

function ShowSeatCinema(obj,cinemaNo){  
    $("#dd_SeatCinema a").removeAttr("class");
    $(obj).addClass("sel"); 
    ShowUserSelectSeatCinema();
}

function ShowSeqDate(obj,showSeqNo){ 
    $("#dd_ShowSeqDate a").removeAttr("class");
    $(obj).addClass("sel"); 
    ShowUserSelectSeatCinema();
}

//根据用户选中的条件显示选座影院信息
function ShowUserSelectSeatCinema(){
    var seqDate = $("#dd_ShowSeqDate a[class='sel']").attr("seqdate");
    var cinemaNo= $("#dd_SeatCinema a[class='sel']").attr("cinemano");
    $("#div_SeatCinemaList div[cinemano]").hide();
    $("#div_SeatCinemaList div[cinemano='"+cinemaNo+"']").show();
    $("#div_SeatCinemaList div[cinemano='"+cinemaNo+"'] div[seqdate]").hide();
    $("#div_SeatCinemaList div[cinemano='"+cinemaNo+"'] div[seqdate='"+seqDate+"']").show();
}

//根据点击的对象和区域编号显示指定区域的影院信息，并加选中样式
//点击指定区域并默认选中该区域的第一家影院
function ShowTicketCinemaArea(obj,areaNo){
    if(areaNo == "all"){
        $("#dd_TicketCinema a").show();                   //显示所有影院
        $("#dd_TicketCinema a").removeAttr("class");      //将影院样式清除
        $("#dd_TicketCinema a").first().addClass("sel");  //为区域的第一个影院添加选中样式
    }else{
        $("#dd_TicketCinema a").hide();                   //隐藏所有影院 
        $("#dd_TicketCinema a").removeAttr("class");      //移除该区域的选中影院样式
        $("#dd_TicketCinema a[areano='"+areaNo+"']").show();//显示指定区域的影院                
        $("#dd_TicketCinema a[areano='"+areaNo+"']").first().addClass("sel");//为该区域的第一个影院添加选中样式
    }
    
    $("#dd_TicketCinemaArea a").removeClass();//清除所有区域选中样式
    $(obj).addClass("sel");   //为选中区域添加样式
    
    //获取选中的影院编号
    var cinemaNo = $("#dd_TicketCinema a[class='sel']").first().attr("cinemano"); 
    ShowUserSelectTicketCinema(cinemaNo);
}

//点击指定影院，添加相关样式
function ShowTicketCinema(obj,cinemaNo){
    $("#dd_TicketCinema a").removeAttr("class");
    $(obj).addClass("sel");  
    ShowUserSelectTicketCinema(cinemaNo);
}    

//根据用户选中的条件显示通兑影院信息
function ShowUserSelectTicketCinema(cinemaNo){
    $("#div_CommonTicketCinemaList div[cinemano]").hide();
    $("#div_CommonTicketCinemaList div[cinemano='"+cinemaNo+"']").show();
}

$(function() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var dateDay = today.getDate();
    var currayDay = today.getFullYear() + "-" + (month >= 10 ? month : "0" + month) + "-" + (dateDay >= 10 ? dateDay : "0" + dateDay);
    $("#showDateToday").attr("seqdate",currayDay);
    $("#showDateToday").html("今天("+currayDay +" "+week(today.getDay())+")");

    var tomorry = today.setDate(today.getDate() + 1);
    var tomorryDate = new Date(tomorry);
    var tomorryMonth = tomorryDate.getMonth() + 1;
    var tomorryDayDate = tomorryDate.getDate();

    var tomorryDay = tomorryDate.getFullYear() + "-" + (tomorryMonth >= 10 ? tomorryMonth : "0" + tomorryMonth) + "-" + (tomorryDayDate >= 10 ? tomorryDayDate : "0" + tomorryDayDate);
    $("#showDateTomorry").attr("seqdate",tomorryDay);
    $("#showDateTomorry").html("明天("+tomorryDay +" "+week(tomorryDate.getDay()) +")"); 
});

function week(day){
    switch(day){
        case 1: return "星期一"; break;
        case 2: return "星期二"; break;
        case 3: return "星期三"; break;
        case 4: return "星期四"; break;
        case 5: return "星期五"; break;
        case 6: return "星期六"; break;
        case 0: return "星期天"; break; 
    }
} 