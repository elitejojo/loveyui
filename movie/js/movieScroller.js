;(function($){
		/**
		  @required  : jquery.js,jquery-ui.js,jquery.mousewheel.js,*.css
 		 */		  
		$.fn.movieScroller = function(options){
			var _default = {
				speed:20//齿轮滚动速度		
			};			
			var _options = $.extend(_default,options||{});
			//初始化滚动条的长度
			var tr_h = $($("#data_table_body tr")[0]).height();
			var m_sroll_h = 5*tr_h+4;
			var trs = $("#data_table_body tr").length;
			if(trs<=5){
				$($(".scroller")[0]).hide();
				$("#data_table_body").width($(this).width());
				return ;
			}else{
				$( "#data_table_body" ).width($(this).width()-15);
				$(".scroller").show();	
				$( ".handle" ).height(m_sroll_h*(5/trs));	
			}
			//初始化滚动条的拖拽
			$($( ".handle" )[0]).draggable({ axis: "y",containment: "parent",drag:resetPlayPos});
			//拖动事件，修改播放列表的层的显示位置
			function resetPlayPos(){
				var sroll_length = parseInt($($( ".handle" )[0]).offset().top)-parseInt($( $(".decrease")[0] ).offset().top);
				$("#data_table_body").offset({top:parseInt($($( ".scroll" )[0]).offset().top)-sroll_length});
				
			}
			//滚动的最高点
			var min_top = parseInt($($( ".decrease" )[0]).offset().top)+$($( ".decrease" )[0]).height();
			//滚动的最低点
			var max_top = parseInt($($( ".increase" )[0]).offset().top)-$($( ".handle" )[0]).height();
			$("#data_table_body").mousewheel(function(event, delta, deltaX, deltaY){
				var tem_top ;
				if( delta>0 ){
					tem_top = Math.max((parseInt($($( ".handle" )[0]).offset().top)-_options.speed),min_top);
				}else{
					tem_top = Math.min(parseInt($($( ".handle" )[0]).offset().top)+_options.speed,max_top);	
				}
				$(".handle").offset({top:tem_top});	
				resetPlayPos();	
				return false;			
			});		

		

		}
})(jQuery);
