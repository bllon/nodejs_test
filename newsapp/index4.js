var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var url=require('url');
var querystring=require('querystring');
var _=require('underscore');
//新闻列表数据渲染


http.createServer(function(req,res){
	
	//为res对象添加一个render函数，方便后期使用
	//渲染index.html需要用到模板数据，所以给第二个参数
	res.render=function(filename,tplData){
		fs.readFile(filename,function(err,data){
			if(err){
//				throw err;
				res.writeHead(404,'Not Found',{'Content-Type':'text/html;charset=utf-8'});
				res.end('404, not found page.');
			}
			if(tplData){
				//如果传递了模板数据，表示需要替换
				var fn=_.template(data.toString('utf8'));
				data=fn(tplData);
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
	
	var urlObj=url.parse(req.url,true);
	
	//先根据用户请求的路径(路由)，将对应的HTML页面显示出来
	if(req.url==='/'||req.url==='/index'&&req.method==='get'){
		//1.读取data.json文件中数据，将读取的数据转换为list数组
		fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
			//第一次访问，因为data.json不存在，所以不应该抛出异常
			if(err&&err.code!=='ENOENT'){
				throw err;
			}
			//读取的新闻数据
			var list_news=JSON.parse(data||'[]');
			//2.服务器端使用模板引擎，将list中数据和index文件中内容结合，渲染给客户端
			//读取并返回
			res.render(path.join(__dirname,'view','index.html'),{list:list_news});
		});
		
	}else if(req.url==='/submit'&&req.method==='get'){
		res.render(path.join(__dirname,'view','submit.html'));
	}else if(urlObj.pathname==='/item'&&req.method==='get'){
		//获取请求新闻id
		//urlObj.query.id
		//读取data.json文件数据，找到对应新闻
		fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
			if(err&&err.code!=='ENOENT'){
				throw err;
			}
			//读取的新闻数据
			var list_news=JSON.parse(data||'[]');
			var model=null;
			//循环
			for(var i=0;i<list_news.length;i++){
				if(list_news[i].id.toString()===urlObj.query.id){
					//找到相等新闻，则记录下来
					model=list_news[i];
					break;
				}
			}
			if(model){	
			//模板渲染，并返回
			res.render(path.join(__dirname,'view','item.html'),{item:model});
			}else{
				res.end('no such item');
			}
		});
	}else if(req.url.startsWith('/add')&&req.method==='get'){
		//先读取文件，为了防止覆盖，把数据转换为数组，再push一条
		fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
			//第一次访问，因为data.json不存在，所以不应该抛出异常
			if(err&&err.code!=='ENOENT'){
				throw err;
			}
			var list=JSON.parse(data||'[]');//如果data没有读取到就把'[]'转换为数组
			
			urlObj.query.id=list.length;
			list.push(urlObj.query);
			fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
				if(err){
					throw err;
				}
				console.log('ok');
				//设置响应报文头，告诉浏览器执行一次跳转操作
				//重定向
				res.statusCode=302;//跳转状态码
				res.statusMessage='found';
				res.setHeader('Location','/');
				res.end('over');
			});
		});	
		
	}else if(req.url==='/add'&&req.method==='post'){
		
		//post提交
		//先读取文件，为了防止覆盖，把数据转换为数组，再push一条
		fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
			//第一次访问，因为data.json不存在，所以不应该抛出异常
			if(err&&err.code!=='ENOENT'){
				throw err;
			}
			var list=JSON.parse(data||'[]');//如果data没有读取到就把'[]'转换为数组
			//获取用户post提交的数据
			//1.监听req的data事件
			var array=[];//保存用户每次提交的数据
			req.on('data',function(chunk){
				//chunk参数为浏览器本次提交过来的一部分数据，为Buffer对象
				array.push(chunk);
			});
			
			req.on('end',function(){
				//数据提交完毕,把array中的所有数据汇总起来
				//把array中的每个Buffer对象，集合起来转换为一个Buffer对象
				var postBody=Buffer.concat(array);
				postBody=postBody.toString('utf8');//转成字符串
				//将查询字符串转换成、json对象
				postBody=querystring.parse(postBody);
				postBody.id=list.length;
				list.push(postBody);
				
				//将新提交的数据写入文件
				fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
					if(err){
						throw err;
					}
					console.log('ok');
					//设置响应报文头，告诉浏览器执行一次跳转操作
					//重定向
					res.statusCode=302;//跳转状态码
					res.statusMessage='found';
					res.setHeader('Location','/');
					res.end('over');
				});
			});
		});
		
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


