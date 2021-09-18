//创建一个简单的http服务器程序

//1.加载http模块
var http=require('http');

//2.创建一个http服务对象
var server=http.createServer();

//3.监听用户的请求事件（request事件）
//request对象包含了用户请求报文中的所有内容，通过request对象可以获取所有用户提交过来的数据
//response对象用来向用户响应一些数据，当服务器要向客户端响应数据的时候必须使用response对象
server.on('request',function(req,res){
	
	//解决乱码思路：服务器通过设置http响应报文头，告诉浏览器使用相应的编码来解析网页
	res.setHeader('Content-Type','text/plain;charset=utf-8');
	res.write('hello world!!!!你好世界');
	
	//对于每一个请求，服务器必须结束响应，否则客户端(浏览器)会一直等待服务器响应
	res.end();
})


//4.启动服务
server.listen(8082,function(){
	console.log('服务器启动了，请访问http://localhost:8082');
})
