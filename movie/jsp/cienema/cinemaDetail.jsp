<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'cinemaDetail.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    <title>影院排片页</title>
	<link  rel="stylesheet"  href="../../css/movie_tab.css">
 	<link rel="stylesheet"  href="../../css/bass.css">
 	<link rel="stylesheet"  href="../../css/layout.css">
	<link  rel="stylesheet" href="../../css/global.css">
	<link  rel="stylesheet"  href="../../css/style_movie.css">
	<link  rel="stylesheet"  href="../../css/style_movie_pay.css">
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/movieTab.js"></script>
	<script type="text/javascript" src="../../js/jquery-ui.js"></script>
	<script type="text/javascript" src="../../js/jquery.mousewheel.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<title>影院排片页</title>
	<link  rel="stylesheet"  href="../../css/movie_tab.css">
 	<link rel="stylesheet"  href="../../css/bass.css">
 	<link rel="stylesheet"  href="../../css/layout.css">
	<link  rel="stylesheet" href="../../css/global.css">
	<link  rel="stylesheet"  href="../../css/style_movie.css">
	<link  rel="stylesheet"  href="../../css/style_movie_pay.css">
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/movieTab.js"></script>
	<script type="text/javascript" src="../../js/jquery-ui.js"></script>
	<script type="text/javascript" src="../../js/jquery.mousewheel.js"></script>
  </head>
  
  <body>
    <table>
    	<tr>
    		<td>${info.cinemaName }</td>
    	</tr>
    	<tr>
    		<td>排期购票</td>
    	</tr>
    	<tr>
    		<td>排期日期：</td>
    	</tr>
    	<tr>
    		<td>今天</td>
    		<td>明天</td>
    	</tr>
    	<tr>
    		<td>选择影片：</td>
    	</tr>
    	<tr>
			<c:choose> 
				<c:when test="${not empty movieNameList}">
					<c:forEach items="${movieNameList}" var="mninfo" varStatus="vs">
					
						<td>${mninfo.filmName }</td>
					
					</c:forEach>
				</c:when>
			</c:choose>
		</tr>
    </table>
    <table>放映时间  语言/制式    影厅/座位   标准价   网售价   购票</table>
    <table>
	    <c:choose> 
			<c:when test="${not empty infoList}">
				<c:forEach items="${infoList}" var="planInfo" varStatus="vs">
					<tr>
						<td>${planInfo.featureTime }</td>
						<td>${planInfo.copyLanguage }/${planInfo.copyType }</td>
						<td>${planInfo.hallName }/${planInfo.hallseats }</td>
						<td>￥${planInfo.standPric }.00元</td>
						<td>￥${planInfo.aPrice }元</td>
						<td><a href="cinema/${planInfo.featureAppNo }/${planInfo.aPrice }/planSite.html">去选座</a></td>
					</tr>
				</c:forEach>
			</c:when>
			<c:otherwise>
				<tr >
					<td colspan="10">没有相关排期数据</td>
				</tr>
			</c:otherwise>
		</c:choose>
    </table>
    	
    <br>
    <br>
    <div>
   		温馨提示：<br>
		1、影片开场前一小时，系统自动关闭网上购票；<br>
		2、部分场次不开放网上购票，请到影城前台购票，谢谢。<br>
    </div>
    
    
    
    
    
    
    <div id="page"  class="w950">

        <div id="header" class="w950">
            <img src="../../images/common/Process_two.png" width="950" height="59" alt="流程">
    
        </div>
    <div id="content"  class="mt10">

        <!-- 通栏：.grid-m -->
    	
        <div class="layout grid-m0s5">
             <div class="col-main">
				  <div class="main-wrap">
                         
				      <div class="top_img_back E0_bl E0_bt  pb10 f">	
                      		 <div class="f">
                             <h2 class="E0_bb hthd pl20">影院介绍</h2>
                             <div class="uiText p10">
                                        <p class="l" style="width:529px">           南京万达影城河西店完全按照流线型的现代化风格打造，并增加了更为人性化设计的VIP贵宾影厅以及别具一格的咖啡休闲区，匠心独具的天花板设计给人以强烈的梦幻感，此外，无线上网服务可让等候观影的消费者轻松自在的消磨时光，9米挑高的举架让观众不会感到任何压抑，接近千平米的大堂和多功能区，在设计细节方面，万达国际影城的阶梯式座椅排距达1.2米，银幕采用墙对墙整面墙式，</p>
                                        <div class="r" style="width:200px"><img  class="pl10" src="../../images/other/map_1.jpg" width="181" height="149">
                                        </div>
                                                 
                             </div>
       
                             
                             </div>	
                             
                             <div class="pl10 clearfix f">			
								<div class="play_tab_select movie_tab" id="playDate_tab">
									<span id="2012-12-18" >12月18日&nbsp;今天</span>
									<span id="2012-12-18">12月19日&nbsp;周三</span>
									<span id="2012-12-18">12月20日&nbsp;周四</span>
									<span id="2012-12-18">12月21日&nbsp;周五</span>
									<a href="#" >更多日期>></a>
								</div>
								<dl class="play_tab_con green_back pb20 pt10 pr20 f ">
									<dt>正在热映：</dt>
									<dd>
										<div class="clearfix">
                                        

         
											<a class="select" href="javascript:;">人再囧途之泰囧</a>
											<a id="" href="javascript:;">十二生肖</a>
											<a href="javascript:;">大上海</a>
											<a href="javascript:;">血滴子</a>
											<a href="javascript:;">艺术家</a>
						
										</div>
										
									</dd>
								</dl>		
                                
                                <dl class="ui_abeam f pt10">
                                    <dt class="uipic f"><a target="_blank" title="艺术家" >
                                                                                    <img src="../../images/movie001.jpg" width="120" height="160" >
                                                                                </a></dt>
                                    <dd style="width:524px;" class="uiText">
                                        <div class="title">
                                            <span class="right">
                                                                        <!-- 传评分数gmark -->
                        <em class="initRating cursor_auto"><!-- 小评分 -->
                                                                <span class="half"></span>
                                                                <span class="on"></span>
                                                                <span class="half"></span>
                                                                <span class="on"></span>
                                                                <span class="half"></span>
                                                                <span class="on"></span>
                                                                <span class="half"></span>
                                                                <span class="on"></span>
                                                                <span class="half"></span>
                                                                <span class="no"></span>
                            </em>
                                                <span><sub id="mark_integer">8</sub><sup id="mark_decimal">.8</sup></span>
                                            </span>
                                            <h3><b><a target="_blank" title="艺术家" href="/movie/66317938">艺术家</a></b><span class="gray">(48039 关注)</span></h3>
                                        </div>
                                        <p class="brown"><em>精彩看点：</em>2012年奥斯卡最佳影片、最佳男主角，默片复古，见证元祖好莱坞最美好的时光 </p>				<div class="clear">
                                            <span class="inside_half"><em>上映日期：</em>2012-12-28</span>
                                            <span class="inside_half"><em>语言/片长：</em>英语/100分钟</span>
                                        </div>
                                        <div class="clear">
                                            <span class="inside_half"><em>电影类型：</em>剧情/喜剧/爱情</span>
                                                                                </div>
                                        <p><em>导演：</em>迈克尔·哈扎纳维希乌斯</p>
                                        <p><em>主演：</em>让·杜雅尔丹 贝热尼丝·贝乔 约翰·古德曼 詹姆斯·克伦威尔 比茜·图诺克</p>
                                    </dd>
                                </dl>
								<div id="play_data" class="clearfix">
						
									<div class="play_data_table mt20 mb20 b_border f" >	
										<div class="data_table_header  b_border_b">
											<span class="w86">放映时间</span>	
											<span class="w110">语言版本</span>	
											<span class="w110">放映厅</span>	
											<span class="w110">现价(元)</span>	
											<span class="w130">说明</span>	
										</div>
										<div class="data_table_body" id="play_list_info">
											<table  id="data_table_body" class="scroll_content" >
												<tr>
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr class="odd">
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr>
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr class="odd">
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr>
										<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr>
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr class="odd">
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr>
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr class="odd">
											<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
										<tr>
										<td class="w86" >111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w110">111111<td>
											<td class="w130">111111<td>
											<td>22222<td>
										</tr>
				            
									</table>
									<div class="scroller vertical" id="listTableScroll">
										<span class="decrease"></span>
										<div class="scroll">
											<div class="handle">
												<div class="handleL">
													<div class="handleR">
														<div class="handleC"></div>
													</div>	
												</div>
											</div>
										</div>
										<span class="increase"></span>
									</div>
								</div>
				
								<div class="listBotoom b_border_t"></div>
							</div>	
						</div>	
					</div>
				</div>
                </div>
				<!--end main-wrap-->
			</div>

                    <div class="col-sub">
                        <div id="" class="hotActivity">
                            <div id="" class="hd_ht">
                                <h3>热门活动</h3>
                            </div>
                            <div id="" class="hot_bd">
                                <div class="hotlist">
                                    <div class="hotlist_hd">
                                        <a href="#">
                                            <img src="../../images/temp/re1.jpg" width="70" height="100">   
                                        </a>
                                    </div>
                                    <div class="hotlist_bd">
                                        <h3><a href="#">末日狂欢低价观影</a></h3>
                                        <p><span class="c_gray9">时间:</span>12月12日</p>
                                        <p><span class="c_orange">192</span>人已参加</p>
                                        <p class="anchor"><span><a href="">参&nbsp;加  </a></span></p>
                                    </div>
                                </div><!-- / -->
                                
                            </div><!-- / -->

                    </div>
        </div>   
             <!-- 通栏：.grid-m  end -->  
    </div>

  	</div>
    <div id="footer" class="w950 "><img src="../../images/other/index_4.jpg" width="950" height="103">

    </div>
</div>

  </body>
</html>
