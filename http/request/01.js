var http=require('http');

http.createServer(function(req,res){
	
	//req.headers返回的是一个对象，这个对象中包含了所有的请求报文头
//	console.log(req.headers);


	//req.rawHeaders返回的是一个数组，数组中保存的都是请求报文头字符串
//	console.log(req.rawHeaders);

	//获取请求客户端所使用的http版本
//	console.log(req.httpVersion);
	
	//获取客户端请求使用的方法
//	console.log(req.method);

	//获取客户端请求地址
	console.log(req.url);
	res.end('over');
	
}).listen(9091,function(){
	console.log('http://localhost:9091');
})
