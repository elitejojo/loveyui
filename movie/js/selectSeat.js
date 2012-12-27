function selectSeat(obj, imgs)
{ //修改选中座位图片
    if (!checkIsLogin())
    { //快速登录 
        return false;
    }
    else
    {
        var $_l = $(obj).parent().prev().find("a"); //获取上一个座位 
        var $_r = $(obj).parent().next().find("a"); //获取下一个座位 
        if ($(obj).hasClass("selected"))
        { //判断该座位是否选中 	             
            if (!$_r.hasClass("selected") && $_r.html() != null && $_l.hasClass("selected"))
            { //右边为空，左边有人	 
                var $_l_1 = $_l.parent().prev().find("a"); //左边加1
                if ($_l_1.html() != null && !$_l_1.hasClass("selected"))
                { //左边+1为空
                    var $_l_2 = $_l_1.parent().prev().find("a");
                    //左边+2有人或者为边缘
                    if ($_l_2.html() == null || $_l_2.hasClass("selected"))
                    {
                        $(obj).removeClass("selected");
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        $_l.removeClass("selected");
                        $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");
                        $("#ul_SeatList li").each(function ()
                        {
                            if ($(this).attr("id") == $_l.attr("id"))
                            {
                                $(this).remove();
                                $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                            }
                        });
                    }
                    else
                    {
                        $(obj).removeClass("selected"); //移除选中状态
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    }
                }
                else
                {
                    $(obj).removeClass("selected"); //移除选中状态
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                }
            }
            else if (!$_l.hasClass("selected") && $_l.html() != null && $_r.hasClass("selected"))
            { //左边为空，右边有人  
                var $_r_1 = $_r.parent().next().find("a");
                if ($_r_1.html() != null && !$_r_1.hasClass("selected"))
                { //右边+1为空
                    var $_r_2 = $_r_1.parent().next().find("a");
                    //右边+2有人或者为边缘
                    if ($_r_2.html() == null || $_r_2.hasClass("selected"))
                    {
                        $(obj).removeClass("selected");
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        $_r.removeClass("selected");
                        $("#img_" + $_r.attr("id")).attr("src", "../img/selectSeat/free.png");
                        $("#ul_SeatList li").each(function ()
                        {
                            if ($(this).attr("id") == $_r.attr("id"))
                            {
                                $(this).remove();
                                $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                            }
                        });
                    }
                    else
                    {
                        $(obj).removeClass("selected");
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    }
                }
                else
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                }
            }
            else if ($_l.hasClass("selected") && $_r.hasClass("selected"))
            {
                if ($_l.hasClass("check") && !$_r.hasClass("check"))
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    $_r.removeClass("selected");
                    $("#img_" + $_r.attr("id")).attr("src", "../img/selectSeat/free.png");

                    $("#ul_SeatList li").each(function ()
                    {
                        if ($(this).attr("id") == $_r.attr("id"))
                        {
                            $(this).remove();
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        }
                    });
                }
                else if (!$_l.hasClass("check") && $_r.hasClass("check"))
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    $_l.removeClass("selected");
                    $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");

                    $("#ul_SeatList li").each(function ()
                    {
                        if ($(this).attr("id") == $_l.attr("id"))
                        {
                            $(this).remove();
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        }
                    });
                }
                else if ($_l.hasClass("check") && $_r.hasClass("check"))
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                }
                else if (!$_l.hasClass("check") && !$_r.hasClass("check"))
                {
                    var $_r_1 = $_r.parent().next().find("a");
                    if ($_r_1.html() != null && !$_r_1.hasClass("selected"))
                    { //右边+1为空
                        var $_r_2 = $_r_1.parent().next().find("a");
                        if ($_r_2.html() == null || $_r_2.hasClass("selected"))
                        { //右边+2有人或者为边缘
                            $(obj).removeClass("selected");
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                            $_r.removeClass("selected");
                            $("#img_" + $_r.attr("id")).attr("src", "../img/selectSeat/free.png");
                            $_l.removeClass("selected");
                            $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");
                            $("#ul_SeatList li").each(function ()
                            {
                                if ($(this).attr("id") == $_l.attr("id") || $(this).attr("id") == $_r.attr("id"))
                                {
                                    $(this).remove();
                                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                                }
                            });
                        }
                        else
                        {
                            $(obj).removeClass("selected");
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                            $_l.removeClass("selected");
                            $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");
                            $("#ul_SeatList li").each(function ()
                            {
                                if ($(this).attr("id") == $_l.attr("id"))
                                {
                                    $(this).remove();
                                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                                }
                            });
                        }
                    }
                    else
                    {
                        $(obj).removeClass("selected");
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        $_l.removeClass("selected");
                        $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");
                        $("#ul_SeatList li").each(function ()
                        {
                            if ($(this).attr("id") == $_l.attr("id"))
                            {
                                $(this).remove();
                                $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                            }
                        });
                    }
                }
            }
            else if ($_l.hasClass("selected") && $_r.html() == null)
            {
                if ($_l.hasClass("check"))
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                }
                else
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    $_l.removeClass("selected");
                    $("#img_" + $_l.attr("id")).attr("src", "../img/selectSeat/free.png");

                    $("#ul_SeatList li").each(function ()
                    {
                        if ($(this).attr("id") == $_l.attr("id"))
                        {
                            $(this).remove();
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        }
                    });
                }
            }
            else if ($_r.hasClass("selected") && $_l.html() == null)
            {
                if ($_r.hasClass("check"))
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                }
                else
                {
                    $(obj).removeClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    $_r.removeClass("selected");
                    $("#img_" + $_r.attr("id")).attr("src", "../img/selectSeat/free.png");

                    $("#ul_SeatList li").each(function ()
                    {
                        if ($(this).attr("id") == $_r.attr("id"))
                        {
                            $(this).remove();
                            $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                        }
                    });
                }
            }
            else if (($_r.html() != null && !$_r.hasClass("selected") && !$_r.hasClass("selected") && $_r.html() != null) || (!$_r.hasClass("selected") && $_r.html() == null) || ($_r.html() == null && !$_r.hasClass("selected")))
            {
                $(obj).removeClass("selected");
                $("#" + imgs).attr("src", "../img/selectSeat/free.png");
            }
            if (!$(obj).hasClass("selected"))
            {
                $("#ul_SeatList li").each(function ()
                {
                    if ($(this).attr("id") == $(obj).attr("id"))
                    {
                        $(this).remove();
                        $("#" + imgs).attr("src", "../img/selectSeat/free.png");
                    }
                });
            }
        }
        else
        { //判断选中数量  
            if ($("#ul_SeatList li").length >= 4)
            {
                ShowErrorMessage("对不起，每个场次最多可购4个座位！！");
            }
            else if ($_l.html() == null || $_r.html() == null || $_l.hasClass("selected") || $_r.hasClass("selected"))
            {
                $(obj).addClass("selected");
                $("#" + imgs).attr("src", "../img/selectSeat/lock.png");
            }
            else if (!$_l.hasClass("selected") && !$_r.hasClass("selected"))
            {
                var $_l_1 = $_l.parent().prev().find("a");
                var $_r_1 = $_r.parent().next().find("a");
                if ($_l_1.html() != null && $_r_1.html() != null && !$_l_1.hasClass("selected") && !$_r_1.hasClass("selected"))
                {
                    $(obj).addClass("selected");
                    $("#" + imgs).attr("src", "../img/selectSeat/lock.png");
                }
                else
                {
                    ShowErrorMessage("请连续选择座位，不要留下单个的空闲座位！");
                }
            }
        }

        if ($(obj).hasClass("selected"))
        {
            var _html = "<li class='fl' id='" + $(obj).attr("seatno") + "'><b class='csz'>" + $(obj).attr("title") + "</b></li>"; //座位文本text 
            $("#ul_SeatList").append(_html);
            $("#" + imgs).attr("src", "../img/selectSeat/lock.png");
        }

        var selectedVal = "";
        $("#ul_SeatList li").each(function ()
        {
            if (selectedVal == "")
            {
                selectedVal = $(this).attr("id");
            }
            else
            {
                selectedVal = selectedVal + "|" + $(this).attr("id");
            }
        });
        var countNum = "";
        switch ($("#ul_SeatList li").length)
        {
            case 1:
                countNum = "一";
                break;
            case 2:
                countNum = "两";
                break;
            case 3:
                countNum = "三";
                break;
            case 4:
                countNum = "四";
                break;
        }

        //$("#p_SeatCount").html(countNum + "个座位共计：￥<span class='Price_zi'>" + parseFloat($("#ul_SeatList li").length * $("#sp_Price").text()).toFixed(2) + "</span>元")
        $("#ctl00_ContentPlaceHolder1_hidSelectedSeat").val(selectedVal);
        $("#ctl00_ContentPlaceHolder1_hidSelectedCount").val($("#ul_SeatList li").length);

        if ($("#ul_SeatList li").length <= 0)
        {
            $("#p_SeatCount").hide();
            $("#spanEmptySeat").show();
        }
        else
        {
            $("#p_SeatCount").show();
            $("#spanEmptySeat").hide();
        }
    }
}


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

