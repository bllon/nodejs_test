//业务模块

var path=require('path');
var ejs=require('ejs');
var fs=require('fs');
var url=require('url');
var querystring=require('querystring');
//处理新闻列表  index

module.exports.index=function(req,res){
//	res.sendFile(path.join(__dirname,'view','index.html'));
	//senFile虽然能读取文件并返回，但我们不使用
	//原因是:将来我们要对index.html中的模板进行替换
	
	//默认render方法是不能使用的，需要配置一个模板引擎，然后才可以使用
//	res.render(path.join(__dirname,'view','index.html'));
		
	fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
		if(err){
			throw err;
		}
		ejs.renderFile(path.join(__dirname,'view','index.html'),{list:JSON.parse(data)},function(err,result){
			if(err){
				throw err;
			}
			res.send(result);
		});
	});
	
}

module.exports.submit=function(req,res){
	res.sendFile(path.join(__dirname,'view','submit.html'));
}

module.exports.item=function(req,res){
	fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
		if(err){
			throw err;
		}
		data=JSON.parse(data);
		var urlObj=url.parse(req.url.toLowerCase(),true);
		req.query=urlObj.query;
		var model=null;
		for(var i=0;i<data.length;i++){
			if(data[i].id.toString()===req.query.id){
				model=data[i];
				break;
			}
		}
		ejs.renderFile(path.join(__dirname,'view','item.html'),{item:model},function(err,result){
			if(err){
				throw err;
			}
			res.send(result);
		});
	});
	
}

module.exports.addGet=function(req,res){
	fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
		if(err&&err.code!=='ENOENT'){
			throw err;
		}
		var list=JSON.parse(data||'[]');
		var urlObj=url.parse(req.url.toLowerCase(),true);
		req.query=urlObj.query;
		req.query.id=JSON.parse(data).length;
		list.push(req.query);
		fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
			if(err){
				throw err;
			}
			res.redirect('/');
		})
	});
}

module.exports.addPost=function(req,res){
	fs.readFile(path.join(__dirname,'data','data.json'),'utf8',function(err,data){
		if(err&&err.code!=='ENOENT'){
			throw err;
		}
		var list=JSON.parse(data||'[]');
		
		var array=[];
		
		req.on('data',function(chunk){
			array.push(chunk);
		});
		
		req.on('end',function(){
			var postBody=Buffer.concat(array);
			postBody=postBody.toString('utf8');
			postBody=querystring.parse(postBody);
			var urlObj=url.parse(req.url.toLowerCase(),true);		
			postBody.id=JSON.parse(data).length;
			list.push(postBody);			
			fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
				if(err){
					throw err;
				}
				res.redirect('/');
			});
		});		
	});
}