var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var r = require("rethinkdb");

var rhost = '127.0.0.1'
var rport = 28015;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
var io = app.listen(8003);
console.log("App is listening on 8003");


app.get('/', function (request, response){
	return response.sendStatus(200);
})


/*---------- log in ---------------*/
app.post('/api/v1.0/checkmein', function(request,response){

	var username = request.body.username;
    var password = request.body.password;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('user').filter({
            'username': username,
            'pasword': password
        }).run(conn, function(err, cursor){
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

/*---------- user ---------------*/
app.post('/api/v1.0/user', function(request,response){

	var user_id = request.body.user_id;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('user').filter({
        }).run(conn, function(err, cursor){
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

/*---------- attendance check ---------------*/

app.post('/api/v1.0/checkinCheck', function(request,response){

	var userid = request.body.userid;
    var date = request.body.date;
    var time = request.body.time;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('attendance').filter({
            'user_id': userid,
            'date': date
        }).run(conn, function(err, cursor){
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

/*---------- Add attendance ---------------*/
app.post('/api/v1.0/checkin', function(request,response){

	var userid = request.body.userid;
    var date = request.body.date;
    var time = request.body.time;
    var picture = request.body.picture;
    var location = request.body.location;
    var latitude = request.body.latitude;
    var longitude = request.body.longitude;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		 r.table('attendance').insert({
            "user_id": userid,
            "date": date,
            "time": time,
            "picture":picture,
            "location": location,
            "latitude":latitude,
            "longitude":longitude
        }).run(conn, function (err, cursor) {
            if (err) {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Generate license API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(err);
                return response.status(400).send(err)
            } else {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Generate license API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(cursor);
                return response.status(200).send(cursor)
            }
			})
    });
})


/*---------- show attendance history ---------------*/

app.post('/api/v1.0/attendance', function(request,response){

	var userid = request.body.userid;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('attendance').filter({
            'user_id': userid
        }).run(conn, function(err, cursor){
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



/*---------- user report to ---------------*/
app.post('/api/v1.0/reportto', function(request,response){

	var userid = request.body.user_id;
    
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('user').filter({
            'report_to': userid
        }).run(conn, function(err, cursor){
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

/*---------- user info ---------------*/
app.post('/api/v1.0/userinfo', function(request,response){

	var userid = request.body.user_id;
    
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('user').filter({
            'user_id': userid
        }).run(conn, function(err, cursor){
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

/*---------- Add Leave request ---------------*/
app.post('/api/v1.0/leaverequest', function(request,response){

	var userid = request.body.userid;
    var strdate = request.body.strdate;
    var endate = request.body.endate;
    var leavetype = request.body.leavetype;
    var comment = request.body.comment;
    var time = request.body.time;
    var status = request.body.status;
    var reportto = request.body.reportto;
    

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		 r.table('leaverequest').insert({
            "user_id": userid,
            "strdate": strdate,
            "endate": endate,
            "leavetype":leavetype,
            "comment": comment,
            "time":time,
            "status":status,
            "reportto":reportto
        }).run(conn, function (err, cursor) {
            if (err) {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Generate license API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(err);
                return response.status(400).send(err)
            } else {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Generate license API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(cursor);
                return response.status(200).send(cursor)
            }
			})
    });
})


/*---------- Leave request His ---------------*/
app.post('/api/v1.0/requestHis', function(request,response){

	var userid = request.body.userid;

    
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('leaverequest').filter({
            'user_id': userid
        }).run(conn, function(err, cursor){
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

/*---------- Leave request Detail ---------------*/
app.post('/api/v1.0/requestDetail', function(request,response){

	var reqid = request.body.requestid;

    
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('leaverequest').filter({
        }).run(conn, function(err, cursor){
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

/*---------- Update Leave request ---------------*/

app.put('/api/updateLeaveReq', function (request, response) {

    var reqid = request.body.requestid;
    var strdate = request.body.strdate;
    var endate = request.body.endate;
    var leavetype = request.body.leavetype;
    var comment = request.body.comment;
    var time = request.body.time;

    r.connect({
        host: rhost,
		port : rport,
		db: 'Database'
    }).then(function (conn) {
        r.table('leaverequest').get(reqid).update({
            strdate: strdate
        }, {
            endate: endate
        }, {
            leavetype: leavetype
        }, {
            comment: comment
        }, {
            time: time
        }).run(conn, function (err, cursor) {
            if (err) {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Update stop point API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(err);
                return response.status(400).send(err)
            } else {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Update stop point API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(cursor);
                return response.status(200).send(cursor)
            }
        })
    });
})

/*---------- Delete Leave request His ---------------*/


app.delete('/api/v1.0/requestHisDel', function (request, response) {

    var requestid = request.body.requestid;
    r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
    }).then(function (conn) {
        r.table('leaverequest').get(requestid).delete().run(conn, function (err, cursor) {
            if (err) {
                p = conn.close();
                p.then(function () {
                    // `conn` is now closed
                    console.log('Remove stop point API Connection is closed');
                }).error(function (err) {
                    // process the error
                    console.log(err);
                })
                console.log(err);
                return response.status(400).send(err)
            } else {
                if (cursor.deleted == 1) {
                    p = conn.close();
                    p.then(function () {
                        // `conn` is now closed
                        console.log('Remove stop point API Connection is closed');
                    }).error(function (err) {
                        // process the error
                        console.log(err);
                    })
                    console.log(cursor);
                    return response.json({
                        'rMessage': 'Deleted'
                    })
                } else {
                    p = conn.close();
                    p.then(function () {
                        // `conn` is now closed
                        console.log('Remove stop point API Connection is closed');
                    }).error(function (err) {
                        // process the error
                        console.log(err);
                    })
                    console.log(cursor);
                    return response.json(cursor)
                }
                // return response.status(200).send(cursor)
            }
        })
    });
})


/*---------- Manager noti ---------------*/

app.post('/api/v1.0/attendance', function(request,response){

	var userid = request.body.userid;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('attendance').filter({
            'user_id': userid
        }).run(conn, function(err, cursor){
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


/*---------- Employee noti ---------------*/

app.post('/api/v1.0/attendance', function(request,response){

	var userid = request.body.userid;

	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('attendance').filter({
            'user_id': userid
        }).run(conn, function(err, cursor){
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


/*---------- notification ---------------*/
app.post('/api/v1.0/requestNoti', function(request,response){

	var userid = request.body.userid;
	var status = request.body.status;
    
	r.connect({
		host: rhost,
		port : rport,
		db: 'Database'
	}).then(function (conn) {
		r.table('leaverequest').filter({
            'user_id': '2',
            'status': 'waiting'
        }).run(conn, function(err, cursor){
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