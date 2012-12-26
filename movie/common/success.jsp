<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>中国移动-手机支付</title>
		<%@ include file="/include/page.htm"%>
		<link href="${context_root}/css/style1/style.css" rel="stylesheet"
			type="text/css" />
	</head>

	<body>

		<div class="ipos_kuang">
			<div class="l_logo">
				<img src="${context_root}/images/style1/001_03.gif" width="188"
					height="38" />
			</div>
			<div class="r_logo">
				<span class="f14">来自</span>
				<img src="${context_root}/images/style1/001_05.gif"
					width="90" height="38" align="absbottom" />
			</div>
		</div>


		<div class="clear"></div>
		<div class="ipos_kuang">
			<div class="top_l"></div>
			<div class="top_m f14">
				<span class="fb">${ETF.MERC_NM}</span>
			</div>
			<div class="top_r"></div>
		</div>

		<div class="clear"></div>
		<div class="ipos_kuang white_bg">
			<div class="ipos_kuang yinhang_bg3 padding3">
				<p class="chenggong_text heiti f21 fb">
					支付成功！感谢您使用中国移动手机支付。
				</p>
				<ul class="zhifu_pingzheng">
					<li class="fb f21 heiti">
						支付凭证
					</li>
					<li class="fb f14 margin2">
						<p class="l">
							交易号：
						</p>
						<p class="r unfb">
							${ETF.RPM_LOG_NO}
						</p>
					</li>
					<li class="fb f14">
						<p class="l">
							商家订单号：
						</p>
						<p class="r unfb">
							${ETF.MERC_ORD_NO}
						</p>
					</li>
					<li class="fb f14">
						<p class="l">
							交易金额：
						</p>
						<p class="r unfb">
							${etf:expr("AMTFMT",ETF.ORD_AMT)}元
						</p>
					</li>
					<li class="fb f14">
						<p class="l">
							交易日期：
						</p>
						<p class="r unfb">
							${etf:expr3("FMTDATE",ETF.ORD_DT,"0","5")}
						</p>
					</li>
				</ul>
			</div>
		</div>



		<div class="clear"></div>
		<div class="ipos_kuang padding1">
			<div class="bot_bg"></div>
			<p class="bot_p">
				<a href="#" class="link2">关于中国手机支付</a> |
				<a href="#" class="link2">新闻中心</a> |
				<a href="#" class="link2">合作伙伴</a> |
				<a href="#" class="link2">关于中国移动</a>
			</p>
			<p class="bot_p">
				中国移动通信有限公司 版权所有 (C) 2008-2010 7X24小时客户服务热线 10086 湘ICP备09029795
			</p>
		</div>

	</body>
</html>
