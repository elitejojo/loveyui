;(function($){
					$.fn.ci = function(options){
							var _default = {
								callBack:function(){return true}
							};
							var _options = $.extend(_default,options||{});
							var Obj = $(this);
							initCommentStar();
							function initCommentStar(){
										var html = '<span class=\"comment_initRating\" id=\"comment_integration\">';
										html = html+'<i class=\"gray_left\"></i><i class=\"gray_right\"></i>';
										html = html+'<i class=\"gray_left\"></i><i class=\"gray_right\"></i>';
										html = html+'<i class=\"gray_left\"></i><i class=\"gray_right\"></i>';
										html = html+'<i class=\"gray_left\"></i><i class=\"gray_right\"></i>';
										html = html+'<i class=\"gray_left\"></i><i class=\"gray_right\"></i>';
										html = html+'</span><sup class=\"c_i c_sup\">0.0</sup><sub class=\"c_sub\">分</sub>';
										Obj.append(html);
							}
							var _this = $("#comment_integration");
							var s = _this.children();
							_this.clickFlag = false;
							_this.clickOverFlag = false;
							_this.c_i = 0;
							_this.c_c_i = 0;
							var pre = 0;
							
							for(var i = 0 ; i < s.length ; i++){
										s[i].max = i;
										$(s[i]).mouseover(function(){	
												this.min = 0;	
												lessOper(this);
												largerOper(this);
												setCiText();
												return false;	
										}).mouseout(function(e){
											if( !_this.clickFlag ){
													var obj = {min:0,max:-1};
													largerOper(obj);
													setCiText();
											}else{
													var obj = {min:0,max:(_this.c_c_i-1)};
													lessOper(obj);
													largerOper(obj);
													setCiText();
											
											}
											return false;
										}).click(function(){
												this.min = 0;
												lessOper(this);
												largerOper(this);
												_this.c_c_i = _this.find(".c_left,.c_right").length;
												$(".c_i").text(_this.c_c_i+".0");
												if( _this.clickFlag ){
													_this.clickOverFlag = false;
												}
												_this.clickFlag	 = true;
												_options.callBack.call(Obj,{c_i:_this.c_c_i});
												return false;
										});
							}
						
						
							//设置评分数值
							function setCiText(){
									_this.c_i = _this.find(".c_left,.c_right").length;
									$(".c_i").text(_this.c_i+".0");
							}

							var operLeftClass =  function (obj){
									this.obj = obj;
									this.overEvent = function(){
											this.obj.removeClass("gray_left");
											this.obj.addClass("c_left");	
									}

									this.outEvent = function(){
											this.obj.removeClass("c_left");
											this.obj.addClass("gray_left");	
									}	
							}

							var operRightClass = function(obj){
								this.obj = obj;
								this.overEvent = function(){
										this.obj.removeClass("gray_right");
										this.obj.addClass("c_right");
								}
								this.outEvent = function(){
									this.obj.removeClass("c_right");
									this.obj.addClass("gray_right");	
								}	
							}

							function lessOper(obj){

									for(var i = obj.min ; i <= obj.max ; i++){
											if(i%2==0){
													var operClass = new operLeftClass($(s[i]));
													operClass.overEvent();
											}else{
													var operClass = new operRightClass($(s[i]));
													operClass.overEvent();
											}
									}
							}
							function largerOper(obj){
								
								for(var i = obj.max+1 ; i < s.length ; i++){
											if(i%2==0){
													var operClass = new operLeftClass($(s[i]));
													operClass.outEvent();
											}else{
													var operClass = new operRightClass($(s[i]));
													operClass.outEvent();
											}
									}
							}
							
						
				return Obj;
						
												
						}								
		})(jQuery);
