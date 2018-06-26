var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test'
});
connection.connect();
var sql = 'select * from websites';
//查询
connection.query(sql, function(err, result) {
	if(err) {
		console.log('[SELECT ERROR] - ', err.message);
		return;
	}
	console.log('--------------select-------------');
	console.log(result);
	console.log('---------------------------------');
});
connection.end();