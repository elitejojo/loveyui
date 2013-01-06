;(function($){
				$.fn.movieTab = function(options){
					var _default = {
						syn:true,//是否同步
						callBack:function(){return true;},//选中之后的额外事件
						operClass:{}//操作的对象
					};
					var _options = $.extend(options,{});
					var tabs = $("#"+$(this).attr("id")+" span");
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
							if( _options.syn&&_options.operClass.length>1 ){
								$(_options.operClass[this.index]).show();
								_options.callBack.call(this,arguments);
							}else if( !_options.syn&&_options.operClass.length==1){
								_options.callBack.call(this,arguments);
							}	
						}).mouseover(function(){
							$(this).css("cursor","pointer");		
						}).mouseout(function(){
							$(this).css("cursor","default");		
						});
					}
					function resetClass(){
						for(var i = 0 ; i < tabs.length;i++){
							$(tabs[i]).removeClass("blue").addClass("gray");
							if( _options.syn&&_options.operClass.length>1 ){
								$(_options.operClass[i]).hide();
							}
						}
					}
					
				}				
})(jQuery);
