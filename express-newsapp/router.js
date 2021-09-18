//路由模块


//1.创建一个router对象
var express=require('express');
var router=express.Router();
var handler=require('./handler.js');
var path=require('path');

//2.通过router对象设置(挂载)路由，更安全，不用获取app对象

//router.get('/',function(req,res){
//	res.send('<h1>你好，世界!</h1>');
//});

router.get('/',handler.index);
	
router.get('/index',handler.index);

router.get('/submit',handler.submit);

router.use('/item',handler.item);

router.get('/add',handler.addGet);

router.post('/add',handler.addPost);

//实现对resouces文件下的内容进行静态资源托管
//   /resouces/image/1.jpeg
router.use('/resouces',express.static(path.join(__dirname,'resouces')));

//3.返回router对象

module.exports=router;