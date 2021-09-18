//入口文件
//模拟静态资源服务器(Apache服务器)


//加载express模块
var express=require('express');
var path=require('path');

//创建app对象
var app=express();

//处理静态资源的方法
var fn=express.static(path.join(__dirname,'public'));


//注册路由
app.use('/www',fn);//以/开头的   http://localhost:9999/xxx/app.html  虚拟路径
app.use('/xxx',fn);//以/开头的   http://localhost:9999/www/app.html  虚拟路径


//启动服务
app.listen(9999,function(){
	console.log('http://localhost:9093');
	console.log(__dirname);
});
