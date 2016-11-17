$(function(){
	//改变顶部购物车样式
	$('.top-shopCart').hover(function(){
		$(this).find('.text').addClass('hover').siblings('.cartIcon').find('img').attr('src','img/cart1.png');
	},function(){
		$(this).find('.text').removeClass('hover').siblings('.cartIcon').find('img').attr('src','img/cart.png');
	})
	
	//顶部app二级菜单栏
	$('.top-item').eq(1).hover(function(){
		$(this).find('.top-app-menu').stop().slideDown();
	},function(){
		$(this).find('.top-app-menu').stop().slideUp();
	})
	
	//顶部智能硬件二级菜单栏
	$('.top-item').eq(2).hover(function(){
		$(this).find('.top-cap-menu').stop().slideDown();
	},function(){
		$(this).find('.top-cap-menu').stop().slideUp();
	})
	
	//顶部Select Region二级菜单栏
	$('.top-item').eq(3).hover(function(){
		$(this).find('.top-sel-menu').stop().slideDown();
	},function(){
		$(this).find('.top-sel-menu').stop().slideUp();
	})
	
	//顶部购物车菜单
	$('.top-shopCart').hover(function(){
		$(this).find('.top-dropdown-cart').stop().slideDown(200);
	},function(){
		$(this).find('.top-dropdown-cart').stop().slideUp(200);
	})
	
	//logo闪光滑动特效
	$('.logo-link img').mouseenter(function(){
		$(this).siblings('.light').stop().animate({left:213},800,function(){
			$(this).css('left',"-185px");
		});
	})
	
	//菜单栏特效
	$('.MT-header-nav li').hover(function(){
		var oWidth = $(this).css('width');
		var oLeft = $(this).offset().left;
		$('.MT-slide-line').stop().animate({left:oLeft,width:oWidth},{duration:600,easing:'easeInOutBack'});
	},function(){
		$('.MT-slide-line').stop().animate({left:332,width:0},{duration:600,easing:'easeInOutBack'});
	})
	
	
	//头部菜单栏特效重写
	//这段代码的逻辑判断写了超久！！！！！
	$('.MT-header-nav li').mouseenter(function(){
		slideData = $('.MT-header-slide').attr('slide-data');
		var a = $('.MT-header-nav li').index($(this));
//		console.log(slideData);
		if (a >= 0 && a <3 && slideData != '') {
			setTimeout(function(){
				$('.MT-header-slide').find('div').hide().stop().eq(a).show();
			},300)
			
		}else if(a >= 0 && a <3 && slideData == ''){
			setTimeout(function(){
				$('.MT-header-slide').find('div').hide().eq(a).slideDown();
			},300)
			
		}else{
			setTimeout(function(){
				$('.MT-header-slide div').slideUp();
				$('.MT-header-slide').attr('slide-data','');		
			},300)
			
		}
		if (a >= 0 && a <3) {
			setTimeout(function(){
				$('.MT-header-slide').attr('slide-data',a);
			},300)
			
		}
		
	})
	
	$('.MT-header-slide div').mouseleave(function(){
		setTimeout(function(){
			$('.MT-header-slide div').slideUp();
			$('.MT-header-slide').attr('slide-data','');
		},300)
		
	
	})
	$('.MT-wrapper-top-nav').mouseenter(function(){
		setTimeout(function(){
			$('.MT-header-slide div').slideUp();
			$('.MT-header-slide').attr('slide-data','');
		},300)
	})
	
	
	
	
})