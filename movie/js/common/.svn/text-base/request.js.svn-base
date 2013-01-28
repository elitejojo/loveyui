//处理url
var request = new request();
function request()
{
	//url 参数
	var requestParam = [];
	var url = window.location.href;
	//解析 url
	if(url.indexOf("?") >= 0 )
	{
		var urlKeyValue = url.substring(url.indexOf("?")-0+1,url.length).split("&");
		for(var i = 0; i < urlKeyValue.length; i++)
		{
			//解析 parameterName
			if(urlKeyValue[i].split("=")[0])
			{
				requestParam[urlKeyValue[i].split("=")[0]] = "";
				//解析 parameterValue
				if(urlKeyValue[i].split("=")[1])
				{
					requestParam[urlKeyValue[i].split("=")[0]]=	urlKeyValue[i].split("=")[1];
				}
			}
		}
	}
	
	//获取参数
	this.getParameter = function(paramName)
	{
		if(requestParam[paramName]) return requestParam[paramName];
		return "";
	}
}