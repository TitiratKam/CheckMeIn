var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var r = require("rethinkdb");

var rhost = '172.17.2.83'
var rport = 28015;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
var io = app.listen(8000);
console.log("App is listening on 8000");


app.get('/', function (request, response){
	return response.sendStatus(200);
})

app.get('/api/v1.0/checkmein', function(request,response){
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('Employee').limit(10).run(conn, function(err, cursor){
			cursor.toArray(function (err, item) {
				if (err) {
					p = conn.close();
					p.then(function () {
						console.log('get stop point API connection is closed');
					}).error(function (err){
						console.log(err);
					})
					console.log(err);
					return response.status(400).send(err)
				} else {
					p = conn.close();
					p.then(function() {
						console.log('get stop point API connection is closed');
					}).error(function(err){
						console.log(err);
					})

					return response.json(item)
				}
			});
		})
	});
})