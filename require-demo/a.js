

//加载b.js模块
//require('./b.js');


//console.log(module.paths);
//模块加载顺序
//[ 'E:\\web\\node-test-js\\require-demo\\node_modules',
//'E:\\web\\node-test-js\\node_modules',
//'E:\\web\\node_modules',
//'E:\\node_modules' ]

//当加载一个模块后，默认的返回的是一个对象
var b=require('./b.js');
//console.log(b);
//b('哈哈');
b.show();

