;(function($){
				$.fn.movieTab = function(options){
					var _default = {
						callBack:function(){return true;},
						operClass:{}
					};
					var _options = $.extend(options,{});
					var tabs = $("#"+$(this).attr("id")+" li");
					for(var i = 0 ; i < tabs.length;i++){
						if( i==0 ){
							$(tabs[i]).addClass("blue");
						}else{
							$(tabs[i]).addClass("gray");
						}
						tabs[i].index = i;		
						$(tabs[i]).click(function(){
							resetClass();
							$(this).removeClass("gray").addClass("blue");
							$(_options.operClass[this.index]).show();
							_options.callBack.call(this,arguments);
						}).mouseover(function(){
							$(this).css("cursor","pointer");		
						}).mouseout(function(){
							$(this).css("cursor","default");		
						});
					}
					function resetClass(){
						for(var i = 0 ; i < tabs.length;i++){
							$(tabs[i]).removeClass("blue").addClass("gray");
							$(_options.operClass[i]).hide();
						}
					}
					
				}				
})(jQuery);
