//登录frame
function login()
{
    $.XYTipsWindow(
    {
        ___title: "快速登录",
        ___content: "iframe:../user/loginframe.aspx",
        ___width: "456",
        ___height: "290",
        ___showbg: true,
        ___boxBdColor: "#A6C9E1",
        ___boxBdOpacity: "0.5",
        ___boxWrapBdColor: "#ABABAB",
        ___drag: "___boxTitle"
    });
}

//绑定手机号frame
function bind()
{
    if (checkIsLogin())
    {
        $.XYTipsWindow(
        {
            ___title: "绑定手机号",
            ___content: "iframe:../user/bindframe.aspx",
            ___width: "446",
            ___height: "220",
            ___showbg: true,
            ___boxBdColor: "#A6C9E1",
            ___boxBdOpacity: "0.5",
            ___boxWrapBdColor: "#ABABAB",
            ___drag: "___boxTitle"
        });
    }
}

//显示支付温馨提示
function ShowPayResult(orderNo)
{
    $.XYTipsWindow(
    {
        ___title: "温馨提示",
        ___content: "iframe:../buy/payresult.aspx?orderno=" + orderNo,
        ___width: "400",
        ___height: "190",
        ___showbg: true,
        ___boxBdColor: "#A6C9E1",
        ___boxBdOpacity: "0.5",
        ___boxWrapBdColor: "#ABABAB",
        ___drag: "___boxTitle"
    });
}
//显示会员卡充值温馨提示
function ShowFillResult(orderNo)
{
    $.XYTipsWindow(
    {
        ___title: "温馨提示",
        ___content: "iframe:../user/FillQuery.aspx?orderno=" + orderNo,
        ___width: "400",
        ___height: "190",
        ___showbg: true,
        ___boxBdColor: "#A6C9E1",
        ___boxBdOpacity: "0.5",
        ___boxWrapBdColor: "#ABABAB",
        ___drag: "___boxTitle"
    });
}
//检查是否登录       
function checkIsLogin()
{
    var revalue;
    var pars = "type=islogin&id=" + Math.random();
    $.ajax(
    {
        type: "GET",
        url: "http://new.jycinema.com/user/ajaxdata.aspx",
        async: false, //同步加载,默认为异步
        dataType: "html",
        data: pars,
        beforeSend: function (XMLHttpRequest)
        {
            //正在加载
        },
        success: function (msg)
        {
            revalue = msg;
        },
        complete: function (XMLHttpRequest, textStatus)
        {
            //隐藏正在查询图片
        },
        error: function (msg, url, line) //错误处理
        {
            alert('提示：系统错误。')
        }
    });

    if (revalue != "1")
    {
        setTimeout(login, 1);
        //login();
        return false;
    }
    return true;
}

//关闭
function winclose()
{
    $.XYTipsWindow.removeBox();
}