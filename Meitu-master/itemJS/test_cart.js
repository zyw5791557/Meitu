$(function(){
	
	
	$('#J_btnGoodsAdd').click(function(){
		if ($('.meta-type-tips').css('display') == 'none') {
			var strID = location.href;
			strID = strID.split('ID=');
			strID = strID[1];
			var JPrice = $('.J_price').text();
			JPrice = JPrice.split('￥')[1];
			var goodsName = $('.meta-title').text();
			var url = $('#J_goodsThumb').find('.active img').attr('src');
			url = url.split('.')[0].split('ss/')[1];
			var count = $('.MT-number .J_speciCount').text();
			count = parseInt(count);
			var total = count * JPrice;
			
			function GoodsInfo(){
				this.ID = strID;
				this.Name = goodsName;
				this.Price = JPrice;
				this.Url = url;
				this.Count = count;
				this.Total = total;
			}
			var goodsInfo = new GoodsInfo();
			var infoArr = new Array();
				
				var data = $.cookie('data');
				if (data){
					data = JSON.parse(data);
//					data.push(goodsInfo);
					
					//处理同商品重复购买
					var index = -1;
					for(i = 0;i < data.length;i++){
						if (data[i].ID == strID) {
							index = i;
						}
					}
					if (index != -1) {
						
						data[index].Count += count;
						if (data[index].Count > 10) {
							data[index].Count = 10;
						}
						data[index].Total = data[index].Count * JPrice;
						
						console.log(data[index].Count);
						console.log(data[index].Total);
					} else{
						data.push(goodsInfo);
					}
					
					data = JSON.stringify(data);
					$.cookie('data',data,{'expires':7});
				}else{
					infoArr.push(goodsInfo);
					infoArr = JSON.stringify(infoArr);
					$.cookie('data',infoArr,{'expires':7});
				}
					
			
		}
		
		
	})
		

		
	
	
	
})