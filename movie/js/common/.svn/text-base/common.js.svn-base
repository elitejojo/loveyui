function changeSelectValue(selectNode, value){
	for(var index=0;index<selectNode.length;index++){
		if(selectNode[index].value == value)
			selectNode.selectedIndex = index;
	}	
}

/** Jquery缓存处理 */
$(document).ready(function (){
		$.ajaxSetup({
				async: false,
				cache: false
			}); 		
	});
		
/** 显示或隐藏查询条件 */
function showHide(objectId, obj){
		    var object = document.getElementById(objectId);
			if (object.style.display=='none'){
				object.style.display="block";
				obj.innerHTML=obj.innerHTML.replace("+","-");
				obj.innerHTML=obj.innerHTML.replace("展开查询条件","隐藏查询条件");
			}else{
				object.style.display="none";
				obj.innerHTML=obj.innerHTML.replace("-","+");
				obj.innerHTML=obj.innerHTML.replace("隐藏查询条件","展开查询条件");
			}
}

/** 判断字符串是否为空. */
function isEmpty(s){
     return ((s == undefined || s == null || s == "") ? true : false);
}
