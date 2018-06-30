var mysql = require('mysql');

var dbconfig = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test'
};
//创建连接
var connection = mysql.createConnection(dbconfig);
//连接数据库connection.connect();
connection.connect(function(err) {
	if(err) {
		console.log('连接错误： ' + err.stack);
		return;
	}
	console.log('连接ID： ' + connection.threadId);
});
var sql = 'select * from websites';
//查询
connection.query(sql, function(err, result, fields) {
	if(err) {
		console.log('[SELECT ERROR] - ', err.message);
		return;
	}
	console.log('--------------select-------------');
	console.log(result);
	console.log('---------------------------------');
});
var addSql = 'insert into websites(Id,name,url,alexa,country) values(0,?,?,?,?)';
var addSqlParams = ['菜鸟工具', 'https://c.runnoob.com', '23453', 'CN'];
//增加一条记录
connection.query(addSql, addSqlParams, function(err, result) {
	if(err) {
		console.log('[INSERT ERROR] - ',err.message);
		return;
	}
	console.log('--------------------------INSERT----------------------------');
	//console.log('INSERT ID:',result.insertId); 
	console.log('INSERT ID:',result);
	console.log('-----------------------------------------------------------------\n\n');
});
connection.end();