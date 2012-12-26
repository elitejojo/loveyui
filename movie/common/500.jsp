<%@ page contentType="text/html; charset=GBK" language="java"
	import="java.sql.*" errorPage=""%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title>中国移动-手机支付</title>
		<%@ include file="/include/page.htm"%>
		<link href="${context_root}/css/style1/style.css" rel="stylesheet"
			type="text/css" />


	</head>
	<body>

		<div class="ipos_kuang">
			<div class="l_logo">
				<img src="${context_root}/images/style1/logo_01.gif" width="188"
					height="38" />
			</div>
		</div>

		<div class="clear"></div>

		<div class="clear"></div>
		<div class="ipos_kuang">
			<div class="top_l"></div>
			<div class="top_m f14">
				错误提示
			</div>
			<div class="top_r"></div>
		</div>


		<div
			style="height: 350px; background: #FFF; width: 888px; margin: 0 auto; overflow: hidden;">
			<table width="95%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td align="center" valign="top">

						<table style="height: 263px; width: 610px" border="0"
							cellpadding="0" cellspacing="0">
							<tr>
								<td align="center" valign="top">
									&nbsp;
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td width="93">
											</td>
											<td width="97" align="left" valign="top">
												<table width="100%" border="0" cellspacing="0"
													cellpadding="0">
													<tr>
														<td height="66">
														</td>
													</tr>
													<tr>
														<td>
															<img src="${context_root}/images/style1/wrong.gif"
																width="97" height="97" />
														</td>
													</tr>
												</table>
											</td>
											<td align="center" valign="top">
												<table width="95%" border="0" cellspacing="0"
													cellpadding="0">
													<tr>
														<td height="70">
															&nbsp;
														</td>
													</tr>
													<tr>
														<td height="50" align="left" valign="top"
															class="simhei f18 f_line2">
															
														</td>
													</tr>
													<tr>
														<td height="100" align="left" valign="top"
															class="simhei f18 f_line2">
															抱歉,您操作的数据有异常,请稍后再试！
														</td>
													</tr>
													<tr>
														<td align="center" valign="middle">
															<table width="87" height="29" border="0" cellpadding="0"
																cellspacing="0" >
																<tr>
																	<td align="center" valign="middle">
																	<input class="msg_btn" type="button" onClick="javascript: window.close();" />
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
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


