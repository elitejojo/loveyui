$(document).ready(function(){
	$("#a_submit").click(function(){
		//异步保存数据
		saveComment();
	});
	
	//评分
	$($(".comment_integration")[0]).ci({
		callBack:function(data){
			//alert(data.c_i);
			$("#commentCode").val(data.c_i);
		}
	});
	
});
	
//异步保存数据
function saveComment(){
	var param={
		comtent:$('#replycontent').val(),//评论内容
		ctype:"1",//评论渠道1：网页；2短信
		grade:$('#commentCode').val(),//评分 1-10
		pid:$('#comment_pid').val(),//评论父编号
		type:$('#type').val(),//评论关联类型编号 1影院；2影片；
	};
	var uri= $("#path").val();
	$.ajax({
		type:'POST',
		url:uri,
		data:param,
	 	success:saveCommentBack,
		error:function(){
			alert("系统繁忙，稍后再试");
		}			
	});
}

function saveCommentBack(){
	location.reload();
}