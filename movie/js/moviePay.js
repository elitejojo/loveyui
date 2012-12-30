/**
 * 倒计时部分
 */
var countDown; //倒计时
$(function ()
{
    countDown = new CountDown(
    {
        timeSpan: 900,
        callSetTime: setBuy,
        callClose: closeBuy
    });
    countDown.Start();
});

/**
 * 倒计时定时函数
 */
var setBuy = function (obj)
{
    $("#ctl00_ContentPlaceHolder1_span_minute").html(obj.minute);
    $("#ctl00_ContentPlaceHolder1_span_second").html(obj.second);
}

/**
 * 倒计时结束函数
 */
var closeBuy = function ()
{
    alert("您在规定的时间内未进入支付，请进入“会员中心”完成订单支付，如果10分钟内没有支付完成，订单自动取消。");
    window.location.href = "goseat.aspx";
    $("#ctl00_ContentPlaceHolder1_span_minute").html("00");
    $("#ctl00_ContentPlaceHolder1_span_second").html("00");
    $("#spanTime").html("<b>支付超时，将自动释放锁定的座位！</b>");
    $("#btnChangeMobile").unbind("click"); //设置修改手机号码不能使用
    $("#btnChangeMobile").attr("disabled", "disabled");
    $("#spCashTicket").removeAttr("onclick");
    $("#radCashTicket").attr("disabled", "disabled");
    $("#radCashTicket").attr("disabled", "disabled");
    $("#btnCashTicketPay").removeAttr("onclick");
    $("#btnCashTicketPay").attr("disabled", "disabled"); //设置现金券不能使用
    $("#spCommonTicket").removeAttr("onclick");
    $("#radCommonTicket").removeAttr("onclick");
    $("#radCommonTicket").attr("disabled", "disabled");
    $("#btnCommonTicketPay").removeAttr("onclick");
    $("#btnCommonTicketPay").attr("disabled", "disabled"); //设置兑换券不能使用
    $("#tab_banks").removeAttr("onclick");
    $("#tab_banks").attr("disabled", "disabled");
    $("#tab_cards").removeAttr("onclick");
    $("#tab_cards").attr("disabled", "disabled");
    $("#btnPay").removeAttr("onclick");
    $("#btnPay").attr("disabled", "disabled");
    $("#btnCardPay").removeAttr("onclick");
    $("#btnCardPay").attr("disabled", "disabled");
    $("#pay1").removeAttr("onclick");
    $("#pay1").attr("disabled", "disabled");
    $("#pay2").removeAttr("onclick");
    $("#pay2").attr("disabled", "disabled");
    $("#txtCommonTicketPwd_1").attr("disabled", "disabled");
}

