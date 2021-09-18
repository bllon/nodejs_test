


//执行文件操作


//---------实现文件读取操作
//1.加载文件操作模块，fs模块
var fs=require('fs');


//2.调用fs.readFile()方法读取文件		也是异步执行
//在读取文件时，如果传了编码utf8参数，会自动把data转换字符串
fs.readFile('./1.txt','utf8',function(err,data){
	if(err){
		throw err;
	}
	
	//data 参数的数据类型是一个Buffer对象，里面保存的就是一个一个的字节（理解为字节数组）
	//把Buffer对象转换为字符串，调用tostring()方法	,不传utf8参数，默认也是utf8
	//	console.log(data.toString('utf8'));
	console.log(data);
});
