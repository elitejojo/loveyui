
jQuery(function($) {
setupCaptionAnimation();
//$(".search").delay(500).animate({top: '+=33'}, function() { $(".search").css("z-index","0"); $(".search").css("display","block"); });
skinGoogleSearchBar();
$(".searchfield").blur(skinGoogleSearchBar);
$('.searchform').submit(function(){
var q = $(".searchfield").val();
if(q=='') {
$(".searchfield").css('border','2px solid rgb(255,0,0)');
return false;
}
else return true;
});
jQuery(window).load(function() {
hideDisqusRSS();
});
(function( $, window, undefined) {
var is_shows = /\/shows\//.test(document.location.href);
if ( is_shows )
{
$('#header-nav .menu li.selected').removeClass('selected');
$('#header-nav .menu li.video').addClass('selected');
}
var $section = $('#header-nav .menu li.selected a');
var section_color = $section.css('border-top-color');
var $filter_bar = $("#filter-bar");
$("nav#header-nav .selected .sub-menu li").remove().appendTo($filter_bar);
var $all = $("<li class='all'><a href='"+$section.attr('href')+"'>All</a></li>");
$($all).prependTo($filter_bar);
var link = document.location.href.split('/');
var is_archive = /\/archive\//.test(document.location.href);
var is_category = /\/category\//.test(document.location.href);
var subsection = link[3];
if (is_archive || is_category || is_shows )
{
subsection = is_archive ? link[3] : link[4];
if ( is_archive )
{
//Show the month if it's an archive page
$('.list.archive #month-title').css('display', 'inline');
}
}
anchors = $filter_bar.find("li a");
$selected = null;
for (i=0; i<anchors.length; i++)
{
$anchor = $(anchors[i]);
regex = new RegExp(subsection);
if ( regex.test($anchor.attr('href')) )
{
$selected = $anchor;
break;
}
}
if ( null != $selected && section_color && section_color.length)
{
$selected.css('background-color', section_color).css('color', 'white');
$selected.parent().parent().css('border-bottom', '2px solid '+section_color);
$selected.parent().parent().parent().find('.promo_marquee .caption').css('background-color', section_color);
}
})( jQuery, window )
function setupCaptionAnimation() {
// note: we're only targetting posts, as galleries have no metadata to show on hover.
$('.post.tile').hover(function() {
$('.expando', this).slideDown('fast');
}, function() {
$('.expando', this).slideUp('fast');
});
}
function hideDisqusRSS() {
$("#dsq-pagination").css("display","none");
}
function skinGoogleSearchBar() {
$(".searchfield").addClass("gSkin");
}
});
