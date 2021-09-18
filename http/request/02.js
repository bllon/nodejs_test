var http=require('http');

http.createServer(function(req,res){
//	res.statusCode=404;
//	res.statusMessage='not found!';
//	res.setHeader('Content-Type','text/html;charset=utf-8');

	//通过res.writeHead()来实现
	res.writeHead(200,'not found!',{
		'Content-Type':'text/html;charset=utf-8'
	})
	res.write('平凡的世界');
	
	res.end();
}).listen(9191,function(){
	console.log('http://localhost:9191');
})
