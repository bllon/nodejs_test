//入口文件

var express=require('express');
var config=require('./config.js');
var router=require('./router.js');

var app=express();

//打印router对象源代码，发现是一个函数
//console.log(router.toString());

//设置app与router相关联，将路由挂载到app内部的路由下
app.use('/',router);//router既是一个对象，也是一个函数
//app.use(router);//默认传递了根路径


app.listen(config.port,function(){
	console.log('http://localhost:'+config.port);
});


