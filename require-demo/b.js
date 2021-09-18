

function add(x,y){
	return x+y;
}

var result=add(100,1000);

console.log(result);

//module.exports='hello world';

//module.exports=function(a){
//	console.log(a);
//};

module.exports.name="abc";
module.exports.show=function(){
	console.log(this.name);
}


function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}