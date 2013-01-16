function formSub() {
	var tickNum = $(".select_num").html();
	var num = tickNum.substring(0, 1);
	$("#ticketNum").val(num);
	var seleTick = $("input[name=ticketId]:checked");
	if (seleTick.length == 0) {
		alert("该影城还没添加票种信息!");
		return false
	}
	if (num == 0) {
		alert("您还没添加购票数量!");
		return false
	}
	piaolala.vilidate.islogin(validate)
}
function validate(data) {
	if (!data.state) {
		piaolala.win.alertLogreg(form_submit)
	} else {
		form_submit()
	}
}
function form_submit() {
	$("#load").css("top", $(window).height() / 2);
	$("#load").css("left", ($(window).width() - $("#load").width()) / 2);
	$("#load").css("zIndex", 10006);
	$("#load").show();
	$("#layerPage").css({
		width: $(window).width(),
		height: $(document.body).height(),
		display: "block",
		zIndex: 10000
	});
	document.forms.fTicket.submit()
}
function chanFirmsBycid(cid, searchCinema) {
	var tfirms = $("#tfirms");
	var firms = $("#tfirms ul");
	var tfirm = $("#tfirm");
	var cinemaCode = $("#cinemaCode");
	$.ajax({
		url: piaolala.config.basepath + "/buy/getFirmsBycid.do",
		data: {
			cityId: cid,
			cinemaName: searchCinema
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			firms.html("");
			$.each(data,
			function(index, item) {
				var $li = $("<li  id='" + item.cinemaCode + "'>" + item.cinemaName + "</li>").addClass("").click(function() {
					cinemaCode.val(item.cinemaCode);
					tfirm.html("");
					tfirm.html("" + item.cinemaName + "&nbsp;&nbsp;&nbsp;[地址]");
					$("#firmAddrs").html("地址：" + item.cinemaAddress);
					getTtickets(item.cinemaCode)
				}).appendTo(firms);
				if (index == 0) {
					cinemaCode.val(item.cinemaCode)
				}
				if (currentFirmId == item.cinemaCode) {
					cinemaCode.val(item.cinemaCode)
				}
			});
			tfirms.css("display", "none");
			if (data.length == 0) {
				tfirm.html("当前城市没有影城!");
				$("#firmAddrs").html("");
				cinemaCode.val(0)
			} else {
				tfirms.slideDown(100)
			}
			getTtickets(cinemaCode.val())
		}
	})
}
function getFilmPan(firmId) {
	var tFilmPan = $("#FilmPan");
	$.ajax({
		url: piaolala.config.basepath + "/buy/getfimlPan.do",
		data: {
			firmId: firmId
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			tFilmPan.html("");
			$.each(data,
			function(index, item) {
				var $li = $("<li>" + item.FilmName + "</li>").appendTo(tFilmPan)
			})
		}
	})
}
function getTtickets(firmId) {
	var tTickets = $("#tTickets");
	var filmTypeCode = $("#filmTypeCode").val();
	var filmCode = $("#filmCode").val();
	tTickets.html("");
	$.ajax({
		url: piaolala.config.basepath + "/buy/getTtickets.do",
		data: {
			firmId: firmId
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			tTickets.html("");
			$.each(data,
			function(index, item) {
				var tickStr = "";
				if (index === 0) {
					tickStr = "checked=checked"
				}
				var ticInput = $("<input  type='radio' id='" + item.saleCommodityCode + "' name='ticketId' " + tickStr + " value='" + item.saleCommodityCode + "' dataprice='" + item.saleCommoditySalePrice + "' filmType='" + item.filmTypeCode + "' notes='" + item.saleCommodityDescription + "' />").hide();
				var tTicket = $("<p id='" + item.filmTypeCode + "'/>").html("<span>" + item.saleCommodityDisplayName + '</span><span class="price">' + item.saleCommoditySalePrice + "元</span>").click(function() {
					$(this).addClass("cur_active").siblings(".cur_active").removeClass("cur_active");
					$(this).find('input:radio[name="ticketId"]').attr("checked", "checked");
					$("#piaoname").html(item.saleCommodityDisplayName + ":");
					$(".show_cur").removeClass("pos1 pos2 pos3");
					$(".show_cur").addClass("pos" + (1 + $(this).index()));
					$(".show_details").show();
					$("#pack_up").html("点击展开");
					$("#pack_up").removeClass("pack_up_toggle");
					$("#pack_up").addClass("pack_up");
					$(".paiqiInfo").hide();
					searchF = true;
					getSaleCommodityInfo(item.saleCommodityCode)
				});
				ticInput.appendTo(tTicket);
				tTicket.appendTo(tTickets);
				if (filmTypeCode == "02") {
					$("#tTickets").find("#" + filmTypeCode).addClass("cur_active").siblings(".cur_active").removeClass("cur_active");
					tTicket.click()
				} else {
					if (index == 0) {
						$("#tTickets").find("#06").addClass("cur_active").siblings(".cur_active").removeClass("cur_active");
						tTicket.click()
					}
				}
				var _temp_ticket = $("#_temp_ticket").val();
				if (_temp_ticket == "") {
					if (index === 0) {
						tTicket.click()
					}
				} else {
					if (_temp_ticket == item.saleCommodityDisplayName) {
						tTicket.click()
					}
				}
			});
			if (data.length == 0) {
				$(".show_details").hide();
				tTickets.html("当前影院没有提供影票类型！")
			}
			getFilmPan(firmId);
			if (filmCode != "" && filmCode.length > 0) {
				$("#pack_up").click()
			}
		}
	})
}
function changNote() {
	var seleTick = $("input[name=ticketId]:checked");
	var notetext = seleTick.attr("notes");
	if (notetext === undefined) {
		$("#notice").html("")
	} else {
		$("#notice").html("4、" + notetext)
	}
}
// 影院联动 选择区域:

