$(function(){
	
	//加载头部和尾部
	$('.subList-top').load('header.html',function(){
		$('.subList-foot').load('footer.html',function(){
			$('body').show();
			
		$('.J_cartItem').hover(function(){
			$(this).find('.cart-remove').fadeIn();
			$(this).find('.number-plus').fadeIn();
			$(this).find('.number-minus').fadeIn();
		},function(){
			$(this).find('.cart-remove').fadeOut();
			$(this).find('.number-plus').fadeOut();
			$(this).find('.number-minus').fadeOut();
		})
		
		$('.cart-remove').click(function(){
			$(this).parent().remove();
			$('.J_cartTotal').text(0);
			$('.J-total-price').text(0);
			if ($('.MT-cart-list').length == 1) {
				$('.MT-cart-list').find('.text-center').show();
				$('.price-footer').hide();
			}else{
				$('.MT-cart-list').find('.text-center').hide();
				$('.price-footer').show();
				$('.red-bubble').text($('.J_cartTotal').text());
			}
			
			$('.red-bubble').text($('.J_cartTotal').text());
			
		})
		
		});
	});
	
	
	
	//ajax请求json数据
	$.ajax({
		url:'json/goodsInfo.json',
		dataType:'json',
		global:true,
		type:'GET',
		error:errorData,
		success:goodsData
	})
	
	function errorData(){
		alert('数据请求错误');
	}
	
	function  goodsData(data){
		//遍历
		var strID = location.href;
		strID = strID.split('ID=');
		strID = strID[1];
		$.each(data,function(index,ele){
//			console.log(ele);
			if (ele.goodsID == strID) {
				$('.meta-title').text(ele.metaTitle);
				$('.list-span').text(ele.metaTitle);
				$('.meta-adapter span').find('a').text(ele.mateAdapter);
				$('.J_price').find('em').text(ele.JPrice);
				
				//遍历改元素，插入数据
//				$('.meta-img').each(function(ii,ee){
//					$(this).attr('src',ele.metaImg[ii]);
//				})
//				$('.thumb-nav-img').each(function(ii,ee){
//					$(this).attr('src',ele.thumbNavImg[ii]);
//				})
				
				//直接插入html
				$.each(ele.metaImg,function(i,e){
					$('<a href="javascript:;" class="J_speciThumb meta-thumb"><img src='+ e +' class="meta-img" alt="MeituFamily印花款" /></a>').appendTo($('#J_goodsThumb'));
				})

				$.each(ele.thumbNavImg,function(i,e){
					$('<li class="J_thumbNavItem thumb-nav-item"><img src='+ e +' class="thumb-nav-img" alt="MeituFamily潮趣手机壳" /></li>').appendTo($('.thumb-nav'));
				})
				
				
					//商品详情页  商品切换
				$('#J_goodsThumb a').click(function(){
					$(this).addClass('active').siblings('a').removeClass('active');
					var url = $(this).find('img').attr('src');
					url = url.split('.');
					url = url[0];
					$('#J_thumbView').find('img').attr('src',url + '_glass.jpg');
				})
	
				
					//侧边商品图片切换
				$('.thumb-nav li').mouseenter(function(){
					$(this).addClass('active').siblings('li').removeClass('active');
					var url = $(this).find('img').attr('src');
					url = url.split('.');
					url = url[0];
					$('#J_thumbView').find('img').attr('src',url + '_glass.jpg');
				})
				

				$('.thumb-view-img').attr('src',ele.thumbViewImg);
				$('.zoomImg').attr('src',ele.zoomImg);
				
				//如果img的src是空的就删掉，这个方法不够好
//				$('.meta-img').each(function(index,ele){
//					if ($(this).attr('src') == '') {
//						$(this).parents('a').remove();
//					}
//				})
				
				$.each(ele.GoodsView,function(i,e){
					$('<img src='+ e +' class="detail-img" alt="" />').appendTo($('div.G-detail'));
				})
				
				$('.nav-info').find('p:eq(0)').html(''+ ele.metaTitle +'(<span class="spec-type">MeituFamily印花款</span>)');
				$('.nav-info').find('p:eq(1)').find('.num').text('￥' + ele.JPrice);
				
				
			}
			
		})
	}
	
	
	
	$(document).ajaxComplete(function(){
		$('img').each(function(i,v){
			if(i == $('img').length-1){
				$(this)[0].onload = function(){
					iTop = $('.J_goodsView').offset().top;
				}
			}
		})
		
		//跳转规格参数
		$('.J_goodsTab').eq(1).click(function(){
			$('body').stop().animate({'scrollTop':iTop});
		})
		
		//跳转商品详情
		$('.J_goodsTab').eq(0).click(function(){
			$('body').stop().animate({'scrollTop':'703'});
		})
		
	})
	
	
	
	//plus  minus 按钮效果
	
	//Plus
//	$('.J_numberPlus').mouseenter(function(){
//		$(this).css('background','url(../img/sub_list/plusClick.png) no-repeat center')
//	})
//	
//	$('.J_numberPlus').mouseleave(function(){
//		$(this).css('background','url(../img/sub_list/plus.png) no-repeat center')
//	})
//	
//	//Minus
//	$('.J_numberMinus').mouseenter(function(){
//		$(this).css('background','url(../img/sub_list/minusClick.png) no-repeat center')
//	})
//	
//	$('.J_numberMinus').mouseleave(function(){
//		$(this).css('background','url(../img/sub_list/minus.png) no-repeat center')
//	})
	
	//点击增数量
	$('.J_numberPlus').click(function(){
		var num = parseInt($('.meta-dd .J_speciCount').text());
		if (num < 10) {
			$('.meta-dd .J_speciCount').text(num + 1);
		} else{
			return;
		}
		
	})
	
	//点击减数量
	$('.J_numberMinus').click(function(){
		var num = parseInt($('.meta-dd .J_speciCount').text());
		if (num > 1) {
			$('.meta-dd .J_speciCount').text(num - 1);
		} else{
			return;
		}
		
	})
	
	
	//商品详情、规格参数 active设置
	$('.J_goodsTab').click(function(){
		$(this).addClass('active').siblings('.J_goodsTab').removeClass('active');
	})
	
	
	//滚动条监听事件
	$(window).scroll(function(){
		var Top = $(this).scrollTop();
		
		//滚动固定吸附菜单栏
		if(Top > 702){
			$('#J_detailNavFixed').parent().css({
				'position':'fixed',
				'top':'0',
				'left:':'0',
				'z-index':'100',
				'width':'100%'
			});
			$('.nav-info').show();
			$('.J_btnBuyNow').show();
		}else{
			$('#J_detailNavFixed').parent().css('position','static');
			$('.nav-info').hide();
			$('.J_btnBuyNow').hide();
		}
	})
	
	
	//尝试写商品放大镜效果
	$('#J_thumbView').mouseenter(function(evts){
		var _left = $(this).offset().left;
		var _top = $(this).offset().top;
		$('#J_thumbView').mousemove(function(evt){
			var evt = window.event || evt;
			var oLeft = evt.pageX - _left;
			var oTop = evt.pageY - _top;
			$('.zoomImg').css({
				'opacity':'1',
				'left':-oLeft,
				'top':-oTop,
				'outline':'0'
			});
			$('.thumb-view-img').fadeOut(1);
		})
		
		$('#J_thumbView').mouseleave(function(){
			$('.zoomImg').css('opacity','0');
			$('.thumb-view-img').fadeIn(1);
		})
	})
	
	
	//加入购物车
	$('#J_btnGoodsAdd').click(function(){
		
		var url = $('#J_goodsThumb').find('.active img').attr('src');
		if (url == undefined) {
			$('.meta-type-tips').show();
			return;
		}else{
			$('.meta-type-tips').hide();
		}
		var oLeft = $(this).offset().left;
		var oTop = $(this).offset().top;
		$('<img src='+ url +' style="position:absolute;z-index:99999;top:'+(oTop-50)+'px;left:'+(oLeft+70)+'px" />').appendTo('body').animate({
			'left':1200,
			'top':44
		},1000,function(){
			$(this).remove();
			var count = $('.MT-number').find('.J_speciCount').text();
			var num = $('.MTT-number').find('.J_speciCount').text();
			var url = $('#J_goodsThumb').find('.active img').attr('src');
			var title = $('.meta-title').text();
			var price = $('.meta-price .num em').text();
			price = parseInt(price);
			if (num == '') {
				num = 0;
			} else{
				num = parseInt(num);
			}
			count = parseInt(count);
			$('.text-center').hide();
			$('.J_cartItem').show();
			$('.price-footer').show();
			$('.MTT-number').find('.J_speciCount').text(num+count);
			$('.cart-img img').attr('src',url);
			$('.cart-spec .spec').text(title);
			$('.J_cartTotal').text(num + count);
			$('.red-bubble').text($('.J_cartTotal').text());
			$('.J-total-price').text(price * (num + count));
			$('.J_countSpeciPrice').text(price * (num + count));	
		});
	})

	
	
	
})


