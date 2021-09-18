//入口文件

//1.加载express模块
var express=require('express');

//2.创建一个app对象（类似于创建一个server对象）
var app=express();

//注册路由
//通过中间件监听指定的路由请求
//app.get('/index',function(req,res){
//	//get请求'/index'
////	res.end('hello world 你好世界');
//	res.send('hello world 你好世界');//自动发送更多的响应报文头，其中包括Content-Type: text/html; charset=utf-8，不乱码
//});


//use注册，1.不区分get，post 2.只要路径开头相同就行
//app.use('/index',function(req,res){
//	res.send('hello,world 你好世界');
//})

//利用正则匹配路由 /^\/index(\/.+)*$/g
//app.get(/^\/index(\/.+)*$/i,function(req,res){
//	res.send('hello world 你好世界');//自动发送更多的响应报文头，其中包括Content-Type: text/html; charset=utf-8，不乱码
//});

//通过req.params获取路由中的参数
app.get('/news/:years/:month/:day',function(req,res){
	console.log(req.params);
	res.send(req.params);
})

//all注册  1.不限定请求方法 2.请求路径必须相同
//app.all('/index',function(req,res){
//	res.send('hello,world 你好世界');
//})

//app.get('/',function(req,res){
//	res.send('index');
//});
//
//app.get('/submit',function(req,res){
//	res.send('submit');
//});
//
//app.get('/item',function(req,res){
//	res.send('item');
//});
//
//app.get('/add',function(req,res){
//	res.send('get请求/add');
//});
//
//app.post('/add',function(req,res){
//	res.send('post请求/add');
//});

//3.启动服务
app.listen(9092,function(){
	console.log('http://localhost:9092');
});
