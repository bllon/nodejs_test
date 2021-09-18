//执行文件操作


//---------实现文件写入操作
//1.加载文件操作模块，fs模块
var fs=require('fs');

console.log('000');

//2.实现文件写入操作
var msg='Hello World,你好世界!';

//调用fs.writeFile()直接写入文件
fs.writeFile('./1.txt',msg,'utf8',function(err){
	
	console.log('111');
	if(err){
		console.log('写文件出错了！具体错误：'+err);
	}
	console.log('ok');
}
	
)

console.log('222');
