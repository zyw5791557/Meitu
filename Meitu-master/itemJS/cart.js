$(function(){
	$('.cart-footer').load('footer.html',function(){
		$('body').show();
	});
	
	
	
	//重点！！！！
	
	function  upData(){
		
		var cartPrice = 0;
		var cartNum = 0;
		
		//购物车总价格
		$('tr.xixi').find('.cart-total').each(function(){
			var isTrue = $(this).parents('tr').find('.J_cartChk').is(':checked');
			if (isTrue) {
				cartPrice += parseInt($(this).text());
			}
		})
		$('#JcartTotalPrice i').text(cartPrice + ".00");
		
		//购物车总数量
		$('tr.xixi').find('.number-show').each(function(){
			var isTrue = $(this).parents('tr').find('.J_cartChk').is(':checked');
			if (isTrue) {
				cartNum += parseInt($(this).text());
			}
		})
		$('#JcartTotalNum').text(cartNum);
		
		$('.bub.J_cartTotal').text(cartNum);
		
	}
	
	
	
	
	//一进来就获取cookies
	var data = $.cookie('data');
	
	//如果data不为undefined就去解析这个数据，转化为JSON对象
	if (data !== undefined) {
		data = JSON.parse(data);
		console.log(data);
	}
	
	//如果长度为0就删了这个cookie
	//不是0就去解析这个cookie
	//为undefined就return
	if (data && data.length == 0) {
		$.removeCookie('data');
	}else if(data == undefined){
		return;
	}else{
			
		var len = data.length;
		for(i=0;i<len;i++){
			var xixi = $('.J_cartItem').eq(0).clone(true);
			$(xixi).addClass('xixi').show().appendTo($('.C-cart-table tbody'));
		}
		
		$('tr.xixi').each(function(index,ele){
			$(this).find('.cart-name').text(data[index].Name);
			$(this).find('.cart-price p i').text(data[index].Price + '.00');
			$(this).find('.number-show').text(data[index].Count);
			$(this).find('.J_countSpeciPrice').text(data[index].Total + '.00');
			$(this).find('.cart-img').attr('src','img/cart/cookie/'+ data[index].Url +'.jpg');
			$(this).attr('dataID',data[index].ID);
		})
		
		var cartTotal = 0;
		var cartCount = 0;
		$.each(data,function(index,ele){
			cartTotal += ele.Total;
			cartCount += ele.Count;
		})
		
		$('#JcartTotalPrice i').text(cartTotal + '.00');
		$('#JcartTotalNum').text(cartCount);
		$('.bub.J_cartTotal').text(cartCount);
		
	}

	
	
	
	//加单个商品的数量
	$('tr.xixi').find('.cart-number .number-plus').click(function(){
		var count = $(this).prev().text();
		var price = $(this).parents('tr').find('.cart-price p i').text();
		count = parseInt(count);
		price = parseInt(price);
		
		if ( count < 10) {
			$(this).prev().text(count + 1);
			count = $(this).prev().text();
			count = parseInt(count);
			var total = count * price;
			$(this).parents('td').next().find('.cart-total').text(total + '.00');
			
			upData();
			
		} else{
			$('.mt-dialog-mask').show();
			$('.mt-dialog').css('top',-175).show().animate({'top':"50%"},400);
		}
		
		
		//如果多次点击按钮则判断data数据是否为字符串，为字符串先解析成JSON对象
		if (typeof data == 'string') {
			data = JSON.parse(data);
		}
		
		
		
		//找到ID对应cookie内的索引值
		var index = 0;
			
		for(i = 0;i < data.length;i++){
			if (data[i].ID == $(this).parents('tr').attr('dataID')) {
				index = i;
			}
		}
		
		var count = $(this).prev().text();
		var price = $(this).parents('tr').find('.cart-price p i').text();
		count = $(this).prev().text();
		count = parseInt(count);
		var total = count * price;
		
		
		//改变data并存入新的data替换原来的cookie
		data[index].Count = count;
		data[index].Total = total;
		data = JSON.stringify(data);
		$.cookie('data',data,{'expires':7});
		
	})
	
	
	//减单个商品的数量
	$('tr.xixi').find('.cart-number .number-minus').click(function(){
		var count = $(this).next().text();
		var price = $(this).parents('tr').find('.cart-price p i').text();
		count = parseInt(count);
		price = parseInt(price);
		
		if ( count > 1) {
			$(this).next().text(count - 1);
			count = $(this).next().text();
			count = parseInt(count);
			var total = count * price;
			$(this).parents('td').next().find('.cart-total').text(total + '.00');
			
			upData();
			
		} 
		
			if (typeof data == 'string') {
				data = JSON.parse(data);
			}
			
			var index = 0;
				
			for(i = 0;i < data.length;i++){
				if (data[i].ID == $(this).parents('tr').attr('dataID')) {
					index = i;
				}
			}
			
			count = $(this).next().text();
			count = parseInt(count);
			var total = count * price;
			
			data[index].Count = count;
			data[index].Total = total;
			data = JSON.stringify(data);
			$.cookie('data',data,{'expires':7});
		
		
		
	})
	
	
	//删除当前商品
	$('a.cart-remove').click(function(){
		
		$(this).parents('tr').remove();
		
		upData();
		
		
		var index = 0;
				
		for(i = 0;i < data.length;i++){
			if (data[i].ID == $(this).parents('tr').attr('dataID')) {
				index = i;
			}
		}
		if (typeof data == 'string') {
			data = JSON.parse(data);
		}
		data.splice(index,1);
		data = JSON.stringify(data);
		$.cookie('data',data,{'expires':7});
		
		
		
	})
	
	
	//当复选框状态改变的时候,改变购物车总数量和总价格
	$('tr.xixi').find('.J_cartChk').change(function(){
		
		upData();
		
		var isTrue = true;
		$('.J_cartChk').each(function(){
			var flag = $(this).is(':checked');
			if (flag == false) {
				isTrue = false;
			}
		})
		if (isTrue == false) {
			$('.J_cartChkAll').prop('checked',false);
		}else{
			$('.J_cartChkAll').prop('checked',true);
		}
		
		
	})
	
	
	$('.J_cartChkAll').click(function(){
		var isTrue = $(this).is(':checked');
		if (isTrue) {
			$('tr.xixi').find('.J_cartChk').prop('checked',true);
	} else{
			$('tr.xixi').find('.J_cartChk').prop('checked',false);
		}
		
		upData();
		
	})
	
	
	
	
	
	
	
	
	$(window).scroll(function(){
		var Top = $(this).scrollTop();
//		console.log(Top);
		if (Top < 325) {
			$('#J_accountBar').addClass('C-cart-account-fixed');
		} else{
			$('#J_accountBar').removeClass('C-cart-account-fixed');
		}
	})
	
	
	//修改规格
//	$('.J-spec-edit').click(function(){
//		if ($('.J-cart-spec-editor').css('display') == 'none') {
//			$('.J-cart-spec-editor').css({'display':'block','opacity':'0'}).animate({'top':34,'opacity':'1'},500);
//		} else{
//			$('.J-cart-spec-editor').animate({'top':-14,'opacity':'0'},500,function(){
//				$(this).css({'display':'none'});
//			});
//		}
//	})
	
	
//	$('.relative').mouseleave(function(){
//		$('.J-cart-spec-editor').animate({'top':-14,'opacity':'0'},500,function(){
//			$(this).css({'display':'none'});
//		});
//	})
	
	
	//侧罩层(弹出框)关闭
	$('.mt-dialog-close').click(function(){
		$('.mt-dialog').animate({'top':"120%"},400,function(){
			$('.mt-dialog-mask').hide();
		});
	})
	
	//确定
	$('.yes').click(function(){
		$('.mt-dialog').animate({'top':"120%"},400,function(){
			$('.mt-dialog-mask').hide();
		});
	})
	
	

	
	
})