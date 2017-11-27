var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');
var app = new express();
var server = http.createServer(app);
var url = 'mongodb://172.104.167.197:27017/tutor';
var mysql = require('mysql');
var bluebird = require('bluebird');
var request = require('request');
var mm = require('underscore');
var Promise = require('promise');
<<<<<<< HEAD
var rp = require('request-promise');
bluebird.promisifyAll(MongoClient);
bluebird.promisifyAll(request);
bluebird.promisifyAll(Promise);
=======
>>>>>>> 5545f4af02aad3a7882eafc9c5217a8c18067004
var mysqlPool = mysql.createPool({
    host     : 'xxxxxxxxx',
    user     : 'root',
    password : 'xxxxxxx',
    database : 'tutordb'
});
/*
MongoClient.connect(url,function(err,db){
    if(err)
    {
        console.log(err);

    }
    else
    {	
        console.log("Connected to db");
		var course_id1 = 123456;
		if (err) throw err;
			db.collection('course_chat').find({course_id : course_id1}).forEach(function(doc) {
			var user_id = doc.chat_text;
			console.log(doc);
			
		
			});

		db.close();
		
	}

})
*/
app.get('/',function(req,res) {
	res.send('kuy');
})



app.get('/get_course_chat/:courseid',function(req,res) {
		var o = {}
		var key = 'user';
		o[key] = [];
	//console.log(1)
	//res.send('sda');
	mysqlPool.getConnection(function(err, connection) {
	  if(err) throw err;
	  //console.log(2)
	  var course_id1 = req.params.courseid;
	  //var course_id1 = 1511693785921;
	  MongoClient.connect(url,function(req,db){
		  //console.log(3)
		db.collection('course_chat').find({course_id : Number.parseInt(course_id1)}).sort({ "chat_ts": 1 }).forEach(function(doc){
			//console.log(4)
			var user_id = doc.user_id;
			var query = "SELECT u.fname , u.lname  FROM user u WHERE u.user_id =  "+user_id+" ";
			connection.query(query, function(err, rows){
			var jsonData = JSON.parse(JSON.stringify(rows));
			var counter = jsonData[0];
			//console.log('json = ')
			
			//console.log(jsonData)

				var data = {
					firstname: counter.fname,
					lastname: counter.lname,
					chat_text: doc.chat_text,
					chat_ts : doc.chat_ts
				};
					o[key].push(data);
				console.log(JSON.stringify(o))
				console.log('////////////////////////////////////////////////////////////')
			//console.log(JSON.stringify(rows))	
				//connection.release();
				res.end();
			})
			//console.log('end2')
			//res.json(o)
		})
	  //console.log('end1')
	  })
	  //console.log('end')
	})
	
})

<<<<<<< HEAD
/*
app.get('/get_course_chat/:courseid',function(req,res) {
=======
app.get('/get_course_chat/:courseid',function(req,res) {




	
>>>>>>> 5545f4af02aad3a7882eafc9c5217a8c18067004
	//res.send('sda');
			var o = {}
			var key = 'user';
			o[key] = [];
	  var course_id1 = req.params.courseid;
	  
	  //var course_id1 = 1511693785921;
<<<<<<< HEAD
	 // console.log(course_id1)
	  //res.send(course_id1);
	  MongoClient.connect(url,function(req,db){
		//console.log('in mongo1')
		db.collection('course_chat').find({course_id : parseInt(course_id1) }).sort({ "$natural": 1 }).forEach(function(doc){
			var user_id = doc.user_id;
			var txt = doc.chat_text;
			//console.log('in mongo2')
			console.log('ts = ' + doc.chat_ts)
=======
	  console.log(course_id1)
	  //res.send(course_id1);
	  MongoClient.connect(url,function(req,db){
		console.log('in mongo1')
		db.collection('course_chat').find({course_id : parseInt(course_id1) }).sort({ "$natural": 1 }).forEach(function(doc){
			var user_id = doc.user_id;
			var txt = doc.chat_text;
			console.log('in mongo2')







>>>>>>> 5545f4af02aad3a7882eafc9c5217a8c18067004

			request('http://localhost:4000/user/'+user_id+'', function (error, response, body) {
				var jsonData = JSON.parse(body);
				var conuter = jsonData[0];
<<<<<<< HEAD
				console.log('fname = ');
				console.log(conuter.fname);
				console.log('lname = ');
				console.log(conuter.lname);
				console.log('text chat = ');
				console.log(doc.chat_text);
				console.log('ts chat = ');
				console.log(doc.chat_ts);

				//console.log('in mongo3')
				var data = {
					firstname: conuter.fname,
					lastname: conuter.lname,
					chat_text: doc.chat_text,
					chat_ts : doc.chat_ts
=======
				//console.log('fname = ');
				//console.log(conuter.fname);

				console.log('in mongo3')
				var data = {
					firstname: conuter.fname,
					lastname: conuter.lname,
					chat_text: doc.chat_text
>>>>>>> 5545f4af02aad3a7882eafc9c5217a8c18067004
				};
					o[key].push(data);
					console.log(JSON.stringify(o));
	
				})	



			
			})
	  
	  })
	  console.log('in mongo4')
	
	res.json(o)  
	
})
*/

app.get('/get_course_chat/:courseid',function(req,res) {
var course_id1 = req.params.courseid;	
/*
client()
.then(A(course_id1))
.then(B(course_id1))
.then(C)
.then(D)
*/



res.end();
})




app.get('/user/:user_id',function(req,res) {
	mysqlPool.getConnection(function(err, connection) {
	  if(err) throw err;
	  var user_id = req.params.user_id
		var query = "SELECT fname , lname FROM `user` WHERE user_id = "+user_id+""
		connection.query(query, function(err, rows) {
		res.json(rows);
		connection.release();
      res.end();
	  });
	})
});


/*
var client = MongoClient.connectAsync(url)
    .then(function(db) {
		
        db.collection('course_chat').find({course_id : parseInt(1511693785921) }).sort({ "$natural": 1 }).forEach(function(doc){
				var user_id = doc.user_id;
				console.log(doc.user_id)
				console.log(doc.chat_ts)	
					
						var result = 'A is done'

						console.log('test = ' + result)
						resolve(result);
						rp('http://www.google.com')
								.then(function (htmlString) {
									console.log('55')
								})
								.catch(function (err) {
									// Crawling failed...
								});
						
					
	
		})
			
    })
    .then(function() {
      console.log(3)
    })
    .catch(function(err) {
        // An error occurred
    });
	
	

var A = function(id) {

    return new Promise(function(resolve, reject) {
        var result = 'A is done'
		var test = id;
		var au;
		console.log('id = ' + test);
		MongoClient.connect(url,function(req,db){
			au = 'rattanapol';
			console.log('db ' + au);
		})
	

        console.log(result)
        resolve(result);
    })
}


var B = function(id) {
	var test = id;
	console.log('i1 = ' + test);
    return new Promise(function(resolve, reject) {
        var result = 'B is done'
		
		console.log(result)

		resolve(result);
    })
}

var C = function() {

    return new Promise(function(resolve, reject) {
        var result = 'C is done'
        console.log(result)
        resolve(result);
    })
}

var D = function() {
	console.log("name = " + this.au)
    return new Promise(function(resolve, reject) {
        var result = 'D is done'
        console.log(result)
        resolve(result);
    })
}


*/

var port = 4000;
server.listen(port ,function(){
console.log('server running on port: ' + port);
});

