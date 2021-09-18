var http=require('http');

http.createServer(function(req,res){
	res.setHeader('Content-Type','text/plain;charset=utf-8');
//	res.write('<h1>world</h1>');
	
	//获取用户请求的路径	req.url
//	console.log(req.url);
//	
//	res.end();
	
	//通过req.url获取用户的请求路径，根据不同的请求路径服务器做出不同的响应
	if(req.url==='/'||req.url==='/index'){
		//res.write('Hello Index');
		//res.end()	转为一句
		res.end('Hello Index');
		
	}else if(req.url==='/login'){
		res.end('Hello login');
	}else if(req.url==='/list'){
		res.end('Hello List');
	}else if(req.url==='/register'){
		res.end('Hello Register');
	}else{
		res.end('404, not Found. 客户端错误!@');
	}
}).listen(8080,function(){
	console.log('服务器启动了，请访问http://localhost:8080');
})
