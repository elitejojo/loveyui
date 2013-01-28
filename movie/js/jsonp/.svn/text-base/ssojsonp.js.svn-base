/**
 * 在使用sso认证前，请先调用此方法以生成本域cookie，并重写集团安全通道cookie
 * 一般在用户可能首次访问到的页面加载事件中调用
 * 请调用之前在页面上引入jQuery1.4或以上版本,并引用jquery.jsonp-2.3.1.min.js
 * 参数说明
 * callback：自定义的回调函数，可为空
 **/
function initLocalCookie(callback){
	$.jsonp({
  		url: "https://js.ac.10086.cn/jsauth/ssoCookieJsonp",
  		timeout: 3000,
  		complete: function(xOptions, textStatus){
  			if (callback!==null && callback!==""){callback();}
  		}
	});
}

/**
 * 在使用sso登录后，请先调用此方法以生成10086.cn域cookie
 * 一般在完成登录接口后前台响应用户认证信息后调用
 * 请调用之前在页面上引入jQuery1.4或以上版本,并引用jquery.jsonp-2.3.1.min.js
 * 参数说明
 * callback：自定义的回调函数，可为空
 * cookie：sso登录后实体中返回的用户cookie值
 **/
function init10086cookie(callback, cookie){
	//先向本地写入cookie
	$.ssocookie('SSOCookie',cookie,{path:'/'});
	$.jsonp({
  		url: "http://www.js.10086.cn/jssso/ssoCookieJsonp?co="+cookie,
  		timeout: 3000,
  		complete: function(xOptions, textStatus){
  			if (callback!==null && callback!==""){window[callback]();}
  		}
	});
}

/**
 * 处理接口返回结果，如果设定了自定义回调函数，则调用
 **/
function dealResult(res){
	var v=res[0].res;
	if(v!="0" && v!="1"){
		//通过jsonp跨域读取10086.cn域下cookie值成功，开始创建本域cookie
		$.ssocookie('SSOCookie',v,{path:'/'});
	}
}