$(function(){
	
	//注册格式检验
	
	//获取焦点的时候初始化，避免错误提示影响输入视野
	
	$('#username').focus(function(){
		$(this).siblings('.tip').hide();
	})
	
	$('#password').focus(function(){
		$(this).siblings('.tip').hide();
	})
	
	$('#re-password').focus(function(){
		$(this).siblings('.tip').hide();
	})
	
	
	//手机号码验证方法封装
	
	
	function  phoneVerify(){
		var username = $('#username').val();
		if (username == '') {
			$('#username').siblings('.tip').show().find('.error').text("手机号码不能为空");
		}else{
			if (username.length != 11) {
				$('#username').siblings('.tip').show().find('.error').text("手机号码格式错误");
				$('#username').siblings('span.des').show();
				$('#username').next().css('display','none');
				$('#btn-send').attr('disabled','disabled').css('background-color','rgb(228, 228, 228)');
			}else{
				var reg = /^1[358]\d{9}$/;
				if (reg.test(username)) {
					$('#username').siblings('span.des').hide();
					$('#btn-send').removeAttr('disabled').css('background-color','#fafafa');
					$('#username').next().css('display','inline-block');
					$('#username').siblings('.tip').hide();
				} else{
					$('#username').siblings('span.des').show();
					$('#username').next().css('display','none');
					$('#btn-send').attr('disabled','disabled').css('background-color','rgb(228, 228, 228)');
					$('#username').siblings('.tip').show().find('.error').text("手机号码格式错误");
				}
			}
		}
	}
	
	
	
	//密码验证方法封装
	
	function  passwordVerify(){
		var password = $('#password').val();
		if (password == '') {
			$('#password').siblings('.tip').show().find('.error').text("密码不能为空");
			$('#password').siblings('span.des').show();
			$('#password').next().css('display','none');
		} else{
				var reg = /^\S{6,16}$/;
				console.log(reg.test(password));
				if (reg.test(password)) {
					$('#password').siblings('span.des').hide();
					$('#password').next().css('display','inline-block');
					$('#password').siblings('.tip').hide();
				} else{
					$('#password').siblings('span.des').show();
					$('#password').next().css('display','none');
					if (password.length < 6) {
						$('#password').siblings('.tip').show().find('.error').text("密码太短啦，至少6位");
					} else{
						$('#password').siblings('.tip').show().find('.error').text("密码太长啦，最多16位");
					}
				}
		}
	}
	
	
	//重复密码验证方法封装
	
	function  rePasswordV(){
		var password1 = $('#password').val();
		var password2 = $('#re-password').val();
		if (password2 == '') {
				$('#re-password').siblings('.tip').show().find('.error').text("重复密码不能为空");
		} else{
			if (password1 == password2) {
				$('#re-password').siblings('span.des').hide();
				$('#re-password').next().css('display','inline-block');
				$('#re-password').siblings('.tip').hide();
			} else{
				$('#re-password').siblings('span.des').show();
				$('#re-password').next().css('display','none');
				$('#re-password').siblings('.tip').show().find('.error').text("两次输入的密码不一致");
			}
		}
	}
	
	
	
	//验证手机
	$('#username').blur(function(){
		var username = $(this).val();
		if (username == '') {
			$(this).siblings('.tip').show().find('.error').text("手机号码不能为空");
		}else{
			if (username.length != 11) {
				$(this).siblings('.tip').show().find('.error').text("手机号码格式错误");
				$(this).siblings('span.des').show();
				$(this).next().css('display','none');
				$('#btn-send').attr('disabled','disabled').css('background-color','rgb(228, 228, 228)');
			}else{
				var reg = /^1[358]\d{9}$/;
				if (reg.test(username)) {
					$(this).siblings('span.des').hide();
					$('#btn-send').removeAttr('disabled').css('background-color','#fafafa');
					$(this).next().css('display','inline-block');
					$(this).siblings('.tip').hide();
				} else{
					$(this).siblings('span.des').show();
					$(this).next().css('display','none');
					$('#btn-send').attr('disabled','disabled').css('background-color','rgb(228, 228, 228)');
					$(this).siblings('.tip').show().find('.error').text("手机号码格式错误");
				}
			}
		}
	})
	
	
	
	//验证密码
	
	$('#password').blur(function(){
		var password = $(this).val();
		if (password == '') {
			$(this).siblings('.tip').show().find('.error').text("密码不能为空");
			$(this).siblings('span.des').show();
			$(this).next().css('display','none');
		} else{
				var reg = /^\S{6,16}$/;
//				console.log(reg.test(password));
				if (reg.test(password)) {
					$(this).siblings('span.des').hide();
					$(this).next().css('display','inline-block');
					$(this).siblings('.tip').hide();
				} else{
					$(this).siblings('span.des').show();
					$(this).next().css('display','none');
					if (password.length < 6) {
						$(this).siblings('.tip').show().find('.error').text("密码太短啦，至少6位");
					} else{
						$(this).siblings('.tip').show().find('.error').text("密码太长啦，最多16位");
					}
				}
		}
	})
	
	
	//重复密码严重
	$('#re-password').blur(function(){
		var password1 = $('#password').val();
		var password2 = $(this).val();
		if (password2 == '') {
				$(this).siblings('.tip').show().find('.error').text("重复密码不能为空");
		} else{
			if (password1 == password2) {
				$(this).siblings('span.des').hide();
				$(this).next().css('display','inline-block');
				$(this).siblings('.tip').hide();
			} else{
				$(this).siblings('span.des').show();
				$(this).next().css('display','none');
				$(this).siblings('.tip').show().find('.error').text("两次输入的密码不一致");
			}
		}
		
	})
	
	
	
	
	//注册完成跳转登录界面
	$('#btn-reg').click(function(){
		phoneVerify();
		passwordVerify();
		rePasswordV();
		var un = $('.icon-yes').eq(0).css('display');
		var pw = $('.icon-yes').eq(1).css('display');
		var rpw = $('.icon-yes').eq(2).css('display');
		if (un != 'none' && pw != 'none' && rpw != 'none') {
			location.href = 'sub_login.html';
		}else{
			return;
		}
	})
	
	
	
	
	//验证码层弹出
	$('.btn-send').click(function(){
		var num = parseInt(Math.random() * 100 ) % 5 + 1;
		$('#C_text').val('');
		$('.mt-dialog-mask').show();
		$('.mt-dialog-box').find('.code').attr('src','img/phone_login/code_'+num+'.jpg')
		$('.mt-dialog').css('top',-175).show().animate({'top':"50%"},400);
	})
	
	$('.mt-dialog-box .code').click(function(){
		var num = parseInt(Math.random() * 100 ) % 5 + 1;
		$(this).attr('src','img/phone_login/code_'+num+'.jpg');
	})
	
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