

//异步操作，try-catch 是无法捕获异常
//对于异步操作，要通过判断错误号(err.code)来进行出错处理
var fs=require('fs');

try{
	fs.writeFile('./xxxx/abcd.txt','是真的皮','utf8',function(err){
		
		console.log('ok');
	});
}catch(e){
	console.log('出错了'+e);
}
