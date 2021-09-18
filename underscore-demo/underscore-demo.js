var _=require('underscore');

//演示
//demo1
var names=['张三','香香','小黄'];
var ages=[18,19,20];
var genders=['男','女','女'];

//压缩
var arr=_.zip(names,ages,genders);
console.log(arr);

//解压
arr=_.unzip(arr);
console.log(arr);

//demo2

//声明一段带模板代码的html文档
var html='<h2><%= name %></h2>';

//template()函数的返回依然是一个函数
var fn=_.template(html);
//调用tmplate()返回的这个函数fn
//fn接收一个数据对象，并用该数据对象，将html中的模板内容替换，生成最终的html代码。

html=fn({name:'达达'});
console.log(html);
console.log(fn.toString());
