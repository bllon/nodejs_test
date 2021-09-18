//该模块负责封装所有路由判断代码

//步骤：
//1.思考，该模块中要封装什么代码？
//2.思考，这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
//3.当前模块对外需要暴露的东西(module.exports的值)

//加载业务模块handler.js
var handler=require('./handler.js');
var path=require('path');

console.log('3');

//设计路由
	//当用户请求 / 或 /index 时，显示新闻列表 -get请求
	//当用户请求 /item 时 ，显示新闻详情 -get请求
	//当用户请求 /submit 时 ，显示添加新闻页面 -get请求
	//当用户请求 /add 时 ，将用户提交的新闻保存到data.json文件中  -get请求
	//当用户请求 /add 时 ，将用户提交的新闻保存到data.json文件中  -post请求
	
	//先根据用户请求的路径(路由)，将对应的HTML页面显示出来

module.exports=function(req,res){
	
	if(req.pathname==='/'||req.pathname==='/index'&&req.method==='get'){
		handler.index(req,res);
	}else if(req.pathname==='/submit'&&req.method==='get'){
		handler.submit(req,res);
	}else if(req.pathname==='/item'&&req.method==='get'){
		handler.item(req,res);	
	}else if(req.pathname==='/add'&&req.method==='get'){
		handler.addGet(req,res);		
	}else if(req.url==='/add'&&req.method==='post'){
		handler.addPost(req,res);		
	}else if(req.url.startsWith('/resouces')&&req.method==='get'){
		handler.static(req,res);
	}else{
		handler.handleErrors(req,res);
	}
}


