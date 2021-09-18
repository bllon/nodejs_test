//该模块负责对具体的业务进行处理

//步骤：
//1.思考，该模块中要封装什么代码？
//2.思考，这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
//3.当前模块对外需要暴露的东西(module.exports的值)

var fs=require('fs');
var path=require('path');
var querystring=require('querystring');
var config=require('./config.js');

console.log('4');

//处理index请求
module.exports.index=function(req,res){
	//1.读取data.json文件中数据，将读取的数据转换为list数组
		readNewsData(function(list){
			res.render(path.join(config.viewPath,'index.html'),{list:list});
		});
}

//处理submit请求
module.exports.submit=function(req,res){
	res.render(path.join(config.viewPath,'submit.html'));
}

//处理item请求
module.exports.item=function(req,res){
	//获取请求新闻id
		//urlObj.query.id
		//读取data.json文件数据，找到对应新闻
		readNewsData(function(list_news){
			var model=null;
			//循环
			for(var i=0;i<list_news.length;i++){
				if(list_news[i].id.toString()===req.query.id){
					//找到相等新闻，则记录下来
					model=list_news[i];
					break;
				}
			}
			if(model){	
				//模板渲染，并返回
				res.render(path.join(config.viewPath,'item.html'),{item:model});
			}else{
				res.end('no such item');
			}
		});
}

//处理add的get请求
module.exports.addGet=function(req,res){
	//先读取文件，为了防止覆盖，把数据转换为数组，再push一条
	readNewsData(function(list){
		req.query.id=list.length;
		list.push(req.query);
		
		writeNewsDate(JSON.stringify(list),function(){
			res.statusCode=302;//跳转状态码
			res.statusMessage='found';
			res.setHeader('Location','/');
			res.end();
		});
	});
}


//处理add的post方式请求
module.exports.addPost=function(req,res){
	//post提交
	//1.先读取文件，为了防止覆盖，把数据转换为数组，再push一条
	readNewsData(function(list){
		
		//2.读取用户post提交的数据
		postBodyData(req,function(postData){
			//3.新增一个属性,并push到list
			postData.id=list.length;
			list.push(postData);
			
			//4.将新提交的数据写入文件
			writeNewsDate(JSON.stringify(list),function(){
				
				res.statusCode=302;//跳转状态码
				res.statusMessage='found';
				res.setHeader('Location','/');
				res.end('over');
			});
		});
		
	});
}

//处理静态资源
module.exports.static=function(req,res){
	//请求是以/resouces开头，并且是get请求，默认为请求静态资源
	res.render(path.join(__dirname,req.url));
}


//封装404错误请求
module.exports.handleErrors=function(req,res){
	res.writeHead(404,'Not Found',{
		'Content-Type':'text/html;charset=utf-8'
	});
	res.end('404,Page Not Found.');
}

//封装读取和写入data.json文件的方法
function readNewsData(callback){
	fs.readFile(config.dataPath,'utf8',function(err,data){
			//第一次访问，因为data.json不存在，所以不应该抛出异常
			if(err&&err.code!=='ENOENT'){
				throw err;
			}
			var list=JSON.parse(data||'[]');
			callback(list);
	});
}

//封装一个写入data.json文件的方法
function writeNewsDate(data,callback){
	fs.writeFile(config.dataPath,data,function(err){
				if(err){
					throw err;
				}
				//写入数据完毕的操作
				callback();
			});
}

//封装一个获取用户post提交的数据的方法
function postBodyData(req,callback){
	
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
		
		callback(postBody);
	});
}