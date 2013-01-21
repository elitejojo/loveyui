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
