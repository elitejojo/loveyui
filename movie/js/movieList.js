//选择城市操作
$("#change").click(function() {
$(".City_list").show();
$(".City_list2").show();
var cityNo = getCookie("_CityNo_");
if (cityNo != "") {
$("#"+cityNo).attr("class","sel");
}
});
$(".City_list").mouseleave(function() {
$(".City_list").hide();
$(".City_list2").hide();
});
//切换城市
function ChangCity(id) {
var str = $("#" + id).html();
if (str.length > 4) {
str = str.substr(0, 4);
}
$("#span_CityName").html(str);
setCookie("_CityName_", encodeURI(str));
setCookie("_CityNo_", encodeURI(id));
window.location.href = '../index.aspx';
}
//设置默认值
if (getCookie("_CityName_") != null) {
$("#span_CityName").html(getCookie("_CityName_"));
} else {
setCookie("_CityName_", encodeURI("广州"));
setCookie("_CityNo_", encodeURI("440100"));
}
//JS Cookie操作
function getCookieVal(offset) {
var endstr = document.cookie.indexOf(";", offset);
if (endstr == -1) {
endstr = document.cookie.length;
}
return decodeURI(document.cookie.substring(offset, endstr));
}
function getCookie(name) {
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
var j = 0;
while (i < clen) {
j = i + alen;
if (document.cookie.substring(i, j) == arg)
return getCookieVal(j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0)
break;
}
return null;
}
function deleteCookie(name) {
var exp = new Date();
var cval = getCookie(name);
exp.setTime(exp.getTime() - 1);
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function setCookie(name, value) {
var argv = setCookie.arguments;
var argc = setCookie.arguments.length;
var exp = (argc > 2) ? argv[2] : 1;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
var expires = new Date();
expires.setTime(expires.getTime() + (exp * 24 * 60 * 60 * 1000));
document.cookie = name + "=" + value + "; path=/; expires=" + expires.toGMTString();
} 



//选项卡操作
$(".mune_xia").hide();
var name = window.location.pathname;
var on = 1;
if (name.indexOf("index") != -1) {
on = 1;
}else if (name.indexOf("movie") != -1) {
on = 2;
}else if (name.indexOf("cinema") != -1) {
on = 3;
}else if (name.indexOf("activity") != -1) {
on = 4;
}else if (name.indexOf("news") != -1) {
on = 5;
} //继续添加
$(".mune2 ul li a").attr("class", "");
$("#" + on).children("a").attr("class", "sel");
$("#content" + on).show();
//鼠标悬停事件
$(".mune2 ul li").hover(
function(){
var id = this.id;
var a = $(this).children("a");
var c = a.attr("class");
if (c != "sel") {
a.attr("class", "sel");
}
},
function(){
$("div .mune_xia").hide();
$(".mune2 ul li a").removeAttr("class");
$("#" + on + " a").attr("class", "sel");
$("#content" + on).show();
}
); 

 /**
  * 首页 选择影片onclick事件
  */
function clickFilm(selectValue, selectID) {
$("#txtFilm").html(selectValue);
$("#txtFilm").attr("title", selectValue);
$("#txtFilm").attr("value", selectID);
$("#selectFilm").hide();
$("#txtCinema").empty();
$("#txtCinema").html("选择影城");
$("#txtScreening").empty();
$("#txtScreening").html("选择场次");
$("#hidShowFilmTime").val("");
$("#labLoadCinemaHtml").html("");
$("#labLoadShowTime").html("");
loadCinema(selectID);
}

/**
 * 首页 选择影院事件
 */
function clickCinema(selectValue, selectID) {
if ($("#txtFilm").attr("value") != "0") {
$("#txtCinema").html(selectValue);
$("#txtCinema").attr("title", selectValue);
$("#txtCinema").attr("value", selectID);
$("#selectCinema").hide();
$("#labLoadShowTime").html("");
loadShowTime();
}
}
//首页 选择场次
function clickFilmTime(selectValue, selectID, seqNo) {
if ($("#txtCinema").attr("value") != "0") {
$("#txtScreening").html(selectValue);
$("#txtScreening").attr("title", selectValue);
$("#txtScreening").attr("value", selectID);
$("#selectScreening").hide();
$("#hidShowFilmTime").val(seqNo);
}
}
//快速购票
function buyTickets() {
if ($("#hidShowFilmTime").val() != "" && $("#hidShowFilmTime").val() != "0") {
window.location.href = "../buy/goseat.aspx?seqno=" + $("#hidShowFilmTime").val();
}else {
ShowErrorMessage("请选择场次后进行购票");
}
}
//首页 排期时间切换(今天、明天、后天)
function clickChangeTime(type) {
if (type == 1)//点击了今天，切换到今天的排期时间
{
$("#ddTodayTime").show();
$("#ddTomorrowTime").hide();
$("#ddAcquiredTime").hide();
$("#TodayTimeA").attr("class", "sel");
$("#TomorrowTimeA").removeAttr("class");
$("#AcquiredTimeA").removeAttr("class");
}
if (type == 2) {
$("#ddTodayTime").hide();
$("#ddTomorrowTime").show();
$("#ddAcquiredTime").hide();
$("#TomorrowTimeA").attr("class", "sel");
$("#TodayTimeA").removeAttr("class");
$("#AcquiredTimeA").removeAttr("class");
}
if (type == 3) {
$("#ddTodayTime").hide();
$("#ddTomorrowTime").hide();
$("#ddAcquiredTime").show();
$("#AcquiredTimeA").attr("class", "sel");
$("#TomorrowTimeA").removeAttr("class");
$("#TodayTimeA").removeAttr("class");
}
}
function loadCinema(filmNo) {
var filmNo = $("#txtFilm").attr("value");
var pars = "?action=loadCinema&FilmNo=" + filmNo + "&id=" + Math.random();
$.ajax({
type: "Get",
dataType: "text",
url: "/cinema/GetCinemaData.ashx" + pars, //提交到一般处理程序请求数据
complete: function(data) {
$("#labLoadCinemaHtml").html("");
$("#labLoadCinemaHtml").html(data.responseText);
}
});
}
function loadShowTime() {
var fno = $("#txtFilm").attr("value");
var cno = $("#txtCinema").attr("value");
var pars = "?action=loadTime&FilmNo=" + fno + "&CinemaNo=" + cno + "&id=" + Math.random();
$.ajax({
type: "Get",
dataType: "text",
url: "/cinema/GetCinemaData.ashx" + pars, //提交到一般处理程序请求数据
complete: function(data) {
$("#labLoadShowTime").html(data.responseText);
}
});
}
/********************公共调用方法**********************/
//隐藏对象
function hideObject(obj) {
$(obj).hide();
}
//显示或隐藏对象
function showOrHide(obj1, obj2, superior, type) {
if (type == 1){
$(obj1).show();
$("#selectCinema").hide();
$("#selectScreening").hide();
$(obj1).hover(
function() {$(obj1).show();},
function() {$(obj1).hide();}
);
}else{
$("#selectFilm").hide();
$("#selectCinema").hide();
$("#selectScreening").hide();
var isCurrorObj = 0;
if ($(superior).attr("value") != "0") {
isCurrorObj = 1;
}else{
isCurrorObj = 0;
}
if (isCurrorObj == 1) {
$(obj2).show();
$(obj2).hover(
function() {$(obj2).show();},
function() {$(obj2).hide();}
);
}
}
} 