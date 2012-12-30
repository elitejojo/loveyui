/**
 * ����ʱ����
 */
var countDown; //����ʱ
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
 * ����ʱ��ʱ����
 */
var setBuy = function (obj)
{
    $("#ctl00_ContentPlaceHolder1_span_minute").html(obj.minute);
    $("#ctl00_ContentPlaceHolder1_span_second").html(obj.second);
}

/**
 * ����ʱ��������
 */
var closeBuy = function ()
{
    alert("���ڹ涨��ʱ����δ����֧��������롰��Ա���ġ���ɶ���֧�������10������û��֧����ɣ������Զ�ȡ����");
    window.location.href = "goseat.aspx";
    $("#ctl00_ContentPlaceHolder1_span_minute").html("00");
    $("#ctl00_ContentPlaceHolder1_span_second").html("00");
    $("#spanTime").html("<b>֧����ʱ�����Զ��ͷ���������λ��</b>");
    $("#btnChangeMobile").unbind("click"); //�����޸��ֻ����벻��ʹ��
    $("#btnChangeMobile").attr("disabled", "disabled");
    $("#spCashTicket").removeAttr("onclick");
    $("#radCashTicket").attr("disabled", "disabled");
    $("#radCashTicket").attr("disabled", "disabled");
    $("#btnCashTicketPay").removeAttr("onclick");
    $("#btnCashTicketPay").attr("disabled", "disabled"); //�����ֽ�ȯ����ʹ��
    $("#spCommonTicket").removeAttr("onclick");
    $("#radCommonTicket").removeAttr("onclick");
    $("#radCommonTicket").attr("disabled", "disabled");
    $("#btnCommonTicketPay").removeAttr("onclick");
    $("#btnCommonTicketPay").attr("disabled", "disabled"); //���öһ�ȯ����ʹ��
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
 * ���ö���֧��״̬
 * ��ѡ��ҳ�����ȷ��֧��ҳ��ʱ���ô˷���
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
        { //�ж�֧��״̬����2����ʾ����֧��
            $("#btnChangeMobile").hide();
            var payItem = $("#ctl00_ContentPlaceHolder1_hidOrderPayItem").val();
            if (payItem.replace(/ /g, "") == "")
            {
                return;
            }
            var allMoney = $("#ctl00_ContentPlaceHolder1_hidOrderMoney").val();
            if (payType == "1")
            { //�ֽ�ȯ
                var payList = payItem.split("_");
                var payMoney = (parseFloat(allMoney) - parseFloat(payList[1]));
                $("#hidPayMoney").val(payMoney);
                $("#hidCardPayMoney").val(payMoney);
                $("#p_CashTickOk").html("��������<b class='csz'>" + parseFloat(payList[1]) + "</b>Ԫ�Żݣ�����֧��<b class='csz'>" + payMoney + "</b>Ԫ");
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
            { //�һ�ȯ
                var tcount = 0;
                if (payItem.indexOf("|") < 0)
                { //�ж��Ƿ��������һ�ȯ
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
                $("#pCommonTicket").html("���Ѷһ�<b class='csz'>" + tcount + "</b>��ӰƱ������֧��<b class='csz'>" + payMoney + "</b>Ԫ");
                $("#btnCommonTicketPay").hide();
                $("#radCashTicket").attr("disabled", "disabled"); //�����ֽ�ȯ����ʹ��
                $("#spCashTicket").removeAttr("onclick");
                $("#spCommonTicket").removeAttr("onclick");
                $("#radCommonTicket").removeAttr("onclick");
                $("#radCommonTicket").attr("disabled", "disabled"); //�����ֽ�ȯ����ʹ��
                $("#div_CommonTicket").show();
            }
        }
    }

    //�޸��ֻ�����
    function ChangeMobile(orderType)
    {
        if (orderType == "2")
        {
            ShowErrorMessage("�Բ��𣬻���������޸��ֻ����룡");
            return;
        }
        else
        {
            var btnText = $("#btnChangeMobile").text();
            var reg = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])\d{8}$/;
            var moblieNo = $("#ctl00_ContentPlaceHolder1_txtMobile").val();
            if (btnText == "�޸�")
            {
                $("#btnChangeMobile").text("ȷ��");
                $("#b_mobileno").hide();
                $("#ctl00_ContentPlaceHolder1_txtMobile").val($("#b_mobileno").text());
                $("#ctl00_ContentPlaceHolder1_txtMobile").show();
            }
            else
            {
                if (reg.test(moblieNo))
                {
                    $("#btnChangeMobile").text("�޸�");
                    $("#b_mobileno").show();
                    $("#b_mobileno").text($("#ctl00_ContentPlaceHolder1_txtMobile").val());
                    $("#ctl00_ContentPlaceHolder1_txtMobile").hide();
                    $.ajax(
                    {
                        type: "POST",
                        dataType: "text",
                        async: false,
                        url: "CheckTicket.ashx", //�ύ��һ�㴦�������������
                        data: "mobileNo=" + moblieNo + "&orderno=" + $("#ctl00_ContentPlaceHolder1_hidOrderNo").val(),
                        success: function (data)
                        {
                            if (data != null)
                            {
                                if (data == "-1")
                                {
                                    ShowErrorMessage("�ֻ������޸�ʧ��");
                                }
                            }
                        },
                        error: function (msg, url, line)
                        {
                            ShowErrorMessage('�Բ����ֻ������޸�ʧ��,���Ժ����ԣ�');
                        }
                    });
                }
                else
                {
                    ShowErrorMessage("��������Ч���ֻ����룡");
                    $("#ctl00_ContentPlaceHolder1_txtMobile").focus();
                }
            }
        }
    }