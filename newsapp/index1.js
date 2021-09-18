var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');

http.createServer(function(req,res){
	
	//为res对象添加一个render函数，方便后期使用
	res.render=function(filename){
		fs.readFile(filename,function(err,data){
			if(err){
//				throw err;
				res.writeHead(404,'Not Found',{'Content-Type':'text/html;charset=utf-8'});
				res.end('404, not found page.');
			}
			res.setHeader('Content-Type',mime.getType(filename));
			res.end(data);
		});
	}
	
	
	//设计路由
	//当用户请求 / 或 /index 时，显示新闻列表 -get请求
	//当用户请求 /item 时 ，显示新闻详情 -get请求
	//当用户请求 /submit 时 ，显示添加新闻页面 -get请求
	//当用户请求 /add 时 ，将用户提交的新闻保存到data.json文件中  -get请求
	//当用户请求 /add 时 ，将用户提交的新闻保存到data.json文件中  -post请求
	
	//转成小写
	req.url-req.url.toLowerCase();
	req.method=req.method.toLowerCase();
	
	//先根据用户请求的路径(路由)，将对应的HTML页面显示出来
	if(req.url==='/'||req.url==='/index'&&req.method==='get'){
		res.render(path.join(__dirname,'view','index.html'));
		
	}else if(req.url==='/submit'&&req.method==='get'){
		res.render(path.join(__dirname,'view','submit.html'));
	}else if(req.url==='/item'&&req.method==='get'){
		res.render(path.join(__dirname,'view','item.html'));
	}else if(req.url==='/add'&&req.method==='get'){
		res.render(path.join(__dirname,'view','add.html'));
	}else if(req.url==='/add'&&req.method==='post'){
		res.render(path.join(__dirname,'view','add.html'));
	}else if(req.url.startsWith('/resouces')&&req.method==='get'){
		//请求是以/resouces开头，并且是get请求，默认为请求静态资源
		res.render(path.join(__dirname,req.url));
	}else{
		res.writeHead(404,'Not Found',{
			'Content-Type':'text/html;charset=utf-8'
		});
		res.end('404,Page Not Found.');
	}
	
}).listen(9090,function(){
	console.log('http://localhost:9090');
});


