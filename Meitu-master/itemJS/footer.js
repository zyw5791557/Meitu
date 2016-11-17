$(function(){
	
	//html一加载完就让侧边栏隐藏
	$('.MT-side-toolbar').css('display','none');
	//监听滚动事件，一滚动就让侧边栏显示
	$(window).scroll(function(){
		$('.MT-side-toolbar').css('display','block');
	})
	
	//侧边栏hover效果
	$('.MT-side-toolbar span').hover(function(){
		$(this).css('background-position-x',-40);
	},function(){
		$(this).css('background-position-x',0);
	})
	
	//侧边栏二维码菜单
	$('.item-qrcode').hover(function(){
		$(this).find('.slide-qrcode').stop().fadeIn();
	},function(){
		$(this).find('.slide-qrcode').stop().fadeOut();
	})
	
	//返回顶部特效   缓冲运动
	$('.goto-top').click(function(){
		$('body').animate({scrollTop:'0px'},800);
	})
	
	//侧边栏滚动监听事件
	$(window).scroll(function(){
		var Top = $(this).scrollTop();
		if (Top > 88) {
			$('.MT-side-toolbar .box').stop().fadeIn();
		} else{
			$('.MT-side-toolbar .box').stop().fadeOut();
		}
	})
	
	$(window).scroll(function(){
		var Top = $(this).scrollTop();
		if (Top > 300) {
			$('.MT-side-toolbar .goto-top').stop().fadeIn();
		} else{
			$('.MT-side-toolbar .goto-top').stop().fadeOut();
		}
	})
	
})
