//入口文件
//模拟静态资源服务器(Apache服务器)


//加载express模块
var express=require('express');
var path=require('path');

//创建app对象
var app=express();


app.get('/',function(req,res){
	
//	res.json({name:'张三',age:18});
//	res.redirect(302,'https://www.baidu.com');
	
//	res.sendFile(path.join(__dirname,'public','image','1.jpeg'),function(err){
//		if(err){
//			throw err;
//		}
//		console.log('ok');
//	});

	res.status(404).send('文件不存在');
});



//启动服务
app.listen(9000,function(){
	console.log('http://localhost:9000');
	console.log(__dirname);
});
