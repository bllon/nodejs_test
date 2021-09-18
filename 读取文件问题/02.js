
var fs=require('fs');

//加载path模块
var path=require('path');

//var filename=__dirname+'\\'+'1.txt';	//1.要判断前面路径是否右斜杠，2.在Linux系统是/
var filename=path.join(__dirname,'1.txt');//用path.join不需要估计上面问题

fs.readFile(filename,'utf8',function(err,data){
	if(err){
		throw err;
	}
	console.log(data);
})
