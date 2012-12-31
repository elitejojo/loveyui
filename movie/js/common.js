/**
 * 弹出框
 * @param {} msg
 */
function ShowLoading(msg)
{
    $.XYTipsWindow(
    {
        ___title: "温馨提示",
        ___content: "id:div_loading",
        ___width: "400",
        ___height: "50",
        ___showTitle: true,
        ___showBoxbg: true,
        ___showbg: true,
        ___windowBgColor: "#000",
        ___closeBox: false,
        ___fns: function ()
        {
            $("#p_loading").html(msg);
        }
    });
}

/**
 * 弹出错误信息对话框
 */
function ShowErrorMessage(msg)
{
    $.XYTipsWindow(
    {
        ___title: "温馨提示",
        ___content: "id:div_errormsg",
        ___width: "400",
        ___height: "120",
        ___showbg: true,
        ___showTitle: false,
        ___button: ["确定"],
        ___closeBox: false,
        ___fns: function ()
        {
            $("#p_msg").html(msg);
        }
    });
}

function ShowErrorMsgAndRedirect(msg, url)
{
    $.XYTipsWindow(
    {
        ___title: "温馨提示",
        ___content: "id:div_errormsg",
        ___width: "400",
        ___height: "120",
        ___showbg: true,
        ___showTitle: false,
        ___closeBox: false,
        ___button: ["确定"],
        ___callback: function ()
        {
            window.location.href = url;
        },
        ___fns: function ()
        {
            $("#p_msg").html(msg);
        }
    });
}

function OpenUrl(url)
{
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "ticket_openwin");
    document.body.appendChild(a);
    if (a.click) a.click(); //判断是否支持click() 事件
    else if (a.fireEvent) a.fireEvent('onclick'); //触发click() 事件
    else if (document.createEvent)
    {
        var evt = document.createEvent("MouseEvents"); //创建click() 事件
        evt.initEvent("click", true, true); //初始化click() 事件
        a.dispatchEvent(evt); //分发click() 事件
    }
}


//评论中获取评论默认图片
function getPicturePath(path){
    if ($.trim(path) != "" && $.trim(path) != "0") {
        return "../resource/images/userface/" + path + ".jpg";
    }else{ 
        return "../resource/images/userphoto.jpg";
    }
}

//评论中获取用户名
function getUserName(userName) {
    if ($.trim(userName) != "") {
        var reg = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])\d{8}$/;
        if (reg.test(userName)) { //判断是否手机号码
            return userName.substring(0, userName.length - 4) + "****";
        } else {
            return userName;
        }
    }
    return "";
}

// 获取指定参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}