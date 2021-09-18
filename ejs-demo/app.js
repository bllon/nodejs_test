//加载ejs模块

var ejs=require('ejs');
var path=require('path');
var fs=require('fs');
//render
var html='<h1><%= username %></h1>';


//var result=ejs.render(html,{username:'张三'});
//console.log(result);


//renderFile

ejs.renderFile(path.join(__dirname,'index.html'),{title:'演示模板替换',msg:'你好世界!'},function(err,result){
	console.log(result);
});

