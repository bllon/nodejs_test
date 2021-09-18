
var clock = null;

//自定义弹出框方法
function alertBox(message){

	var box = $('<div class="alert"></div>').css({
		'width':'280px',
		'height':'180px',
		'padding':'60px 20px',
		'text-align':'center',
		'font-size':'20px',
		'color':'#ff5a5a',
		'letter-spacing':'1px',
		'position':'absolute',
		'border-radius':'10px',
		'left':'50%',
		'top':'50%',
		'transform':'translate3d(-50%,-50%,0) rotate(0deg)',
		'background':'#a8cee9',
	}).text(message);
	$('body').append(box);

	if(clock !== null){
		return false;
	}

	clock = setTimeout(function(){
		// console.log($('body').find('div.alert'));
		$('div.alert').hide(300);
		// $('div.alert').remove();
		clock = null;
	},2000);

}