function ShowOtherSeq()
{
    $("#div_OtherSeq").show();
    $("#div_OtherSeq").hover(

    function ()
    {
        $("#div_OtherSeq").show();
    },

    function ()
    {
        $("#div_OtherSeq").hide();
    });
}

function HideOtherSeq()
{
    $("#div_OtherSeq").hide();
}

function ShowSeqDateTime(obj, showDate)
{
    $("#dtShowSeqDate a").removeAttr("class");
    $(obj).addClass("sel");
    $("#dd_ShowSeqDate a").hide();
    $("#dd_ShowSeqDate a[showdate='" + showDate + "']").show();
}
//改变验证码
function ChangVerifyCode()
{
    document.getElementById("imgVerifyCode").src = '../user/checkCode.aspx?id=' + Math.random();
}

function Login()
{
    if (!checkIsLogin())
    { //快速登录
        return false;
    }
}

function BindMobileNo()
{
    bind();
}

function validateInput()
{
    if (!checkIsLogin())
    { //快速登录
        return false;
    }
    var seatCount = $("#ul_SeatList li").length;
    if (seatCount <= 0)
    {
        ShowErrorMessage("您尚未选座,单击【左侧座位图】选择您需要的座位！");
        return false;
    }
    if ($("#ctl00_ContentPlaceHolder1_txtMobile").val().replace(/ /g, "") == "")
    {
        ShowErrorMessage("请输入手机号码！");
        $("#ctl00_ContentPlaceHolder1_txtMobile").focus();
        return false;
    }
    if ($("#ctl00_ContentPlaceHolder1_txtMobile").val().replace(/ /g, "").length != 11)
    {
        ShowErrorMessage("请输入11位手机号码！");
        $("#ctl00_ContentPlaceHolder1_txtMobile").focus();
        return false;
    }
    var reg = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])\d{8}$/;
    if (!reg.test($("#ctl00_ContentPlaceHolder1_txtMobile").val()))
    {
        $("#ctl00_ContentPlaceHolder1_txtMobile").focus();
        ShowErrorMessage("请输入正确的手机号码！");
        return false;
    }
    if ($("#ctl00_ContentPlaceHolder1_txtVerifyCode").val().replace(/ /g, "") == "")
    {
        ShowErrorMessage("请输入验证码号码！");
        $("#ctl00_ContentPlaceHolder1_txtVerifyCode").focus();
        return false;
    }
    $("#ctl00_ContentPlaceHolder1_btnNext").attr("enabled", true);
    return true;
}