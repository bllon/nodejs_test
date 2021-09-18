//响应不同html文件
var http=require('http');
var fs=require('fs');
var path=require('path');

http.createServer(function(req,res){
	
	
	if(req.url==='/'||req.url==='/index'){
		
		fs.readFile(path.join(__dirname,'html','index.html'),function(err,data){
			if(err){
				throw err;
			}
			
			res.end(data);
		});
		
	}else if(req.url==='/login.html'){
		fs.readFile(path.join(__dirname,'html','login.html'),function(err,data){
			if(err){
				throw err;
			}
			
			res.end(data);
		});
	}else if(req.url==='/register'){
		fs.readFile(path.join(__dirname,'html','register.html'),function(err,data){
			if(err){
				throw err;
			}
			
			res.end(data);
		});
		
	}else if(req.url==='/images/12.jpg'){
		//响应图片	浏览器做的每次请求，都需要判断
		fs.readFile(path.join(__dirname,'images','12.jpg'),function(err,data){
			if(err){
				throw err;
			}
			
			res.setHeader('Content-Type','image/jpg');
			res.end(data);
		});
		
	}else if(req.url==='/css/index.css'){
		//响应css
		fs.readFile(path.join(__dirname,'css','index.css'),function(err,data){
			if(err){
				throw err;
			}
			res.setHeader('Content-Type','text/css');
			res.end(data);
		})
	}else{
		fs.readFile(path.join(__dirname,'html','404.html'),function(err,data){
			if(err){
				throw err;
			}
			
			res.end(data);
		});
	}
	
}).listen(9090,function(){
	console.log('http://localhost:9090')
})
