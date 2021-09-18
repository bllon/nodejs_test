var mysql=require('mysql');

var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'qs'
});

connection.connect(function(err){
	if(err){
		console.error('connection error: '+err.stack);
	}
	console.log('connected as id: '+connection.threadId);
});

connection.query('select * from message',function(error,results,fields){
	if(error){
		throw error;
	}
	console.log('the results is '+JSON.stringify(results[0]));
});

connection.end();
