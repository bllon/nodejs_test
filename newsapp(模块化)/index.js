//模块一(服务模块)，负责启动服务
//模块二(扩展模块)，负责扩展req和res对象，为req和res增加以下更方便好用的API
//模块三(路由模块)，负责进行路由判断
//模块四(业务模块)，负责处理具体路由的业务的代码
//模块五(数据操作模块)，负责进行数据库操作
//模块六(配置模块)，负责保存各种项目中用到的配置信息

var http=require('http');
var context=require('./context.js');
var router=require('./router.js');
var config=require('./config.js');
//新闻列表数据渲染

console.log('1');

http.createServer(function(req,res){
	
	console.log("哈哈");
	//调用context.js模块的返回值，函数，并且传递两个参数
	context(req,res);
	
	//调用路由模块
	router(req,res);
	
}).listen(config.port,function(){
	console.log('http://localhost:'+config.port);
});