/**
 * 设置订单支付状态
 * 从选座页面进入确认支付页面时调用此方法
 */
    function SetOrderPayStatus(orderStatus, orderType, orderPayStatus, payType)
    {
        if (orderStatus == "4")
        {
            $("#btnChangeMobile").bind("click", function ()
            {
                ChangeMobile(orderType);
            });
        }
        if (orderPayStatus == "2")
        { //判断支付状态等于2，表示部分支付
            $("#btnChangeMobile").hide();
            var payItem = $("#ctl00_ContentPlaceHolder1_hidOrderPayItem").val();
            if (payItem.replace(/ /g, "") == "")
            {
                return;
            }
            var allMoney = $("#ctl00_ContentPlaceHolder1_hidOrderMoney").val();
            if (payType == "1")
            { //现金券
                var payList = payItem.split("_");
                var payMoney = (parseFloat(allMoney) - parseFloat(payList[1]));
                $("#hidPayMoney").val(payMoney);
                $("#hidCardPayMoney").val(payMoney);
                $("#p_CashTickOk").html("您已享受<b class='csz'>" + parseFloat(payList[1]) + "</b>元优惠，还需支付<b class='csz'>" + payMoney + "</b>元");
                $("#p_CashTickOk").show();
                $("#div_CashTicket").show();
                $("#txtCashTicketNo").val(payList[0]);
                $("#txtCashTicketNo").attr("disabled", "disabled");
                $("#radCashTicket").attr("checked", "checked");
                $("#radCommonTicket").attr("disabled", "disabled");
                $("#radCommonTicket").removeAttr("onclick");
                $("#spCommonTicket").removeAttr("onclick");
                $("#btnCashTicketPay").hide();
            }
            else if (payType == "2")
            { //兑换券
                var tcount = 0;
                if (payItem.indexOf("|") < 0)
                { //判断是否包含多个兑换券
                    tcount = 1;
                    var payList = payItem.split("_");
                    $("#div_CommonTicket_1").show();
                    $("#txtCommonTicketPwd_1").hide();
                    //$("#txtCommonTicketNo_1").val(payList[0]);
                    //$("#txtCommonTicketNo_1").attr("disabled","disabled");
                }
                else
                {
                    var payItemList = payItem.split("|");
                    tcount = payItemList.length;
                    for (var i = 1; i <= tcount; i++)
                    {
                        var payList = payItemList.split("_");
                        $("#div_CommonTicket_" + i).show();
                        $("#txtCommonTicketNo_" + i).val(payList[0]);
                        $("#txtCommonTicketPwd_" + i).hide();
                        $("#txtCommonTicketNo_" + i).attr("disabled", "disabled");
                    }
                }
                var price = $("#ctl00_ContentPlaceHolder1_hidGoodsPrice").val();
                var payMoney = (parseFloat(allMoney) - (tcount * parseFloat(price)));
                $("#hidPayMoney").val(payMoney);
                $("#pCommonTicket").html("您已兑换<b class='csz'>" + tcount + "</b>张影票，还需支付<b class='csz'>" + payMoney + "</b>元");
                $("#btnCommonTicketPay").hide();
                $("#radCashTicket").attr("disabled", "disabled"); //设置现金券不能使用
                $("#spCashTicket").removeAttr("onclick");
                $("#spCommonTicket").removeAttr("onclick");
                $("#radCommonTicket").removeAttr("onclick");
                $("#radCommonTicket").attr("disabled", "disabled"); //设置现金券不能使用
                $("#div_CommonTicket").show();
            }
        }
    }

    //修改手机号码
    function ChangeMobile(orderType)
    {
        if (orderType == "2")
        {
            ShowErrorMessage("对不起，活动订单不能修改手机号码！");
            return;
        }
        else
        {
            var btnText = $("#btnChangeMobile").text();
            var reg = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])\d{8}$/;
            var moblieNo = $("#ctl00_ContentPlaceHolder1_txtMobile").val();
            if (btnText == "修改")
            {
                $("#btnChangeMobile").text("确认");
                $("#b_mobileno").hide();
                $("#ctl00_ContentPlaceHolder1_txtMobile").val($("#b_mobileno").text());
                $("#ctl00_ContentPlaceHolder1_txtMobile").show();
            }
            else
            {
                if (reg.test(moblieNo))
                {
                    $("#btnChangeMobile").text("修改");
                    $("#b_mobileno").show();
                    $("#b_mobileno").text($("#ctl00_ContentPlaceHolder1_txtMobile").val());
                    $("#ctl00_ContentPlaceHolder1_txtMobile").hide();
                    $.ajax(
                    {
                        type: "POST",
                        dataType: "text",
                        async: false,
                        url: "CheckTicket.ashx", //提交到一般处理程序请求数据
                        data: "mobileNo=" + moblieNo + "&orderno=" + $("#ctl00_ContentPlaceHolder1_hidOrderNo").val(),
                        success: function (data)
                        {
                            if (data != null)
                            {
                                if (data == "-1")
                                {
                                    ShowErrorMessage("手机号码修改失败");
                                }
                            }
                        },
                        error: function (msg, url, line)
                        {
                            ShowErrorMessage('对不起，手机号码修改失败,请稍后再试！');
                        }
                    });
                }
                else
                {
                    ShowErrorMessage("请输入有效的手机号码！");
                    $("#ctl00_ContentPlaceHolder1_txtMobile").focus();
                }
            }
        }
    }