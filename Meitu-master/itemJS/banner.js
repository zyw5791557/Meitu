$(function(){

	var i = 0;
	function  move(){
		i++;
		if (i==4) {
			i=0;
		}
		
		$('.carousel-item').eq(i).stop().fadeIn(800).siblings().stop().fadeOut(500);
		$('.link-num').removeClass('xixi').eq(i).addClass('xixi');
		
	}
	
	//自动轮播
	//5秒一换
	var timer = setInterval(function(){
		move();
	},5000)
	
	
	//为轮播num添加点击事件
	//点击的时候先把定时器移除，等点击操作完成后再重新开始计时
	//以为一般我们点击就是要查看，防止点击操作和定时器一起工作，容易闪图
	$('.link-num').click(function(){
		clearInterval(timer);
		i = $('.link-num').index($(this)) - 1;
		move();
		timer = setInterval(function(){
			move();
		},5000)
	})
	
	
	//banner二级菜单效果
	$('.banner-list-item').mouseenter(function(){
		$('.banner-list-item').removeClass('hover');
		$('.banner-list-item .text a').removeClass('hover');
		$(this).addClass('hover');
		$(this).find('.text a').addClass('hover');
	})
	

	$('.carousel').bind('mouseleave',function(){
		$('.banner-list-item').removeClass('hover');
		$('.banner-list-item .text a').removeClass('hover');
		
	})

//	//补特效
	$('.banner-list-item').slice(-2).hover(function(){
		$(this).addClass('hover');
		$(this).find('.text a').addClass('hover');
	},function(){
		$(this).removeClass('hover');
		$(this).find('.text a').removeClass('hover');
	})
	
	
	//banner二级菜单重写
	//写半死还是有问题。。。。
		$('.banner-list-item').mouseenter(function(){
		navData = $('.banner-nav-all').attr('nav-data');
		var a = $('.banner-list-item').index($(this));
//		console.log(navData,a);
		if (a >= 0 && a <5 && navData != '') {
			setTimeout(function(){
				$('.banner-nav-all').show().find('.banner-nav-switch').hide().eq(a).stop().fadeIn();
			},200)
			
			
		}else if(a >= 0 && a <5 && navData == ''){
			$('.banner-nav-all').show().find('.banner-nav-switch').hide().eq(a).stop().fadeIn();
			
		}else{
			
			$('.banner-nav-all .banner-nav-switch').stop().fadeOut(300,function(){
				$('.banner-nav-all').css('display','none');
			});
			$('.banner-nav-all').attr('nav-data','');		
			
		}
		if (a >= 0 && a < 5) {
			$('.banner-nav-all').attr('nav-data',a);
			
		}
		
	})
	
	$('.banner-nav-all').mouseleave(function(){
		$('.banner-nav-all .banner-nav-switch').stop().fadeOut(300,function(){
//			$('.banner-nav-all').css('display','none');
		});
		$('.banner-nav-all').attr('nav-data','');
//		$('.carousel').mouseleave(function(){
//			$('.banner-nav-all .banner-nav-switch').stop().fadeOut(300,function(){
//				$('.banner-nav-all').css('display','none');
//			});
//			$('.banner-nav-all').attr('nav-data','');
//		})
		$('.banner-nav-list').mouseenter(function(){
			$('.banner-nav-all').css('display','block');
		})
	})
	
	//补救一下
	$(document).click(function(){
		$('.banner-nav-all').stop().fadeOut();
	})
	

})