//该模块负责对req和res对象进行扩展

//希望在该模块中做什么
//1.为req增加一个query属性，该属性中保存的就是用户get请求提交过来的数据
//req.query
//2.为req增加一个pathname属性
//req.pathname
//3.为res增加一个render函数


var url=require('url');
var fs=require('fs');
var _=require('underscore');
var mime=require('mime');

console.log('2');

//让当前模块对外暴露一个函数，通过这个函数将index.js中的req和res传递到当前context.js这个模块中
module.exports=function(req,res){
	
	var urlObj=url.parse(req.url.toLowerCase(),true);
	//1.为req增加query属性
	req.query=urlObj.query;
	//2.为req增加一个pathname属性
	req.pathname=urlObj.pathname;
	//转换成小写
	req.method=req.method.toLowerCase();
	
	//3.为res对象添加一个render函数，方便后期使用
	//渲染index.html需要用到模板数据，所以给第二个参数
	res.render=function(filename,tplData){
		fs.readFile(filename,function(err,data){
			if(err){
				//throw err;
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
}

//步骤：
//1.思考，该模块中要封装什么代码？
//2.思考，这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
//3.当前模块对外需要暴露的东西(module.exports的值)