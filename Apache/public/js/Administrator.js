		$(".menu li").mouseover(function(){
			$(this).css("background","red");
			var e=$(this).index();
			$(".content .box").eq(e).css("display","block");
			
		});
		
		$(".content .box").mouseover(function(){
			var e=$(this).index();
			$(this).css("display","block");
			$(".menu li").eq(e).css("background","red");
		}).delay("2000");
		
		$(".menu li").mouseout(function(){
			$(this).css("background","#000");
			var e=$(this).index();
			$(".content .box").css("display","none");
		});
		
		$(".content .box").mouseout(function(){
			var e=$(this).index();
			$(this).css("display","none");
			$(".menu li").eq(e).css("background","#000");
		});
		

