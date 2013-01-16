var searchF = true;
$(document).ready(function() {
	var aLi = $(".select_ticket_item").find("p");
	var aContent = $(".show_details");
	$(".show_details:gt(0)").hide();
	aLi.click(function() {
		var iCur = aLi.index(this);
		$(".show_details:gt(0)").hide();
		$(this).addClass("cur_active").siblings().removeClass("cur_active");
		aContent.eq(iCur).show().siblings(".show_details").hide()
	});
	$(".ticket_num span").click(function() {
		$(this).addClass("select_num").siblings().removeClass("select_num")
	});
	$("#firmAddrs").click(function() {
		$(".ui-dropdown-cnt").hide();
		if ($("#firmAddrs").hasClass("check")) {
			$("#firmAddrs").css("background", "#efefef");
			$("#firmAddrs").removeClass("check")
		} else {
			$("#firmAddrs").addClass("check").siblings(".check").removeClass("check").css("background", "#efefef");
			$("#firmAddrs").css("background", "#FFFFFF")
		}
		$(".cinema_select").removeClass("cinema_select");
		$(".alert_box").toggle()
	});
	$(".pack_up").click(function() {
		cursor = 0;
		var films = $("#slide_3 ul");
		var cinemaCode = $("#cinemaCode").val();
		var filmTypeCode = $('input:radio[name="ticketId"]:checked').attr("filmType");
		var filmCode = $("#filmCode").val();
		if (searchF) {
			$.ajax({
				url: piaolala.config.basepath + "/buy/queryFilms.do",
				data: {
					cinemaCode: cinemaCode,
					filmTypeCode: filmTypeCode,
					filmCode: filmCode
				},
				type: "POST",
				error: function(request) {},
				success: function(data) {
					var len;
					if (data == "" || data == null) {
						len = 0
					} else {
						len = data.length
					}
					films.attr("style", "").html("");
					if (len > 0) {
						$.each(data,
						function(index, item) {
							var $li = $("<li><div class='s_arrow '></div></li>");
							if (index == 0) {
								$li.addClass("cur_img")
							}
							var filmLink = $("<img src='http://cache.piaolala.com" + item.filmPicUrl + "'>").bind("mouseover",
							function() {
								$(".s_arrow").removeClass("add_bg");
								$li.find(".s_arrow").addClass("add_bg");
								getPaiqi(item.filmCode);
								$(".movie_showtime").addClass("add_bd")
							}).appendTo($li);
							filmLink.appendTo($li);
							$li.appendTo(films)
						});
						$(".nofilm").hide();
						$(".slide_wrap").show();
						$("#slide_3 ul li").eq(0).find("img").mouseover()
					} else {
						if (len <= 0) {
							$(".slide_wrap").hide();
							$(".nofilm").show().html("暂无影片放映数据，请以影院实际播放为准.")
						}
					}
					if (len >= 6) {
						$("#prev_btn").removeClass("prev_btn").addClass("un_prev_btn");
						$("#next_btn").addClass("next_btn");
						$("#slide_3 .prev3").bind("click", msgClik)
					} else {
						if ((len > 0) && (len < 6)) {
							$("#prev_btn").addClass("un_prev_btn").removeClass("prev_btn");
							$("#next_btn").addClass("un_next_btn").removeClass("next_btn");
							$("#slide_3 .prev3").unbind("click")
						}
					}
					searchF = false
				}
			})
		}
		$(".paiqiInfo").toggle();
		if ($("#pack_up").hasClass("pack_up")) {
			$("#pack_up").html("点击收起").addClass("pack_up_toggle").removeClass("pack_up")
		} else {
			$("#pack_up").html("点击展开").removeClass("pack_up_toggle").addClass("pack_up")
		}
	});
	$(".close_btn").click(function() {
		$(".alert_box").hide();
		$("#firmAddrs").css("background", "#efefef");
		$("#firmAddrs").removeClass("check")
	});
	$("#select_citys").click(function() {
		if ($("#select_citys").hasClass("check")) {
			$("#select_citys").css("background", "#efefef");
			$("#select_citys").removeClass("check")
		} else {
			$("#select_citys").addClass("check").siblings(".check").removeClass("check").css("background", "#efefef");
			$("#select_citys").css("background", "#FFFFFF")
		}
		$(".alert_box").hide();
		if ($(".ui-dropdown-cnt").is(":visible")) {
			$(".ui-dropdown-cnt").hide()
		} else {
			$(".ui-dropdown-cnt").show()
		}
	});
	$(".close").click(function() {
		$(".ui-dropdown-cnt").hide();
		$("#select_citys").css("background", "#efefef");
		$("#select_citys").removeClass("check")
	})
});
var cursor = 0;
function ok() {
	alert(11)
}
var msgClik = function marginMsg() {
	var $thisSlide = $("#slide_3"),
	$thumbs = $thisSlide.find("ul"),
	$thumb = $thisSlide.find(".cur_img"),
	thumbCount = $thumbs.children("li").length,
	maxpoint = thumbCount - 5,
	pointnoe = 3;
	if (maxpoint < 3) {
		pointnoe = maxpoint
	}
	offset = $thumb.width() + 2 * parseInt($thumb.css("margin-left"), 10) + pointnoe;
	if ($(this).hasClass("prev_btn") && this.id == "prev_btn") {
		cursor = cursor - pointnoe < 0 ? 0 : cursor - pointnoe
	} else {
		if ($(this).hasClass("next_btn") && this.id == "next_btn") {
			cursor = cursor + pointnoe > maxpoint ? maxpoint: cursor + pointnoe
		}
	}
	if (cursor <= 0) {
		$("#prev_btn").removeClass("prev_btn").addClass("un_prev_btn")
	} else {
		$("#prev_btn").removeClass("un_prev_btn").addClass("prev_btn")
	}
	if (cursor >= maxpoint) {
		$("#next_btn").removeClass("next_btn").addClass("un_next_btn")
	} else {
		$("#next_btn").removeClass("un_next_btn").addClass("next_btn")
	}
	$thumbs.animate({
		"margin-left": -offset * cursor
	},
	600)
};
function getCinemas(areaCode) {
	var currCoded = $("#firmAddrs").attr("cinemaCode");
	var cinemas = $(".cinema_list");
	$.ajax({
		url: piaolala.config.basepath + "/buy/getCinemasByareaCode.do",
		data: {
			areaCode: areaCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			cinemas.html("");
			$.each(data,
			function(index, item) {
				var cName = item.cinemaName;
				var len = cName.length;
				if (len > 8) {
					cName = cName.substring(0, 7) + "..."
				}
				var $li = $("<a  id='" + item.cinemaCode + "'title='" + item.cinemaName + "'>" + cName + "</a>").click(function() {
					$("#firmAddrs").html(item.cinemaName + "<a href='#'></a>");
					$("#firmAddrs").attr("value", item.cinemaCode);
					$("#firmAddrs").attr("cinemaCode", item.cinemaCode);
					$("#cinemaCode").val(item.cinemaCode);
					$("#cName").val(item.cinemaName);
					$(".show_title .cinema_name").html(item.cinemaName);
					$(".alert_box").hide();
					$(".address").html("地址：" + item.cinemaAddress);
					getTtickets(item.cinemaCode)
				});
				if (currCoded === item.cinemaCode) {
					$li.addClass("cinema_select").siblings().removeClass("cinema_select")
				}
				$li.appendTo(cinemas)
			});
			if (data.length == 0) {
				cinemas.html("当前区域没有影城!");
				$("#firmAddrs").html("")
			} else {}
		}
	})
}
function getSaleCommodityInfo(saleCommodityCode) {
	var cinemaCode = $("#cinemaCode").val();
	$.ajax({
		url: piaolala.config.basepath + "/buy/getSaleCommodityInfo.do",
		data: {
			saleCommodityCode: saleCommodityCode,
			cinemaCode: cinemaCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			$("#days").html(data.validDays);
			$("#description").html(data.useDescription);
			$("#useDescription").html("注：" + data.saleCommodityDescription)
		}
	})
}
function showFilm() {
	var cinemaCode = $("#cinemaCode").val();
	var filmTypeCode = $('input:radio[name="ticketId"]:checked').attr("filmType");
	var filmCode = $("#filmCode").val();
	$.ajax({
		url: piaolala.config.basepath + "/buy/queryFilms.do",
		data: {
			cinemaCode: cinemaCode,
			filmTypeCode: filmTypeCode,
			filmCode: filmCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			if (data.length == 1) {
				$("#pack_up").html("");
				$(".slide_wrap").html("暂无影片放映数据，请以影院实际播放为准。")
			}
		}
	})
}
function getPaiqi(filmCode) {
	var paiqi = $("#paiqi");
	var filmTypeCode = $('input:radio[name="ticketId"]:checked').attr("filmType");
	var cinemaCode = $("#cinemaCode").val();
	$.ajax({
		url: piaolala.config.basepath + "/buy/queryPaiqi.do",
		data: {
			filmTypeCode: filmTypeCode,
			filmCode: filmCode,
			cinemaCode: cinemaCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			paiqi.html("");
			var name = data.planName;
			var planArray = name.split("|");
			var a = "";
			for (i = 0; i < planArray.length; i++) {
				a = a + "<span>" + planArray[i] + "<b>|</b></span>"
			}
			var paiqiData = $(a);
			var $s1 = $("<span class='movie_sort'>" + data.planType + "/" + data.language + "</span>");
			var $s2 = $("<p class='showtime'></p>");
			$s1.appendTo(paiqi);
			paiqiData.appendTo($s2);
			$s2.appendTo(paiqi);
			if (data.length == 0) {
				paiqi.html("该影片没有排期信息!")
			} else {}
		}
	})
};