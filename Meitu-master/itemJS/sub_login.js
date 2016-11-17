$(function(){
	
	
	//检测cookies
	var un = $.cookie('username');
	var pw = $.cookie('password');
	if (un) {
		$('#username').val(un);
	}
	if (pw) {
		$('#password').val(pw);
	}
	
	
	//账号不为空检测
	$('#username').blur(function(){
		if ($(this).val() == '') {
			$(this).siblings('.tip').show();
		}else{
			$(this).siblings('.tip').hide();//密码不为空检测
			$('#password').blur(function(){
				if ($(this).val() == '') {
					$(this).siblings('.tip').show();
				}else{
					$(this).siblings('.tip').hide();
				}
			})
		}
	})
	
	
	//两周内免登录
	$('#remember_me').click(function(){
		var isTure = $(this).is(':checked');
		if (isTure) {
			var r = confirm('确定保存cookies免登录14天？');
			if (r) {
				var username = $('#username').val();
				var password = $('#password').val();
				$.cookie('username',username,{'expires':14})
				$.cookie('password',password,{'expires':14})
			} else{
				$(this).removeAttr('checked');
				return;
			}
			
		}
	})
	
	
	//登录跳转主页
	
	$('#btn-login').click(function(){
		
		if ($('#username').val() == '') {
			$('#username').siblings('.tip').show();
		}else{
			$('#username').siblings('.tip').hide();
			if ($('#password').val() == '') {
				$('#password').siblings('.tip').show();
			}else{
				$('#password').siblings('.tip').hide();
				location.href = 'index.html';
			}
		}
		
		
		
	})
	
	
})