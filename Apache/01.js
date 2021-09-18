var http=require('http');
var path=require('path');
var fs=require('fs');
var mime=require('mime');

http.createServer(function(req,res){
	//1.获取用户请求路径
	//req.url
	// /css/style.css
	
	//2.获取public 目录的完整路径
	var publicDir=path.join(__dirname,'public');
	
	//3.根据public的路径和用户请求的路径，最终计算出用户的静态资源的完整路径
	var filename=path.join(publicDir,req.url);
//	console.log(filename);

	
	//4.根据文件的完整路径去读取该文件，如果读取到了，则把文件返回给用户，如果读取不到，则返回404
	fs.readFile(filename,function(err,data){
		if(err){
			res.setHeader('Content-Type','text/html;charset=utf-8');
			res.end('<h1>文件不存在，404</h1>');
		}else{
			//通过第三方模块来判断不同的资源对应的Content-Type的类型
			res.setHeader('Content-Type',mime.getType(filename));
			//如果找到了读取文件则返回
			res.end(data);
		}
	});
//	res.end('over');
		
}).listen(8080,function(){
	console.log('http://localhost:8080');
})
