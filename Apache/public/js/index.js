//画图
var canvas1=document.getElementById('canvas1');
var canvas2=document.getElementById('canvas2');
		var ctx1=canvas1.getContext('2d');
		var ctx2=canvas2.getContext('2d');
		function draw(ctx){
			ctx.moveTo(70,0);
			ctx.lineTo(100,30);
			ctx.lineTo(130,0);
			ctx.fillStyle="#fff";
			ctx.fill();
			ctx.strokeStyle="#fff";
			ctx.font="20px Verdana";
			ctx.strokeText("助学天使",60,80);
			ctx.font="10px 微软雅黑";
			ctx.strokeText("xxxx学校团队机构",80,130);
			ctx.strokeText("xxxx学校团队机构",80,150);
			ctx.strokeText("xxxx学校团队机构",80,170);
		}
		draw(ctx1);
		draw(ctx2);
		
		
//留言板		
		(function(){
			var height1=parseInt($('#msg-content').css("height"));
			var height2=parseInt($('.ms').css("height"));
			var moveTop=(height1-height2)+30;
		
			$('#msg-content').animate({top:-moveTop+'px'},(moveTop/40)*1000);
			
			$('#msg-content').mouseover(function(){
				$('#msg-content').stop();
			});
			$('#msg-content').mouseout(function(){
				$('#msg-content').animate({top:-moveTop+'px'},(moveTop/40)*1000);
			});
		})();
		
		
		
//移动图片		
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(this.readyState===4&&this.status===200){
					var data=JSON.parse(this.responseText);
					var html="";
					for(var i=0;i<data.list.length;i++){
						html+="<li><img src='"+data.list[i].img+"'/></li>";
					}
					$(".showimg").html(html);
				}
//				console.log($(".showimg").html());
			}
			xhr.open("get","data/img.json",true);
			xhr.send(null);
			
			
		
		$('#left').click(function(){
			var left=parseInt($('.showimg').css("left"));
			var len=$(".showimg").children('li').length-4;
			if(left===(-280*len)){
				alert("已经是最后一张了！");
				return;
			}
			$('.showimg').animate({left:'-=280px'},1000);

		});
		$('#right').click(function(){
			var left=parseInt($('.showimg').css("left"));
			if(left==0){
				alert("已经是第一张了!");
				return;
			}
			$('.showimg').animate({left:'+=280px'},1000);

		});
		
		
		
		
		//轮播
		var flash=function(){
			var now;
			$(".imgwrap").find("li").each(function(i){	
				
				if($(this).css("display")==="block"){
					$(this).css("display","none");
					$(".peve span").eq(i).css({'background':'#fff','color':'gold'});
					if(i>=3){
						now=0;
						return;
					}
					now=i+1;
				}
				
			});
			$(".imgwrap li").eq(now).css("display","block");
			$(".peve span").eq(now).css({'background':'gold','color':'#fff'});
			
		};
		
		var clock=window.setInterval('flash()',3000);
		
		$(".peve").find("span").each(function(c){
						//鼠标移入
						$(this).mouseover(function(){
							clearInterval(clock);
							$(this).siblings().css({'background':'#fff','color':'gold'});
							$(this).css({'background':'gold','color':'#fff'});
							
							$(".imgwrap").children("li").eq(c).css('display','block');
							$(".imgwrap").children("li").eq(c).siblings().css('display','none');
						});
						//鼠标移出
						$(this).mouseout(function(){
							clock=setInterval('flash()',3000);
						});
						
				});

//搜索框

function abc(res){
//	console.log(res);
	var wds=res['s'];
	for(var i=0,str='';i<wds.length;i++){
		str=str+"<li><a href='https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd="+wds[i]+"&rsv_pq=bfb3346400032aab&rsv_t=4aaa95HaUABcYtkSJ7oIOwzgiffPq5va8FxJQ%2FsZPsZnWmFZddIOLlaydVg&rqlang=cn&rsv_enter=1&rsv_sug3=3&rsv_sug1=2&rsv_sug7=100'>"+wds[i]+'</a></li>';
	}
	document.getElementById('tuijian').innerHTML=str;
}
		
document.getElementById('wds').oninput=function(){
	
	var url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&json=1&p=3&sid=1424_21109_18559_20930&req=2&csor=2&pwd=o&cb=abc';
	var sc=document.createElement('script');
	sc.src=url;
	
	var hd=document.getElementsByTagName('head')[0];
	hd.appendChild(sc);
	
}
		
document.getElementsByClassName('go-icon')[0].onclick=function(){
	
	var word=document.getElementById('wds').value;
	function leftTrim(str)
	{
		return str.replace(/^\s*/g,"");
	}
	if(leftTrim(word)!==''){
		var url="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd="+word+"&rsv_pq=bfb3346400032aab&rsv_t=4aaa95HaUABcYtkSJ7oIOwzgiffPq5va8FxJQ%2FsZPsZnWmFZddIOLlaydVg&rqlang=cn&rsv_enter=1&rsv_sug3=3&rsv_sug1=2&rsv_sug7=100";
		location.href=url;
	}else{
		location.href='index.php'
	}
}


