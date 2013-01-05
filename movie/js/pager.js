/*
 *date:2012-12-11
 *author:wenzhui
 * 
 * */
;(function($){

	$.fn.pager = function(options){
		var _default = {
			currentPage:1,
			pageSize:6,
			totalSize:100,
			actionFun:function(){return false;},
			dataType:"JSON",//url地址或者JSON数据
			dataUrl:"",
			th_name:["编号","姓名"],
			cols:["id","name"],
			table_id:""
		};
		var _options = $.extend(_default,options||{});
		var _page = this;
		_page.currentPage = _options.currentPage;//初始化当前页为传入的当前页
		_page.init = init;//
		var totalPage = _options.totalSize%_options.pageSize==0?(_options.totalSize/_options.pageSize):parseInt((_options.totalSize/_options.pageSize))+1;//计算总页数
			
		function init(){
			var pageHtml = $("<ul ></ul>");
			if(_page.currentPage==1){	
				pageHtml.append( pageBtn(_page.currentPage,"上一页","next_page",_options.actionFun,true) );
			}else{
				pageHtml.append( pageBtn(_page.currentPage-1,"上一页","next_page",_options.actionFun) );
			}
			if(_page.currentPage<6){
				for( var i = 1 ; i <= _page.currentPage-1 ; i++ ){	
					pageHtml.append( pageBtn(i,""+i+"","",_options.actionFun) );
				}
				pageHtml.append( pageBtn(_page.currentPage,""+_page.currentPage+"","r_l",_options.actionFun) );
			}else{
				pageHtml.append(pageBtn(1,""+1+"","",_options.actionFun));
				pageHtml.append(pageBtn(2,""+2+"","",_options.actionFun));
				pageHtml.append("<li class=\"n_l\">...</li>");
				pageHtml.append( pageBtn(_page.currentPage-2,""+_page.currentPage-2+"","",_options.actionFun) );
				pageHtml.append( pageBtn(_page.currentPage-1,""+_page.currentPage-1+"","",_options.actionFun) );
				pageHtml.append( pageBtn(_page.currentPage,""+_page.currentPage+"","r_l",_options.actionFun) );
				
			}
			if( _page.currentPage <= totalPage ){
				if(_page.currentPage+4< totalPage){
					for( var i = _page.currentPage+1 ; i < _page.currentPage+4 ; i++ ){
						pageHtml.append(pageBtn(i,""+i+"","",_options.actionFun));
						
					}
					pageHtml.append("<li class=\"n_l\">...</li>");
				}else{
					for( var i = _page.currentPage+1 ; i <= totalPage ; i++ ){
						pageHtml.append(pageBtn(i,""+i+"","",_options.actionFun));
					}
				}
			}
			if(_page.currentPage==totalPage){	
				pageHtml.append(pageBtn(_page.currentPage,"下一页","next_page",_options.actionFun,true));
			}else{
				pageHtml.append(pageBtn(_page.currentPage+1,"下一页","next_page",_options.actionFun));
			}
			pageHtml.append("<li class=\"nothing\">共"+totalPage+"页&nbsp;"+_options.totalSize+"条记录</li>");
			$(_page).empty();
			return $(_page).append(pageHtml);
		}

		
		
		//按钮类	
		var pageBtn = function(btnValue,btnName,btnClass,btnEvent,disaAbled){
			//var _this = this;
			this.btnValue = btnValue;//按钮的值 
			this.btnName = btnName;//按钮文字
			this.btnClass = btnClass;//按钮样式
			this.btnEvent = btnEvent;//按钮事件
			this.disaAbled = false||disaAbled;
			var currentBtnValue = this.btnValue;
			var f = this.btnEvent;
			var disa = this.disaAbled;
			function init(){
				var btn_li = $("<li  class=\""+this.btnClass+"\" ><a  href=\"javascript:;\">"+this.btnName+"</a></li>");
				var btn = $(btn_li.find("a")[0]);
				if(this.disaAbled){
					btn.attr("disabled" , true);
				}
				btn.click(function(){
					if(!disa){
						if( _page.currentPage != currentBtnValue ){
							_page.currentPage =currentBtnValue;
							console.log(typeof(_options.dataType));
							//处理返回数据效果
							doDealData(_options.dataType);
							f.call(_page,arguments);
							var p = _page.init;
							p.call(_page,arguments);
						}
					
					}
				});
			
				 return btn_li;
			}
			return init();
		}
		//处理数据函数
		function doDealData(dataType){
			if(dataType==='JSON'){
				$.get(_options.dataUrl,function(msg){
					var data = msg.data;
					doJsonData(data);
				})
				
			}else{
				doReturnContent(data);	
			}
		}
		//处理JSON数据
		function doJsonData(data){
			$("#"+_options.table_id).empty();
			var table = $("<table></table>");
			var th = $("<thead><tr></tr></thead>");
			var th_body = new Array();
			var thNames = _options.th_name;
			for( var i = 0 ; i < _options.th_name.length ; i++ ){
				th_body.push("<th>"+thNames[i]+"</th>");
			}
			th.append(th_body.join(""));
			var tbody = $("<tbody></tbody>");
			var tbody_content = "";
			for( var i = 0 ; i < data.length ; i++ ){
				var obj = data[i];
				var data_tr = "<tr>";
				for(pro in obj){
					data_tr = data_tr + "<td>"+obj[pro]+"</td>";
				}
				data_tr = data_tr+"</tr>";
				tbody_content = tbody_content + data_tr;	
			}
			tbody.append(tbody_content);
			table.append(th);
			table.append(tbody);
			$("#"+_options.table_id).append(table);
			
		}
		//处理返回页面内容
		function doReturnContent(data){
			$("#"+_options.table_id).html($.get(data))	
		}

		init();

	}	
})(jQuery);