function intCityInfo(cityCode, intF, cityNmae) {
	$("#cityId").val(cityCode);
	$("#select_citys").css("background", "#efefef");
	$("#select_citys").removeClass("check");
	$(".alert_box .alert_title a").remove();
	$(".alert_box .cinema_list a").remove();
	$(".ui-dropdown-cnt").hide();
	$.ajax({
		url: piaolala.config.basepath + "/buy/getAreaBycid.do",   //替换地址
		data: {
			cityId: cityCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			$.each(data,
			function(index, item) {
				if (index == 0) {
					$("<a  id='all'>全部</a>").addClass("cur").click(function() {
						$("#allCinema").removeClass("cur");
						$(this).addClass("cur").siblings().removeClass("cur");
						$(".alert_box .cinema_list a").show()
					}).appendTo($(".alert_box .alert_title"))
				}
				$("<a  id='" + item.areaCode + "'>" + item.areaName + "</a>").click(function() {
					$(this).addClass("cur").siblings().removeClass("cur");
					$(".alert_box .cinema_list a").show();
					$("'.alert_box .cinema_list a:not(." + item.areaCode + ")'").hide()
				}).appendTo($(".alert_box .alert_title"))
			})
		}
	});
	$.ajax({
		url: piaolala.config.basepath + "/buy/getFirmsBycid.do",
		data: {
			cityId: cityCode
		},
		type: "POST",
		error: function(request) {},
		success: function(data) {
			$.each(data,
			function(index, item) {
				var cName = item.cinemaName;
				var len = cName.length;
				if (len > 8) {
					cName = cName.substring(0, 7) + "..."
				}
				var $li = $("<a  id='" + item.cinemaCode + "'title='" + item.cinemaName + "'>" + cName + "</a>").addClass("" + item.areaCode + "").click(function() {
					$("#" + item.cinemaCode).attr("style", "background: #00633c;color: #fff;").siblings().attr("style", "background: #fff;color: #000;");
					$("#firmAddrs").html(item.cinemaName + "<a href='#'></a>");
					$("#firmAddrs").attr("value", item.cinemaCode);
					$("#firmAddrs").attr("cinemaCode", item.cinemaCode);
					$("#cinemaCode").val(item.cinemaCode);
					$("#cName").val(item.cinemaName);
					$(".show_title .cinema_name").html(item.cinemaName);
					$(".alert_box").hide();
					$(".address").html("地址：" + item.cinemaAddress);
					$("#firmAddrs").css("background", "#efefef");
					$("#firmAddrs").removeClass("check");
					getTtickets(item.cinemaCode)
				});
				$li.appendTo($(".alert_box .cinema_list"))
			});
			if (intF == "1") {
				$("#" + $("#cinemaCode").val()).click()
			} else {
				$("#select_citys").html(cityNmae + "<a href='#'></a>");
				$(".alert_box .cinema_list a").eq(0).click();
				$("#firmAddrs").click()
			}
			if (data.length == 0) {
				$(".alert_box .cinema_list").html("当前城市没有影城!");
				$("#firmAddrs").html("")
			} else {}
		}
	})
};