<%@ page language="java" contentType="text/html; charset=GBK"%>
<%
	String cmpay = application.getInitParameter("cmpay").toString();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<META name="WT.si_x" content="bank_return_failed" />
		<title>�й��ƶ�-�ֻ�֧��</title>
		<%@ include file="/include/page.htm"%>
		
		<link href="${context_root}/css/style1/style.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" language="javascript" src="/ips/js/dcs_tag.js"></script>
	</head>
<body>

<div class="ipos_kuang">
     <div class="l_logo"><img src="${context_root}/images/style1/logo_01.gif" width="188" height="38" /></div>
     <!--<div class="r_logo"><span class="f14">����</span><img src="images/001_05.gif" width="90" height="38" align="absbottom" /></div>-->
</div>


<div class="clear"></div>
<div class="ipos_kuang">
     <div class="top_l"></div>
     <div class="top_m f14">����<span class="fb">${ETF.MERC_NM}</span>���ֻ�֧������</div>
     <div class="top_r"></div>
</div>

<div class="clear"></div>
<div class="ipos_kuang white_bg">
<div class="ipos_kuang yinhang_bg3 padding3">
     <div class="failed_text margin3">
         <div class="l"></div>
         <div class="r"></div>
     </div>
     <div class="failure_action">�������ԣ�<a href="<%=cmpay%>/service/trans_mgr.xhtml" class="c_blue" >�鿴������֧��</a>  <a href="<%=cmpay%>/service/homepage.xhtml" class="c_blue" >�����ҵ��ֻ�֧��</a></div>
     <div class="zhifu_pingzheng_top f14 fb">֧����Ϣ</div>
     <div class="clear"></div>
     <div class="zhifu_pingzheng_bot">
          <p class="l"><span class="zuo1 f14 fb">���׺ţ�</span><span class="you1 english1">${ETF.ORD_NO}</span></p>
          <p class="r"><span class="zuo3 f14 fb">���׽�</span><span class="you3"><span class="english1">${etf:expr("AMTADDDOT",ETF.ORD_AMT)}</span>Ԫ</span></p>      
          <p class="l"><span class="zuo1 f14 fb">�̼Ҷ����ţ�</span><span class="you1 english1">${ETF.MERC_ORD_NO}</span></p>
          <p class="r"><span class="zuo3 f14 fb">�������ڣ�</span><span class="you3 english1">${etf:expr3("FMTDATE",ETF.CRE_DT,"0","5")}</span></p>

     </div>
</div>
</div>



<div class="clear"></div>
<div class="ipos_kuang padding1">
     <div class="bot_bg"></div>
     <p class="bot_p">
				<a target="_blank"
					href="http://cmpay.10086.cn/info/43/category-catid-43.html"
					class="link2">�����ƶ��ֻ�֧��</a> |
				<a target="_blank" href="http://cmpay.10086.cn/info/news.html"
					class="link2">��������</a> |
				<a target="_blank" href="https://cmpay.10086.cn/service/shopping_guide.xhtml"
					class="link2">�������</a> |
				<a target="_blank" href="http://www.10086.cn/aboutus" class="link2">�����й��ƶ�</a>
			</p>
     <p class="bot_p">�й��ƶ�ͨ�����޹�˾ ��Ȩ���� (C) 2008-2010  7X24Сʱ�ͻ���������  10086  ��ICP��09029795</p>
</div>
<script type="text/javascript" language="javascript"
			src="${context_root}/js/dcs_tag.js"></script>	
</body>
</html>
