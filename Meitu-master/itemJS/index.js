

//嘻嘻，复习一下原生JS

window.onload = function(){
	

		
	
	//底部美图APP轮播效果
	var next = document.getElementsByClassName('card-next')[0];
	var prev = document.getElementsByClassName('card-prev')[0];
	var cardList = document.getElementsByClassName('card-list')[0];
	//next
	next.onclick = function(){
		
		if (cardList.style.transform == 'translateX(-1137px)') {
			cardList.style.transform = 'translateX(0px)';
		} else{
			cardList.style.transform = 'translateX(-1137px)';
		}
		
	}
	//prev
	prev.onclick = function(){
		if (cardList.style.transform == 'translateX(-1137px)') {
			cardList.style.transform = 'translateX(0px)';
		} else{
			cardList.style.transform = 'translateX(-1137px)';
		}
		
	}
	
}


$(function(){

	
	//加载公共头部和尾部
	//加载banner
	$('.top').load('header.html',function(){
		$('.foot').load('footer.html',function(){
			$('.banner').load('banner.html',function(){
				$('body').show();
			})
		});
	});
	
	
	
	//JS图片起伏特效
	//注释部分是CSS3已经实现过了
	$('.SML-link').hover(function(){
//		$(this).find('img').stop().animate({'height':210,'width':210},400);
		$(this).find('span:not(.SML-price)').addClass('hover');
//		$(this).find('.SML-name').animate({'height':7},100);
//		$(this).find('.SML-desc').animate({'height':7},100);
		$(this).find('.SML-name').animate({'opacity':0},100,function(){
			$(this).css('height',7);
		});
		$(this).find('.SML-desc').animate({'opacity':0},100,function(){
			$(this).css('height',7);
		});
	},function(){
//		$(this).find('img').stop().animate({'height':190,'width':190},400);
		$(this).find('span:not(.SML-price)').removeClass('hover');
//		$(this).find('.SML-name').animate({'height':20},100);
//		$(this).find('.SML-desc').animate({'height':18},100);
		$(this).find('.SML-name').animate({'opacity':1},100,function(){
			$(this).css('height',20);
		});
		$(this).find('.SML-desc').animate({'opacity':1},100,function(){
			$(this).css('height',20);
		});
	})
	
	
})

