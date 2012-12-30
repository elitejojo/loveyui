/**
 * ������
 * @param {} msg
 */
function ShowLoading(msg)
{
    $.XYTipsWindow(
    {
        ___title: "��ܰ��ʾ",
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
 * ����������Ϣ�Ի���
 */
function ShowErrorMessage(msg)
{
    $.XYTipsWindow(
    {
        ___title: "��ܰ��ʾ",
        ___content: "id:div_errormsg",
        ___width: "400",
        ___height: "120",
        ___showbg: true,
        ___showTitle: false,
        ___button: ["ȷ��"],
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
        ___title: "��ܰ��ʾ",
        ___content: "id:div_errormsg",
        ___width: "400",
        ___height: "120",
        ___showbg: true,
        ___showTitle: false,
        ___closeBox: false,
        ___button: ["ȷ��"],
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
    if (a.click) a.click(); //�ж��Ƿ�֧��click() �¼�
    else if (a.fireEvent) a.fireEvent('onclick'); //����click() �¼�
    else if (document.createEvent)
    {
        var evt = document.createEvent("MouseEvents"); //����click() �¼�
        evt.initEvent("click", true, true); //��ʼ��click() �¼�
        a.dispatchEvent(evt); //�ַ�click() �¼�
    }
}


//�����л�ȡ����Ĭ��ͼƬ
function getPicturePath(path){
    if ($.trim(path) != "" && $.trim(path) != "0") {
        return "../resource/images/userface/" + path + ".jpg";
    }else{ 
        return "../resource/images/userphoto.jpg";
    }
}

//�����л�ȡ�û���
function getUserName(userName) {
    if ($.trim(userName) != "") {
        var reg = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])\d{8}$/;
        if (reg.test(userName)) { //�ж��Ƿ��ֻ�����
            return userName.substring(0, userName.length - 4) + "****";
        } else {
            return userName;
        }
    }
    return "";
}

// ��ȡָ������ֵ
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}